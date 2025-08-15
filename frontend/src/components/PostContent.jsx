import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const PostContent = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        const data = await response.json();

        setPost(data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar post", err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="p-8 text-stone-500">Carregando post...</p>;
  if (!post) return <p className="p-8 text-stone-500">Post não encontrado</p>;

  const dataFormatada = new Date(post.createdAt).toLocaleDateString('pt-BR')

  return (
    <div className="bg-stone-100">
      <Navbar />
      <div className="flex flex-col p-8 gap-4 mx-auto">
        <h1 className="text-4xl font-bold text-stone-800">{post.title}</h1>
        <span className="text-sm text-stone-400">{dataFormatada}</span>

        <h2 className="text-2xl mt-6 text-stone-600">{post.summary}</h2>
        <p className="text-stone-700">{post.summaryContent}</p>

        <h2 className="mt-6 text-stone-600">{post.content}</h2>
        </div>
      </div>
  );
};

export default PostContent;
