import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import HomePage from './components/HomePage';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/homepage" element={<HomePage/>}/>
      </Routes>
    </Router>

    </>
  );
}

export default App;
