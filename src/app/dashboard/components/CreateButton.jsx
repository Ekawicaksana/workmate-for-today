"use client";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function CreateButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/events/new"); // atau /dashboard/create jika formnya ada di dalam dashboard
  };

  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      onClick={handleClick}
    >
      <FaPlus className="inline mr-2" />
      Create WFC/WFA Session
    </button>
  );
}
