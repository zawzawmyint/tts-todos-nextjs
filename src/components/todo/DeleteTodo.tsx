"use client";
import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/services/todo-endpoints";
import React, { useTransition } from "react";
import { toast } from "sonner";

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
        toast.success("Todo deleted successfully");
        loadTodos();
      } catch (error) {
        console.log("delete complete");
        toast.error("Todo delete Failed");
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
