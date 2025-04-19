"use server"
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
export async function POST(request){
  try{
   const prisma = new PrismaClient()
   const {projectName, projectLink, projectGithub} = await request.json()
   await prisma.project.create({data:{projectName:projectName, projectLink:projectLink, projectGithub:projectGithub}}) 
   return NextResponse.json({message:"Project's website added successfully"}, {status:200})   
  }catch(error){
    return NextResponse.json({error:error.message}, {status:400})
  }  
}