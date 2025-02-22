import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api';

type Note = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const history = useNavigate();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    axiosInstance.get(`/notes/${id}`)
      .then((response) => setNote(response.data))
      .catch((error) => console.error('Error fetching note:', error));
  }, [id]);

  const deleteNote = () => {
    if (note) {
      axiosInstance.delete(`/notes/${id}`)
        .then(() => {
          alert('Note deleted');
          history('/');
        })
        .catch((error) => console.error('Error deleting note:', error));
    }
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <p>Created: {note.createdAt}</p>
      <p>Updated: {note.updatedAt}</p>
      <button onClick={() => history(`/edit/${note.id}`)}>Edit Note</button>
      <button onClick={deleteNote}>Delete Note</button>
    </div>
  );
};

export default NoteDetail;
