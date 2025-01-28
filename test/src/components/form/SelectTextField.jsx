import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const SelectTextField = ({ disabled = false, defaultValue = null, datas, setData = null, label = "null", size = "100%" }) => {
  const [value, setValue] = useState(""); // Initialisation de l'état local avec defaultValue

  useEffect(() => {
    if(defaultValue)
    setValue(defaultValue); // Si defaultValue change, mettre à jour la valeur sélectionnée
  }, [defaultValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue); 
    if (setData) {
      setData(newValue); 
    }
  };

  return (
    <Box sx={{ '& .MuiTextField-root': { m: 1, width: `${size}` } }} noValidate autoComplete="off">
      {datas  && (
        <TextField
          select
          label={label}
          value={value} 
          onChange={handleChange} 
          disabled={disabled}
          required
        >
          {datas.map((data, index) => (
            <MenuItem key={index} value={data.name || data}>
              {data.name || data}
            </MenuItem>
          ))}
        </TextField>
      )}
    </Box>
  );
};

export default SelectTextField;
