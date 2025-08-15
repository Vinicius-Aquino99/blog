import { useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import Navbar from "./Navbar";

const EditPost = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [summaryContent, setSummaryContent] = useState('')
  const [content, setContent] = useState('')

 useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://blog-hj45.onrender.com/api/posts/${id}`);
        const post = await res.json();

        setTitle(post.title);
        setSummary(post.summary);
        setSummaryContent(post.summaryContent || "");
        setContent(post.content);
      } catch (error) {
        console.error("Erro ao buscar o post:", error);
      }
    };

    fetchPost();
  }, [id]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://blog-hj45.onrender.com/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          summary,
          summaryContent,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erro ao atualizar o post");
        return;
      }

      alert("Post atualizado com sucesso!");
      navigate("/admin");
    } catch (error) {
      console.error("Erro ao enviar atualização:", error);
      alert("Erro ao atualizar o post.");
    }
  };

  return (
    <div className="bg-stone-100 h-screen w-screen">
      <Navbar />
      <div className="flex flex-col justify-start py-10 items-center h-[calc(100%-40px)] ">
        <h1 className="text-4xl text-stone-600 tracking-widest">
          Editar Post{" "}
        </h1>
        <form className="mt-10 min-w-md flex flex-col"
        onSubmit={handleSubmit}>
          <fieldset className="border-1 border-stone-400 rounded-md ">
            <legend className="mx-auto text-stone-600">Título do post</legend>
            <input
              type="text"
              name="title"
              id="title"
              className="text-left px-4 pb-2 text-stone-600 w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
          </fieldset>

          <fieldset className="border-1 border-stone-400 rounded-md ">
            <legend className="mx-auto text-stone-600">Resumo</legend>
            <input
              type="text"
              name="summary"
              id="summary"
              className="text-left px-4 pb-2 text-stone-600 w-full"
              onChange={(e) => setSummary(e.target.value)}
            />
          </fieldset>

          <fieldset className="border-1 border-stone-400 rounded-md ">
            <legend className="mx-auto text-stone-600">Conteúdo do Resumo</legend>
            <input
              type="text"
              name="summaryContent"
              id="summaryContent"
              className="text-left px-4 pb-2 text-stone-600 w-full"
              onChange={(e) => setSummaryContent(e.target.value)}
            />
          </fieldset>

          <fieldset className="border-1 border-stone-400 rounded-md ">
            <legend className="mx-auto text-stone-600">Conteúdo do Post</legend>
            <textarea
              type="text"
              name="content"
              id="content"
              className="w-full min-h-30 p-4 "
              onChange={(e) => setContent(e.target.value)}
            />
          </fieldset>

          <button
            type="submit"
            className="bg-stone-400 px-2 py-2 rounded-lg w-full mt-4 cursor-pointer text-stone-50 shadow-md shadow-stone-600/20 hover:bg-stone-600 transition-colors"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
