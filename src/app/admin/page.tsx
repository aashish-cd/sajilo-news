import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import AdminPage from "./admin-page";

const page = async () => {
  const user = await currentUser();

  if (user?.publicMetadata.admin) return <AdminPage />;
  else
    return (
      <div>
        <h1>You are not authorized to view this page</h1>
        <SignOutButton />
      </div>
    );
};

export default page;
