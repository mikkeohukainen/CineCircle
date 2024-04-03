import { Container } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';


export default function GroupDetailsPage() {

  const location = useLocation();
  const groupDetails = location.state?.groupDetails;
  const [groupContent, setGroupContent] = useState([]);

  useEffect(() => {
    getGroupContent();
  }, []);

  const getGroupContent = async () => {
    const URL = `http://localhost:8000/groups/${groupDetails.group_id}/contents`;
    const data = await fetch(URL);
    const groupContent = await data.json();
    setGroupContent(groupContent);
    console.log("Fetching group content from: " + URL);
  }

  const renderGroupContent = () => {
    if (groupContent.length > 0) {
      return groupContent.map((content) => (
        <div key={content.content_id}>
          <pre>{JSON.stringify(content, null, 2)}</pre>
        </div>
      ));
    } else {
      return <p>No contents</p>;
    }
  };

  return (
    <Container size="xl" mt="lg" mb="xl">
      {groupDetails && (
        <div>
          <h1>{groupDetails.group_name}</h1>
          <h2>Group Details</h2>
          <p>Group ID: {groupDetails.group_id}</p>
          <p>Group owner: {groupDetails.owner_username}</p>
          <p>Description: {groupDetails.description}</p>
          <p>Members: {groupDetails.member_count}</p>
        </div>
      )}
      <div>
        <h2>Group Content</h2>
        {renderGroupContent()}
      </div>
    </Container>
  );
}
