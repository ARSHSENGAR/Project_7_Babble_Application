// Imports:
import {
  currentUser
} from "@clerk/nextjs";
import {
  fetchUsers
} from "@/lib/actions/user.actions";
import {
  fetchCommunities
} from "@/lib/actions/community.actions";
import UserCard from "../cards/UserCard";


// RightSidebar:
async function RightSidebar() {

  // User:
  const user = await currentUser();

  // Note: Avoid TypeScript warning:
  if (!user) return null;

  // Note: Fetch Users:
  const similarMinds = await fetchUsers({
    userId: user.id,
    pageSize: 4,
  });
  // Note: Fetch Communities:
  const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 });

  // Return:
  return (

    // Section:
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>

        {/* Heading: */}
        <h3 className='text-heading4-medium text-light-1'>
          Kindred Realms
        </h3>
        <div className='mt-7 flex w-[350px] flex-col gap-9'>

          {/* Note: Show Communities if any Exist:  */}
          {suggestedCOmmunities.communities.length > 0 ? (
            <>

              {/* Note: Map Communities: */}
              {suggestedCOmmunities.communities.map((community) => (

                // User: Card:
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType='Community' />
              ))}
            </>
          ) :

            // Note: Show "No community yet" is none Exist:
            (

              // Title:
              <p className='!text-base-regular text-light-3'>
                Unexplored horizons
              </p>
            )}
        </div>
      </div>
      <div className='flex flex-1 flex-col justify-start'>

        {/* Heading: */}
        <h3 className='text-heading4-medium text-light-1'>
          Soul Companions
        </h3>

        {/* Minds: */}
        <div className='mt-7 flex w-[350px] flex-col gap-10'>

          {/* Note: Show Users if any Exist: */}
          {similarMinds.users.length > 0 ? (
            <>

              {/* Note: Map Users: */}
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User' />
              ))}
            </>
          ) :

            // Note: Show "No babbler yet" if none Exist:
            (

              // Title:
              <p className='!text-base-regular text-light-3'>
                Seeking shadows
              </p>
            )}
        </div>
      </div>
    </section>
  );
}

// Exports:
export default RightSidebar;