import { Container, Space, Button } from "@mantine/core";
import { UserFavorites } from "../../components/UserFavorites";
import { useNavigate } from "react-router-dom";

function DeleteButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile/delete");
  };

  return (
    <Button variant="filled" color="red" size="md" radius="md" onClick={handleClick}>
      Delete user account
    </Button>
  );
}

export default function ProfilePage() {
  return (
    <Container>
      <h1>TODO: fetch username</h1>
      <Space h="xs" />
      <UserFavorites />
      <Space h="xl" />
      <h2>TODO: button, separate page to delete user account</h2>
      <DeleteButton />
    </Container>
  );
}
