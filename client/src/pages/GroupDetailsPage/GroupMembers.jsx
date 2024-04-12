import { Stack, Button, Group, Text, Title, Paper, Container, Divider, Center, Space } from "@mantine/core";

export default function MemberList({ groupMembers, isOwner, ownerId, handleAcceptAndReject }) {
  const pendingMembers = groupMembers.filter((member) => !member.accepted);
  const acceptedMembers = groupMembers.filter((member) => member.accepted);

  return (
    <Container size="sm">
      <Paper withBorder shadow="md" p="sm" radius="xs">
      <Center>
      <Title order={4}>Group Members</Title>
    </Center>
        <Stack gap="0">
          {acceptedMembers.map((member) => (
            <div key={member.user_id}>
              <Divider my="sm" variant="dashed" />
              <Group justify="space-between">
                <Text>{member.username}</Text>
                {isOwner && member.user_id !== ownerId && <Button>Remove user</Button>}
                {member.user_id === ownerId && <Text>Group Owner</Text>}
              </Group>
            </div>
          ))}
        </Stack>
      </Paper>
      <Space h="xl" />
      {isOwner && pendingMembers.length > 0 && (
        <Paper withBorder shadow="md" p="sm" radius="xs" mt="xl">
          <Center>
            <Title order={4}>Pending requests:</Title>
          </Center>
          <Stack gap="0">
            {pendingMembers.map((member) => (
              <div key={member.user_id}>
                <Divider my="sm" variant="dashed" />
                <Group justify="space-between">
                  <Text>{member.username}</Text>
                  <Group>
                    <Button onClick={() => handleAcceptAndReject(member.user_id, "accept")}>
                      Accept
                    </Button>
                    <Button
                      color="red"
                      onClick={() => handleAcceptAndReject(member.user_id, "reject")}
                    >
                      Decline
                    </Button>
                  </Group>
                </Group>
              </div>
            ))}
          </Stack>
        </Paper>
      )}
    </Container>
  );
}
