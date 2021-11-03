import axios from "axios";
import { useEffect, useState } from 'react';
import { ApiButton } from '../../features/api_button/ApiButton';
import { TableData } from '../../features/table/TableData';
import { getURL } from '../../utils/url';
import './CommunicationPage.css';

export const CommunicationPage = () => {
  const options = [
    'back-office',
    'logistique',
    'achat',
    'bi',
    'promos',
    'caisse',
    'e-commerce',
    'fidélité',
    'paiement',
    'référentiel',
    'sav',
  ];

  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(getURL() + 'logistique/init/' + selectedOption)
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
  }, [loaded, selectedOption]);

  const handleClick = (row: any, op: string) => {
    row = row;
    op = op;
  };

  const handleSelected = (option: any) => {
    setSelectedOption(option);
    setLoaded(false);
  };

  return (
    <div className="communication-page">
      <ApiButton options={options} handler={handleSelected} />
      <TableData handleChange={handleClick} rows={data} editable={false} className="table-data" />
    </div>
  );
};
