// Imports:
import {
    createNextRouteHandler
} from "uploadthing/next";
import {
    ourFileRouter
} from "./core";

// Exports:
// Export Routes for my Application's Router:
export const {
    GET,
    POST
} = createNextRouteHandler({
    router: ourFileRouter,
});