import "./globals.css";
import Link from "next/link";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* ✅ PAYSTACK SCRIPT */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />
      </head>

      <body>
        <nav className="p-4 bg-gray-100 flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>

        {children}
      </body>
    </html>
  );
}
