"use client";

import { FloppyDisk } from "@gravity-ui/icons";

import {
  Button,
  Description,
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
    <div className="flex items-center justify-center min-h-screen">
      <Toast.Provider placement="top end" />

      <div className="border border-[#83838358] px-8 py-14 rounded-2xl">
        <Form className="w-full max-w-96" onSubmit={handleUpdateUserProfile}>
          <Fieldset>
            <Fieldset.Legend>Profile Settings</Fieldset.Legend>

            <Description>Update your profile information.</Description>

            <FieldGroup>
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
                <Label>Name</Label>
                <Input placeholder="Your name" />
                <FieldError />
              </TextField>
            </FieldGroup>

            <Fieldset.Actions>
              <Button type="submit">
                <FloppyDisk />
                Save changes
              </Button>

              <Button type="reset" variant="secondary">
                Cancel
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </div>
    </div>
  );
}
