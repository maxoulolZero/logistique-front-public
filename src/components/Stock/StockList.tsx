import { AddCircle, DeleteOutline, Remove } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CreateStockDto, UpdateStockDto } from "../../utils/interface/create-stock.dto";
import { Item } from "../../utils/interface/item.interface";

export const StockList = ({
  stocksProps,
  reloadTable,
}: {
  stocksProps: Item[];
  reloadTable: any;
}) => {
  const [stocks, setStocks] = useState<Item[]>([]);
  const columns = [
    "ID",
    "Name",
    "Price",
    "Quantity",
    "Stock control",
    "Delete item",
  ];

  const downItem = async (item: Item) => {
    try {
      item.quantity--;
      await axios.patch<UpdateStockDto>(`${process.env.REACT_APP_STOCK_URL}/${item.id}`, item);
      reloadTable();
    } catch (error) {
      console.error(error);
      alert(`Could not remove one instance of item : ${item.name} new item`);
    }
  };

  const deleteItem = async (item: Item) => {
    try {
      await axios.delete(`${process.env.REACT_APP_STOCK_URL}/${item.id}`);
      reloadTable();
    } catch (error) {
      console.error(error);
      alert(`Could not remove item ${item.id} - ${item.name}`);
    }
  };

  const addItem = async (item: Item) => {
    try {
      item.quantity++;
      await axios.post(`${process.env.REACT_APP_STOCK_URL}`, item);
      reloadTable();
    } catch (error) {
      console.error(error);
      alert(`Could not add one instance of item : ${item.id} - ${item.name}`);
    }
  };

  useEffect(() => {
    setStocks(stocksProps);
  }, [stocksProps]);

  return (
    <div style={{ width: "80%", paddingLeft: "10%" }}>
      <h2>Stock list</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((name) => (
                <TableCell align="center">{name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((row: Item) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.prix} $</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => addItem(row)} color="success">
                    <AddCircle />
                  </IconButton>
                  <IconButton
                    onClick={() => downItem(row)}
                    color="warning"
                  >
                    <Remove />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => deleteItem(row)}
                    startIcon={<DeleteOutline />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
