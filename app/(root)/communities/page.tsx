// Imports:
import {
  redirect
} from "next/navigation";
import {
  currentUser
} from "@clerk/nextjs";
import {
  fetchCommunities
} from "@/lib/actions/community.actions";
import {
  fetchUser
} from "@/lib/actions/user.actions";
import CommunityCard from "@/components/cards/CommunityCard";
import Pagination from "@/components/shared/Pagination";
import Searchbar from "@/components/shared/Searchbar";

// Page:
async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {

  // User:
  const user = await currentUser();

  // Note: Avoid TypeScript warning:
  if (!user) return null;

  // User Information:
  const userInfo = await fetchUser(user.id);

  // Note: Redirect the User if not Onboarded yet:
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Note: Fetch Communities:
  const result = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? + searchParams.page : 1,
    pageSize: 25,
  });

  // Return:
  return (
    <>

      {/* Heading: */}
      <h1 className='head-text'>
        Communities
      </h1>

      {/* Note: Search Communities */}
      <div className='mt-5'>
        <Searchbar routeType='communities' />
      </div>

      {/* Section: */}
      <section className='mt-9 flex flex-col flex-wrap gap-4'>

        {/* Note: Show "No community yet" if none Joined: */}
        {result.communities.length === 0 ? (

          // Title:
          <p className='no-result'>
            Unexplored horizons
          </p>
        ) :

          // Note: Show Communities if any Joined:
          (
            <>
              {/* Note: Map Communities: */}
              {result.communities.map((community) => (

                // Community Card:
                <CommunityCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  bio={community.bio}
                  members={community.members} />
              ))}
            </>
          )}
      </section>

      {/* Pagination: */}
      <Pagination
        path='communities'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext} />
    </>
  );
}

// Exports:
export default Page;