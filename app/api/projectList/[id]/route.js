"use server"
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
export async function GET(request, {params}){
  try{
    const prisma = new PrismaClient()
    const {id} = await params
    const projectDetail = await prisma.project.findUnique({where:{id}})
    return NextResponse.json({projects:projectDetail})   
  }catch(error){
    return NextResponse.json({error:error.message}, {status:400})
  }  
}
