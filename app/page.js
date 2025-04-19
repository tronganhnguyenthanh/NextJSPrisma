"use client"
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
export default function Home(){
  const init_data = {projectName:"", projectLink:"", projectGithub:""}
  const [data, setData] = useState(init_data)
  const router = useRouter()
  const handleOnChange = (e) => {
    const newData = {...data}
    newData[e.target.name] = e.target.value
    setData(newData)
  }
  const handleAddNewProject = async() => {
   if(data.projectName === ""){
    toast.error("Please enter your project's name", {position:"top-center"})
    return
   }
   if(data.projectLink === ""){
    toast.error("Please enter your project's link", {position:"top-center"})
    return
   }
   if(data.projectGithub === ""){
    toast.error("Please enter your project's github", {position:"top-center"})
    return
   }else{
     let res = await fetch("/api/addNewProject", {
      method:"POST",
      headers:{
       "Content-Type":"application/json"
      },
      body:JSON.stringify({projectName:data.projectName, projectLink:data.projectLink, projectGithub:data.projectGithub})
    })
    let isSuccess = await res.json()
    toast.success(isSuccess.message, {position:"top-center"})
    setTimeout(() => {
     router.push("/projectList")
    },1000);
   }
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ToastContainer/>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Project's name</label>
            <input 
              className="shadow appearance-none border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text"
              name="projectName"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Project's link</label>
            <input 
              className="shadow appearance-none border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text"
              name="projectLink"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Project's Github</label>
            <input 
              className="shadow appearance-none border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text"
              name="projectGithub"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" type="button" onClick={handleAddNewProject}>
              Add new
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
