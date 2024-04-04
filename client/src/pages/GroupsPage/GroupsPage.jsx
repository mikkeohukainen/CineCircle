import { useEffect, useState } from "react";
import { Container, Button, Grid, Group } from "@mantine/core";
import { GroupInfoCard } from "../../components/GroupInfoCard";
import { SearchBar } from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    const response = await fetch("http://localhost:8000/groups");
    const groups = await response.json();
    const sortedGroups = groups.sort((a, b) => a.group_name.localeCompare(b.group_name));
    setGroups(() => sortedGroups);
    console.log("Groups fetched");
    console.log(sortedGroups);
  };

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
  }

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
      <Grid mt="lg" justify="flex-start" align="stretch" gutter="lg">
        {filteredGroups.map((group) => (
          <Grid.Col span={6} key={group.group_id}>
            <GroupInfoCard group={group} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
