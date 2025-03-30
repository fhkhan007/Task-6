import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PresentationList() {
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/presentations')
      .then(res => res.json())
      .then(data => setPresentations(data));
  }, []);

  return (
    <div className="presentation-list">
      <h2>Available Presentations</h2>
      <div className="list">
        {presentations.map(pres => (
          <Link to={`/presentation/${pres.id}`} key={pres.id}>
            <div className="presentation-card">
              <h3>{pres.title}</h3>
              <span>Join</span>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/create" className="create-btn">
        Create New Presentation
      </Link>
    </div>
  );
}