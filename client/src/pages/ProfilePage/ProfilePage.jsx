import { Container, Space, Button, Stack } from "@mantine/core";
import { UserFavorites } from "../../components/UserFavorites";
import { UserGroups } from "../../components/UserGroups";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function DeleteButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile/delete");
  };

  return (
    <Button variant="light" color="red" onClick={handleClick}>
      I want to delete my account
    </Button>
  );
}

export default function ProfilePage() {
  const { username } = useAuth();

  return (
    <Container>
      <h1>{username}</h1>
      <Stack>
        <UserFavorites />
        <UserGroups />
        <Space h="xl" />
      </Stack>
      <DeleteButton />
      <Space h="xl" />
    </Container>
  );
}
