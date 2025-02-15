import LockHeader from "../components/lock-header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className=" antialiased flex flex-col min-h-screen">
        <LockHeader />
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
