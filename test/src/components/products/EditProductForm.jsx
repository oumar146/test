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
      Remplacer l'image
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
}

const EditProductForm = (props) => {

  const handleFileChange = (e) => {
    props.setImage(e.target.files[0]);
  };

  return (
    <div>
      {props.categories.length > 0 && props.genders.length > 0 && props.data ? (
        <div>
          <TextFields
            defaultValue={props.data.product_name}
            setData={props.setName}
            label="Nom"
          />
          <TextFields
            defaultValue={props.data.description}
            setData={props.setDescription}
            label="Description"
          />
          <TextFields
            type="number"
            defaultValue={props.data.price}
            setData={props.setPrice}
            label="Prix"
          />
          <SelectTextField
            defaultValue={props.data.category_name}
            datas={props.categories}
            setData={props.setCategoryName}
            label="Catégorie"
          />
          <SelectTextField
            defaultValue={props.data.gender_name} 
            datas={props.genders}
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

export default EditProductForm;

