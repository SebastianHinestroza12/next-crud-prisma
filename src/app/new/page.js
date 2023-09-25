'use client'
import React, { Fragment, useLayoutEffect, useState } from "react"
import { useToast } from "@/hooks"
import axios from 'axios'
import { useRouter } from "next/navigation"


export default function CratedTask({ params }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { Toast } = useToast()
  useLayoutEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title)
          setDescription(data.description)
        })
    }
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault()
    if (params.id) {
      await axios.put(`/api/tasks/${params.id}`, {
        title,
        description
      })
    }
    else {
      await axios.post('/api/tasks', {
        title,
        description
      })
    }

    Toast.fire({
      icon: params.id ? 'info' : 'success',
      title: `Task ${params.id ? 'Edited' : 'Created'} Successfully`
    })

    setTimeout(() => {
      router.refresh()
      router.push('/')
    }, 3300)
  }

  const handleDelete = async () => {
    await axios.delete(`/api/tasks/${params.id}`)
    Toast.fire({
      icon: 'info',
      title: `Task Delete Successfully`
    })

    setTimeout(() => {
      router.refresh()
      router.push('/')
    }, 3300)
  }

  return (
    <Fragment>
      <div className="h-screen flex justify-center items-center">
        <form className="bg-slate-800 p-10 w-1/3" onSubmit={handleSubmit}>
          <label className="font-bold text-sm" htmlFor="title">Title Task</label>
          <input id="title" placeholder="Title" className="border border-gray-400 p-2 mb-4 w-full text-black" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
          <label className="font-bold text-sm" htmlFor="Description">Description Task</label>
          <textarea id="description" placeholder="Description" className="border border-gray-400 p-2 mb-4 w-full text-black" rows={3} onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-yellow-50 font-bold py-2 px-4 rounded">{!params.id ? 'Task Created' : 'Task Edit'}</button>
            {
              params.id && (
                <button onClick={handleDelete} type="button" className="bg-red-500 hover:bg-red-700 text-yellow-50 font-bold py-2 px-4 rounded">Delete</button>
              )
            }
          </div>
        </form>
      </div>
    </Fragment>
  )
}
