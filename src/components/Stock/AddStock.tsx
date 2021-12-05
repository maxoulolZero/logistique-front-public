import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { AddCircle } from "@mui/icons-material";
import { Item } from "../../utils/interface/item.interface";
import axios from "axios";
import { CreateStockDto } from "../../utils/interface/create-stock.dto";


export const AddStockButton = ({ reloadTable }: { reloadTable: any }) => {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(0);
  const [itemPrice, setItemPrice] = useState<number>(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleCancel = () => {
    setItemName("");
    setItemPrice(0);
    setItemQuantity(0);
    handleClose();
  };

  const handleValidate = async (e: any) => {
    if (!itemPrice || !itemName || !itemQuantity) {
      alert("Please fill infos");
      return;
    }
    try {
      await axios.post<CreateStockDto>(`${process.env.REACT_APP_STOCK_URL}/`, {
        quantity: +itemQuantity,
        name: itemName,
        prix: +itemPrice,
      });
      reloadTable();
      setItemName("");
      setItemPrice(0);
      setItemQuantity(0);
    } catch (error) {
      console.error(error);
      alert("Could not add new item");
    } finally {
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddCircle />}
        onClick={() => setOpen(!open)}
      >
        Ajouter un nouvel item
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Ajouter un nouvel item dans le stock"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Merci de rentrer un nouvel item
          </DialogContentText>
        </DialogContent>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "30vh",
          }}
          onSubmit={handleValidate}
          id="form1"
        >
          <TextField
            required
            style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}
            variant="outlined"
            label="Item name"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            required
            style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}
            label="Quantité"
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(+e.target.value)}
          />
          <TextField
            required
            label="Item price"
            style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(+e.target.value)}
          />
        </form>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Annuler
          </Button>
          <Button autoFocus onClick={handleValidate}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
