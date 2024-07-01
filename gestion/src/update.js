import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [, setProduit] = useState({
    nom: "",
    quantite: "",
    prix_achat: "",
    prix_vente: "",
  });

  const [newNom, setNewNom] = useState("");
  const [newQuantite, setNewQuantite] = useState("");
  const [newPrix_achat, setNewPrix_achat] = useState("");
  const [newPrix_vente, setNewPrix_vente] = useState("");
  const [newGain, setNewGain] = useState("");

  const getProduits = useCallback(() => {
    Axios.get(`http://localhost:3012/produits/${id}`).then((response) => {
      setProduit(response.data[0]);
      setNewNom(response.data[0].nom);
      setNewQuantite(response.data[0].quantite);
      setNewPrix_achat(response.data[0].prix_achat);
      setNewPrix_vente(response.data[0].prix_vente);
      setNewGain(response.data[0].gain);
    });
  }, [id]);

  useEffect(() => {
    getProduits();
  }, [getProduits]);

  useEffect(() => {
    const prixAchat = parseFloat(newPrix_achat);
    const prixVente = parseFloat(newPrix_vente);
    if (!isNaN(prixAchat) && !isNaN(prixVente)) {
      const gain = (prixVente - prixAchat).toFixed(2);
      setNewGain(gain);
    }
  }, [newPrix_achat, newPrix_vente]);

  const updateProduits = () => {
    Axios.put(`http://localhost:3012/update/${id}`, {
      nom: newNom,
      quantite: newQuantite,
      prix_achat: parseFloat(newPrix_achat),
      prix_vente: parseFloat(newPrix_vente),
      gain: parseFloat(newGain),
    }).then(() => {
      navigate("/home");
    });
  };

  return (
    <div className="App">
      <br />
      <div className="Home">
        <div className="information">
          <label>Nom:</label>
          <input
            type="text"
            value={newNom}
            onChange={(e) => setNewNom(e.target.value)}
          />
          <label>Quantite:</label>
          <input
            type="text"
            value={newQuantite}
            onChange={(e) => setNewQuantite(e.target.value)}
          />
          <label>Prix_achat:</label>
          <input
            type="text"
            value={newPrix_achat}
            onChange={(e) => setNewPrix_achat(e.target.value)}
          />
          <label>Prix_vente:</label>
          <input
            type="text"
            value={newPrix_vente}
            onChange={(e) => setNewPrix_vente(e.target.value)}
          />
          <label>Gain:</label>
          <input type="text" value={newGain} readOnly />
          <button onClick={updateProduits}>Update data</button>
        </div>
      </div>
    </div>
  );
}

export default Update;
