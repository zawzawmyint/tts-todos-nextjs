"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { updateCompleted } from "@/services/todo-endpoints";
import { Todo } from "@/utils/types/definitations/definitations";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { useTransition } from "react";

export function TodoCheck({
  item,
  loadTodos,
}: {
  item: Todo;
  loadTodos: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCheckedChange = async () => {
    startTransition(async () => {
      try {
        const res = await updateCompleted(item.id, {
          ...item,
          completed: !item.completed,
        });
        console.log(res);
        loadTodos();
      } catch (error) {
        console.log("Update complete");
      }
    });
  };

  return (
    <div className="flex items-center space-x-2">
      {isPending ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <Checkbox
          id={"done" + item?.id}
          checked={item?.completed || false} // Ensure controlled component
          onCheckedChange={handleCheckedChange} // Use onCheckedChange
        />
      )}
    </div>
  );
}
