import { Button, TextInput, PasswordInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";

export default function RegistrationForm() {
  const [showPassword, { toggle: toggleShowPassword }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    validate: (values) => {
      const [minPasswordLength, maxPasswordLength] = [8, 72];
      const { username, password, repeatPassword } = values;
      const errors = {};

      if (!username || username.trim() === "") {
        errors.username = "Username is required";
      }

      if (
        !password ||
        password.trim() === "" ||
        password.length < minPasswordLength ||
        password.length > maxPasswordLength
      ) {
        errors.password = `Password should be between ${minPasswordLength} and ${maxPasswordLength} characters`;
      }

      if (password !== repeatPassword) {
        errors.repeatPassword = "Passwords do not match";
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
        visible={showPassword}
        onVisibilityChange={toggleShowPassword}
        onInput={(event) => (event.target.value = event.target.value.trim())}
        required
        mt="md"
        {...form.getInputProps("password")}
      />
      <PasswordInput
        label="Repeat password"
        placeholder="Repeat password"
        visible={showPassword}
        onVisibilityChange={toggleShowPassword}
        onInput={(event) => (event.target.value = event.target.value.trim())}
        required
        mt="md"
        {...form.getInputProps("repeatPassword")}
      />
      <Button type="submit" fullWidth mt="xl">
        Sign Up
      </Button>
      <Text mt="md" size="sm" align="center">
        Already have an account?{" "}
        <Link
          style={{
            display: "inline-block",
            fontSize: "inherit",
          }}
          to="/login"
        >
          Log in
        </Link>
      </Text>
    </form>
  );
}
