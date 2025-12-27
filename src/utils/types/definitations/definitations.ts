export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Todo {
  userId: string;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  category: "WORK" | "STUDY" | "ENTERTAINMENT" | "FAMILY";
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface User {
  name: string;
  id: string;
}
