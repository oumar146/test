import BaseOfPages from "../../components/BaseOfPages";
import React, { useEffect, useState } from "react";
import CategoriesList from "../../components/categories/CategoriesList";
import axios from "axios";
import config from "../../config";

const Catégories = () => {
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/category/get`);

        // Mettre à jour les catégories
        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [refresh]);
    
  return (
    <BaseOfPages>
      {categories && <CategoriesList data = {categories} rows={rows} setRows={setRows} refresh={refresh} setRefresh={setRefresh}/>}
      </BaseOfPages>
  );
};

export default Catégories;
