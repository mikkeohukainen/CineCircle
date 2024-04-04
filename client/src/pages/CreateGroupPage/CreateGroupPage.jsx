import React, { useState } from "react";
import CreateGroupForm from "./CreateGroupForm.jsx";
import { GroupInfoCard } from "../../components/GroupInfoCard";
import { Paper, Container, Button, Group } from "@mantine/core";
import { api } from "../../data/api.js";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

export default function CreateGroupPage() {
  const [groupCreated, setGroupCreated] = useState(false);
  const [newGroupObject, setNewGroupObject] = useState(null);
  const { username, userId } = useAuth();
  const navigate = useNavigate();

  async function createGroup({ groupName, groupDescription }) {
    try {
      const response = await api.post("/groups", {
        ownerId: userId,
        groupName,
        description: groupDescription,
      });

      const newGroupData = {
        ...response.data,
        member_count: 1,
        owner_username: username,
      };
      setGroupCreated(true);
      setNewGroupObject(newGroupData);
      console.log("Group created");
    } catch (error) {
      console.log(error);
    }
  }

  const handleTitleClick = () => {
    navigate("/group-details", { state: { groupDetails: newGroupObject } });
  };

  return (
    <Container size="xs" mt="lg" mb="xl">
      {groupCreated ? (
        <>
          <h2 style={{ textAlign: "center" }}>Group created!</h2>
            <GroupInfoCard group={newGroupObject} showJoinButton={false} />
          <Group mt="xl" justify="space-evenly">
            <Button onClick={handleTitleClick}>Go to group's page</Button>
            <Button onClick={() => navigate("/groups")}>Browse all groups</Button>
          </Group>
        </>
      ) : (
        <>
          <h2 style={{ textAlign: "center" }}>Create a new group</h2>
          <Paper withBorder shadow="md" p="xl" radius="xs">
            <CreateGroupForm onSubmit={createGroup} disabled={groupCreated} />
          </Paper>
        </>
      )}
    </Container>
  );
}
