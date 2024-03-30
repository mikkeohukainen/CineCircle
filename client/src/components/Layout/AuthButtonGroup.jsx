import { Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function AuthButtonGroup(props) {
  const navigate = useNavigate();

  return (
    <Group {...props}>
      <Button variant="default" onClick={() => navigate("login")}>
        Log In
      </Button>
      <Button onClick={() => navigate("/signup")}>Sign Up</Button>
    </Group>
  );
}
