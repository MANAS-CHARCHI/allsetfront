import { ReactNode } from "react";
import Lock_Header from "./lock-header";
import Footer from "../components/footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Lock_Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </>
  );
}
