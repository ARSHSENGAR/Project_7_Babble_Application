// Imports:
import {
  OrganizationSwitcher,
  SignedIn,
  SignOutButton
} from "@clerk/nextjs";
import {
  dark
} from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

// Topbar:
function Topbar() {

  // Return:
  return (

    // Navigationbar:
    <nav className='topbar'>

      {/* Link: */}
      <Link className='flex items-center gap-4'
        href='/'>

        {/* Image: */}
        <Image src='/logo.png'
          alt='logo'
          width={96}
          height={96} />

        {/* Title: */}
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>
          Babble
        </p>
      </Link>
      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>

          {/* Note: Once Signed-In: */}
          <SignedIn>

            {/* Sign-Out: */}
            {/* Button: */}
            <SignOutButton>
              <div className='flex cursor-pointer'>

                {/* Image: */}
                <Image src='/assets/logout.svg'
                  alt='logout'
                  width={24}
                  height={24} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        {/* Organization Switcher: */}
        <OrganizationSwitcher

          // Styles:
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}

// Exports:
export default Topbar;