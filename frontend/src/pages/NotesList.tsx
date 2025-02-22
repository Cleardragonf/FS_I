import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Card, CardContent, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../api';
import CreateEditNote from './CreateEditNote'; 
import { Button } from '@mui/material';

type Note = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  // Fetch notes initially
  const fetchNotes = () => {
    axiosInstance.get('/notes')
      .then((response) => setNotes(response.data))
      .catch((error) => console.error('Error fetching notes:', error));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleOpenModal = (id?: string) => {
    if (id) {
      setSelectedNoteId(id);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNoteId(null); 
  };

  const refreshNotes = () => {
    fetchNotes(); 
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Notes</Typography>
          <IconButton color="inherit" onClick={() => handleOpenModal()}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} style={{ padding: 16 }}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card style={{ cursor: 'pointer' }} onClick={() => handleOpenModal(note.id)}>
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2">{note.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Create/Edit Note */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedNoteId ? 'Edit Note' : 'Create New Note'}</DialogTitle>
        <DialogContent>
          <CreateEditNote
            handleCloseModal={handleCloseModal}
            noteId={selectedNoteId} 
            refreshNotes={refreshNotes} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NotesList;
