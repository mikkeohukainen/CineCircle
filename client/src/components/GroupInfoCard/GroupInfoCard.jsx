import React from "react";
import {
  Card,
  Title,
  Text,
  Badge,
  Button,
  Group,
} from "@mantine/core";

export default function GroupCard({
  name,
  description,
  memberCount,
}) {

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mt="xs" mb="xs">
        <Title order={1}>{name}</Title>
        <Badge variant="light" color="gray">
          Members: {memberCount}
        </Badge>
      </Group>

      <Text size="md" c="dimmed">
        {description}
      </Text>
      <Button color="blue" mt="md" radius="md" size="xs">
        Send Request
      </Button>
    </Card>
  );
}
