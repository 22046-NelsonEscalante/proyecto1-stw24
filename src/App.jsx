import { useState, useEffect } from 'react'
import './App.css'

const backendURL = 'http://127.0.0.1:3300/blogs/'

const user = 'nel'
const pass = 'hola'

function App() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [postID, setPostID] = useState(1)
  const [user_in, setUser_in] = useState('')
  const [pass_in, setPass_in] = useState('')

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

  const increase = () => {
      setPostID(postID + 1)
  }

  const decrease = () => {
      if (postID > 1) {
          setPostID(postID - 1)
      }
  }

  const submitLogin = () => {
    set
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

    if(user_in === user && pass_in === pass) {
        return (
            <div className="bg">
                <header className="blogHeader">
                    <h1 className="blogTitle">La música de Spinneta</h1>    
                    <a href="/admin">logout</a>
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
