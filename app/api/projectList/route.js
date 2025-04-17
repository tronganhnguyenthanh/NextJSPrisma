"use server"
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
export async function GET(){
  try{
    const prisma = new PrismaClient()
    const projectList = await prisma.project.findMany()
    return NextResponse.json({projects:projectList})   
  }catch(error){
    return NextResponse.json({error:error.message}, {status:400})
  }  
}