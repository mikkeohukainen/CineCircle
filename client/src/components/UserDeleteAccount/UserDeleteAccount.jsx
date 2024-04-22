import { Container, TextInput, Button, Box, Space, Checkbox, Stack } from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { logout } from "../../data/auth";
import { useNavigate } from "react-router-dom";
import { basicNotification } from "../Notifications";

export default function DeleteAccount() {
  const { username, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { password: "", boxChecked: false },
  });

  const customNotification = basicNotification();

  const handleSubmit = async (values) => {
    if (values.boxChecked === true) {
      const response = await fetch("http://localhost:8000/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          password: values.password,
        }),
      });

      if (!response.ok) {
        customNotification("Error", "Password incorrect!", "red");
        // console.error("Failed to delete account");
      } else {
        // Data tuhottu backendissä, jos tänne asti pääsee
        customNotification("Ok", "Account permanently deleted", "green");
        customNotification("Ok", "Logged out", "green");
        logout();
        setIsLoggedIn(false);
        navigate("/");
        // console.log("Account deleted");
      }
    } else {
      customNotification("Error", "Please mark the checkbox to confirm deletion", "red");
      // console.log("box not checked");
    }
    form.reset();
  };

  return (
    <Container>
      <h1>{username}</h1>

      <Container size="xs">
        By deleting your account you will lose all of your data permanently. This action can not be
        undone.
        <Space h="md" />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Password"
            placeholder="Enter your password"
            {...form.getInputProps("password")}
            type="password"
          />
          <Checkbox
            mt="md"
            label="Yes, I understand the consequences and want to delete my account"
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
