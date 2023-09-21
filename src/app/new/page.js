'use client'
import React, { Fragment } from "react"
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from "next/navigation"

export default function CratedTask() {

  const router = useRouter()

  const handleCreateTask = async (e) => {
    e.preventDefault()
    await axios.post('/api/tasks', {
      title: e.target.title.value,
      description: e.target.description.value
    })

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Tasks Created Successfully'
    })

    setTimeout(() => {
      router.push('/')
    }, 3300)
  }

  return (
    <Fragment>
      <div className="h-screen flex justify-center items-center">
        <form className="bg-slate-800 p-10 w-1/3" onSubmit={handleCreateTask}>
          <label className="font-bold text-sm" htmlFor="title">Title Task</label>
          <input id="title" placeholder="Title" className="border border-gray-400 p-2 mb-4 w-full text-black" type="text" />
          <label className="font-bold text-sm" htmlFor="Description">Description Task</label>
          <textarea id="description" placeholder="Description" className="border border-gray-400 p-2 mb-4 w-full text-black" rows={3}></textarea>
          <button className="bg-blue-500 hover:bg-blue-700 text-yellow-50 font-bold py-2 px-4 rounded">Create</button>
        </form>
      </div>
    </Fragment>
  )
}
