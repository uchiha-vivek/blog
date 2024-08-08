import Comments from '@/components/comments'
import FormComment from '@/components/FormComment'
 
import React from 'react'

const BlogContent = () => {
  return (
    <div className='max-w-4xl mx-auto py-8' > 
    <h1 className='font-bold text-3xl' >Post 1</h1>
    <p>  Written by : john doe </p>
    <div className='mt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam corporis, dolorum veniam vel enim alias voluptatum ea debitis cum recusandae est non ipsum fuga ipsam. Hic nihil est quod ut!</div>
    <Comments/>
    <FormComment/>
    </div>
  )
}

export default BlogContent