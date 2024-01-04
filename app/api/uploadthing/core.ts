// Imports:
import {
  createUploadthing,
  type FileRouter
} from "uploadthing/next";
import {
  currentUser
} from "@clerk/nextjs";

// Note: Create Uploadthing:
const f = createUploadthing();

// Note: Get User:
const getUser = async () => await currentUser();

// Exports:
export const ourFileRouter = {

  // Uploadthing:
  // Note: Define as many File Routes, each with a unique Route Slug:
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })

    // Middleware:
    // Note: Set Permissions and File Types for the current File Route:
    .middleware(async (req) => {

      // User:
      // Note: This code Runs on my Server before the User Uploads:
      const user = await getUser();

      // Note: If I throw this Error, the User will not be able to Upload:
      if (!user) throw new Error("Unauthorized");

      // Return:
      // Note: Whatever it returns here is accessible in onUploadComplete as metadata:
      return { userId: user.id };
    })

    //OnUploadComplete: 
    .onUploadComplete(async ({ metadata, file }) => {

      // Note: This code Runs on my Server after the User Uploads:
      console.log("Upload complete for userId:", metadata.userId);

      // Note: Gives the URL of the Uploaded File:
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

// Exports:
export type OurFileRouter = typeof ourFileRouter;