import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Post from "./Post"

const PublicPage = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/posts')
                const data = await response.json()
                setPosts(data)
            } catch(err) {
                console.error("Erro ao pegar posts", err)
            }
        }

        fetchPosts()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="p-8 flex flex-col gap-8">
                <h1 className="text-4xl text-stone-600 tracking-widest">VN Blog</h1>
                <div id='posts' className="flex flex-col gap-4">
                    {posts.map((post) => (
                        <Post 
                            key={post.id}
                            id={post._id}
                            title={post.title}
                            summary={post.summary}
                            createdAt={post.createdAt}
                        />
                    ))}
                </div>
            </div>
        </div>
  )
}

export default PublicPage
