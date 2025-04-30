import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Stack, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

const AddRowModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    Name: '',
    TTC: 'N', 
    Status: 'Actif', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, TTC: e.target.checked ? 'Y' : 'N' });
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({ Name: '', TTC: 'N', Status: 'Actif' });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-row-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h3>Add new list</h3>
        <Stack spacing={2}>
          <TextField
            name="Name"
            label="Nom"
            value={formData.Name}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.TTC === 'Y'}
                onChange={handleCheckboxChange}
              />
            }
            label="TTC"
          />
          <Select
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Actif">Actif</MenuItem>
            <MenuItem value="Inactif">Inactif</MenuItem>
          </Select>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={onClose} variant="outlined" color="secondary">
            cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
            save
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddRowModal;
