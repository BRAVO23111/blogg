import React from 'react';
import { Link } from 'react-router-dom';
const Post = ({postid,title,summary,content,cover}) => {
  return (
    <div className="entries">
    <div className="image">
    <Link to={`/post/${postid}`}>
    <img src={'http://localhost:4000/' + cover} alt="" />
    </Link>
    </div>
    <div>
    <div className='title'>
    <Link>
    <h2>{title}</h2>
    </Link>
    </div>
   
    <div className="text">
         {summary}
    </div>

    </div>
  </div>
  )
}


export default Post
