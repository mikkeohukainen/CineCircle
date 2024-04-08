import { useEffect, useState } from "react";
import { Container, Button, Group, Stack } from "@mantine/core";
import { GroupInfoCard } from "../../components/GroupInfoCard";
import { SearchBar } from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { api } from "../../data/api.js";
import useAuth from "../../hooks/useAuth";
import { sendRequest } from "../../data/groups";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const { userId, isLoggedIn } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    getGroups();
    getUsersGroups();
  }, [isLoggedIn, userId]);


  const getGroups = async () => {
    const response = await fetch("http://localhost:8000/groups");
    const groups = await response.json();
    const sortedGroups = groups.sort((a, b) => a.group_name.localeCompare(b.group_name));
    setGroups(() => sortedGroups);
  };

  const getUsersGroups = async () => {
    if (!isLoggedIn) return;
    try {
      const response = await api.get(`/groups/${userId}`);
      setUserGroups(() => response.data);
      console.log("Groups fetched", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Tarkistaa käyttäjän jäsenyyden ja jäsenyyden tilan tietyssä ryhmässä.
  const checkMembershipStatus = (groupId) => {
    const membership = userGroups.find((group) => group.group_id === groupId);
    if (membership) {
      return {
        isMember: true,
        isPending: !membership.accepted,
      };
    } else {
      return {
        isMember: false,
        isPending: false,
      };
    }
  };

  const handleMemberShipRequest = async (groupId) => {
    try {
      await sendRequest(groupId, userId);
      await getUsersGroups();
      console.log("Request sent to group: ", groupId);
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchSubmitted(true);
  };

  const createGroupButtonHandler = () => {
    if (isLoggedIn) {
      navigate("/create-group");
    } else {
      navigate("/login");
    }
  };

  const filteredGroups = groups.filter(
    (group) =>
      group.group_name.toLowerCase().includes(searchText.toLowerCase()) ||
      group.description.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <Container size="xl" mt="lg" mb="xl">
      <Container size="sm" mt="lg" mb="xl">
        <Group justify="flex-end" gutter="lg">
          <form onSubmit={handleSubmit} style={{ flexGrow: 0.8 }}>
            <SearchBar
              placeholder="Search groups"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setSearchSubmitted(false);
              }}
            />
          </form>
          <Button onClick={createGroupButtonHandler}>Create Group</Button>
        </Group>
      </Container>
      {searchSubmitted && searchText && <h3>Search results for: "{searchText}"</h3>}
      <Container size="md" mt="lg">
      <Stack spacing="lg" mt="lg">
        {filteredGroups.map((group) => (
            <GroupInfoCard group={group} key={group.group_id}
            membershipStatus={checkMembershipStatus(group.group_id)}
            onMembershipRequest={handleMemberShipRequest}
            
            />
        ))}
        </Stack>
        </Container>
    </Container>
  );
}
