import React, { Fragment } from "react"
import { prisma } from "@/libs/prisma"
import { CardTask } from "@/components/CardTask"

const loadTasks = async () => {
  return await prisma.task.findMany()
}

export default async function HomePage() {
  const allTasks = await loadTasks()
  return (
    <Fragment>
      <CardTask listTasks={allTasks} />
    </Fragment>
  )
}
