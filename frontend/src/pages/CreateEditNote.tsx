import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api';
import { TextField, Button, Box } from '@mui/material';

type CreateEditNoteProps = {
  handleCloseModal: () => void;  // Prop to close the modal
  noteId: string | null;  // The selected note ID for editing
  refreshNotes: () => void; // Callback to refresh the list of notes after deletion
};

const CreateEditNote = ({ handleCloseModal, noteId, refreshNotes }: CreateEditNoteProps) => {
  const { id } = useParams<{ id: string }>();
  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (noteId) {
      setIsEdit(true);
      axiosInstance.get(`/notes/${noteId}`)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
        })
        .catch((error) => console.error('Error fetching note for edit:', error));
    }
  }, [noteId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const noteData = { title, description };

    const request = isEdit
      ? axiosInstance.put(`/notes/${noteId}`, noteData)
      : axiosInstance.post('/notes', noteData);

    request
      .then(() => {
        handleCloseModal(); // Close modal after saving
        refreshNotes(); // Refresh notes in the parent component
        history('/'); // Redirect to home or list page
      })
      .catch((error) => console.error('Error saving note:', error));
  };

  const handleDelete = () => {
    if (noteId && window.confirm('Are you sure you want to delete this note?')) {
      axiosInstance.delete(`/notes/${noteId}`)
        .then(() => {
          handleCloseModal(); // Close modal after deletion
          refreshNotes(); // Refresh notes list in the parent component
          history('/'); // Redirect after deletion
        })
        .catch((error) => console.error('Error deleting note:', error));
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit Note' : 'Create New Note'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Add some spacing between Title and Description */}
        <Box my={2}>
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Box>

        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </form>

      {/* Show Delete button only when editing an existing note */}
      {isEdit && (
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleDelete}
          style={{ marginTop: 8 }}
        >
          Delete Note
        </Button>
      )}
    </div>
  );
};

export default CreateEditNote;
