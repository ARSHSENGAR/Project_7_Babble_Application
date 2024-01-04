// Imports:
import {
  redirect
} from "next/navigation";
import {
  currentUser
} from "@clerk/nextjs";
import {
  fetchThreadById
} from "@/lib/actions/thread.actions";
import {
  fetchUser
} from "@/lib/actions/user.actions";
import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

// Exports:
export const revalidate = 0;

// Page:
async function page({ params }: { params: { id: string } }) {

  // Note: Handel if params.id is empty:
  if (!params.id) return null;

  // User:
  const user = await currentUser();

  // Note: Avoid TypeScript warning:
  if (!user) return null;

  // User Information:
  const userInfo = await fetchUser(user.id);

  // Note: Redirect the User if not Onboarded yet:
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Note: Fetch Thread by ID:
  const thread = await fetchThreadById(params.id);

  // Return:
  return (

    // Section:
    <section className='relative'>
      <div>

        {/* Thread Card: */}
        <ThreadCard
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children} />
      </div>
      <div className='mt-7'>

        {/* Comment: */}
        <Comment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)} />
      </div>
      <div className='mt-10'>

        {/* Note: Map Threads: */}
        {thread.children.map((childItem: any) => (

          // Thread Card:
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment />
        ))}
      </div>
    </section>
  );
}

// Exports:
export default page;