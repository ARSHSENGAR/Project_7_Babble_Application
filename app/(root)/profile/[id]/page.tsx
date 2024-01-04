// Imports:
import {
  redirect
} from "next/navigation";
import {
  currentUser
} from "@clerk/nextjs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  profileTabs
} from "@/constants";
import {
  fetchUser
} from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import Image from "next/image";

// Page:
async function Page({ params }: { params: { id: string } }) {

  // User:
  const user = await currentUser();

  // Note: Avoid TypeScript warning:
  if (!user) return null;

  // User Information:
  const userInfo = await fetchUser(params.id);

  // Note: Redirect the User if not Onboarded yet:
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Return:
  return (

    // Section:
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio} />
      <div className='mt-9'>

        {/* Tabs: */}
        <Tabs className='w-full' defaultValue='babs'>

          {/* Tabs List: */}
          <TabsList className='tab'>

            {/* Note: Map Profile Tabs: */}
            {profileTabs.map((tab) => (

              // Tab Trigger:
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
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Note: Map Profile Tabs: */}
          {profileTabs.map((tab) => (

            // Tabs Content:
            <TabsContent
              className='w-full text-light-1'
              key={`content-${tab.label}`}
              value={tab.value}>

              {/* Note: Ignore the following: */}
              {/* @ts-ignore */}
              {/* Threads Tab: */}
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User' />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

// Exports:
export default Page;