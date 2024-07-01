import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './App.css';

const Historique = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`http://localhost:3012/table-data`);
        const res2 = await axios.get(`http://localhost:3012/table`);
        const res3 = await axios.get(`http://localhost:3012/table-data1`);
        setData([...res1.data, ...res2.data, ...res3.data]);
      } catch (error) {
        console.error('Erreur dans la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data
    .filter(item => item.quantite_vendu !== 0 && item.quantite_vendu !== null)
    .filter(item => item.nom.toLowerCase().includes(search.toLowerCase()));

  const totalGains = filteredData.reduce((total, item) => {
    return total + item.gain * item.quantite_vendu;
  }, 0);

  return (
    <div className="table-container">
      <div style={{marginBottom:'5px',}}>
      <div className="total-gains" style={{textAlign:'right', marginBottom:'-25px'}}>
        Total des gains : {totalGains} dh
      </div>
      <input
      className='searchBar'
        type="text"
        placeholder="Rechercher produit par nom"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>QUANTITE_VENDU</th>
            <th>GAIN TOTAL</th>

          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.nom}</td>
              <td>{item.quantite_vendu}</td>
              <td>{item.gain * item.quantite_vendu} dh</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historique;
