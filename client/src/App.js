import "./App.css";
import Header from "./Components/Header";
import Post from "./Components/Post";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import IndexPage from "./Page/IndexPage";
import Login from "./Page/Login";
import Register from "./Page/Register";
import { UserContextProvider } from "./Usercontext";
import CreatePostPage from "./CreatePostPage";
import Postpage from "./Page/Postpage";
import EditPostPage from "./Page/EditPostPage";
function App() {
  return (
    <UserContextProvider>
       <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/post/:postid" element={<Postpage/>}/>
        <Route path="/edit/:postid" element={<EditPostPage/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
