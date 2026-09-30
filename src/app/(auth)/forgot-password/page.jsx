"use client";

import { requestPasswordReset } from "../../../lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";

export default function ForgotPasswordPage() {
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const resForgotData = await requestPasswordReset({
      email: data.email,
      redirectTo: "/reset-password",
    });
    toast.success("An email sent to your email");
    console.log("after request for reset data", resForgotData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-96 border border-[#83838358] px-8 py-15 rounded-2xl ">
        <Form
          className="flex w-full flex-col gap-4"
          onSubmit={handleForgotPassword}
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9.\_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <div className="flex flex-row justify-center gap-2">
            <Button type="submit">
              <Check />
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
