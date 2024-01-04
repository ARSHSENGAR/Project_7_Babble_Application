// Imports:
import {
  SignIn
} from "@clerk/nextjs";
import {
  dark
} from "@clerk/themes";

// Exports:
export default function Page() {

  // Return:
  return <SignIn
  appearance={{
    baseTheme: dark
  }} />;
}