import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import SelectTextField from "../form/SelectTextField";
import TextFields from "../form/TextFields";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload({ handleFileChange }) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      style={{ margin: "1vh", width: "100%" }}
    >
      Ajouter l'image
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
}

const AddProductForm = (props) => {
  // const product = data[0];
  const [categories, setCategories] = useState([]);
  const [gendersList, setGendersList] = useState([]);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product/genders`);
        setGendersList(response.data.genders);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenders();
  }, []); 

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
  });

  useEffect(() => {
    if(categories.length > 0 && gendersList.length > 0){
        props.setCategoryName(categories[0].name);
        props.setGender(gendersList[0])
    }
  }, [categories, props, gendersList])
  

  const handleFileChange = (e) => {
    props.setImage(e.target.files[0]);
  };

  return (
    <div>
      {categories ? (
        <div>
          <TextFields setData={props.setName} label="Nom" />
          <TextFields setData={props.setDescription} label="Description" />
          <TextFields type="number" setData={props.setPrice} label="Prix" />
            <SelectTextField
              datas={categories}
              setData={props.setCategoryName}
              label="Catégorie"
            />
        
          <SelectTextField
            datas={gendersList}
            setData={props.setGender}
            label="Genre"
          />
          <InputFileUpload handleFileChange={handleFileChange} />
        </div>
      ) : (
        <h5>Impossible de modifier</h5>
      )}
    </div>
  );
};

export default AddProductForm;
