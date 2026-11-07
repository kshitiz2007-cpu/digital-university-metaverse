import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital University | Learn beyond boundaries",
  description: "An immersive learning universe with a 3D campus and living digital library.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
