import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NicknameForm from './components/NicknameForm';
import PresentationList from './components/PresentationList';
import PresentationView from './components/PresentationView';
import CreatePresentation from './components/CreatePresentation';
import './App.css';

function App() {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) setNickname(savedNickname);
  }, []);

  if (!nickname) {
    return <NicknameForm />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/presentations" />} />
        <Route path="/presentations" element={<PresentationList />} />
        <Route path="/presentation/:id" element={<PresentationView />} />
        <Route path="/create" element={<CreatePresentation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;