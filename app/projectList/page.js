"use client"
import {Modal, ModalBody, ModalFooter, ModalHeader, Select, Spinner} from "flowbite-react"
import Link from "next/link"
import {useEffect, useState} from "react"
import {toast, ToastContainer} from "react-toastify"
export default function ProjectList() {
  const [projectList, setProjectList] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [id, setId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
   getProjectList()
  },[])
  const getProjectList = async () => {
    setIsLoading(false)
    const res = await fetch("/api/projectList")
    const projectList = await res.json()
    const projects = projectList.projects
    setProjectList(projects)
    setIsLoading(true)
  }
  const deleteProjectById = async () => {
    if(id === ""){
     toast.error("Please enter the id that you want to remove", {position:"top-center"})
     return
    }else{
      let res = await fetch("/api/deleteProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
      })
      let isSuccess = await res.json()
      toast.success(isSuccess.message, {position:"top-center"})
      setOpenModal(false)
      getProjectList()
    }
  }
  const filterProjectById = async (e) => {
   if(e.target.value === "all"){
    getProjectList()
   }else{
     const id = e.target.value
     const filterIdAPI = await fetch(`/api/filterProject?id=${id}`)
     const filterId = await filterIdAPI.json()
     const searchProjects = await filterId.projects
     setProjectList(searchProjects)
    }
  }
  return (
    <>
      {
        !isLoading ?
          <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
              <Spinner color="pink" size="lg"/>
            </div>
          </div>
          :
          <div className="p-2">
            <ToastContainer />
            <Link href="/" className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left cursor-pointer" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
              </svg>
            </Link>
            <Select onChange={filterProjectById}>
              <option value="all">All</option>
              {projectList.length > 0 && projectList.map((i) => {
                return (
                  <option key={i.id} value={i.id} className="cursor-pointer">{i.projectName}</option>
                )
              })
              }
            </Select>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 p-2 cursor-pointer">
              {projectList.length > 0 && projectList.map((i) => {
                return (
                  <div key={i.id}>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                      <Link href={`/projectList/${i.id}`}>
                        <h1 className="text-center text-xl text-purple-400">{i.projectName}</h1>
                      </Link>
                      <button className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer w-full" type="button" onClick={() => setOpenModal(true)}>
                        Delete
                      </button>
                    </div>
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                      <ModalHeader>
                        <p className="p-2 text-center text-xl text-red-500">Delete a project's with confirm id</p>
                      </ModalHeader>
                      <ModalBody className="border-gray-300">
                        <input
                          type="text"
                          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setId(e.target.value)}
                        />
                      </ModalBody>
                      <ModalFooter className="flex justify-end">
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer" onClick={deleteProjectById}>Yes</button>
                        <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer" onClick={() => setOpenModal(false)}>No</button>
                      </ModalFooter>
                    </Modal>
                  </div>
                )
              })
              }
            </div>
          </div>
      }
    </>
  )
}