// Imports:
import {
  redirect
} from "next/navigation";
import {
  currentUser
} from "@clerk/nextjs";
import {
  fetchPosts
} from "@/lib/actions/thread.actions";
import {
  fetchUser
} from "@/lib/actions/user.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

// Home:
async function Home({
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

  // Note: Fetch Posts:
  const result = await fetchPosts(
    searchParams.page ? + searchParams.page : 1,
    30
  );

  // Return:
  return (
    <>

      {/* Heading: */}
      <h1 className='head-text text-left'>
        Home
      </h1>

      {/* Section: */}
      <section className='mt-9 flex flex-col gap-10'>

        {/* Note: Show "No babs yet" if none Exist:*/}
        {result.posts.length === 0 ? (

          // Title:
          <p className='no-result'>
            Whispers await
          </p>
        ) :
          // Note: Show Babbles if any Exist:
          (
            <>

              {/* Note: Map Posts: */}
              {result.posts.map((post) => (

                // Thread Card:
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children} />
              ))}
            </>
          )}
      </section>

      {/* Pagination: */}
      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext} />
    </>
  );
}

// Exports:
export default Home;