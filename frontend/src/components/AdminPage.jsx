import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import Navbar from "./Navbar";
import Post from "./Post";

const AdminPage = ({ isLogged }) => {
  const [posts, setPosts] = useState([])

  const handleDeletePost = (deletedId) => {
  setPosts(prev => prev.filter(post => post._id !== deletedId));
};

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
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
        <h1 className="text-4xl text-stone-600 tracking-widest">Admin Page</h1>
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
