export default function DashboardView({
  displayName,
}: {
  displayName: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>Welcome {displayName}!</h1>
    </div>
  );
}
