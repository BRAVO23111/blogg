import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Editor from '../Components/Editor'



const EditPostPage = () => {

const {postid} = useParams();
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent] =useState('')
    const [files,setFiles] = useState('')
    const[redirect,setRedirect] =useState(false);

    useEffect(()=>{
        fetch('http://localhost:4000/post/'+postid).then(res=>{
            res.json().then(postInfo=>{
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
        })
    },[])

    async function updatePost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',postid)
        if(files?.[0]){
            data.set('file',files?.[0]);
        }
        await fetch('http://localhost:4000/post',{
            method:'PUT',
            body:data,
            credentials:'include',
        })
        setRedirect(true)
    }
    if(redirect){
        return <Navigate to={'/post'+postid}/>
      }
  return (
   
        <form className='createpost' onSubmit={updatePost}>
            <h2>Update Post</h2>
          <input type="title" placeholder={'Title'} value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <input type="summary" placeholder={'Summary'} value={summary} onChange={(e)=>setSummary(e.target.value)} />
          <input type ="file" onChange={e=>setFiles(e.target.files)}/>
          <Editor onchange={setContent} value={content}/>
          <button>Update</button>
        </form>
  )
}

export default EditPostPage
