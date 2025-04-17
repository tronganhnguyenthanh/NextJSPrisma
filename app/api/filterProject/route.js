"use server"
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
export async function GET(request){
  try{
    const prisma = new PrismaClient()
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")
    const filterProject = await prisma.project.findMany({where:{id}})
    return NextResponse.json({projects:filterProject})   
  }catch(error){
    return NextResponse.json({error:error.message}, {status:400})
  }  
}