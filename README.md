# rpc-reactjs-eval

Une application web moderne de gestion de tâches construite avec React et Express, utilisant JSON-RPC pour la communication client-serveur.

## 🚀 Fonctionnalités

- 👤 Authentification utilisateur
- 📋 Création et gestion de tâches
- 🔍 Recherche de tâches
- 📱 Interface responsive
- 🎨 Design moderne avec Tailwind CSS
- 🔄 Mise à jour en temps réel du statut des tâches
- 🔗 API JSON-RPC pour la communication client-serveur

## 🛠️ Technologies Utilisées

### Frontend
- React.js
- Tailwind CSS
- Lucide Icons
- Vite

### Backend
- Express.js
- JSON-RPC 2.0
- Node.js


## 📦 Installation

installer les packages

```sh
cd ./frontend
npm i

cd .. #revenir à la racine

cd ./app
npm i
```

lancer l'API
```sh
cd ./app
npm start dev
```

## 🔌 API Endpoints

L'API utilise JSON-RPC 2.0. Tous les appels sont effectués vers `/api`.

### Méthodes disponibles

#### User
- `user.create` - Créer un utilisateur
- `user.get` - Obtenir les détails d'un utilisateur
- `user.update` - Mettre à jour un utilisateur
- `user.delete` - Supprimer un utilisateur

#### Task
- `task.create` - Créer une tâche
- `task.get` - Obtenir une tâche
- `task.update` - Mettre à jour une tâche
- `task.delete` - Supprimer une tâche

### Exemple d'appel JSON-RPC

```json
{
  "jsonrpc": "2.0",
  "method": "task.create",
  "params": {
    "title": "Nouvelle tâche",
    "description": "Description de la tâche",
    "status": "TODO"
  },
  "id": 1
}
```

## 👥 Auteurs

- Vovard Mathéo (matheo.vovard@efrei.net)