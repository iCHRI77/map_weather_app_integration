import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1 className="bg-black">Home</h1>
      <Link href="/InAction">InAction</Link>
    </div>
  );
}
