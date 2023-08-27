import React from 'react';
const Post = ({title,summary,content,cover}) => {
  return (
    <div className="entries">
    <div className="image">
      <img src={"http://localhost:4000"+cover}></img>
    </div>
    <div>
    <h2>{title}</h2>
    <div className="text">
         {summary}
    </div>

    </div>
  </div>
  )
}

export default Post
