import classes from "./Layout.module.css";
import { AppShell, Burger, Group, Image, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import AuthButtonGroup from "./AuthButtonGroup.jsx";
import NavButtons from "./NavButtons.jsx";
import useAuth from "../../hooks/useAuth.js";
import UserMenu from "../UserMenu/UserMenu.jsx";
import { logout } from "../../data/auth.js";

export default function Layout() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

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
      <AppShell.Header className={classes.header}>
        <Group h="100%" px="md">
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group gap={0}>
              <Image
                classNames={classes.logo}
                src="/cinecircle-black-sm.png"
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

            {isLoggedIn ? (
              <UserMenu
                onLogout={() => {
                  logout();
                  setIsLoggedIn(false);
                  navigate("/");
                }}
              />
            ) : (
              <AuthButtonGroup visibleFrom="sm" />
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <NavButtons closeDrawer={closeDrawer} />
        {!isLoggedIn ? (
          <>
            <Divider my="sm" />
            <AuthButtonGroup closeDrawer={closeDrawer} justify="center" grow pb="xl" px="md" />
          </>
        ) : null}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
