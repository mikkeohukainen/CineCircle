import { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import { GroupInfoCard } from "../../components/GroupInfoCard";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    const data = await fetch("http://localhost:8000/groups");
    const groups = await data.json();
    setGroups(() => groups);
    console.log("Groups fetched");
    console.log(groups);
  };
  return (
    <Container>
      <h1>Groups</h1>
      {groups.map((group) => (
        <GroupInfoCard
          key={group.group_id}
          name={group.group_name}
          description={group.description}
          created_at={new Date(group.created_at).toLocaleDateString()}
          owner={group.owner_username}
          memberCount={group.member_count}
        />
      ))}
    </Container>
  );
}
