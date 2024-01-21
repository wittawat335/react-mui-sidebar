import { useLogin } from "@/services/mutations/authMutation";
import React from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const { mutateAsync: login, isPending } = useLogin();
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div>
      {" "}
      <h1 className="">Hello world!</h1>
    </div>
  );
}
