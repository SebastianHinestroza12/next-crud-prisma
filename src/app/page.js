import React, { Fragment } from "react"
import { prisma } from "@/libs/prisma"
import { CardTask } from "@/components/CardTask"
import Link from 'next/link'

const loadTasks = async () => {
  return await prisma.task.findMany()
}

export default async function HomePage() {
  const allTasks = await loadTasks()
  return (
    <Fragment>
      <div className=" p-4 flex justify-between items-start">
        <CardTask listTasks={allTasks} />
        <Link href={'/new'}>
          <button className="bg-orange-700  hover:bg-orange-500 text-white px-4 py-2 rounded">Create Task</button>
        </Link>
      </div>
    </Fragment>
  )
}
