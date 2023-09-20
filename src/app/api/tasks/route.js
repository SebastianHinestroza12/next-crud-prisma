import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const allTask = await prisma.task.findMany()
  return NextResponse.json(allTask)
}

export async function POST(request) {
  const { title, description } = await request.json()
  const createTask = await prisma.task.create({
    data: {
      title,
      description
    }
  })
  return NextResponse.json(createTask)
}