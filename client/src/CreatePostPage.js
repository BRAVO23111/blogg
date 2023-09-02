
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';
import Editor from './Components/Editor';


const CreatePostPage = () => {
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent] =useState('')
    const [files,setFiles] = useState('')
    const[redirect,setRedirect] =useState(false);
    async function createpost(e){
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
        e.preventDefault();
         const response = await fetch("http://localhost:4000/post",{
            method:'POST',
            body:data,
            credentials:'include',
        })
        if(response.ok){
          setRedirect(true)
        }
    }
    if(redirect){
      return <Navigate to={'/'}/>
    }
  return (
    <form className='createpost' onSubmit={createpost}>
        <h2>Create Post</h2>
      <input type="title" placeholder={'Title'} value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <input type="summary" placeholder={'Summary'} value={summary} onChange={(e)=>setSummary(e.target.value)} />
      <input type ="file" onChange={e=>setFiles(e.target.files)}/>
      <Editor value={content} onchange={setContent}/>
      <button>Create</button>
    </form>
  )
}

export default CreatePostPage
