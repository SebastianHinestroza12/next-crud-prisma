'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export const CardTask = ({ listTasks }) => {

  const router = useRouter()

  return (
    <div className="container mx-auto mt-20">
      <h1 className="bg-slate-700 p-7 mb-6 flex justify-center items-center font-bold text-3xl">Task Application</h1>
      <div className="grid grid-cols-3 gap-3">
        {
          listTasks.map(task => {
            return (
              <div className="bg-slate-900 p-3 hover:bg-stone-900 cursor-pointer" key={task.id} onClick={() => {
                router.push(`/tasks/edit/${task.id}`)
              }} >
                <h3 className="font-bold text-2xl">{task.title}</h3>
                <p>{task.description}</p>
                <p>{new Date(task.created_at).toLocaleDateString()}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

