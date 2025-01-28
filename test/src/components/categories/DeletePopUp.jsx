import { forwardRef, useState, Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextFields from "../form/TextFields";
import { useEffect } from "react";
import axios from "axios";
import config from "../../config";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeletePopUp({
  setIsDeleteModalOpen,
  isDeleteModalOpen,
  data,
  refresh,
  setRefresh,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isDeleteModalOpen);
  }, [isDeleteModalOpen]);

  const handleSubmit = async () => {

    try {
      await axios.delete(`${config.apiUrl}/category/delete`, {
        data: { name: data.name },
      });

      setRefresh(!refresh);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleClose = () => {
    setOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <Fragment>
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
        <DialogTitle>
          {data.length > 1 ? "Supprimer des produits" : "Supprimer un produit"}
        </DialogTitle>
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
        {data && (
          <DialogContent>
            <div>
              <TextFields
                disabled={true}
                defaultValue={data.name}
                label="Catégories"
              />
            </div>
          </DialogContent>
        )}
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default DeletePopUp;
