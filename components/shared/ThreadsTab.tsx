// Imports:
import {
  redirect
} from "next/navigation";
import {
  fetchCommunityPosts
} from "@/lib/actions/community.actions";
import {
  fetchUserPosts
} from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";

// Type: Result:
interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}


// Type: Props:
interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

// Threads Tab:
async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  // Note: If Account belongs to Community:
  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  }

  // Note: If Account belongs to User:
  else {
    result = await fetchUserPosts(accountId);
  }

  // Note: Redirect the User if No Threads are Found:
  if (!result) {
    redirect("/");
  }

  // Return:
  return (

    // Section:
    <section className='mt-9 flex flex-col gap-10'>

      {/* Note: Map Threads: */}
      {result.threads.map((thread) => (

        // Thread Card:
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                name: thread.author.name,
                image: thread.author.image,
                id: thread.author.id,
              }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children} />
      ))}
    </section>
  );
}

// Exports:
export default ThreadsTab;