import BaseOfPages from "../../../components/BaseOfPages";
import ProductsList from "../../../components/products/ProductsList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Récupération des produits depuis le backend
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product/offers`);
        setProducts(response.data.products);

      } catch (error) {
        console.error(
          "Erreur lors de la récupération des produits :",
          error
        );
      }
    };
    fetchCategories();
  }, [refresh]);

  return (
    <BaseOfPages>
      {/* <ProductsList data = {products}/> */}
      {products && <ProductsList data = {products} rows={rows} setRows={setRows} refresh={refresh} setRefresh={setRefresh}/>}
    </BaseOfPages>
  );
};

export default Products;
