import classes from "./Layout.module.css";
import {
  Group,
  UnstyledButton,
  em,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function NavButtons({ onClick, ...props }) {
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
          onClick();
        }}
      >
        Theaters
      </UnstyledButton>
      <UnstyledButton
        className={classes.navbutton}
        onClick={() => {
          navigate("/groups");
          onClick();
        }}
      >
        Groups
      </UnstyledButton>
      <UnstyledButton
        className={classes.navbutton}
        onClick={() => {
          navigate("advanced-search");
          onClick();
        }}
      >
        Advanced Search
      </UnstyledButton>
    </Parent>
  );
}
