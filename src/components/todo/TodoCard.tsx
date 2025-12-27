import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Todo } from "@/utils/types/definitations/definitations";
import { TodoPopover } from "./TodoPopover";
import { TodoCheck } from "./TodoCheck";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react"; // Modern icon set

export function TodoCard({
  item,
  loadTodos,
}: {
  item: Todo;
  loadTodos: () => void;
}) {
  const { data: session } = authClient.useSession();
  const isOwner = session && session.user.id === item.userId;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-500 hover:shadow-md hover:translate-1 hover:border-l-8  border-l-4",
        {
          "opacity-60 grayscale-[0.5]": item?.completed,
          "border-l-blue-500": item.priority === "MEDIUM",
          "border-l-red-500": item.priority === "HIGH",
          "border-l-slate-200":
            item.priority !== "MEDIUM" && item.priority !== "HIGH",
        }
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-3 items-start">
            {isOwner && (
              <div className="mt-1">
                <TodoCheck item={item} loadTodos={loadTodos} />
              </div>
            )}
            <div>
              <CardTitle
                className={cn(
                  "text-lg font-semibold tracking-tight transition-all duration-500",
                  {
                    "line-through text-muted-foreground": item?.completed,
                  }
                )}
              >
                {item?.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  {new Date(item?.createdAt).toLocaleDateString()}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {item.user.name}
                </span>
              </div>
            </div>
          </div>
          {isOwner && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <TodoPopover item={item} loadTodos={loadTodos} />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p
          className={cn("text-sm leading-relaxed text-muted-foreground", {
            "line-through": item?.completed,
          })}
        >
          {item.description}
        </p>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between border-t bg-muted/30 py-2 px-6">
        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
          {item?.category}
        </span>
        <Badge
          variant={item.priority === "HIGH" ? "destructive" : "secondary"}
          className={cn("text-[10px] uppercase font-bold", {
            "animate-pulse": item.priority === "HIGH" && !item.completed,
          })}
        >
          {item?.priority}
        </Badge>
      </CardFooter>
    </Card>
  );
}
