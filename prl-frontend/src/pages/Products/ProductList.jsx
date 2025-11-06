// src/pages/Home.jsx (or wherever you want to use the data)

import React, { useEffect } from 'react';
import upvcData from '../data/upvc.json';
import aluminumData from '../data/aluminum.json';

const Home = () => {
  useEffect(() => {
    console.log("UPVC Machines:", upvcData);
    console.log("Aluminum Machines:", aluminumData);
  }, []);

  return (
    <div>
      <h1>Machine Data Console Log</h1>
      <p>Check browser console for data output.</p>
    </div>
  );
};

export default Home;
