import './App.css';
import ChatPage from './components/ChatPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/user/Register';
import Login from './components/user/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ChatPage />
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
