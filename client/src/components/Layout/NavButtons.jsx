import classes from "./Layout.module.css";
import { Group, UnstyledButton, em, Stack, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function NavButtons({ closeDrawer, ...props }) {
  const { breakpoints } = useMantineTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: ${em(breakpoints.sm)})`);
  const Parent = isMobile ? Stack : Group;

  const buttons = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "Theaters", onClick: () => navigate("/theaters") },
    { label: "Groups", onClick: () => navigate("/groups") },
    { label: "Reviews", onClick: () => navigate("/reviews") },
    { label: "Advanced Search", onClick: () => navigate("/advanced-search") },
  ].map(({ label, onClick }) => (
    <UnstyledButton
      key={label}
      className={classes.navbutton}
      onClick={() => {
        onClick();
        if (isMobile) closeDrawer();
      }}
    >
      {label}
    </UnstyledButton>
  ));

  return <Parent {...props}>{buttons}</Parent>;
}
