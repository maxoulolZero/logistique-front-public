import axios from "axios";
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import './WarehousePage.css';
import { getURL } from '../../utils/url';

function formatMoney(num: number) {
  return num.toLocaleString('eu-FR', { style: 'currency', currency: 'EUR' });
}

export const WarehousePage = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const head = ['Produit', 'Description', 'Code Produit', 'Prix', 'Stock Entrepot 1', 'Packaging'];

  useEffect(() => {
    if (!loaded) {
      axios
        .get(getURL() + 'logistique/stock/')
        .then(res => {
          setData(res.data);
          setLoaded(true);
          const error = document.querySelector('.error');
          if (error) error.innerHTML = '';
        })
        .catch(() => {
          setData([]);
          const error = document.querySelector('.error');
          if (!error || error.innerHTML === '') {
            const newError = document.createElement('div');
            newError.innerHTML = 'Failed to load the Data : Connection refused';
            newError.style.color = 'red';
            newError.className = 'error';
            newError.style.textAlign = 'center';
            document.querySelector('.data')?.after(newError);
          }
        });
    }
  }, [loaded]);

  const updateReferentiel = () => {
    axios
      .get(getURL() + 'logistique/stock/filldb')
      .then(res => {
        const msg = res.data.message;
        const msgField = document.querySelector('.update-msg');
        if (msgField) {
          msgField.innerHTML = msg;
          msgField.classList.toggle('active');
          setTimeout(() => {
            msgField.classList.toggle('active');
          }, 3000);
        }
      })
      .catch(err => {
        const msgField = document.querySelector('.update-msg');
        if (msgField) {
          msgField.innerHTML = err;
          msgField.classList.toggle('active-err');
          setTimeout(() => {
            msgField.classList.toggle('active-err');
          }, 3000);
        }
      });
    setLoaded(false);
    setData([]);
  };

  return (
    <div className="warehouse-page">
      <Button onClick={() => updateReferentiel()}>
        <span className="update-button">UPDATE</span>
      </Button>
      <div className="update-msg"></div>
      <div className="table-data">
        <TableContainer className="data" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow key="Head">
                {head.map((element: string) => {
                  return (
                    <TableCell align="center" key={element}>
                      {element}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {data
                .sort((older: any, newer: any) => Number(newer.id) - Number(older.id))
                .map((element: any) => {
                  return (
                    <TableRow key={element.id}>
                      <TableCell align="center">{element.famille_produit}</TableCell>
                      <TableCell align="center">{element.description_produit}</TableCell>
                      <TableCell align="center">{element.code_produit}</TableCell>
                      <TableCell align="center">{formatMoney(element.prix)}</TableCell>
                      <TableCell align="center">{element.stock_disponible}</TableCell>
                      <TableCell align="center">{element.packaging}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};