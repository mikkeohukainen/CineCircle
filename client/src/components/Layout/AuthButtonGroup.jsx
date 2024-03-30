import { Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function AuthButtonGroup({ onClick, ...props }) {
  const navigate = useNavigate();

  return (
    <Group {...props}>
      <Button
        variant="default"
        onClick={() => {
          navigate("login");
          onClick();
        }}
      >
        Log In
      </Button>
      <Button
        onClick={() => {
          navigate("/signup");
          onClick();
        }}
      >
        Sign Up
      </Button>
    </Group>
  );
}
