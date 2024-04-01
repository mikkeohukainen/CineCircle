import classes from "./LoginPage.module.css";
import { Container, Paper } from "@mantine/core";
import { LoginForm } from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <Container className={classes.container} my={40}>
      <Paper withBorder shadow="md" p={30} radius="xs">
        <LoginForm />
      </Paper>
    </Container>
  );
}
