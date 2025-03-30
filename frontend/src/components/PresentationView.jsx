import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Slide from './Slide';

export default function PresentationView() {
  const { id } = useParams();
  const [slideContent, setSlideContent] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    
    // Join presentation room
    newSocket.emit('join_presentation', { presentationId: id });
    
    // Listen for updates
    newSocket.on('slide_updated', (data) => {
      setSlideContent(data.content);
    });

    return () => newSocket.disconnect();
  }, [id]);

  const handleSlideUpdate = (content) => {
    setSlideContent(content);
    socket.emit('update_slide', {
      presentationId: id,
      content: content
    });
  };

  return (
    <div className="presentation-view">
      <Slide 
        content={slideContent} 
        isEditable={isCreator} 
        onUpdate={handleSlideUpdate} 
      />
    </div>
  );
}