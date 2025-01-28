import BaseOfPages from "../../components/BaseOfPages";
import ClientsList from "../../components/clients/ClientsList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

const Clients = () => {

  const [users, setUsers] = useState([]);

  // Récupération des clients depuis le backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/user/all`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    };
    fetchCategories();
  }, []);
    
  return (
    <BaseOfPages>
      <ClientsList users = {users} /> 
    </BaseOfPages>
  );
};

export default Clients;
