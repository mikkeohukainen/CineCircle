import { useEffect, useState } from "react";
import { Container, useMantineTheme, Grid, Space, rem } from "@mantine/core";
import { GroupInfoCard } from "../../components/GroupInfoCard";
import { SearchBar } from "../../components/SearchBar";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

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

  const filteredGroups = groups.filter(
    (group) =>
      group.group_name.toLowerCase().includes(searchText.toLowerCase()) ||
      group.description.toLowerCase().includes(searchText.toLowerCase()),
  );
  return (
    <Container size="xl" mt="lg" mb="xl">
      <Container size="sm">
        <form onSubmit={handleSubmit}>
          <SearchBar
            placeholder="Search groups by name or description"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setSearchSubmitted(false);
            }}
          />
          {searchSubmitted && searchText && <p>Search results for: "{searchText}"</p>}
        </form>
      </Container>
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
