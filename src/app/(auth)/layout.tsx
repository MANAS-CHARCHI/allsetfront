import LockHeader from "../components/lock-header";
import Footer from "../components/footer";

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
        <Footer />
      </div>
    </div>
  );
}
