// Client Side Rendered Component:
"use client";

// Imports:
import {
  usePathname
} from "next/navigation";
import {
  sidebarLinks
} from "@/constants";
import Image from "next/image";
import Link from "next/link";

// Bottombar:
function Bottombar() {

  // Path:
  const pathname = usePathname();

  // Return:
  return (

    // Section:
    <section className='bottombar'>
      <div className='bottombar_container'>

        {/* Note: Map Links: */}
        {sidebarLinks.map((link) => {

          // Note: If it is Active:
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          // Return:
          return (

            // Link:
            <Link className={`bottombar_link ${isActive && "bg-primary-500"}`}
              href={link.route}
              key={link.label}>

              {/* Image: */}
              <Image className='object-contain'
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16} />

              {/* Title: */}
              <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// Exports:
export default Bottombar;