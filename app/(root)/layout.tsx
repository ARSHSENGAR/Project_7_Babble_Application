// Imports:
import type {
  Metadata
} from 'next';
import {
  Inter
} from 'next/font/google';
import {
  ClerkProvider
} from '@clerk/nextjs';
import Topbar from '@/components/shared/Topbar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import RightSidebar from '@/components/shared/RightSidebar';
import Bottombar from '@/components/shared/Bottombar';
import '../globals.css';

// Font:
const inter = Inter({
  subsets: ['latin']
})

// Exports:
export const metadata = {
  title: 'Babble',
  description: 'Babble is the pulse of vibrant conversations and authentic connections. A dynamic social networking platform, Babble empowers users to share their thoughts, experiences, and creativity through bite-sized expressions called "Babs." Whether it is sparking discussions, joining diverse communities, or discovering like-minded individuals, Babble creates a space where every voice is heard. With seamless onboarding, secure authentication, and a visually appealing interface, Babble invites users to shape their digital journey, fostering a community-driven atmosphere that celebrates the richness of shared experiences. Join Babble and let your voice resonate in this tapestry of connection and expression!'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // Return:
  return (

    // Clerk Provider:
    <ClerkProvider>

      {/* Page: */}
      <html lang="en">

        {/* Body: */}
        <body className={inter.className}>

          {/* Topbar: */}
          <Topbar />

          {/* Main: */}
          <main className="flex flex-row">

            {/* LeftSidebar: */}
            <LeftSidebar />

            {/* Section: */}
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>

            {/* RightSidebar: */}
            <RightSidebar />
          </main>

          {/* Bottombar: */}
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}