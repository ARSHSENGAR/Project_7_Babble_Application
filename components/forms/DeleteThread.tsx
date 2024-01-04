// Client Side Rendered Component:
"use client";

// Imports:
import {
  usePathname,
  useRouter
} from "next/navigation";
import {
  deleteThread
} from "@/lib/actions/thread.actions";
import Image from "next/image";

// Type: Props:
interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

// Delete Thread:
function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  // Note: If the the User is not the Author of the Thread:
  if (currentUserId !== authorId || pathname === "/") return null;

  // Return:
  return (

    // Image:
    <Image
      className='cursor-pointer object-contain'
      src='/assets/delete.svg'
      alt='delete'
      width={18}
      height={18}
      onClick={async () => {
        await deleteThread(JSON.parse(threadId), pathname);
        if (!parentId || !isComment) {
          router.push("/");
        }
      }}
    />
  );
}

// Exports:
export default DeleteThread;