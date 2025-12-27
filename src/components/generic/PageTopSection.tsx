"use client";
import React, { useState } from "react";
import { TodoAdd } from "../todo/AddTodo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTodo } from "@/context/TodoContext";

const PageTopSection = ({
  loadTodos,
  onChange,
  form,
}: {
  loadTodos: () => void;
  onChange: (name: string, value: string) => void;
  form: { category: string; priority: string };
}) => {
  const { showDone, setShowDone } = useTodo();

  const handleSwitchChange = (checked: boolean) => {
    setShowDone(checked);
  };

  return (
    <div className="flex justify-between items-center p-6 mb-4">
      <div className="flex items-center gap-4 flex-wrap">
        <Select
          name="category"
          onValueChange={(value) => onChange("category", value)}
          defaultValue={form.category}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="WORK">Work</SelectItem>
              <SelectItem value="STUDY">Study</SelectItem>
              <SelectItem value="ENTERTAINMENT">Entertainment</SelectItem>
              <SelectItem value="FAMILY">Family</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          name="priority"
          onValueChange={(value) => onChange("priority", value)}
          defaultValue={form.priority}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Switch
            id="done-mode"
            checked={showDone}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="done-mode">Hide Done Todos</Label>
        </div>
      </div>
      <TodoAdd loadTodos={loadTodos} />
    </div>
  );
};

export default PageTopSection;
