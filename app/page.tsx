import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <p className="text-3xl font-medium text-sky-700">Hello Eorld 
    <UserButton afterSignOutUrl="/" />
    </p>
  );
}
