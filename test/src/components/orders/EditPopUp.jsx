import { forwardRef, useState, Fragment, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import EditSatusForm from "./EditSatusForm";
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
  statuses,
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product_id, setProduct_id] = useState("");
  const [user_id, setUser_id] = useState("");
  const [status_name, setStatus_name] = useState([]);
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [created_at, setCreated_at] = useState(null);

  useEffect(() => {
    setOpen(isEditModalOpen);
  }, [isEditModalOpen]);

  useEffect(() => {
    // Charger les données du produit dans le formulaire lorsque le produit change
    if (data) {
      const status = statuses.filter(
        (status) => status.name === data.order_status && status.id
      );
      setStatus_name(status[0].id);

      setProduct_id(data.product_id || "");
      setUser_id(data.user_id || "");
      setStatus_name(statuses || []);
      setAmount(data.amount || "");
      setQuantity(data.quantity || "");
      setCreated_at(data.created_at || null);
    }
  }, [data, statuses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !product_id ||
      !user_id ||
      !status_name.length ||
      !amount ||
      !quantity ||
      !created_at
    ) {
      return;
    }
    const status = statuses.filter(
      (status) => status.name === status_name && status.id
    );

    const formData = {
      order_id: data.order_id,
      status_id: status[0].id,
    };

    try {
      await axios.put(`${config.apiUrl}/order/update`, formData);
      setRefresh(!refresh);
      setProduct_id("");
      setUser_id("");
      setStatus_name([]);
      setAmount("");
      setQuantity("");
      setCreated_at(null);
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
      {statuses && data && (
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
            {data && statuses && (
              <EditSatusForm
                data={data}
                statuses={statuses}
                setStatus_id={setStatus_name}
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
      )}
    </Fragment>
  );
}

export default EditPopUp;
