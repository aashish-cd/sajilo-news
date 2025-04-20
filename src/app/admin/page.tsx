import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import AdminPage from "./admin-page";

const page = async () => {
  const user = await auth();
  // @ts-ignore
  if (user.sessionClaims?.metadata?.admin) return <AdminPage />;
  else
    return (
      <div>
        <h1>You are not authorized to view this page</h1>
        <SignOutButton />
      </div>
    );
};

export default page;
