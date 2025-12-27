"use client";

import { Todo } from "@/utils/types/definitations/definitations";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TodoContextType {
  todos: Todo[];
  setTodos: (data: Todo[]) => void;
  showDone: boolean;
  setShowDone: (val: boolean) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showDone, setShowDone] = useState(false);

  const value = {
    todos,
    setTodos,
    setShowDone,
    showDone,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
