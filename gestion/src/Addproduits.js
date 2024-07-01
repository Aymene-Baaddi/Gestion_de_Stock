import "./App.css";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function AddProduits() {
  const [nom, setNom] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prix_achat, setPrix_achat] = useState("");
  const [prix_vente, setPrix_vente] = useState("");
  const [gain, setGain] = useState(""); 

  const [produitsList, setProduitsList] = useState([]);
  const navigate = useNavigate();

  const addProduits = () => {
    navigate('/Home');

    const prixAchat = parseFloat(prix_achat);
    const prixVente = parseFloat(prix_vente);

    if (!isNaN(prixAchat) && !isNaN(prixVente)) {
      const gainValue = prixVente - prixAchat;
      setGain(gainValue.toFixed(2));


      const quantiteVendu = 0;

      Axios.post("http://localhost:3012/create", {
        nom: nom,
        quantite: quantite,
        quantite_vendu: quantiteVendu,
        prix_achat: prixAchat,
        prix_vente: prixVente,
        gain: gainValue.toFixed(2),
      }).then(() => {
        setProduitsList([
          ...produitsList,
          {
            nom: nom,
            quantite: quantite,
            quantite_vendu: quantiteVendu,
            prix_achat: prixAchat,
            prix_vente: prixVente,
            gain: gainValue.toFixed(2),
          },
        ]);
      });
    }
  };

  return (
    <div className="App">
      <div className="Home">
        <div className="information">
          <label>Nom:</label>
          <input
            type="varchar"
            onChange={(event) => {
              setNom(event.target.value);
            }}
          />
        </div>

        <div className="information">
          <label>Quantite:</label>
          <input
            type="int"
            onChange={(event) => {
              setQuantite(event.target.value);
            }}
          />
        </div>
        <div className="information">
          <label>Prix Achat:</label>
          <input
            type="double"
            onChange={(event) => {
              setPrix_achat(event.target.value);
            }}
          />
        </div>
        <div className="information">
          <label>PrixVente:</label>
          <input
            type="varchar"
            onChange={(event) => {
              setPrix_vente(event.target.value);
            }}
          />
        </div>
        <div className="information">
          <button onClick={addProduits}>Add produits</button>
        </div>
      </div>
    </div>
  );
}
