import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Mosaic",
  description: "Organising and managing your tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">{children}</body>
    </html>
  );
}
