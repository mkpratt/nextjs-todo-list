import prisma from '@/lib/prisma';

export const getTodos = async () => {
  return await prisma.todo.findMany();
}

export const createTodo = async (data) => {
  return await prisma.todo.create({ data });
}

export const updateTodo = async (id, data) => {
  return await prisma.todo.update({ where: { id }, data });
};

export const deleteTodo = async (id) => {
  return await prisma.todo.delete({ where: { id } })
};