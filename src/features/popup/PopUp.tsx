import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getURL } from '../../utils/url';
import './Popup.css';

export const PopUp = ({ type, setType, setLoaded, row }: any) => {
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  const removeData = () => {
    axios.delete(getURL() + 'logistique/init/' + row.id).then(() => setLoaded(false));
    setType('None');
  };

  const updateData = () => {
    if (author.length < 3 || description.length < 3) {
      const elt = document.querySelector('.error');
      if (elt) {
        elt.innerHTML = 'Fields must have at least 3 characters.';
      }
    } else {
      axios
        .put(getURL() + 'logistique/init/' + row.id, {
          author,
          description,
        })
        .then(() => setLoaded(false));
      setType('None');
    }
  };

  const createData = () => {
    if (author.length < 3 || description.length < 3) {
      const elt = document.querySelector('.error');
      if (elt) {
        elt.innerHTML = 'Fields must have at least 3 characters.';
      }
    } else {
      axios
        .post(getURL() + 'logistique/init/', {
          author,
          description,
        })
        .then(() => setLoaded(false));
      setType('None');
    }
  };

  useEffect(() => {
    if (row) {
      setDescription(row.description);
      setAuthor(row.author);
    }
  }, [row]);

  if (type === 'None') return <></>;

  if (type === 'Delete') {
    return (
      <div className="popup">
        <div className="content">
          <h3>Please, confirm the deletion of this line.</h3>
          <div className="buttons">
            <span
              className="delete"
              onClick={() => {
                removeData();
              }}
            >
              YES
            </span>
            <span
              className="cancel"
              onClick={() => {
                setType('None');
              }}
            >
              CANCEL
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'Update') {
    return (
      <div className="popup">
        <div className="content">
          <h1>Update the values</h1>
          <div className="fields">
            <TextField
              id="outlined-basic"
              label="Author"
              variant="outlined"
              value={author}
              required
              onChange={e => {
                setAuthor(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              multiline
              required
              variant="outlined"
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="error"></div>
          <div className="buttons">
            <span
              className="update"
              onClick={() => {
                updateData();
              }}
            >
              UPDATE
            </span>
            <span
              className="cancel"
              onClick={() => {
                setType('None');
              }}
            >
              CANCEL
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="popup">
      <div className="content">
        <h1>Update the values</h1>
        <div className="fields">
          <TextField
            id="outlined-basic"
            label="Author"
            variant="outlined"
            value={author}
            required
            onChange={e => {
              setAuthor(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            multiline
            required
            variant="outlined"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="error"></div>
        <div className="buttons">
          <span
            className="add"
            onClick={() => {
              createData();
            }}
          >
            CREATE
          </span>
          <span
            className="cancel"
            onClick={() => {
              setType('None');
            }}
          >
            CANCEL
          </span>
        </div>
      </div>
    </div>
  );
};
