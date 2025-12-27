import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisIcon } from "lucide-react";
// import TodoEdit from "./edit/TodoEdit";
// import TodoDelete from "./delete/TodoDelete";
import { Todo } from "@/utils/types/definitations/definitations";
import TodoEdit from "./EditTodo";
import TodoDelete from "./DeleteTodo";

export function TodoPopover({
  item,
  loadTodos,
}: {
  item: Todo;
  loadTodos: () => void;
}) {
  if (!item?.id) {
    return null; // or some fallback UI
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <EllipsisIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32">
        <TodoEdit item={item} loadTodos={loadTodos} />
        <TodoDelete id={item.id} loadTodos={loadTodos} />
      </PopoverContent>
    </Popover>
  );
}
