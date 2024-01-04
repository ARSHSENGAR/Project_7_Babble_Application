// Client Side Rendered Component:
"use client";

// Imports:
import {
  usePathname,
  useRouter
} from "next/navigation";
import {
  sidebarLinks
} from "@/constants";
import {
  SignOutButton,
  SignedIn,
  useAuth
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

// LeftSidebar:
const LeftSidebar = () => {

  // Router:
  const router = useRouter();

  // Path:
  const pathname = usePathname();

  // ID:
  const {
    userId
  } = useAuth();
  return (

    // Section:
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>

        {/* Note: Map Links: */}
        {sidebarLinks.map((link) => {

          // Note: If it is Active:
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          // Note: If Route leads to Profile:
          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          return (

            // Link:
            <Link className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
              href={link.route}
              key={link.label}>

              {/* Image: */}
              <Image src={link.imgURL}
                alt={link.label}
                width={24}
                height={24} />

              {/* Title: */}
              <p className='text-light-1 max-lg:hidden'>
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className='mt-10 px-6'>

        {/* Note: Once Signed In: */}
        <SignedIn>

          {/* Sign-Out: */}
          {/* Button: */}
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className='flex cursor-pointer gap-4 p-4'>

              {/* Image: */}
              <Image src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24} />

              {/* Title: */}
              <p className='text-light-2 max-lg:hidden'>
                Back to silence
              </p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

// Exports:
export default LeftSidebar;