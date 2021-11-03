import axios from "axios";
import React, { useEffect, useState } from "react";
import { TableData } from "../../features/table/TableData";
import { PopUp } from "../../features/popup/PopUp";
import "./VisualisationPage.css";
import { getURL } from '../../utils/url';

export const VisualisationPage = () => {
  const operations = {
    delete: 'Delete',
    update: 'Update',
    add: 'Add',
    none: 'None',
  };
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [operation, setOperation] = useState(operations.none);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!loaded) {
      console.log('getURL: ' + getURL());
      axios
        .get(getURL() + 'logistique/init/')
        .then(res => {
          setData(res.data);
          setLoaded(true);
        })
        .catch(err => {
          const error = document.createElement('div');
          error.innerHTML = err + '</br>Failed to load the data : Backend is not running';
          error.style.color = 'red';
          error.style.textAlign = 'center';
          document.querySelector('.data')?.after(error);
          const addBtn = document.querySelector('.add');
          addBtn?.remove();
        });
    }
  }, [loaded]);

  const handleClick = (row: any, op: string) => {
    setSelected({ ...row });
    setOperation(op);
  };

  return (
    <div className="visualisation-page">
      <TableData handleChange={handleClick} rows={data} editable={true} className="table-data" />
      <PopUp type={operation} setLoaded={setLoaded} setType={setOperation} row={selected}></PopUp>
    </div>
  );
};
