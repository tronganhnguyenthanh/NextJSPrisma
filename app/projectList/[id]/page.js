"use client"
import Link from "next/link"
import {use, useEffect, useState} from "react"
export default function ProjectDetail({params}){
  const {id} = use(params)
  const [projectDetail, setProjectDetail] = useState({})
  useEffect(() => {
   showProjectDetail()
  },[id])
  const showProjectDetail = async () => {
    const res = await fetch(`/api/projectList/${id}`)
    const project = await res.json()
    setProjectDetail(project.projects)
  }
  return (
    <div className="p-2">
      <Link href="/projectList">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left cursor-pointer" viewBox="0 0 16 16">
           <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
        </svg>
      </Link>
      <iframe src={projectDetail.projectLink} className="w-full min-h-screen custom-iframe-css"></iframe>
    </div>
  )
}