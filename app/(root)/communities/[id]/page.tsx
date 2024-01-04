// Imports:
import {
  currentUser
} from "@clerk/nextjs";
import {
  communityTabs
} from "@/constants";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  fetchCommunityDetails
} from "@/lib/actions/community.actions";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import Image from "next/image";

// Page:
async function Page({ params }: { params: { id: string } }) {

  // User:
  const user = await currentUser();

  // Note: Avoid TypeScript warning:
  if (!user) return null;

  // Note: Fetch Community Details:
  const communityDetails = await fetchCommunityDetails(params.id);

  // Return:
  return (

    // Section:
    <section>

      {/* Profile Header: */}
      <ProfileHeader
        accountId={communityDetails.createdBy.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type='Community' />

      <div className='mt-9'>

        {/* Tabs: */}
        <Tabs className='w-full' defaultValue='babs'>

          {/* Tabs List: */}
          <TabsList className='tab'>

            {/* Note: Map Community Tabs: */}
            {communityTabs.map((tab) => (

              // Tabs Trigger:
              <TabsTrigger className='tab' key={tab.label} value={tab.value}>

                {/* Image: */}
                <Image
                  className='object-contain'
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24} />

                {/* Title: */}
                <p className='max-sm:hidden'>
                  {tab.label}
                </p>

                {/* Note: Show Tabs if any Exist: */}
                {tab.label === "Babs" && (

                  // Title:
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {communityDetails.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tabs Content: */}
          <TabsContent className='w-full text-light-1' value='babs'>

            {/* Note: Ignore the following: */}
            {/* @ts-ignore */}
            {/* Threads Tab: */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType='Community'
            />
          </TabsContent>

          {/* Tabs Content: */}
          <TabsContent className='mt-9 w-full text-light-1' value='blabbers'>

            {/* Section: */}
            <section className='mt-9 flex flex-col gap-10'>

              {/* Note: Map Community Members: */}
              {communityDetails.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType='User' />
              ))}
            </section>
          </TabsContent>

          {/* Tabs Content: */}
          <TabsContent className='w-full text-light-1' value='requests'>

            {/* Note: Ignore the following: */}
            {/* @ts-ignore */}
            {/* Threads Tab: */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType='Community'
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

// Exports:
export default Page;