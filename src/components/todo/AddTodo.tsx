import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import TodoForm from "./TodoForm";
import { useState } from "react";
// import TodoForm from "../form/TodoForm";

export function TodoAdd({ loadTodos }: { loadTodos: () => void }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"} className="rounded-full">
          <PlusCircle size={100} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add</DialogTitle>
        </DialogHeader>
        <TodoForm loadTodos={loadTodos} setOpenDialog={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
