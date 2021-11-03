import React, { useEffect, useState } from 'react';
import './Footer.css';

export const Footer = () => {
  const [date, setDate] = useState(new Date());
  let timeString = date.toLocaleTimeString();
  let dateString = date.toLocaleDateString();
  setInterval(() => {
    setDate(new Date());
  }, 1000);

  useEffect(() => {
    timeString = date.toLocaleTimeString();
    dateString = date.toLocaleDateString();
  }, [date]);
  
  return (
    <div className="footer">
      <div className="name">Logistique</div>
      <div className="date">{dateString}</div>
      <div className="separator"></div>
      <div className="time">{timeString}</div>
      <div className="version">Version 0.0.12</div>
    </div>
  );
};
