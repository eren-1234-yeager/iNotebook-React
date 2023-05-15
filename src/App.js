import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NotesState from './contexts/notes/NotesStates';

function App() {
  return (
    <>
    <NotesState>
      <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
      </BrowserRouter>
    </NotesState>

    </>
  );
}

export default App;
