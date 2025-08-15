import { useNavigate } from "react-router-dom";

const Post = ({ id, title, summary, createdAt, isLogged, onDelete }) => {
  const date = new Date(createdAt).toLocaleDateString("pt-BR");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  const handleEdit = () => navigate(`/edit/${id}`);

const handleDelete = async () => {
  if (window.confirm("Tem certeza que deseja deletar este post?")) {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao deletar o post");
      }

      onDelete(id);
      window.alert("Post excluído com sucesso");
    } catch (error) {
      console.error("Erro ao deletar post:", error);
      window.alert("Erro ao excluir o post.");
    }
  }
};


  return (
    <div
      onClick={handleClick}
      className="hover:bg-stone-200 hover:rounded-2xl px-4 py-4 transition-all cursor-pointer"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className="text-lg font-semibold text-stone-600">{title}</span>

          {isLogged && (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
                title="Editar"
              >
                ✏️
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                title="Deletar"
              >
                🗑️
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-end">
          <span className="text-sm text-stone-600 w-[75%]">{summary}</span>
          <span className="text-sm text-stone-400">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
