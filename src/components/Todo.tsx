import { useCreateTodo } from "@/services/mutations/mutations";
import { useTodos, useTodosIds } from "@/services/queries/queries";
import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "@/types/Todo";
import { Box, MenuItem, TextField } from "@mui/material";
import Button from "./Button";

export default function Todos() {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const createTodoMutation = useCreateTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    alert("1");
    createTodoMutation.mutate(data);
  };

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New todo:</h4>
        <TextField label="title" {...register("title")} />
        <button type="submit">submit</button>
      </form>

      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id: {data?.id}</div>
            <span>
              <strong>Title:</strong> {data?.title}, <strong>Completed:</strong>{" "}
              {data?.completed}
            </span>
            <div>
              {/* <button
                onClick={() => handleMarkAsDoneSubmit(data)}
                disabled={data?.checked}
              >
                {data?.checked ? "Done" : "Mark as done"}
              </button>
              {data && data.id && (
                <button onClick={() => handleDeleteTodo(data.id!)}>
                  Delete
                </button>
              )} */}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
