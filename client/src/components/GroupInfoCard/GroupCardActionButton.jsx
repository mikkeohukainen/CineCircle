import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button } from '@mantine/core'
import useAuth from '../../hooks/useAuth'

export default function GroupCardActionButton({ isMember, isPending }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <Button color="blue" mt="md" radius="md" onClick={() => navigate("/login")}>
        Log in to join groups
      </Button>
    );
  }

  if (isMember) {
    return isPending ? (
      <Badge size="xl" variant="light" color="gray" mt="lg">
        Request sent
      </Badge>
    ) : (
      <Badge size="xl" variant="light" color="gray" mt="lg">
        You are a member
      </Badge>
    );
  }

  return (
    <Button color="blue" mt="lg" radius="md">
      Send Request
    </Button>
  );
};
