import { Button, TextInput, PasswordInput, Text, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm, isNotEmpty, hasLength, matchesField } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm({ onSubmit }) {
  const navigate = useNavigate();
  const [showPassword, { toggle: toggleShowPassword }] = useDisclosure(false);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    validate: {
      username: isNotEmpty("Username is required"),
      password:
        isNotEmpty("Password is required") &&
        hasLength({ min: 8, max: 72 }, "Password must be between 8 and 72 characters"),
      repeatPassword: matchesField("password", "Passwords do not match"),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
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
        <Anchor href="/login" onClick={() => navigate("/login")}>
          Log in
        </Anchor>
      </Text>
    </form>
  );
}
