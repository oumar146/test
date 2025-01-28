import { forwardRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import config from "../../config";
import AddProductForm from "./AddProductForm";
import { FormControl } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddPopUp({
  refresh,
  setRefresh,
  isEditModalOpen,
  setIsEditModalOpen,
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction de réinitialisation des champs
  const resetFormFields = () => {
    setName("");
    setDescription("");
    setGender("");
    setPrice("");
    setCategoryName("");
    setImage(null);
  };

  useEffect(() => {
    setOpen(isEditModalOpen);
  }, [isEditModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !gender || !price || !categoryName || !image) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    setIsSubmitting(true);
    const creationDate = new Date().toISOString();

    const formData = {
      name: name,
      description: description,
      creation_date: creationDate,
      gender_name: gender,
      price: price,
      category_name: categoryName,
      email: "salloumar0107@gmail.com",
      creator_id: 2,
    };

    // Ajouter l'image si elle est présente
    if (image) {
      formData.image = image;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${config.apiUrl}/product/new`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      resetFormFields(); // Réinitialiser les champs après soumission réussie
      setRefresh(!refresh); // Refresh les data
      handleClose(); // Fermer le modal
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
      resetFormFields(); 
      setOpen(false);
      setIsEditModalOpen(false);
    }
  };

  return (
    <FormControl>
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
        <DialogTitle>Ajouter un produit</DialogTitle>
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
          <AddProductForm
            setName={setName}
            setDescription={setDescription}
            setGender={setGender}
            setPrice={setPrice}
            setCategoryName={setCategoryName}
            setImage={setImage}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isSubmitting}
            variant="contained"
            onClick={handleSubmit}
          >
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}

export default AddPopUp;
