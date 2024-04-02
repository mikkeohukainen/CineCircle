import classes from "./Layout.module.css";
import { Group, UnstyledButton, em, Stack, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function NavButtons({ closeDrawer, ...props }) {
  const { breakpoints } = useMantineTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: ${em(breakpoints.sm)})`);
  const Parent = isMobile ? Stack : Group;

  return (
    <Parent {...props}>
      <UnstyledButton
        className={classes.navbutton}
        onClick={() => {
          navigate("/theaters");
          if (isMobile) closeDrawer();
        }}
      >
        Theaters
      </UnstyledButton>
      <UnstyledButton
        className={classes.navbutton}
        onClick={() => {
          navigate("/groups");
          if (isMobile) closeDrawer();
        }}
      >
        Groups
      </UnstyledButton>
      <UnstyledButton
        className={classes.navbutton}
        onClick={() => {
          navigate("advanced-search");
          if (isMobile) closeDrawer();
        }}
      >
        Advanced Search
      </UnstyledButton>
    </Parent>
  );
}
