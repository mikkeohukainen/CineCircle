import { Stack, Button, Group, Text, Title, Paper } from "@mantine/core";

export default function MemberList({ groupMembers, isOwner, ownerId, handleAcceptAndReject }) {
  const pendingMembers = groupMembers.filter((member) => !member.accepted);
  const acceptedMembers = groupMembers.filter((member) => member.accepted);

  return (
    <>
      <Paper withBorder shadow="md" p="xs" radius="xs" mt="xl">
        <Title order={4}>Group members:</Title>
        <Stack spacing="xs" mt="lg">
          {acceptedMembers.map((member) => (
            <Group key={member.user_id}>
              <Text>{member.username}</Text>
              {isOwner && member.user_id !== ownerId && (
                <Button>Remove user - ei toimi vielä</Button>
              )}
            </Group>
          ))}
        </Stack>
      </Paper>
      {isOwner && pendingMembers.length > 0 && (
        <Paper withBorder shadow="md" p="xs" radius="xs" mt="xl">
          <Title order={4}>Pending requests:</Title>
          <Stack spacing="xs" mt="lg">
            {pendingMembers.map((member) => (
              <Group key={member.userId}>
                <Text>{member.username}</Text>
                <Button onClick={() => handleAcceptAndReject(member.user_id, "accept")}>
                  Accept
                </Button>
                <Button onClick={() => handleAcceptAndReject(member.user_id, "reject")}>
                  Decline
                </Button>
              </Group>
            ))}
          </Stack>
        </Paper>
      )}
    </>
  );
}
