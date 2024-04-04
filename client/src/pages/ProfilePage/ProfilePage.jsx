import { Container, Space, Button } from "@mantine/core";
import { UserFavorites } from "../../components/UserFavorites";
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
      <h3>TODO: muotoilut puuttuu</h3>
      <h3>TODO: fetch tmdb puuttuu</h3>
      <UserFavorites />
      <h3>TODO: group stuff here</h3>
      <DeleteButton />
    </Container>
  );
}
