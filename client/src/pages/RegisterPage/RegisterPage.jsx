import classes from "./RegisterPage.module.css";
import { Container, Paper } from "@mantine/core";
import { RegistrationForm } from "../../components/RegistrationForm";
import { register } from "../../data/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  async function handleRegister({ username, password, repeatPassword }) {
    console.log(username, password, repeatPassword);
    try {
      await register(username, password, repeatPassword);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
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
