import { forwardRef, useState, Fragment, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import EditProductForm from "./EditProductForm";
import axios from "axios";
import config from "../../config";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditPopUp({
  refresh,
  setRefresh,
  isEditModalOpen,
  setIsEditModalOpen,
  data,
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState([]);
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { user } = useContext(UserContext);

  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product/genders`);
        setGenders(response.data.genders);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenders();
  }, []); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/category/get`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setOpen(isEditModalOpen);
  }, [isEditModalOpen]);

  useEffect(() => {
    // Charger les données du produit dans le formulaire lorsque le produit change
    if (data) {
      setName(data.product_name || "");
      setDescription(data.description || "");
      setGender(data.gender_name || "");
      setPrice(data.price || "");
      setCategoryName(data.category_name || "");
      setImage(data.image_url || "");
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !description || !gender || !price || !categoryName || !image) {
      return;
    }


    const formData = {
      name: name,
      description: description,
      gender_name: gender,
      price: price,
      category_name: categoryName,
      product_id: data.product_id,
    };

    if (image) formData.image = image;

    try {
      // Mettre à jour les informations sur le produit
      await axios.put(`${config.apiUrl}/product/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setRefresh(!refresh);
      setName("");
      setDescription("");
      setGender("");
      setPrice("");
      setCategoryName("");
      setImage(null);
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
      setIsEditModalOpen(false);
    }
  };
  return (
    <Fragment>
      <Button
        style={{ backgroundColor: "transparent" }}
        onMouseDown={(e) => {
          e.target.style.background = "transparent";
        }}
        onMouseUp={(e) => {
          e.target.style.background = "transparent";
        }}
        variant="text"
        size="small"
        onClick={handleClickOpen}
      ></Button>
       {categories.length > 0 && genders.length > 0 && data && (
        <Dialog
        fullWidth="md"
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        disableEscapeKeyDown // Empêche la fermeture avec la touche Échap
        onClose={(event, reason) => {
          // Empêche la fermeture en cliquant à l'extérieur
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Modifier un produit</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {data && (
            <EditProductForm
            categories={categories}
            genders={genders}
              data={data}
              setName={setName}
              setDescription={setDescription}
              setGender={setGender} // Assure-toi que tu passes bien cette fonction
              setPrice={setPrice}
              setCategoryName={setCategoryName}
              setImage={setImage}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button disabled={isSubmitting} variant="outlined" onClick={handleSubmit}>
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>)}
    </Fragment>
  );
}

export default EditPopUp;
