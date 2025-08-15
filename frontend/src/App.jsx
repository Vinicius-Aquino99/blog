import AdminPage from "./components/AdminPage";
import LoginPage from "./components/LoginPage";
import PublicPage from "./components/PublicPage";
import EditPost from "./components/EditPost"
import CreatePost from "./components/CreatePost";
import { BrowserRouter as Router, Routes, Route, Link } from 
'react-router-dom';
import { useState } from "react"
import PostContent from "./components/PostContent";

function App() {
  const [isLogged, setIsLogged] = useState(() => {
  return !!localStorage.getItem("token");
})


  return (
    <div className="bg-stone-100 h-screen">
      <Router>


        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage setIsLogged={setIsLogged}/>} />
          <Route path={`/post/:id`} element={isLogged && <PostContent />} />
          <Route path='/admin' element={isLogged &&  <AdminPage isLogged={isLogged} setIsLogged={setIsLogged}/>} />
          <Route path='/edit/:id' element={isLogged &&  <EditPost isLogged={isLogged} />} />
          <Route path='/create-post' element={isLogged && <CreatePost />} />
        </Routes>
      </Router>
    </div>
    
  )
}

export default App
