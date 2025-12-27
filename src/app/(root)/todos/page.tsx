"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAllTodos, TodosResponse } from "@/services/todo-endpoints";
import { authClient } from "@/lib/auth-client";
import BaseContainer from "@/components/global/BaseContainer";
import TodoList from "@/components/todo/TodoList";
import PageTopSection from "@/components/generic/PageTopSection";
import { useTodo } from "@/context/TodoContext";
import SkeletonList from "@/components/generic/SkeletonList";

export default function Page() {
  // const [todos, setTodos] = useState<TodosResponse | null>(null);
  const { todos, setTodos, showDone } = useTodo();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    category: "",
    priority: "",
  });
  async function loadTodos() {
    if (!session) {
      router.push("/");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllTodos(form.category, form.priority);
      setTodos(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load todos");
      if (err instanceof Error && err.message.includes("Unauthorized")) {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleFormChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    loadTodos();
  }, [router, form]);

  if (error)
    return (
      <BaseContainer>
        <p className="text-red-600 ">Error: {error}</p>
      </BaseContainer>
    );

  const formattedTodos = showDone
    ? todos.filter((item) => item.completed === false)
    : todos;

  return (
    <BaseContainer>
      <PageTopSection
        loadTodos={loadTodos}
        form={form}
        onChange={handleFormChange}
      />
      {loading && <SkeletonList />}
      {!loading && formattedTodos && (
        <TodoList todos={formattedTodos} loadTodos={loadTodos} />
      )}
    </BaseContainer>
  );
}
