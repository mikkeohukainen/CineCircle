import { Button, TextInput } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import React from "react";
import useAuth from "../../hooks/useAuth";

export default function CreateGroupForm({ onSubmit }) {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      groupName: "",
      groupDescription: "",
    },
    validate: {
      groupName: isNotEmpty("Group Name is required"),
      groupDescription: isNotEmpty("Group Description is required"),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label="Group name"
        placeholder="Group name"
        required
        {...form.getInputProps("groupName")}
      />
      <TextInput
        label="Group description"
        placeholder="Group description"
        required
        {...form.getInputProps("groupDescription")}
      />
     <Button.Group>
      <Button type="submit" variant="default">Create Group</Button>
      <Button variant="default">Cancel</Button>
    </Button.Group>
    </form>
  );
}
