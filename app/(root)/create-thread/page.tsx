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
import PostThread from "@/components/forms/PostThread";

// Page:
async function Page() {

  // User:
  const user = await currentUser();

  // Note: Avoid TypeScript warning:
  if (!user) return null;

  // User Information:
  // Note: Fetch Organizations
  const userInfo = await fetchUser(user.id);

  // Note: Redirect the User if not Onboarded yet:
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Return:
  return (
    <>

      {/* Heading: */}
      <h1 className='head-text'>
        Babble Away
      </h1>

      {/* Post Thread: */}
      <PostThread userId={userInfo._id} />
    </>
  );
}

// Exports:
export default Page;