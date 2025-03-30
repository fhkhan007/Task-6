import { useState } from 'react';
import Draggable from 'react-draggable';

export default function Slide({ content, isEditable, onUpdate }) {
  const [text, setText] = useState(content || '');

  const handleTextChange = (e) => {
    setText(e.target.value);
    onUpdate(e.target.value);
  };

  return (
    <div className="slide">
      {isEditable ? (
        <Draggable>
          <textarea
            value={text}
            onChange={handleTextChange}
            className="editable-text"
            placeholder="Type your content here..."
          />
        </Draggable>
      ) : (
        <div className="slide-content">{text}</div>
      )}
    </div>
  );
}