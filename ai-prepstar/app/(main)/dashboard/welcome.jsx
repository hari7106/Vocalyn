"use client";

import { useUser } from "../../context/UserDetailContext";
import Image from "next/image";
import Header from "@/app/_components/Header";
function Welcome() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md">
      {/* Profile Picture */}

      <Image
        src={user.picture}
        alt="User profile"
        width={40}
        height={40}
        className="rounded-full"
      />

      {/* Name */}
      <h2 className="text-xl font-semibold">Welcome back , {user.name}</h2>
      <h2 className="text-lg font-semibold"></h2>
    </div>
  );
}

export default Welcome;
