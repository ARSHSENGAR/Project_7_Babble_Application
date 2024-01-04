// Imports:
import {
  Inter
} from "next/font/google";
import {
  ClerkProvider
} from "@clerk/nextjs";
import '../globals.css';

// Font:
const inter = Inter({
  subsets: ["latin"]
})

// Exports:
// Note: Apply Search Engine Optimization:
export const metadata = {
  title: 'Babble',
  description: 'Babble is the pulse of vibrant conversations and authentic connections. A dynamic social networking platform, Babble empowers users to share their thoughts, experiences, and creativity through bite-sized expressions called "Babs." Whether it is sparking discussions, joining diverse communities, or discovering like-minded individuals, Babble creates a space where every voice is heard. With seamless onboarding, secure authentication, and a visually appealing interface, Babble invites users to shape their digital journey, fostering a community-driven atmosphere that celebrates the richness of shared experiences. Join Babble and let your voice resonate in this tapestry of connection and expression!'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  // Return:
  return (

    // Clerk Provider:
    <ClerkProvider>

      {/* HTML: */}
      <html lang="en">

        {/* Body: */}
        <body className={`${inter.className} flex place-content-center bg-dark-1`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}