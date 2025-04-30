import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Button, Icon, IconButton } from '@mui/material';

export default function AlertDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton className="button" aria-label="Supprimer" color="error" onClick={handleClickOpen}><Icon>delete</Icon></IconButton>
            
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Address Suppression </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Voulez-vous vraiment supprimer l'adresse ? </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary"> Oui </Button>
          <Button variant="contained"  onClick={handleClose} color="primary" autoFocus> Non </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
