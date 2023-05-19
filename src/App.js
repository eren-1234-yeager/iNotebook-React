import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
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
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
      </BrowserRouter>
    </NotesState>

    </>
  );
}

export default App;
