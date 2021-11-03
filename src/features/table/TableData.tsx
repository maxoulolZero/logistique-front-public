import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import "./TableData.css";
import React, { useEffect, useState } from 'react';

export const TableData = ({ rows, handleChange, editable }: any) => {
  const updateRow = (row: any) => {
    console.log('UPDATE');
    handleChange(row, 'Update');
  };
  const [head, setHead] = useState<Array<string>>([]);

  useEffect(() => {
    if (rows && rows[0]) {
      if (rows && rows[0]) setHead(Object.keys(rows[0]));
      else setHead(['Author', 'Description', 'Creation Date', 'Edit Last Time']);
      if (editable) setHead(head => [...head, 'Update', 'Delete']);
    }
  }, [rows[0]]);

  const deleteRow = (row: any) => {
    console.log('DELETE');
    handleChange(row, 'Delete');
  };
  return (
    <div className="table-data">
      <TableContainer className="data" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow key="Head">
              {head &&
                head.map((element: string) => {
                  if (element == 'id') return;
                  return (
                    <TableCell align="center" className="cap" key={element}>
                      {element}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .sort((older: any, newer: any) => Number(newer.date_of_edition) - Number(older.date_of_edition))
              .map((element: any) => {
                return (
                  <TableRow key={element.id}>
                    {Object.keys(element).map(key => {
                      if (key.includes('date')) {
                        const tmp = new Date(parseInt(element[key]));
                        const date = tmp.toLocaleString();
                        return <TableCell align="center">{date}</TableCell>;
                      }
                      if (key == 'id') return;
                      return <TableCell align="center">{element[key]}</TableCell>;
                    })}
                    {editable && (
                      <TableCell align="center" onClick={() => updateRow(element)}>
                        <span className="update">UPDATE</span>
                      </TableCell>
                    )}
                    {editable && (
                      <TableCell align="center" onClick={() => deleteRow(element)}>
                        <span className="delete">DELETE</span>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {editable && (
        <span
          className="add"
          onClick={() => {
            console.log('Add');
            handleChange({ author: '', description: '' }, 'Add');
          }}
        >
          ADD
        </span>
      )}
    </div>
  );
};
