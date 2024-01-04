// Imports:
import {
  redirect
} from "next/navigation";
import {
  currentUser
} from "@clerk/nextjs";
import {
  fetchUser,
  getActivity
} from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";

// Page:
async function Page() {

  // User:
  const user = await currentUser();

  // Note: Avoid TypeScript warning:
  if (!user) return null;

  // User Information:
  const userInfo = await fetchUser(user.id);

  // Note: Redirect the User if not Onboarded yet:
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Activity:
  const activity = await getActivity(userInfo._id);

  // Return:
  return (
    <>

      {/* Heading: */}
      <h1 className='head-text'>
        Activity
      </h1>

      {/* Section: */}
      <section className='mt-10 flex flex-col gap-5'>

        {/* Note: Show Activity if any Occures: */}
        {activity.length > 0 ? (
          <>

            {/* Note: Map Activity: */}
            {activity.map((activity) => (

              // Link:
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>

                {/* Article: */}
                <article className='activity-card'>

                  {/* Image: */}
                  <Image
                    className='rounded-full object-cover'
                    src={activity.author.image}
                    alt='user_logo'
                    width={20}
                    height={20} />

                  {/* Title: */}
                  <p className='!text-small-regular text-light-1'>

                    {/* Sub Title: */}
                    <span className='mr-1 text-primary-500'>
                      {activity.author.name}
                    </span>{" "}
                    echoed your Bab
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) :

          // Note: Show "No activity yet" message if none Occures:
          (

            // Title:
            <p className='!text-base-regular text-light-3'>
              Silent echo
            </p>
          )}
      </section>
    </>
  );
}

// Exports:
export default Page;