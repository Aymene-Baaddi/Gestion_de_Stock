import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';

import './App.css';


const Frigo = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [quantitySold, setQuantitySold] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3012/table`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erreur dans la table :', error);
      });
  }, []);

  
  const filteredData = data.filter(item => {
    return item.nom.toLowerCase().includes(search.toLowerCase());
  });

  const deleteProduits = (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3012/delet/${id}`).then((response) => {
        setData(
          data.filter((val) => {
            return val.id !== id;
          })
        );
      });
    }
  };

  const updateProduct = async (id, newQuantite, newQuantiteVendu) => {
    try {
      const response = await axios.put(`http://localhost:3012/UpdateQuantities3/${id}`, {
        quantite: newQuantite,
        quantite_vendu: newQuantiteVendu,
      });

      if (response.status === 200) {
        const updatedData = data.map(item => {
          if (item.id === id) {
            return {
              ...item,
              quantite: newQuantite,
              quantite_vendu: newQuantiteVendu,
            };
          }
          return item;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit :', error);
      
    }
  };

  const handleSubmitVendu = () => {
    if (selectedProduct) {
      const newQuantite = selectedProduct.quantite - quantitySold;
      const newQuantiteVendu = selectedProduct.quantite_vendu + quantitySold;
      updateProduct(selectedProduct.id, newQuantite, newQuantiteVendu);
      setSelectedProduct(null);
      setQuantitySold(0);
    }
  }

  return (
    <div className="table-container">

<div style={{marginBottom:'5px',}}>
      <h2 style={{display:'flex', justifyContent:'right'}}>
        <Link to="/addFrigo" className="linkStyle">
          + AJOUTER PRODUITS
        </Link>
      </h2>
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
            <th>QUANTITE FIXE</th>
            <th>QUANTITE ACTU</th>
            <th>QUANTITE COMMANDE</th>

            <th>PRIX_ACHAT</th>
            <th>PRIX_VENTE</th>
            <th>GAIN</th>

            <th style={{textAlign:'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.nom}</td>
              <td>{item.quantite_fixe}</td>
              <td>{item.quantite}</td>
              <td>{item.quantite_fixe - item.quantite}</td>

              <td>{item.prix_achat} dh</td>
              <td>{item.prix_vente} dh</td>
              <td>{item.gain} dh</td>

              <td className="actions" style={{textAlign:'center'}}>
                <button className='BT-UPDATE' onClick={() => {
                        navigate(`/Update2/${item.id}`); 
                      }}>Modifier</button>
                <button className='BT-VENDU' onClick={() => {
                  setSelectedProduct(item); 
                  setQuantitySold(0); 
                }}>
                  Vendu
                </button>
                <button className='BT-SUPPRIMER' onClick={() => deleteProduits(item.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProduct && (
  <div className="alert-overlay">
    <div className="alert-box">
      <h3>Quantité vendue de {selectedProduct.nom}</h3>
      <input
        type="number"
        value={quantitySold}
        onChange={(e) => setQuantitySold(parseInt(e.target.value, 10))}
      />
      <button className='valval' onClick={handleSubmitVendu}>Valider</button>
    </div>
  </div>
)}
    </div>
  );
};

export default Frigo;