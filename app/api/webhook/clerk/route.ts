// 1) https://clerk.com/docs/users/sync-data-to-your-backend
//    Note: The above Document shows why we need WebHooks and how to Sync Data to Backend.
// 2) https://docs.svix.com/receiving/verifying-payloads/why
//    Note: The above Documnet shows why is it a good practice to verify WebHooks.
// Note: Use CamelCase Approach:
// eslint-disable camelcase
// Imports:
import {
  headers
} from "next/headers";
import {
  NextResponse
} from "next/server";
import {
  IncomingHttpHeaders
} from "http";
import {
  Webhook,
  WebhookRequiredHeaders
} from "svix";
import {
  addMemberToCommunity,
  createCommunity,
  deleteCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
} from "@/lib/actions/community.actions";

// 3) https://clerk.com/docs/integration/webhooks#supported-events
//    Note: The above Document lists the Supported Events.
type EventType =
  | "organization.created"
  | "organizationInvitation.created"
  | "organizationMembership.created"
  | "organizationMembership.deleted"
  | "organization.updated"
  | "organization.deleted";
type Event = {
  data: Record<string, string | number | Record<string, string>[]>;
  object: "event";
  type: EventType;
};

// Exports:
export const POST = async (request: Request) => {
  const payload = await request.json();
  const header = headers();
  const heads = {
    "svix-id": header.get("svix-id"),
    "svix-timestamp": header.get("svix-timestamp"),
    "svix-signature": header.get("svix-signature"),
  };

  // Note: Activitate WebHook in the Clerk Dashboard:
  // Note: Activated after the endpoint is added:
  const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || "");
  let evnt: Event | null = null;
  try {
    evnt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {

    // Return:
    return NextResponse.json({ message: err }, { status: 400 });
  }
  const eventType: EventType = evnt?.type!;

  // Note: Listen to the Organization Creation Events
  if (eventType === "organization.created") {

    // 4) https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/CreateOrganization
    //    Note: The above Document shows what evnt?.data sends here:
    const { id, name, slug, logo_url, image_url, created_by } =
      evnt?.data ?? {};
    try {

      // Note: Ignore the following:
      // @ts-ignore
      await createCommunity(

        // Note: Ignore the following:
        // @ts-ignore
        id,
        name,
        slug,
        logo_url || image_url,
        "org bio",
        created_by
      );

      // Return:
      return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  // Note: Listen to the Organization Invitation Creation Events:
  // Note: I can create a New Mongoose Action and add Pending Invites in the Database:
  if (eventType === "organizationInvitation.created") {
    try {
      // 5) https://clerk.com/docs/reference/backend-api/tag/Organization-Invitations#operation/CreateOrganizationInvitation
      //    Note: The above Document shows what evnt?.data sends here:
      console.log("Invitation created", evnt?.data);

      // Return:
      return NextResponse.json(
        { message: "Invitation created" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      // Return:
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  // Note: Listen to the Organization Membership Creation Events:
  if (eventType === "organizationMembership.created") {
    try {
      // 6) https://clerk.com/docs/reference/backend-api/tag/Organization-Memberships#operation/CreateOrganizationMembership
      //    Note: The above Document shows what evnt?.data sends here:
      const { organization, public_user_data } = evnt?.data;
      console.log("created", evnt?.data);

      // Note: Ignore the following:
      // @ts-ignore
      await addMemberToCommunity(organization.id, public_user_data.user_id);

      // Return:
      return NextResponse.json(
        { message: "Invitation accepted" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      // Return:
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  // Note: Listen to the Organization Member Deletion Events:
  if (eventType === "organizationMembership.deleted") {
    try {
      // 7) https://clerk.com/docs/reference/backend-api/tag/Organization-Memberships#operation/DeleteOrganizationMembership
      //    Note: The above Document shows what evnt?.data sends here:
      const { organization, public_user_data } = evnt?.data;
      console.log("removed", evnt?.data);

      // Note: Ignore the following:
      // @ts-ignore
      await removeUserFromCommunity(public_user_data.user_id, organization.id);

      // Return:
      return NextResponse.json({ message: "Member removed" }, { status: 201 });
    } catch (err) {
      console.log(err);

      // Return:
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  // Note: Listen to the Organization Updation Events:
  if (eventType === "organization.updated") {
    try {
      // 8) https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/UpdateOrganization
      //    Note: The above Document shows what evnt?.data sends here:
      const { id, logo_url, name, slug } = evnt?.data;
      console.log("updated", evnt?.data);

      // Note: Ignore the following:
      // @ts-ignore
      await updateCommunityInfo(id, name, slug, logo_url);

      // Return:
      return NextResponse.json({ message: "Member removed" }, { status: 201 });
    } catch (err) {
      console.log(err);

      // Return:
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  // Note: Listen to the Organization Deletion Events:
  if (eventType === "organization.deleted") {
    try {
      // 9) https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/DeleteOrganization
      //    Note: The above Document shows what evnt?.data sends here:
      const { id } = evnt?.data;
      console.log("deleted", evnt?.data);

      // Note: Ignore the following:
      // @ts-ignore
      await deleteCommunity(id);

      // Return:
      return NextResponse.json(
        { message: "Organization deleted" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      // Return:
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
};