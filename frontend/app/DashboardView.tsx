import Link from "next/link";

export default function DashboardView() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Welcome!</h1>
      <Link href={'/shelf'}>Shelf</Link>
    </div>
  );
}
