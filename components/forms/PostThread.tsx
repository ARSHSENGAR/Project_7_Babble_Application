// Client Side Rendered Component:
"use client";

// Imports:
import {
  usePathname,
  useRouter
} from "next/navigation";
import {
  useForm
} from "react-hook-form";
import {
  zodResolver
} from "@hookform/resolvers/zod";
import {
  useOrganization
} from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Button
} from "@/components/ui/button";
import {
  Textarea
} from "@/components/ui/textarea";
import {
  createThread
} from "@/lib/actions/thread.actions";
import {
  ThreadValidation
} from "@/lib/validations/thread";
import * as z from "zod";

// Type: Props:
interface Props {
  userId: string;
}

// Post Thread:
function PostThread({ userId }: Props) {

  // Router:
  const router = useRouter();

  // Path:
  const pathname = usePathname();

  // Organozation:
  const {
    organization
  } = useOrganization();

  // Form:
  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  // Note: On Submit:
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    // Note: Push to Router:
    router.push("/");
  };

  // Return:
  return (

    // Form:
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}>

        {/* Field: Thread: */}
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (

            // Item:
            <FormItem className='flex w-full flex-col gap-3'>

              {/* Label: */}
              <FormLabel className='text-base-semibold text-light-2'>
                Express
              </FormLabel>

              {/* Control: */}
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>

                {/* Text Area: */}
                <Textarea rows={15}
                  {...field} />
              </FormControl>

              {/* Message: */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit: */}
        {/* Button: */}
        <Button className='bg-primary-500' type='submit'>
          Post
        </Button>
      </form>
    </Form>
  );
}

// Exports:
export default PostThread;