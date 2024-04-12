import { Button, Container, Group, Space, Text, Title, Badge } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  acceptRequest,
  getGroupMembers,
  deleteGroupMember,
  deleteGroupById,
} from "../../data/groups";
import MemberList from "./GroupMembers.jsx";
import DeleteGroupModal from "./DeleteGroupModal.jsx";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo.js";

export default function GroupDetailsPage() {
  const location = useLocation();
  const groupDetails = location.state?.groupDetails;
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupContent, setGroupContent] = useState([]);
  const { userId } = useAuth();
  const acceptedMembers = groupMembers.filter((member) => member.accepted);
  const isOwner = groupDetails.owner_id === userId;
  const groupId = groupDetails.group_id;
  const { userGroups } = useUserInfo();

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    try {
      const members = await getGroupMembers(groupId);
      setGroupMembers(members);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGroup = async () => {
    if (!isOwner) return;
    try {
      await deleteGroupById(groupId);
      console.log("Group ", groupDetails.group_name, " deleted");
    } catch (error) {
      console.log(error);
    }
  };

  async function handleMemberAction(userId, action) {
    if (!isOwner) return;

    const actionMap = {
      accept: async () => {
        await acceptRequest(groupId, userId);
        console.log("Request accepted");
      },
      reject: async () => {
        await deleteGroupMember(groupId, userId);
        console.log("Request rejected");
      },
      removeUser: async () => {
        await deleteGroupMember(groupId, userId);
        console.log("User removed from group");
      },
    };

    try {
      await actionMap[action]();
      getMembers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container size="md" mb="xl" p="xl">
      <Group justify="flex-end" mb="xl">
        {isOwner && (
          <DeleteGroupModal handleDeleteGroup={handleDeleteGroup} groupDetails={groupDetails} />
        )}
      </Group>
      <Group justify="space-between">
        <Title order={1}>{groupDetails.group_name}</Title>
        <Badge size="lg" variant="light" color="gray">
          MEMBERS: {acceptedMembers.length}
        </Badge>
      </Group>
      <Space h="xs" />

      <Text size="xl">{groupDetails.description}</Text>

      <Container size="md" mb="xl">
        <Space h="xl" />

        <Container size="md" mb="xl">
          <Title ta="center" order={3}>
            GROUP CONTENT HERE
          </Title>
        </Container>

        <Container size="md" mb="xl">
          <Title ta="center" order={3}>
            GROUP SHOWTIMES HERE
          </Title>
        </Container>

        <MemberList
          groupMembers={groupMembers}
          isOwner={isOwner}
          handleMemberAction={handleMemberAction}
          ownerId={groupDetails.owner_id}
        />
      </Container>

      <Text ta="center">TEST BUTTONS:</Text>
      <Group justify="space-around">
        <Button onClick={() => console.log(groupDetails)}>Console.log group details</Button>
        <Button onClick={() => console.log(groupMembers)}>Console.log group members</Button>
        <Button onClick={() => console.log(userGroups)}>Console.log users groups</Button>
      </Group>
    </Container>
  );
}
