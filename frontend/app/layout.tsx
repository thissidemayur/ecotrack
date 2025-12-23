import type React from "react";
import type { Metadata } from "next";
// import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
// import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/auth-provider";

// const _geist = Geist({ subsets: ["latin"] });
// const _geistMono = Geist_Mono({ subsets: ["latin"] });
// const _ibmPlexMono = IBM_Plex_Mono({
//   weight: ["400", "500", "600", "700"],
//   subsets: ["latin"],
//   variable: "--font-ibm-plex-mono",
// });




// export const metadata: Metadata = {
//   metadataBase: new URL("https://ecotrack.thissidemayur.me"), // Set your base URL for images and other metadata
//   title: "EcoTrack - Carbon Footprint Calculator",
//   description: "Track and reduce your carbon footprint with EcoTrack",
//   authors: [
//     { name: "Mayur Pal", url: "thissidemayur.me" },
//     { name: "@thissidemayur", url: "thissidemayur.me" },
//   ],
//   creator: "Mayur Pal",
//   keywords: [
//     "Carbon Footprint",
//     "Sustainability",
//     "EcoTrack",
//     "Environmental Impact",
//     "Green Living",
//     "Climate Change",
//     "Carbon Emissions",
//     "Sustainable Lifestyle",
//     "Eco-Friendly Practices",
//     "Carbon Calculator",
//     "Reduce Carbon Footprint",
//     "Environmental Awareness",
//     "Climate Action",
//     "Sustainability Tools",
//     "Green Technology",
//     "Carbon Reduction Strategies",
//     "EcoTrack Dashboard",
//     "Next.js Sustainability App",
//     "Next.js",
//     "Typescript",
//     "Express",
//     "MongoDB",
//     "Redis",
//     "JavaScript",
//   ],

//   icons: {
//     icon: [
//       { url: "/icon.png" },
//       new URL("/icon.png", "https://ecotrack.thissidemayur.me").toString(),
//       { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
//     ],
//     shortcut: ["/shortcut-icon.png"],
//     apple: [
//       { url: "/apple-icon.png" },
//     ],
//     other: [
//       {
//         rel: "apple-touch-icon-precomposed",
//         url: "/apple-touch-icon-precomposed.png",
//       },
//     ],
//   },

//   // openGraph
//   openGraph: {
//     title: "EcoTrack - Carbon Footprint Calculator",
//     description: "Track and reduce your carbon footprint with EcoTrack",
//     url: "https://ecotrack.thissidemayur.me",
//     siteName: "EcoTrack",
//     images: [
//       {
//         url: "/og-image.png",
//         width: 800,
//         height: 600,
//         alt: "EcoTrack Open Graph Image",
//       },
//       {
//         url: "/og-image-2.png",
//         width: 1800,
//         height: 1600,
//         alt: "EcoTrack Open Graph Image Large",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   // robots
//   robots: {
//     index: true,
//     follow: true,
//     nocache: false,
//     googleBot: {
//       index: true,
//       follow: true,
//       noimageindex: false,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   // twitter
//   twitter: {
//     card: "summary_large_image",
//     title: "EcoTrack - Carbon Footprint Calculator",
//     description: "Track and reduce your carbon footprint with EcoTrack",
//     images: ["/og-image.png"],
//     creator: "@thissidemayur",
//   },

//   // verification- enable monitoring of site ownership
//   verification: {
//     google: 'google',
//     yandex: 'yandex',
//     yahoo: 'yahoo',
//     other: {
//       me: ['my-email', 'my-link'],
//     },
//   },


//   // appleWebApp
//   itunes: {
//     appId: "",
//     appArgument: "https://ecotrack.thissidemayur.me",
//   },
//   appleWebApp: {
//     title: "EcoTrack",
//     statusBarStyle: "default",
//     startupImage: [
//       "/appleWebAppImage.png",
//       {
//         url: "/assets/startup/apple-touch-startup-image-1536x2008.png",
//         media: "(device-width: 768px) and (device-height: 1024px)",
//       },
//     ],
//   },
//   category: "technology",

//   // facebook
//   facebook: {
//     // appId: "",
//     admins: ["12345678", "87654321"],
//   },
//   // pinterest
//   // pinterest: {
//   //   richPins: true,
//   // },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster theme="light" position="top-right" closeButton richColors />
      </body>
    </html>
  );
}
