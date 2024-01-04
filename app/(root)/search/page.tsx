// Imports:
import {
  redirect
} from "next/navigation";
import {
  currentUser
} from "@clerk/nextjs";
import {
  fetchUser,
  fetchUsers
} from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
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

  // Note: Fetch Users:
  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  // Return:
  return (

    // Section:
    <section>
      <h1 className='head-text mb-10'>
        Search
      </h1>

      {/* Searchbar: */}
      <Searchbar routeType='search' />
      <div className='mt-14 flex flex-col gap-9'>

        {/* Note: Show "Nothing yet" if none are Found:*/}
        {result.users.length === 0 ? (

          // Title:
          <p className='no-result'>
            Still seeking shadows
          </p>
        ) :

          // Note: Show Users if any are Found:
          (
            <>
              {/* Note: Map Users: */}
              {result.users.map((person) => (

                // User Card:
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User' />
              ))}
            </>
          )}
      </div>

      {/* Pagination: */}
      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext} />
    </section>
  );
}

// Exports:
export default Page;