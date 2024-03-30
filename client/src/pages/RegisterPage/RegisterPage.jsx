import classes from "./RegisterPage.module.css";
import { Container, Paper } from "@mantine/core";
import { RegistrationForm } from "../../components/RegistrationForm";

export default function RegisterPage() {
  return (
    <Container className={classes.container} my={40}>
      <Paper withBorder shadow="md" p={30} radius="xs">
        <RegistrationForm />
      </Paper>
    </Container>
  );
}
