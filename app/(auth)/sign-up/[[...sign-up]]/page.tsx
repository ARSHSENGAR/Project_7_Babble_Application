// Imports:
import {
  SignUp
} from "@clerk/nextjs";
import {
  dark
} from "@clerk/themes";

// Exports:
export default function Page() {

  // Return:
  return <SignUp
  appearance={{
    baseTheme: dark
  }} />;
}