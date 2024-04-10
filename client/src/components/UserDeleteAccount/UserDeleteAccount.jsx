import { Container, TextInput, Button, Box, Space, Checkbox } from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { logout } from "../../data/auth";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
  const { username, setIsLoggedIn } = useAuth();
  const [notification, setNotification] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { username: "", password: "", confirmPw: "", boxChecked: false },
  });

  const handleSubmit = async (values) => {
    if (values.boxChecked === true) {
      if (values.username === username) {
        const response = await fetch("http://localhost:8000/users", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.username,
            password: values.password,
            confirmPw: values.confirmPw,
          }),
        });

        if (!response.ok) {
          console.error("Failed to delete account");
        } else {
          logout();
          setIsLoggedIn(false);
          navigate("/");
          console.log("Account deleted");

          // TODO: DELETE all data
        }
      } else {
        console.log("You can only delete your own account");
      }
    } else {
      setNotification(true);
      console.log("box not checked");
    }
    form.reset();
  };

  return (
    <Container>
      <h1>{username}</h1>
      <h3>TODO: muotoilut puuttuu tästäkin</h3>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          {...form.getInputProps("username")}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          {...form.getInputProps("password")}
          type="password"
        />
        <TextInput
          label="Confirm password"
          placeholder="Enter your password"
          {...form.getInputProps("confirmPw")}
          type="password"
        />
        <Checkbox
          mt="md"
          label="Yes, I understand this deletion can not be undone."
          {...form.getInputProps("boxChecked", { type: "checkbox" })}
        />
        <Button type="submit" variant="filled" color="red" size="md" radius="md">
          DELETE USER ACCOUNT
        </Button>
      </form>
    </Container>
  );
}
