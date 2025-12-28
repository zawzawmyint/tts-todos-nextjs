"use client";
import Link from "next/link";
import { AvatarProfile } from "../generic/Profile";
import { useTodo } from "@/context/TodoContext";

const Header = () => {
  const { todos } = useTodo();
  return (
    <div className="sticky top-0 left-0 z-40 bg-background/5 backdrop-blur-xl">
      <nav className="max-w-6xl mx-auto p-3 flex flex-wrap justify-between items-center  ">
        <Link href={"/"}>
          <p className="font-semibold text-xl text-primary">
            TODOS {todos.length !== 0 && ` - ${todos.length}`}
          </p>
        </Link>
        <AvatarProfile />
      </nav>
    </div>
  );
};

export default Header;
