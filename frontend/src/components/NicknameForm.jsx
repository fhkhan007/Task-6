import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NicknameForm() {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('nickname', nickname);
    navigate('/presentations');
  };

  return (
    <div className="nickname-form">
      <h2>Enter Your Nickname</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Your nickname"
          required
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}