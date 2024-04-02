import React from "react";
import classes from "./GroupInfoCard.module.css";

export default function GroupCard({
  name,
  owner,
  description,
  created_at,
  memberCount,
}) {
    return (
        <div className={classes.infoc}>
          <h1>{name}</h1>
          <h2>{description}</h2>
          <p>
            Created by: {owner}<br />
            Created at: {created_at}<br />
            Members: {memberCount}
          </p>
        </div>
      );
}
