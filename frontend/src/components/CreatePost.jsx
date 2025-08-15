import React from "react";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const CreatePost = () => {
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [summaryContent, setSummaryContent] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/posts/`, {
        method: "POST",
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
        alert(data.message || "Erro ao criar o post");
        return;
      }

      alert("Post criado com sucesso!");
      navigate("/admin");
    } catch (error) {
      console.error("Erro ao enviar post:", error);
      alert("Erro ao enviar o post.");
    }
  };

  return (
    <div className="bg-stone-100 h-screen w-screen">
      <Navbar />
      <div className="flex flex-col justify-start py-10 items-center h-[calc(100%-40px)] ">
        <h1 className="text-4xl text-stone-600 tracking-widest">
          Criar Post{" "}
        </h1>
        <form className="mt-10 min-w-md flex flex-col" onSubmit={handleSubmit}>
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
            <legend className="mx-auto text-stone-600">
              Conteúdo do Resumo
            </legend>
            <input
              type="text"
              name="summaryContent"
              id="summaryContent"
              className="text-left px-4 pb-2 text-stone-600 w-full"
              onChange={(e) => setSummaryContent(e.target.value)}
            />
          </fieldset>

          <fieldset className="border-1 border-stone-400 rounded-md ">
            <legend className="mx-auto text-stone-600">
              Conteúdo do Post
            </legend>
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

export default CreatePost;
