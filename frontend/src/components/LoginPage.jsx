import Navbar from "./Navbar";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const LoginPage = ({setIsLogged}) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
      try {
        const response = await fetch('https://blog-hj45.onrender.com/api/auth/login', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username:user,
            password:password
          })
        })

        const data = await response.json()
        
        if(response.ok){
          localStorage.setItem('token', data.token)
          setIsLogged(true)
          navigate('/admin')
        } else {
          alert(data.message || 'Erro no login')
        }
      } catch (error) {
        alert('Erro ao conectar com o servidor')
        console.error(error)
      }
    
  }


    
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="bg-stone-100 flex justify-center items-center flex-col h-full">
        <h1 className="text-4xl tracking-widest text-stone-400 mb-10">
          VN Blog
        </h1>
        <section className="min-w-xs bg-stone-200 p-6 rounded-xl shadow-md shadow-stone-600/20">
          <h2 className="text-center text-stone-600 tracking-widest">Login</h2>
          <form>
            <fieldset className="border-1 border-stone-400 rounded-md ">
              <legend className="ml-2 text-stone-600">Usuário</legend>
              <input
                type="text"
                name="user"
                id="user"
                className="text-left px-4 pb-2 text-stone-600 w-full"
                onChange={(e) => setUser(e.target.value)}
              />
            </fieldset>
            <fieldset className="border-1 border-stone-400 rounded-md ">
              <legend className="ml-2 text-stone-600">Senha</legend>
              <input
                type="password"
                name="password"
                id="password"
                className="text-left px-4 pb-2 text-stone-600 w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <button
              type="submit"
              className="bg-stone-400 px-2 py-2 rounded-lg w-full mt-4 cursor-pointer text-stone-50 shadow-md shadow-stone-600/20 hover:bg-stone-600 transition-colors"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
