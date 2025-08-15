import postsModel from "../model/postsModel.js";

export const createPost = async (req, res) => {
  const { title, content, summary, summaryContent } = req.body;

  try {
    const newPost = await postsModel.create({ title, content, summary, summaryContent });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar post" });
  }
};

export const listPosts = async (req, res) => {
  try {
    const posts = await postsModel.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar posts" });
  }
};

export const updatePost = async (req, res) => {
  const { title, content, summary, summaryContent} = req.body;
  const { id } = req.params

  try {
    const updatedPost = await postsModel.findByIdAndUpdate(
      id,
      { title, content, summary, summaryContent },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar post" });
  }

};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await postsModel.findByIdAndDelete(id)

    if(!deletedPost){
      return res.status(404).json({ message: "Post não encontrado" })
    }

    return res.status(200).json(({ message: "Post deletado com sucesso"}))
  } catch (error) {
    console.error("Erro ao deletar post: ", error)
    return res.status(500).json({ message: "Erro ao deletar o post"})
  }
}

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postsModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar post" });
  }
};