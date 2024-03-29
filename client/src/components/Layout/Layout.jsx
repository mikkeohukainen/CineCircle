import classes from "./Layout.module.css";
import {
  AppShell,
  Burger,
  Group,
  UnstyledButton,
  Image,
  Text,
  Button,
  rem,
  em,
  Divider,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";

function AuthButtonGroup(props) {
  const navigate = useNavigate();

  return (
    <Group {...props}>
      <Button variant="default" onClick={() => navigate("login")}>
        Log in
      </Button>
      <Button onClick={() => navigate("/signup")}>Sign up</Button>
    </Group>
  );
}

function NavButtons(props) {
  const { breakpoints } = useMantineTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: ${em(breakpoints.sm)})`);
  const Parent = isMobile ? Stack : Group;

  return (
    <Parent {...props}>
      <UnstyledButton
        className={classes.navbutton}
        onClick={() => navigate("/theaters")}
      >
        Theaters
      </UnstyledButton>
      <UnstyledButton
        className={classes.navbutton}
        onClick={() => navigate("/groups")}
      >
        Groups
      </UnstyledButton>
      <UnstyledButton
        className={classes.navbutton}
        onClick={() => navigate("advanced-search")}
      >
        Advanced Search
      </UnstyledButton>
    </Parent>
  );
}

export default function Layout() {
  const navigate = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false);
  console.log(classes);
  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: "sm",
        collapsed: { mobile: !drawerOpened, desktop: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            size="sm"
          />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group gap={0}>
              <Image
                classNames={classes.logo}
                src="/cinecircle.png"
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              />
            </Group>
            <NavButtons ml="xl" gap={0} visibleFrom="sm" />
            <AuthButtonGroup visibleFrom="sm" />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <NavButtons />
        <Divider my="sm" />
        <AuthButtonGroup justify="center" grow pb="xl" px="md" />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
