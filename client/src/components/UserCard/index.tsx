import { User } from "@/state/api";
import React from "react";
import Image from "next/image";

type Props = {
  user: User;
};

const UserCard = ({ user: { profilePictureUrl, username, email } }: Props) => {
  return (
    <div className="mb-3 flex items-center gap-4 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {profilePictureUrl && (
        <Image
          src={`/${profilePictureUrl}`}
          alt={username}
          width={32}
          height={32}
          className="rounded-full"
        />
      )}

      <div>
        <h3>{username}</h3>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default UserCard;
