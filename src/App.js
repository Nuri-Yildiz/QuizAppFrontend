import './App.css';
import LoginPage from './app/pages/LoginPage';
import SignUpPage from './app/pages/SignUpPage';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <h1>Quiz App</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/login">Giriş yapmak için tıklayınız</Link> |{" "}
      </nav>
    </div>
  );
}


export default App;
