import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req:Request){
     const user = await getCurrentUser()

     try{
        if(!user?.email){
            return NextResponse.json({message:'Not Authenticated'},{status:401})
        }
        // if user is logged in
        const{title,content} = await req.json()
        
        const newPost = await prisma.post.create({
            data:{
                 title,content,authorEmail:user.email
            }
        })
        return NextResponse.json({newPost},{status:200})
     }catch(error){
        return NextResponse.json({message:'Something went wrong'},{status:500})
     }
}
