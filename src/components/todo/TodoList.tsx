import { TodoCard } from "./TodoCard";
import { Todo } from "@/utils/types/definitations/definitations";

const TodoList = ({
  todos,
  loadTodos,
}: {
  todos: Todo[];
  loadTodos: () => void;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {todos.map((item) => (
        <TodoCard key={item.id} item={item} loadTodos={loadTodos} />
      ))}
      {!todos.length && (
        <div className="text-lg font-medium text-destructive">
          {"No todo found. ;("}
        </div>
      )}
    </div>
  );
};

export default TodoList;
