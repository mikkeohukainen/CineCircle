import classes from "./ThemeToggle.module.css";
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {colorScheme === "dark" ? (
        <IconSun className={classes.icon} stroke={1.5} />
      ) : (
        <IconMoon className={classes.icon} stroke={1.5} />
      )}
    </ActionIcon>
  );
}
