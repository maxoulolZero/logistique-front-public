import {
  Alert,
  AlertColor,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { AddStockButton } from "../components/Stock/AddStock";
import { StockList } from "../components/Stock/StockList";
import { Item } from "../utils/interface/item.interface";

export const Stock = () => {
  const [stocks, setStocks] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);

  // SNACKBAR PROPS
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState('');
  const [snackType, setSnackType] = useState<AlertColor>('success');


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  let reloadStocks = useRef(setTimeout(() => '', 10000));
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  }

  const fetchStocks = async () => {
    try {
      let res = await axios.get<Item[]>(
        `${process.env.REACT_APP_STOCK_URL}/`
      );
      setStocks(res.data);
      setLoaded(true);
    } catch (error: any) {
      setSnackType('error');
      setMessageSnack('Could not fetch info from stock backend');
      setOpenSnack(true);
      clearInterval(reloadStocks.current);
      console.error(error);
      setLoaded(true);
    }
  };

  useEffect(() => {
    reloadStocks.current = setInterval(fetchStocks, 10000);
    fetchStocks();
    return () => clearInterval(reloadStocks.current);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", textAlign: 'center' }}>
      <h1>Stock</h1>
      {!loaded ? (
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
            <CircularProgress />
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}

      <>
        <StockList reloadTable={fetchStocks} stocksProps={stocks} />
        <Divider
          style={{
            marginBottom: "5%",
            marginTop: "5%",
            width: "90%",
            marginLeft: "5%",
          }}
        />
        <AddStockButton reloadTable={fetchStocks} />
      </>
      <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert variant='filled' onClose={handleCloseSnack} severity={snackType} sx={{ width: '100%' }}>
          {messageSnack}
        </Alert>
      </Snackbar>
    </div>
  );
};
