import React from 'react'
import ReactQuill from 'react-quill'

const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  }; 

  const format = [
    'header', 'italic' ,'underline','strike','bullet','indent'
  ]

const Editor = ({value , onchange}) => {
  return (
    <ReactQuill value={value}
          theme={'snow'}
          onChange={onchange}
          modules={modules}
          formats={format}/>
  )
}

export default Editor
