import Comments from '@/components/comments'
import FormComment from '@/components/FormComment'
import prisma from '@/lib/db'
 import { FC } from 'react'
import React from 'react'

interface BlogDetailPageProps {
  params:{
    id:string
  }
}

const BlogContent: FC<BlogDetailPageProps>  = async({params}) => {
  const posts = await prisma.post.findFirst({
    where:{
      id:params.id
    },
    include:{
      author:true
    }
  })
  console.log(posts)
  return (
    <div className='max-w-4xl mx-auto py-8' > 
    <h1 className='font-bold text-3xl' > {posts?.title} </h1>
    <p>  {posts?.author?.username} </p>
    <div className='mt-4'> {posts?.content} </div>
    <Comments postId={params.id} />
    <FormComment postId={params.id} />
    </div>
  )
}

export default BlogContent