import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AuthGuard from "../components/AuthGuard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ALLSet",
  description: "Created by Manas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <SidebarProvider>
          <AppSidebar />
          <AuthGuard>
            <div className="flex flex-row">
              <div>
                <SidebarTrigger />
              </div>
              <div>{children}</div>
            </div>
          </AuthGuard>
        </SidebarProvider>
      </div>
    </div>
  );
}
