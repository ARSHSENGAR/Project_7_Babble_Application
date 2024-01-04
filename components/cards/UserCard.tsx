// Client Side Rendered Component:
"use client";

// Imports:
import {
  useRouter
} from "next/navigation";
import {
  Button
} from "../ui/button";
import Image from "next/image";

// Type: Props:
interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

// User Card:
function UserCard({ id, name, username, imgUrl, personType }: Props) {

  // Router:
  const router = useRouter();

  // Community:
  const isCommunity = personType === "Community";

  // Return:
  return (

    // Article:
    <article className='user-card'>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12'>

          {/* Image: */}
          <Image
            className='rounded-full object-cover'
            src={imgUrl}
            alt='user_logo'
            fill />
        </div>
        <div className='flex-1 text-ellipsis'>

          {/* Heading: */}
          <h4 className='text-base-semibold text-light-1'>
            {name}
          </h4>

          {/* Title: */}
          <p className='text-small-medium text-gray-1'>
            @{username}
          </p>
        </div>
      </div>

      {/* Button: */}
      <Button
        className='user-card_btn'
        onClick={() => {

          // Note: If it is Community's ID:
          if (isCommunity) {
            router.push(`/communities/${id}`);
          }

          // Note: If it is User's ID:
          else {
            router.push(`/profile/${id}`);
          }
        }}>
        View
      </Button>
    </article>
  );
}

// Exports:
export default UserCard;