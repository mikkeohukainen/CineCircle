import { Container, TextInput, Button, Box, Space, Checkbox, Stack } from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { logout } from "../../data/auth";
import { useNavigate } from "react-router-dom";
import { basicNotification, alterNotification } from "../Notifications";

export default function DeleteAccount() {
  const { username, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { username: "", password: "", confirmPw: "", boxChecked: false },
  });

  const customNotification = basicNotification();
  const altNotification = alterNotification();

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
          customNotification("Error", "Password does not match confirmation password", "red");
          // console.error("Failed to delete account");
        } else {
          //
          // TODO: DELETE all data from all tables
          //
          customNotification("Ok", "Account permanently deleted", "green");
          customNotification("Ok", "Logged out", "green");
          logout();
          setIsLoggedIn(false);
          navigate("/");
          // console.log("Account deleted");
        }
      } else {
        customNotification("Error", "Username does not match login", "red");
        // console.log("You can only delete your own account");
      }
    } else {
      // customNotification("Error", "Please mark the checkbox to confirm deletion", "red");
      altNotification("Error", "Please mark the checkbox to confirm deletion", "red");

      // console.log("box not checked");
    }
    form.reset();
  };

  return (
    <Container>
      <h1>{username}</h1>
      <Container size="xs">
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
            placeholder="Confirm your password"
            {...form.getInputProps("confirmPw")}
            type="password"
          />
          <Checkbox
            mt="md"
            label="Yes, I understand this deletion can not be undone."
            {...form.getInputProps("boxChecked", { type: "checkbox" })}
          />
          <Space h="md" />
          <Button type="submit" variant="filled" color="red" size="md" radius="md">
            DELETE USER ACCOUNT
          </Button>
        </form>
      </Container>
    </Container>
  );
}
