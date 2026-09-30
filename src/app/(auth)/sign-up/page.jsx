"use client";

import { signIn, signUp } from "../../../lib/auth-client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("data from the sign up form", data);

    const { data: resData, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    console.log("after sign up", resData, error);
  };

  const handleSignInWithGoogle = async () => {
    const resData = await signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7fb] px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}

        {/* Sign Up Card */}
        <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)] sm:p-8">
          {/* Header */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign up to get started with your account
            </p>
          </div>

          <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
            {/* Name */}
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }

                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium text-gray-700">
                Name
              </Label>

              <Input
                placeholder="Enter your name"
                className="h-11 rounded-xl border-gray-200 bg-gray-50 px-3.5 text-sm transition-all duration-200 focus-within:border-[#6b35e5] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6b35e5]/10"
              />

              <FieldError />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium text-gray-700">
                Email
              </Label>

              <Input
                placeholder="you@example.com"
                className="h-11 rounded-xl border-gray-200 bg-gray-50 px-3.5 text-sm transition-all duration-200 focus-within:border-[#6b35e5] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6b35e5]/10"
              />

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }

                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }

                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium text-gray-700">
                Password
              </Label>

              <Input
                placeholder="Create a password"
                className="h-11 rounded-xl border-gray-200 bg-gray-50 px-3.5 text-sm transition-all duration-200 focus-within:border-[#6b35e5] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6b35e5]/10"
              />

              <Description className="mt-1.5 text-[11px] text-gray-400">
                8+ characters, 1 uppercase letter and 1 number
              </Description>

              <FieldError />
            </TextField>

            {/* Submit */}
            <Button
              type="submit"
              className="mt-2 h-11 w-full rounded-xl bg-[#6b35e5] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(107,53,229,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5928c7] hover:shadow-[0_12px_25px_rgba(107,53,229,0.28)]"
            >
              Create account
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-[10px] font-medium text-gray-400">OR</span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Google */}
            <Button
              type="button"
              variant="secondary"
              onPress={handleSignInWithGoogle}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Continue with Google
            </Button>
          </Form>

          {/* Bottom */}
          <p className="mt-6 text-center text-xs text-gray-500">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-semibold text-[#6b35e5] transition hover:text-[#5124bd]"
            >
              Sign in
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-[11px] text-gray-400">
          By creating an account, you agree to our terms
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
