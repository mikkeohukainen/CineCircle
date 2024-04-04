import React, { useState } from "react";
import CreateGroupForm from "./CreateGroupForm.jsx";
import { GroupInfoCard } from "../../components/GroupInfoCard";
import { Paper, Container, Button } from "@mantine/core";
import api from "../../data/api.js";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

export default function CreateGroupPage() {
  const [groupCreated, setGroupCreated] = useState(false);
  const [newGroupObject, setNewGroupObject] = useState(null)
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
        owner_username: username
      }
      setGroupCreated(true);
      setNewGroupObject(newGroupData)
      console.log("Group created")
    } catch (error) {
      console.log(error)
    }
  }




  const handleTitleClick = () => {
    navigate("/group-details", { state: { groupDetails: newGroupObject } });
  };

  return (
    <Container size="xl" mt="lg" mb="xl">
      <p>Username: { username }</p>
      <p>User ID: {userId }</p>
      <Paper withBorder shadow="md" p={30} radius="xs">
      {groupCreated ? (
        <>
            <p>Ryhmä luotu!</p>
            <Button onClick={() => navigate("/groups")}>Näytä kaikki ryhmät</Button>
          <Button onClick={handleTitleClick}>Mene ryhmän sivulle</Button>
        </>
      ) : (
        <CreateGroupForm onSubmit={createGroup} disabled={groupCreated} />
      )}
        {/* <CreateGroupForm onSubmit={createGroup} /> */}
      </Paper>
    </Container>
  );
}
