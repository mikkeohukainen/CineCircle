import React, { useState } from "react";
import { Card, Title, Text, Badge, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function GroupCard({ group, showJoinButton = true }) {
  const [groupObj, setGroupObj] = useState(group);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();


  const handleTitleClick = () => {
    if (isLoggedIn) {
      navigate("/group-details", { state: { groupDetails: groupObj } });
    } else {
      navigate("/login");
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mt="xs" mb="xs">
        <Title order={1} onClick={handleTitleClick} style={{ cursor: "pointer" }}>
          {group.group_name}
        </Title>
        <Badge variant="light" color="gray">
          Members: {group.member_count}
        </Badge>
      </Group>

      <Text size="md" c="dimmed">
        {group.description}
      </Text>
      {showJoinButton && isLoggedIn && (
        <Button color="blue" mt="md" radius="md" size="xs">
          Send Request
        </Button>
      )}
    </Card>
  );
}
