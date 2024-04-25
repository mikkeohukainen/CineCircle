import classes from "./RegisterPage.module.css";
import { Container, Paper } from "@mantine/core";
import { RegistrationForm } from "../../components/RegistrationForm";
import { register } from "../../data/auth";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

export default function RegisterPage() {
  const navigate = useNavigate();

  async function handleRegister({ username, password, repeatPassword }) {
    try {
      await register(username, password, repeatPassword);
      navigate("/login", { replace: true });
    } catch (error) {
      showNotification({
        title: "Registration failed",
        message: error.response.data.message,
        color: "red",
        autoClose: 2000,
      });
    }
  }

  return (
    <Container className={classes.container} my={40}>
      <Paper withBorder shadow="md" p={30} radius="xs">
        <RegistrationForm onSubmit={handleRegister} />
      </Paper>
    </Container>
  );
}
