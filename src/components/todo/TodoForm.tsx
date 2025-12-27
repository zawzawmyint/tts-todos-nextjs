"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { addTodo, updateTodo } from "@/services/todo-endpoints";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  id: z.string().optional(),
  type: z.enum(
    ["WORK", "STUDY", "ENTERTAINMENT", "FAMILY"],
    "You need to select a category."
  ),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  priority: z.enum(
    ["LOW", "MEDIUM", "HIGH"],
    "You need to select a priority type."
  ),
  done: z.boolean().optional(),
});

export interface TodoFormProps {
  isEdit?: boolean;
  item?: {
    id?: string;
    type: "WORK" | "STUDY" | "ENTERTAINMENT" | "FAMILY";
    title: string;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    done?: boolean;
  };
  loadTodos: () => void;
  setOpenDialog?: (v: boolean) => void;
}

const TodoForm = ({
  isEdit = false,
  item,
  loadTodos,
  setOpenDialog,
}: TodoFormProps) => {
  const [isPending, startTransition] = useTransition();
  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: item?.id || undefined,
      type: item?.type || "WORK",
      title: item?.title || "",
      description: item?.description || "",
      priority: item?.priority || "MEDIUM",
      done: item?.done || false,
    },
    // Trigger validation on change
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, description, priority } = values;
    startTransition(async () => {
      try {
        if (isEdit) {
          const res = await updateTodo(item?.id as string, {
            title,
            description,
            category: values.type,
            priority,
          });
          toast("Todo: Updated", {
            description: `Todo updated successfully to ${values.type} for ${values.title}  `,
          });
          console.log(res);
        } else {
          const res = await addTodo({
            title,
            description,
            category: values.type,
            priority,
          });
          toast("Todo: Added", {
            description: `Todo added successfully to ${values.type} for ${values.title} `,
          });
          console.log(res);
        }
        setOpenDialog?.(false);
        loadTodos();
      } catch (error) {
        console.log("error processing todo todo");
      }
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="WORK">work</SelectItem>
                    <SelectItem value="STUDY">study</SelectItem>
                    <SelectItem value="ENTERTAINMENT">entertainment</SelectItem>
                    <SelectItem value="FAMILY">family</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Choose Priority</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex gap-3 flex-wrap">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="LOW" />
                        </FormControl>
                        <FormLabel className="font-normal">Low</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="MEDIUM" />
                        </FormControl>
                        <FormLabel className="font-normal">Medium</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="HIGH" />
                        </FormControl>
                        <FormLabel className="font-normal">High</FormLabel>
                      </FormItem>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Close</Button>
            </DialogClose>
            <Button type="submit">
              {isPending ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default TodoForm;
