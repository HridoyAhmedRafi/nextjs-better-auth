"use client";

import { FloppyDisk } from "@gravity-ui/icons";

import {
  Button,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  Toast,
  toast,
} from "@heroui/react";

import { updateUser } from "../../../lib/auth-client";

export default function Basic() {
  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const resData = await updateUser({
      name: userData.name,
    });

    console.log(resData);

    if (!resData.error) {
      toast.success("Profile updated successfully", {
        description: "Your profile information has been updated.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7fb] px-4 py-8">
      <Toast.Provider placement="top end" />

      <div className="w-full max-w-md">
        {/* Logo */}

        {/* Card */}
        <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)] sm:p-8">
          {/* Header */}
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b35e5]">
              Account settings
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
              Personal information
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Keep your profile information up to date.
            </p>
          </div>

          {/* Form */}
          <Form className="w-full" onSubmit={handleUpdateUserProfile}>
            <Fieldset className="w-full">
              <FieldGroup className="gap-4">
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
                    Full name
                  </Label>

                  <Input
                    placeholder="e.g. Hridoy Ahmed Rafi"
                    className="h-11 rounded-xl border-gray-200 bg-gray-50 px-3.5 text-sm transition-all duration-200 focus-within:border-[#6b35e5] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6b35e5]/10"
                  />

                  <FieldError />
                </TextField>
              </FieldGroup>

              <Fieldset.Actions className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="reset"
                  variant="secondary"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-[#6b35e5] px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(107,53,229,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5928c7] hover:shadow-[0_12px_25px_rgba(107,53,229,0.28)] sm:w-auto"
                >
                  <FloppyDisk />
                  Save changes
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-[11px] text-gray-400">
          Your profile information is securely stored
        </p>
      </div>
    </div>
  );
}
