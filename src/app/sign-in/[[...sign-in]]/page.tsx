import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <SignIn />
    </div>
  );
};

export default page;
