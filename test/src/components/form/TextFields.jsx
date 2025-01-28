import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const TextFields = ({required=false, disabled = false, type = 'text', defaultValue, setData = null, size = "100%", label = null }) => {
  const handleInputChange = (e) => {
    let value = e.target.value;

    // Si le type est numérique, on limite à deux chiffres après la virgule
    if (type === 'number') {
      value = parseFloat(value).toFixed(2); // Formate à 2 décimales
    }

    if (setData) {
      setData(value); // Met à jour la valeur
    }
  };

  return (
    <Box
      sx={{ '& .MuiTextField-root': { m: 1, width: `${size}` } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        disabled={disabled}
        label={label}
        type={type}
        id="outlined-size-normal"
        defaultValue={defaultValue}
        onChange={handleInputChange}
        required
      />
    </Box>
  );
};

export default TextFields;
