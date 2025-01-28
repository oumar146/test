import { forwardRef, useState, Fragment, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextFields from "../form/TextFields";
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
  const [categoryName, setCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { user } = useContext(UserContext);

  useEffect(() => {
    setOpen(isEditModalOpen);
  }, [isEditModalOpen]);

  useEffect(() => {
    // Charger les données du produit dans le formulaire lorsque le produit change
    if (data) {
      setCategoryName(data.category_name || "");
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!categoryName) {
      return;
    }

    const formData = {
      oldName: data.name,
      newName: categoryName,
    };
    console.log("oldName :", data.name, "newName : ", categoryName);
    try {
      // Mettre à jour les informations sur le produit
      await axios.put(`${config.apiUrl}/category/update`, formData);
      setRefresh(!refresh);
      setCategoryName("");
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
            <TextFields
              defaultValue={data.name}
              setData={setCategoryName}
              label="Catégorie"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isSubmitting}
            variant="outlined"
            onClick={handleSubmit}
          >
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default EditPopUp;
