import AdminPage from "./components/AdminPage";
import LoginPage from "./components/LoginPage";
import PublicPage from "./components/PublicPage";
import { BrowserRouter as Router, Routes, Route, Link } from 
'react-router-dom';
import { useState } from "react"
import PostContent from "./components/PostContent";

function App() {
  const [isLogged, setIsLogged] = useState(true)


  return (
    <div className="bg-stone-100 h-screen">
      <Router>


        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path={`/post/:id`} element={<PostContent />} />
          <Route path="/login" element={<LoginPage setIsLogged={setIsLogged}/>} />
          <Route path='/admin' element={ <AdminPage isLogged={isLogged}/>} />
        </Routes>
      </Router>
    </div>
    
  )
}

export default App
