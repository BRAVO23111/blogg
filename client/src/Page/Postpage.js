import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Postpage = () => {
    const [postInfo , setPostInfo] =useState(null)
    // console.log(param);
    const {postid} = useParams();
    useEffect(()=>{
      console.log(postid);
        fetch(`http://localhost:4000/post/${postid}`).then(res=>{
            res.json().then(postInfo=>{
                setPostInfo(postInfo)
            })
        })
    }
    ,[])

    if(!postInfo) return '';

  return (
    <div className='post_page'>
      <div className='image'>
      <img src={`http://localhost:4000/${postInfo.cover}`} alt=""/>
      </div>
      <div>
        <Link to={`/edit/${postInfo._id}`}>Edit Page</Link>
      </div>
      <h1>{postInfo.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  )
}

export default Postpage
