import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { GroupInfoCard } from "../GroupInfoCard";

export default function UserGroups() {
  const { userId } = useAuth();
  const [groups, setGroups] = useState([]);

  const getUserGroups = async () => {
    try {
      const query = await fetch(`http://localhost:8000/groups/${userId}`);
      const response = await query.json();
      setGroups(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserGroups();
  }, []);

  return (
    <>
      <h3>Your groups:</h3>
      {/* {console.log(groups)} */}
      {groups.map((group) => {
        return (
          <GroupInfoCard
            group={group}
            key={`${group.group_id}`}
            membershipStatus={group.accepted}
          />
        );
      })}
    </>
  );
}
