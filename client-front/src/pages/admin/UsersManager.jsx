import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation.jsx'; // Assurez-vous que le chemin est correct


const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [editUser, setEditUser] = useState(null);
  const APIURL = import.meta.env.VITE_APP_API_URL;
  let token = localStorage.getItem('token');
  useEffect(() => {
    fetchUsers();
    token = localStorage.getItem('token');
    console.log("token: ", token);
  }, []);

  const fetchUsers = async () => {
    try {     
      console.log("fetchUsers token: ", token);
      const response = await fetch(`${APIURL}/api/v1/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Inclure le token dans l'en-tête Authorization
        }});
      const data = await response.json();
      if (data && data.data && data.data.users) {        
        setUsers(data.data.users);
      } else {
        console.error('Données d\'utilisateurs non trouvées dans la réponse');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditUser(prev => ({ ...prev, [name]: value }));
    } else {
      setNewUser(prev => ({ ...prev, [name]: value }));
    }
  };

  const addUser = async () => {
    try {      
      console.log("JSON.stringify(newUser):", JSON.stringify(newUser));
      const response = await fetch(`${APIURL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'
      },       
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        setNewUser({
          username: '',
          email: '',
          password: '',
          role: 'user'
        });
        fetchUsers();
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
  };

  const startEdit = (user) => {
    setEditUser(user);
  };

  const cancelEdit = () => {
    setEditUser(null);
  };

  const editUserSubmit = async () => {
    try {      
      console.log("editUser: ", JSON.stringify(editUser));
      const response = await fetch(`${APIURL}/api/v1/users/${editUser._id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${token}` 
        },
          body: JSON.stringify(editUser)
     });
      if (response.ok) {
        setEditUser(null);
        fetchUsers();
      }
    } catch (error) {
      console.error('Erreur lors de la modification de l\'utilisateur:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {     
      const response = await fetch(`${APIURL}/api/v1/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Inclure le token dans l'en-tête Authorization
        }
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  return (
    <div>
      <Navigation />
      <h2>Gestion des Utilisateurs</h2>

      {!editUser && (
        <div>
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            placeholder="Nom d'utilisateur"
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            placeholder="Mot de passe"
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
            <option value="author">Auteur</option>
          </select>
          <button onClick={addUser}>Ajouter</button>
        </div>
      )}

      {editUser && (
        <div>
          <input
            type="text"
            name="username"
            value={editUser.username}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Nom d'utilisateur"
          />
          <input
            type="email"
            name="email"
            value={editUser.email}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Email"
          />
          {/* Ne pas inclure le champ de mot de passe pour la modification */}
          <select
            name="role"
            value={editUser.role}
            onChange={(e) => handleInputChange(e, true)}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
            <option value="author">Auteur</option>
          </select>
          <button onClick={editUserSubmit}>Modifier</button>
          <button onClick={cancelEdit}>Annuler</button>
        </div>
      )}

      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.email} - {user.role}
            <button onClick={() => startEdit(user)}>Modifier</button>
            <button onClick={() => deleteUser(user._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UsersManager;
