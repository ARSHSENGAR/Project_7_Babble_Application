// Client Side Rendered Component:
"use client";

// Imports:
import {
  usePathname
} from "next/navigation";
import {
  useForm
} from "react-hook-form";
import {
  zodResolver
} from "@hookform/resolvers/zod";
import {
  z
} from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Button
} from "../ui/button";
import {
  Input
} from "../ui/input";
import {
  addCommentToThread
} from "@/lib/actions/thread.actions";
import {
  CommentValidation
} from "@/lib/validations/thread";
import Image from "next/image";

// Type: Props:
interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

// Comment:
function Comment({ threadId, currentUserImg, currentUserId }: Props) {

  // Path:
  const pathname = usePathname();

  // Form:
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  // Note: On Submit:
  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );

    // Note: Reset Form:
    form.reset();
  };

  // Return:
  return (

    // Form:
    <Form {...form}>
      <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>

        {/* Field: Thread: */}
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (

            // Item:
            <FormItem className='flex w-full items-center gap-3'>

              {/* Label: */}
              <FormLabel>

                {/* Image: */}
                <Image
                  className='rounded-full object-cover'
                  src={currentUserImg}
                  alt='current_user'
                  width={48}
                  height={48} />
              </FormLabel>

              {/* Control: */}
              <FormControl className='border-none bg-transparent'>

                {/* Input: */}
                <Input
                  className='no-focus text-light-1 outline-none'
                  type='text'
                  placeholder='Speak your echo...'
                  {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit: */}
        {/* Button: */}
        <Button className='comment-form_btn' type='submit'>
          Reply
        </Button>
      </form>
    </Form>
  );
}

// Exports:
export default Comment;