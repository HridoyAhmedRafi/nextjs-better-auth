"use client";

import { signIn } from "../../../lib/auth-client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import Link from "next/link";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { data: resData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
    });
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

        {/* Form Card */}
        <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)] sm:p-8">
          {/* Heading */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue to your account
            </p>
          </div>

          <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
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
                className="h-11 rounded-xl border-gray-200 bg-gray-50 px-3.5 text-sm transition-all focus-within:border-[#6b35e5] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6b35e5]/10"
              />

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              isRequired
              minLength={8}
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
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">
                  Password
                </Label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#6b35e5] transition hover:text-[#5124bd]"
                >
                  Forgot password?
                </Link>
              </div>

              <InputGroup className="h-11 rounded-xl border-gray-200 bg-gray-50 transition-all focus-within:border-[#6b35e5] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6b35e5]/10">
                <InputGroup.Input
                  name="password"
                  placeholder="Enter your password"
                  type={isVisible ? "text" : "password"}
                  className="px-3.5 text-sm"
                />

                <InputGroup.Suffix className="pe-1.5">
                  <Button
                    isIconOnly
                    type="button"
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible(!isVisible)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>

              <Description className="mt-1.5 text-[11px] text-gray-400">
                8+ characters, 1 uppercase letter and 1 number
              </Description>

              <FieldError />
            </TextField>

            {/* Sign In */}
            <Button
              type="submit"
              className="mt-2 h-11 w-full rounded-xl bg-[#6b35e5] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(107,53,229,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#5928c7] hover:shadow-[0_12px_25px_rgba(107,53,229,0.28)]"
            >
              Sign in
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
            Don not have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#6b35e5] transition hover:text-[#5124bd]"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-[11px] text-gray-400">
          Secure authentication · Your data stays private
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
