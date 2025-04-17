"use server"
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
export async function POST(request){
  try{
    const prisma = new PrismaClient()
    const {id} = await request.json()
    await prisma.project.delete({where:{id}})
    return NextResponse.json({message:"Project deleted successfully"}, {status:200})   
  }catch(error){
    return NextResponse.json({error:error.message}, {status:400})
  }  
}
