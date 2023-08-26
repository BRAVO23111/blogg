import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const CreatePostPage = () => {
  return (
    <form className='createpost'>
        <h2>Create Post</h2>
      <input type="title" placeholder={'Title'} />
      <input type="summary" placeholder={'Summary'} />
      <input type ="file"/>
      <ReactQuill/>
      <button>Create</button>
    </form>
  )
}

export default CreatePostPage
