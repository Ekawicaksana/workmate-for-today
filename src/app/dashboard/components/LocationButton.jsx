"use client";
import { useRouter } from "next/navigation";

export default function LocationButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/nearby");
  };

  return (
    <button
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      onClick={handleClick}
    >
      🔍 Find Nearby Sessions
    </button>
  );
}
