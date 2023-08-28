import React, { useEffect, useState } from 'react'
import Post from '../Components/Post'

const IndexPage = () => {
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/post").then(response=>{
      response.json().then((posts)=>{
        setPosts(posts);
        console.log(posts)
      })
    })
  },[])
  return (
    <>
      {posts.map((post, index) => (
      <Post
        key={index}
        title={post.title}
        summary={post.summary}
        content={post.content}
        cover={post.cover}
      />
    ))}
    </>
  )
}
// return (
//   <div>
//     {posts.map((post, index) => (
//       <Post
//         key={index}
//         title={post.title}
//         summary={post.summary}
//         content={post.content}
//       />
//     ))}
//   </div>
// );

export default IndexPage
