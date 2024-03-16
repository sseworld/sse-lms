import Image from "next/image";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  return (
    <p className="text-3xl font-medium text-sky-700">Hello Eorld {userId}</p>
  );
}
