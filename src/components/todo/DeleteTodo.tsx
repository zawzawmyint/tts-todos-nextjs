"use client";
import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/services/todo-endpoints";
import React, { useTransition } from "react";

const TodoDelete = ({
  id,
  loadTodos,
}: {
  id: string;
  loadTodos: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const res = await deleteTodo(id);
        console.log(res);
        loadTodos();
      } catch (error) {
        console.log("delete complete");
      }
    });
  };

  return (
    <Button
      variant={"ghost"}
      disabled={isPending}
      className="w-full"
      onClick={handleDelete}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default TodoDelete;
