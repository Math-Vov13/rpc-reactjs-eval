import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Exemple de route GET
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Exemple de route POST
app.post('/api/echo', (req, res) => {
  const data = req.body;
  res.json({ received: data });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
