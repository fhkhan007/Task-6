import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePresentation() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/presentations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, nickname })
    });
    const data = await response.json();
    navigate(`/presentation/${data.id}`);
  };

  return (
    <div className="create-presentation">
      <h2>Create New Presentation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Presentation title"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}