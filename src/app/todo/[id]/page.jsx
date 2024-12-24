const Todo = ({ params }) => {

  const id = params.id;

  return (
    <div>
      <h1>Todo {id}</h1>
    </div>
  );
}
export default Todo;