// Imports:
import {
  redirect
} from "next/navigation";
import {
  currentUser
} from "@clerk/nextjs";
import {
  fetchUser
} from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

// Page:
async function Page() {

  // User:
  const user = await currentUser();

  // Note: Avoid TypeScript warning:
  if (!user) return null;

  // User Information:
  const userInfo = await fetchUser(user.id);

  // Note: Redirect the User once Onboarded:
  if (userInfo?.onboarded) redirect("/");

  // User Data:
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  // Return:
  return (

    // Main:
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>

      {/* Heading: */}
      <h1 className='head-text'>
        Onboarding
      </h1>

      {/* Title: */}
      <p className='mt-3 text-base-regular text-light-2'>
        Who do you long to be
      </p>

      {/* Section: */}
      <section className='mt-9 bg-dark-2 p-10'>

        {/* Account: */}
        <AccountProfile user={userData}
          btnTitle='Embark' />
      </section>
    </main>
  );
}

// Exports:
export default Page;