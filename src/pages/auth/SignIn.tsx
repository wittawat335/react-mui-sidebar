import { useLogin } from "@/services/mutations/authMutation";
import React from "react";

export default function SignIn() {
  const { mutateAsync: login, isPending } = useLogin();
  return (
    <div>
      {" "}
      <h1 className="">Hello world!</h1>
    </div>
  );
}
