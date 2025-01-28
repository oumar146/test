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
import { FormControl } from "@mui/material";
import TextFields from "../form/TextFields";
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
  const [categoryName, setCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction de réinitialisation des champs
  const resetFormFields = () => {
    setCategoryName("");
  };

  useEffect(() => {
    setOpen(isEditModalOpen);
  }, [isEditModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    setIsSubmitting(true);

    const formData = {
      name: categoryName,
    };

    try {
      await axios.post(`${config.apiUrl}/category/new`, formData);

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
          <TextFields setData={setCategoryName} label="Catégories" />
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
