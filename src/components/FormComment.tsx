"use client"
import React, { ChangeEvent, useState } from 'react'

const FormComment = () => {
  const[comment,setComment] = useState<string>('')
  const handleCommentChange = (e:ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value)
  }
  const handleSubmitComment = () => {
    console.log(comment)
  }
  return (
    <div>
      <div className='mt-4' >
             <label htmlFor='comment' className='block text-gray'>Add comment</label>
            <input
            value={comment}
            onChange={handleCommentChange}
             type="text"
             className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline:none focus:border-blue-300 focus:ring '
            name='comment'
            />
            <button  onClick={handleSubmitComment} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4  rounded-md focus:outline:none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400 ' > Submit Comment </button>
      </div>

    </div>
  )
}

export default FormComment