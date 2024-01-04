// Imports:
import {
  Button
} from "../ui/button";
import Image from "next/image";
import Link from "next/link";

// Type: Props:
interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

// Community Card:
function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {

  // Return:
  return (

    // Article:
    <article className='community-card'>
      <div className='flex flex-wrap items-center gap-3'>

        {/* Link: */}
        <Link className='relative h-12 w-12' href={`/communities/${id}`}>

          {/* Image: */}
          <Image
            className='rounded-full object-cover'
            src={imgUrl}
            alt='community_logo'
            fill />
        </Link>
        <div>

          {/* Link: */}
          <Link href={`/communities/${id}`}>

            {/* Heading: */}
            <h4 className='text-base-semibold text-light-1'>
              {name}
            </h4>
          </Link>

          {/* Title: */}
          <p className='text-small-medium text-gray-1'>
            @{username}
          </p>
        </div>
      </div>

      {/* Title: */}
      <p className='mt-4 text-subtle-medium text-gray-1'>
        {bio}
      </p>
      <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>

        {/* Link: */}
        <Link href={`/communities/${id}`}>

          {/* Button: */}
          <Button className='community-card_btn' size='sm'>
            View
          </Button>
        </Link>

        {/* Note: If the User is a Member: */}
        {members.length > 0 && (
          <div className='flex items-center'>

            {/* Note: Map Members: */}
            {members.map((member, index) => (

              // Image:
              <Image
                className={`${index !== 0 && "-ml-2"
                  } rounded-full object-cover`}
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28} />
            ))}

            {/* Note: If there are more than (3) Members:*/}
            {members.length > 3 && (

              // Title:
              <p className='ml-1 text-subtle-medium text-gray-1'>
                {members.length}+ blabbers
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

// Exports:
export default CommunityCard;