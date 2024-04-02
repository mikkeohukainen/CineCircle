import classes from "./UserMenu.module.css";
import { Menu, Group, Text, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import useAuth from "../../hooks/useAuth";

export default function UserMenu({ onLogout }) {
  const { username } = useAuth();
  const [opened, { toggle, onOpen, onClose }] = useDisclosure(false);

  return (
    <Group>
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right" }}
        onOpen={onOpen}
        onClose={onClose}
      >
        <Menu.Target>
          <UnstyledButton
            className={classes.user}
            onClick={toggle}
            style={{
              ...(opened && { backgroundColor: "#fefefe" }),
            }}
          >
            <Group gap={7}>
              <Text fw={500} size="sm" lh={1} mr={3}>
                {username}
              </Text>
              <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={onLogout}>Log Out</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
