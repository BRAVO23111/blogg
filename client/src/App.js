import "./App.css";
import Header from "./Components/Header";
import Post from "./Components/Post";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import IndexPage from "./Page/IndexPage";
import Login from "./Page/Login";
import Register from "./Page/Register";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
