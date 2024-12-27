import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all todos
export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

// POST: Create a new todo
export async function POST(req) {
  const { title, description } = await req.json();
  const newTask = await prisma.task.create({ data: { title, description } });

  return NextResponse.json(newTask);
}

// Dynamic routes like /api/todos/[id] would go in `/api/todos/[id]/route.ts`.