import { forwardRef, useState, Fragment, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import EditProductForm from "./EditSatusForm";
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
  status
}) {
  const [open, setOpen] = useState(false);
  
  // Garde les états que tu souhaites
  const [product_id, setProduct_id] = useState("");
  const [user_id, setUser_id] = useState("");
  const [status_id, setStatus_id] = useState([]);
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [created_at, setCreated_at] = useState(null);
  

  useEffect(() => {
    setOpen(isEditModalOpen);
  }, [isEditModalOpen]);

  useEffect(() => {
    // Charger les données du produit dans le formulaire lorsque le produit change
    if (data) {
      setProduct_id(data.product_id || "");
      setUser_id(data.user_id || "");
      setStatus_id(data.status_id || []);
      setAmount(data.amount || "");
      setQuantity(data.quantity || "");
      setCreated_at(data.created_at || null);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product_id || !user_id || !status_id.length || !amount || !quantity || !created_at) {
      return;
    }

    const formData = {
      product_id: product_id,
      user_id: user_id,
      status_id: status_id,
      amount: amount,
      quantity: quantity,
      created_at: created_at,
    };

    try {
      // Mettre à jour les informations sur le produit
      await axios.put(`${config.apiUrl}/product/update`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRefresh(!refresh);
      setProduct_id("");
      setUser_id("");
      setStatus_id([]);
      setAmount("");
      setQuantity("");
      setCreated_at(null);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditModalOpen(false);
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

      {status && data && (
        <Dialog
          fullWidth="md"
          maxWidth="md"
          open={open}
          TransitionComponent={Transition}
          disableEscapeKeyDown // Empêche la fermeture avec la touche Échap
          onClose={(event, reason) => {
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
                data={data}
                setProduct_id={setProduct_id}
                setUser_id={setUser_id}
                setStatus_id={setStatus_id}
                setAmount={setAmount}
                setQuantity={setQuantity}
                setCreated_at={setCreated_at}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleSubmit}>
              Sauvegarder
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Fragment>
  );
}

export default EditPopUp;
