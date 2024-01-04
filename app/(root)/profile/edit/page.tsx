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

  //User:
  const user = await currentUser();

  // Note: Avoid TypeScript warning:
  if (!user) return null;

  // Information:
  const userInfo = await fetchUser(user.id);

  // Note: Redirect the User if not Onboarded yet:
  if (!userInfo?.onboarded) redirect("/onboarding");

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
    <>

      {/* Heading: */}
      <h1 className='head-text'>
        Edit Profile
      </h1>

      {/* Title: */}
      <p className='mt-3 text-base-regular text-light-2'>
        Craft Your Essence
      </p>

      {/* Section: */}
      <section className='mt-12'>

        {/* Account Profile: */}
        <AccountProfile user={userData} btnTitle='Unveil Your Altered Self' />
      </section>
    </>
  );
}

// Exports:
export default Page;