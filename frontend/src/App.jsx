import { Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";

import AdminPage from "./components/AdminPage";
import LoginPage from "./components/LoginPage";
import PublicPage from "./components/PublicPage";
import EditPost from "./components/EditPost";
import CreatePost from "./components/CreatePost";
import PostContent from "./components/PostContent";
import PrivateRoute from "./components/PrivateRoute"; // importar

function App() {
  const [isLogged, setIsLogged] = useState(() => {
    return !!localStorage.getItem("token");
  });

  return (
    <div className="bg-stone-100 h-screen">
    
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage setIsLogged={setIsLogged} />} />

          <Route
            path="/post/:id"
            element={
              <PrivateRoute isLogged={isLogged}>
                <PostContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute isLogged={isLogged}>
                <AdminPage isLogged={isLogged} setIsLogged={setIsLogged} />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute isLogged={isLogged}>
                <EditPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <PrivateRoute isLogged={isLogged}>
                <CreatePost />
              </PrivateRoute>
            }
          />
        </Routes>
      
    </div>
  );
}

export default App;
