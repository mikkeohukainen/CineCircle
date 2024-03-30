import { Button, TextInput, PasswordInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const { username, password } = values;
      const errors = {};

      if (!username || username.trim() === "") {
        errors.username = "Username is required";
      }

      if (!password || password.trim() === "") {
        errors.password = "Password is required";
      }

      return errors;
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
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Text>
    </form>
  );
}
