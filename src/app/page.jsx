'use client';

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// (async () => {
//   try {
//     console.log(await prisma.widget.create({ data: { } }));
//   } catch (err) {
//     console.error("error executing query:", err);
//   } finally {
//     prisma.$disconnect();
//   }
// })();

import { useEffect, useState } from "react";
import Link from "next/link";

const Home = () => {

  const [todos, setTodos] = useState([]);
  const [todoBeingEdited, setTodoBeingEdited] = useState(null);

  // const fetchTodos = async () => {
  //   try {
  //     const todos = await getTodos();
  //     setTodos(todos);
  //     console.log(todos);
  //   } catch (error) {
  //     console.error("Error fetching todos", error);
  //   }
  // }

  // useEffect(() => {
  //   connectDb();
  //   fetchTodos();

  //   return () => {
  //     disconnectDb();
  //   }
  // }, []);

  const getDateNow = () => {
    return Date.now();
  }

  const createTodo = () => {
    const data = {
      id: todos.length + 1,
      title: `Learn Prisma ${getDateNow()}`,
      // desrcription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec pur',
      // completed: false,
    }

    setTodos([...todos, data]);

    // try {
    //   await addTodo(data);
    // } catch (error) {
    //   console.error("Error adding todo", error);
    // }
    
    // fetchTodos();
  }

  const editTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setTodoBeingEdited(todo);
  }

  const saveTodo = () => {
    const newTitle = document.getElementById(todoBeingEdited.id).value;

    const newTodos = todos.map(todo => {
      if (todo.id === todoBeingEdited.id) {
        return {
          ...todo,
          title: newTitle,
        }
      }

      return todo;
    })

    setTodos(newTodos);
    setTodoBeingEdited(null);
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div>
      <inpput type="text" placeholder="Enter a todo" />
      <button onClick={createTodo}>Add Todo</button>

      <br />
      <br />

      <h1 className="">Todos</h1>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id} className="list-item bg-sky-600">
            { todoBeingEdited?.id === todo.id ? (
              <>
                <input id={todo.id} type="text" defaultValue={todo.title} />
                {/* <textarea type="text" defaultValue={todo.desrcription} />
                <input type="checkbox" defaultChecked={todo.completed} /> */}
                <button onClick={saveTodo}>Save</button>
              </>
            ) : (
              <>
                <div>{todo.title}</div>
                {/* <p>{todo.desription}</p>
                <div>{todo.completed ? 'Yes' : 'No'}</div> */}
                <button onClick={() => editTodo(todo.id)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
export default Home