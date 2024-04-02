import classes from "./UserMenu.module.css";
import { Menu, Group, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUser, IconSettings, IconLogout, IconCaretDownFilled } from "@tabler/icons-react";
import useAuth from "../../hooks/useAuth";

export default function UserMenu({ onLogout }) {
  const { username } = useAuth();
  const [opened, { toggle, onOpen, onClose }] = useDisclosure(false);

  return (
    <Group>
      <Menu
        width={220}
        shadow="md"
        position="bottom-end"
        opened={opened}
        onClose={onClose}
        onOpen={onOpen}
      >
        <Menu.Target>
          <UnstyledButton onClick={toggle} className={classes.menuButton}>
            <Group>
              <Text size="sm">{username}</Text>
              <IconCaretDownFilled
                className={`${classes.menuButtonIcon} ${opened ? classes.flipped : ""}`}
                size={18}
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<IconUser className={classes.menuItemIcon} />}>Profile</Menu.Item>
          <Menu.Item leftSection={<IconSettings className={classes.menuItemIcon} />}>
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            leftSection={<IconLogout className={classes.menuItemIcon} />}
            onClick={onLogout}
          >
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
