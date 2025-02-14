import Header from "../components/lock-header";
import { ReactNode } from "react";
import Footer from "../components/footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </>
  );
}
