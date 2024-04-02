import { Group, Button, useMantineTheme, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function AuthButtonGroup({ closeDrawer, ...props }) {
  const navigate = useNavigate();
  const { breakpoints } = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${em(breakpoints.sm)})`);

  return (
    <Group {...props}>
      <Button
        variant="default"
        onClick={() => {
          navigate("login");
          if (isMobile) closeDrawer();
        }}
      >
        Log In
      </Button>
      <Button
        onClick={() => {
          navigate("/signup");
          if (isMobile) closeDrawer();
        }}
      >
        Sign Up
      </Button>
    </Group>
  );
}
