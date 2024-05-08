import { useState, useEffect } from 'react'
import './App.css'

const backendURL = 'https://api-proyecto1-stw24.onrender.com/blogs'

const user = 'nel'
const pass = 'hola'

function App() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [postID, setPostID] = useState(1)
  const [user_in, setUser_in] = useState('')
  const [pass_in, setPass_in] = useState('')
  const [login, setLogin] = useState(false)
  const [toPost, setToPost] = useState({
    title: '',
    content: ''
  })
  const [create, setCreate] = useState(false)
  const [update, setUpdate] = useState(false)

  console.log(postID)

  async function getBlogs() {
      let lista_blogs = await fetch(backendURL + postID, {
          method: 'GET',
          cache: 'default',
          mode: 'cors'
      })

      let blogs_json = await lista_blogs.json()

      setBlogs(blogs_json)
      setLoading(false)
  }

  async function delBlog() {
    fetch(backendURL + postID, {
        method: 'DELETE',
        cache: 'default',
        mode: 'cors'
    })

    getBlogs()
  }

  async function postBlog() {
    fetch(backendURL, {
        method: 'POST',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toPost)
    })

    setCreate(false)
  }

  async function updateBlog() {
    fetch(backendURL + postID, {
        method: 'PUT',
        cache: 'default', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toPost)
    })

    setUpdate(false)
  }

  const increase = () => {
      setPostID(postID + 1)
  }

  const decrease = () => {
      if (postID > 1) {
          setPostID(postID - 1)
      }
  }

  const submitLogin = () => {
    if (user_in === user && pass_in === pass) {
        setLogin(true)
    } else {
        setLogin(false)
    }
  }

  useEffect(() => {
      getBlogs()
  }, [postID])

  console.log(blogs)

  if(loading) {
      return (
          <div classNameName="bg">
          <header className="blogHeader">
              <h1 className="blogTitle">La música de Spinneta</h1>    
              <a href="/admin">login</a>
          </header>

          <div className="blogCard">
              <img src="./assets/loading.gif" alt="loading" />
              <button className="nextButton" onClick={increase}>Siguiente &gt;</button>
              <h1 className="idIndicator">{postID}</h1>
              <button className="prevButton" onClick={decrease}>&lt; Anterior </button>
          </div>
      </div>
      )
  }

  if(window.location.pathname === '/admin') {

    //Admin: luego de que la autenticación funciona
    if(login) {

        if(create) {
            return (
                <div className="bg">
                    <header className="blogHeader">
                        <h1 className="blogTitle">Panel de Admin</h1>    
                        <a href="/">logout</a>
                    </header>
        
                    <div className="blogCard">

                        <form onSubmit={postBlog}>
                            <div className="field1">
                                <h3>Titulo: <input name="title" value={toPost.title} onChange={(e) => setToPost({...toPost, [e.target.name]: e.target.value})}></input></h3>
                            </div>
                            <div className="field3">
                                <h3>Contenido: <textArea name="content" value={toPost.content} onChange={(e) => setToPost({...toPost, [e.target.name]: e.target.value})}></textArea></h3>
                            </div>
                            <button className="submitButton" type='submit'>Submit</button>
                            <button className="cancelButton" onClick={() => setUpdate(false)}>Cancel</button>
                        </form>
                        
                    </div>
                </div>
            )
        }

        if(update) {
            return (
                <div className="bg">
                    <header className="blogHeader">
                        <h1 className="blogTitle">Panel de Admin</h1>    
                        <a href="/">logout</a>
                    </header>
        
                    <div className="blogCard">

                        <form onSubmit={updateBlog}>
                            <div className="field1">
                                <h3>Titulo: <input name="title" value={toPost.title} onChange={(e) => setToPost({...toPost, [e.target.name]: e.target.value})}></input></h3>
                            </div>
                            <div className="field3">
                                <h3>Contenido: <textArea name="content" value={toPost.content} onChange={(e) => setToPost({...toPost, [e.target.name]: e.target.value})}></textArea></h3>
                            </div>
                            <button className="submitButton" type='submit'>Submit</button>
                            <button className="cancelButton" onClick={() => setUpdate(false)}>Cancel</button>
                        </form>
                        
                    </div>
                </div>
            )
        }

        return (
            <div className="bg">
                <header className="blogHeader">
                    <h1 className="blogTitle">La música de Spinneta</h1>    
                    <a href="/">logout</a>
                </header>
      
                <div className="blogCard">
                    {blogs.map((blog, index) => {
                        return (
                            <div>
                                <h2>{blog.title}</h2>
                                <p>{blog.content}</p>
                            </div>
                        )
                    })}    
                    <button className="nextButton" onClick={increase}>Siguiente &gt;</button>
                    <h1 className="idIndicator">{postID}</h1>
                    <button className="prevButton" onClick={decrease}>&lt; Anterior </button>
                    <button className="delButton" onClick={delBlog}>Eliminar</button>
                    <button className="updateButton" onClick={() => setUpdate(true)}>Actualizar</button>
                    <button className="createButton" onClick={() => setCreate(true)}>Crear</button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg">
            <header className="blogHeader">
                <h1 className="blogTitle">Panel de Admin</h1>    
                <a href="/">logout</a>
            </header>
  
            <div className="blogCard">

                <form onSubmit={submitLogin}>
                    <div className="field1">
                        <h3>Usuario: <input id="user_in" value={user_in} onChange={(e) => setUser_in(e.target.value)}></input></h3>
                    </div>
                    <div className="field2">
                        <h3>Contraseña: <input id="pass_in" type="password" onChange={(e) => setPass_in(e.target.value)}></input></h3>
                    </div>
                    <button className="submitButton" type='submit'>Submit</button>
                </form>
                
            </div>
        </div>
    )
  }

  return (
      <div className="bg">
          <header className="blogHeader">
              <h1 className="blogTitle">La música de Spinneta</h1>    
              <a href="/admin">login</a>
          </header>

          <div className="blogCard">
              {blogs.map((blog, index) => {
                  return (
                      <div>
                          <h2>{blog.title}</h2>
                          <p>{blog.content}</p>
                      </div>
                  )
              })}    
              <button className="nextButton" onClick={increase}>Siguiente &gt;</button>
              <h1 className="idIndicator">{postID}</h1>
              <button className="prevButton" onClick={decrease}>&lt; Anterior </button>
          </div>
      </div>
  )
}

export default App
