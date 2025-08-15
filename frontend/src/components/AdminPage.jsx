import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Post from "./Post";
import {FaPlus, FaPowerOff} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";


const AdminPage = ({ isLogged, setIsLogged }) => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  const handleDeletePost = (deletedId) => {
  setPosts(prev => prev.filter(post => post._id !== deletedId));
};

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
    navigate('/login')
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://blog-hj45.onrender.com/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Erro ao pegar posts", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-stone-100">
      <Navbar />
      <div className="p-8 flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-4xl text-stone-600 tracking-widest">Admin Page</h1>
          <div className="flex gap-6">
            <FaPlus className="self-center text-stone-600 text-xl mr-4 cursor-pointer hover:text-stone-400"
            onClick={() => navigate('/create-post')}/>
            <FaPowerOff className="self-center text-stone-600 text-xl hover:text-stone-400 cursor-pointer "
            onClick={handleLogout}/>
          </div>
        </div>
        <div id="posts" className="flex flex-col gap-4 mt-8">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post._id}
              title={post.title}
              summary={post.summary}
              createdAt={post.createdAt}
              isLogged={isLogged}
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
