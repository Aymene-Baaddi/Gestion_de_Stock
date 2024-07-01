const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors");



app.use(cors());
app.use(express.json());

const db= mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "Azerty+123",
  database: "gestion",
});


app.post("/create", (req, res) => {
  
  const nom = req.body.nom;
  const quantite = req.body.quantite;
  const quantite_vendu = req.body.quantite_vendu;
  const prix_achat = req.body.prix_achat;
  const prix_vente = req.body.prix_vente;
  const gain = req.body.gain;


  db.query(
    "INSERT INTO produits (nom, quantite, quantite_vendu, prix_achat, prix_vente, gain) VALUES (?,?,?,?,?,?)",
    [nom, quantite, quantite_vendu, prix_achat, prix_vente, gain],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/table-data", (req, res) => {


  const sql = `SELECT * FROM produits`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.put("/Update/:id", (req, res) => {
  const id = req.params.id;
  const { nom, quantite, prix_achat, prix_vente, gain} = req.body;
 db.query(
    "UPDATE produits SET nom = ?, quantite = ?, prix_achat = ?, prix_vente = ?, gain = ? WHERE id = ?",
    [nom, quantite, prix_achat, prix_vente, gain, id],
    (err, result) => {
      if (err) {
        console.error("Error updating produits:", err);
        
      } else {
       res.send(result);
      }
    }
  );
});


app.get("/produits/:id", (req, res) => {
  const id = req.params.id;
 db.query("SELECT * FROM produits WHERE id = ?",id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
 db.query("DELETE FROM produits WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.put("/UpdateQuantities/:id", (req, res) => {
  const id = req.params.id;
  const { quantite, quantite_vendu } = req.body;

  db.query(
    "UPDATE produits SET quantite = ?, quantite_vendu = ? WHERE id = ?",
    [quantite, quantite_vendu, id],
    (err, result) => {
      if (err) {
        console.error("Error updating quantities:", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour des quantités" });
      } else {
        res.status(200).json({ message: "Mise à jour des quantités réussie" });
      }
    }
  );
});







app.post("/create2", (req, res) => {
  
  const nom = req.body.nom;
  const quantite = req.body.quantite;
  const quantite_fixe = req.body.quantite_fixe;
  const prix_achat = req.body.prix_achat;
  const prix_vente = req.body.prix_vente;
  const quantite_vendu = req.body.quantite_vendu;
  const gain = req.body.gain;



  db.query(
    "INSERT INTO frigo (nom, quantite, quantite_fixe, prix_achat, prix_vente, quantite_vendu, gain) VALUES (?,?,?,?,?,?,?)",
    [nom, quantite, quantite_fixe, prix_achat, prix_vente, quantite_vendu, gain],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


app.put("/UpdateQuantities3/:id", (req, res) => {
  const id = req.params.id;
  const { quantite, quantite_vendu } = req.body;

  db.query(
    "UPDATE frigo SET quantite = ?, quantite_vendu = ? WHERE id = ?",
    [quantite, quantite_vendu, id],
    (err, result) => {
      if (err) {
        console.error("Error updating quantities:", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour des quantités" });
      } else {
        res.status(200).json({ message: "Mise à jour des quantités réussie" });
      }
    }
  );
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get("/table", (req, res) => {


  const sql = `SELECT * FROM frigo`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/produits2/:id", (req, res) => {
  const id = req.params.id;
 db.query("SELECT * FROM frigo WHERE id = ?",id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.delete("/delet/:id", (req, res) => {
  const id = req.params.id;
 db.query("DELETE FROM frigo WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.put("/Update2/:id", (req, res) => {
  const id = req.params.id;
  const { nom, quantite, quantite_fixe, prix_achat, prix_vente, gain} = req.body;
 db.query(
    "UPDATE frigo SET nom = ?, quantite = ?, quantite_fixe = ?, prix_achat = ?, prix_vente = ?, gain = ? WHERE id = ?",
    [nom, quantite, quantite_fixe, prix_achat, prix_vente, gain, id],
    (err, result) => {
      if (err) {
        console.error("Error updating produits:", err);
        
      } else {
       res.send(result);
      }
    }
  );
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/create1", (req, res) => {
  
  const nom = req.body.nom;
  const quantite = req.body.quantite;
  const prix_achat = req.body.prix_achat;
  const prix_vente = req.body.prix_vente;
  const quantite_vendu = req.body.quantite_vendu;
  const gain = req.body.gain;


  db.query(
    "INSERT INTO fruit_sec (nom, quantite, quantite_vendu, prix_achat, prix_vente, gain) VALUES (?,?,?,?,?,?)",
    [nom, quantite, quantite_vendu, prix_achat, prix_vente, gain],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/table-data1", (req, res) => {


  const sql = `SELECT * FROM fruit_sec`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.put("/Update1/:id", (req, res) => {
  const id = req.params.id;
  const { nom, quantite, quantite_vendu, prix_achat, prix_vente, gain} = req.body;
 db.query(
    "UPDATE fruit_sec SET nom = ?, quantite = ?, quantite_vendu = ?, prix_achat = ?, prix_vente = ?, gain = ? WHERE id = ?",
    [nom, quantite, quantite_vendu, prix_achat, prix_vente, gain, id],
    (err, result) => {
      if (err) {
        console.error("Error updating produits:", err);
        
      } else {
       res.send(result);
      }
    }
  );
});

app.put("/UpdateQuantities2/:id", (req, res) => {
  const id = req.params.id;
  const { quantite, quantite_vendu } = req.body;

  db.query(
    "UPDATE fruit_sec SET quantite = ?, quantite_vendu = ? WHERE id = ?",
    [quantite, quantite_vendu, id],
    (err, result) => {
      if (err) {
        console.error("Error updating quantities:", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour des quantités" });
      } else {
        res.status(200).json({ message: "Mise à jour des quantités réussie" });
      }
    }
  );
});


app.get("/produits1/:id", (req, res) => {
  const id = req.params.id;
 db.query("SELECT * FROM fruit_sec WHERE id = ?",id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete1/:id", (req, res) => {
  const id = req.params.id;
 db.query("DELETE FROM fruit_sec WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  
  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(401).json({ message: 'Email not found' });
      } else {
        const user = results[0];
        if (password === user.password) {
         
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Password is incorrect' });
        }
      }
    }
  );
});








app.listen(3012, () => {
  console.log("Yey, your server is running");
});