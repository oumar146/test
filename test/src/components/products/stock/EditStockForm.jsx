import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config";
import TextFields from "../../form/TextFields";

const EditStockForm = (props) => {
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product/sizes`);
        setSizes(response.data.sizes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSizes();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/category/get`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []); // Ajout du tableau vide pour exécuter l'effet une seule fois

  return (
    <div>
      {categories && sizes && props.data ? (
        <div>
          <TextFields
            defaultValue={props.data.product_name}
            setData={props.setName}
            label="Nom"
            disabled
          />
          <TextFields
            type="number"
            defaultValue={props.data.price}
            setData={props.setPrice}
            label="Prix"
            disabled
          />
          <TextFields
            type="number"
            defaultValue={props.data.size}
            setData={props.setSizes}
            label="Taille"
            disabled
          />
          <TextFields
            type="number"
            defaultValue={props.data.quantity}
            setData={props.setQuantity}
            label="Quantité"
          />
        </div>
      ) : (
        <h5>Impossible de modifier</h5>
      )}
    </div>
  );
};

export default EditStockForm;
