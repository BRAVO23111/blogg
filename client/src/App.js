import "./App.css";
import Header from "./Header";
import Post from "./Post";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./IndexPage";
import Login from "./Login";
import Register from "./Register";
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
