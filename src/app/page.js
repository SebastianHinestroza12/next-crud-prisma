import React, { Fragment } from "react"
import axios from "axios"
import { prisma } from "@/libs/prisma"

const loadTasks = async () => {
  return await prisma.task.findMany()
}

export default function HomePage() {
  const allTasks = loadTasks()
  return (
    <Fragment>
      <div>Initial</div>
    </Fragment>
  )
}
