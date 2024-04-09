import { useNavigate } from 'react-router-dom'
import { Badge, Button } from '@mantine/core'
import { useHover } from '@mantine/hooks';
import useAuth from '../../hooks/useAuth'

export default function GroupCardActionButton({ isMember, isPending, groupId, onMembershipRequest }) {
  const { isLoggedIn } = useAuth();
  const { hovered, ref } = useHover();
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
      <div ref={ref}>
      {hovered ? (
          <Button color="red" mt="md" radius="md" onClick={() => onMembershipRequest(groupId, "cancel")}>
            Cancel Request
          </Button>
        ) : (
          <Badge size="xl" variant="light" color="gray" mt="lg">
            Request sent
                  </Badge>
      )}
  </div>
    ) : (
      <Badge size="xl" variant="light" color="gray" mt="lg">
        You are a member
      </Badge>
  );
}

  return (
    <Button color="blue" mt="lg" radius="md" onClick={() => onMembershipRequest(groupId, "send")}>
      Send Request
    </Button>
  );
};
