import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TodoForm from "./TodoForm";
import { Todo } from "@/utils/types/definitations/definitations";

const TodoEdit = ({
  item,
  loadTodos,
}: {
  item: Todo;
  loadTodos: () => void;
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="w-full">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
          </DialogHeader>
          <TodoForm
            isEdit
            item={{
              id: item.id,
              type: item.category,
              priority: item.priority,
              title: item.title,
              description: item.description,
              done: item.completed,
            }}
            loadTodos={loadTodos}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoEdit;
