import { Button, TextInput, PasswordInput, Text, Anchor } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: isNotEmpty("Username is required"),
      password: isNotEmpty("Password is required"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        label="Username"
        placeholder="Your username"
        required
        {...form.getInputProps("username")}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
        mt="md"
        {...form.getInputProps("password")}
      />
      <Button type="submit" fullWidth mt="xl">
        Log In
      </Button>
      <Text mt="md" align="center" size="sm">
        Don't have an account?{" "}
        <Anchor href="/signup" onClick={() => navigate("/signup")}>
          Sign up
        </Anchor>
      </Text>
    </form>
  );
}
