import React from "react";

const BaseContainer = ({ children }: { children: React.ReactNode }) => {
  return <main className="max-w-6xl p-6 mx-auto">{children}</main>;
};

export default BaseContainer;
