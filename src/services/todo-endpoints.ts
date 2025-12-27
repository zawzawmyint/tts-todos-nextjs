import { API_BASE_URL } from "@/config/config";
import { ApiResponse, Todo } from "@/utils/types/definitations/definitations";

export type TodosResponse = ApiResponse<Todo[]>;
export type TodoResponse = ApiResponse<Todo>;

export async function fetchAllTodos(
  category: string,
  priority: string
): Promise<TodosResponse> {
  const endpoint = `/api/todos?category=${category}&priority=${priority}`;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to fetch Todos: ${response.status} ${response.statusText}. Details: ${errorData}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching Todos:", error);
    throw new Error("Error feching Todos"); // This will activate the closest `error.js` Error Boundary
  }
}

export async function addTodo(todo: {
  title: string;
  description: string;
  priority: string;
  category: string;
}): Promise<TodoResponse> {
  const endpoint = "/api/todos";
  console.log(endpoint);
  console.log("add todo", todo);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Add this header
    },
    body: JSON.stringify({
      ...todo,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Failed to add todo: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}
export async function updateTodo(
  id: string,
  todo: {
    title: string;
    description: string;
    priority: string;
    category: string;
  }
): Promise<TodoResponse> {
  const endpoint = `/api/todos/${id}`;
  console.log("update todo", todo);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: "include",
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Add this header
    },
    body: JSON.stringify({
      ...todo,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Failed to update todo: ${response.statusText}`
    );
  }

  const data = await response.json();

  return data;
}

export async function updateCompleted(
  id: string,
  todo: Todo
): Promise<TodoResponse> {
  const endpoint = `/api/todos/${id}`;
  console.log("update todo", todo);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: "include",
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Add this header
    },
    body: JSON.stringify({
      ...todo,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Failed to update todo: ${response.statusText}`
    );
  }

  const data = await response.json();

  return data;
}
export async function deleteTodo(id: string): Promise<TodoResponse> {
  const endpoint = `/api/todos/${id}`;
  console.log("delete todo", id);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: "include",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Add this header
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Failed to delete todo: ${response.statusText}`
    );
  }

  const data = await response.json();

  return data;
}
