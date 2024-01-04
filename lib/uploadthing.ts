// 1) https://docs.uploadthing.com/api-reference/react#generatereacthelpers
//    Note: The above Document is the provider of the following Code.

import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();