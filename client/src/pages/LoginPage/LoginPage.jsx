import classes from "./LoginPage.module.css";
import { login } from "../../data/auth";
import { useNavigate } from "react-router-dom";
import { Container, Paper } from "@mantine/core";
import { LoginForm } from "../../components/LoginForm";
import useAuth from "../../hooks/useAuth";
import { showNotification } from "@mantine/notifications";

export default function LoginPage() {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  async function handleLogin({ username, password }) {
    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.jwtToken);
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("username", res.username);
      setIsLoggedIn(true);
      navigate("/", { replace: true });
    } catch (error) {
      showNotification({
        title: "Login failed",
        message: error.response.data.message,
        color: "red",
        autoClose: 2000,
      });
    }
  }

  return (
    <Container className={classes.container} my={40}>
      <Paper withBorder shadow="md" p={30} radius="xs">
        <LoginForm onSubmit={handleLogin} />
      </Paper>
    </Container>
  );
}
