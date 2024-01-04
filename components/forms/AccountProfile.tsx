// Client Side Rendered Component:
"use client";

// Imports:
import {
  usePathname,
  useRouter
} from "next/navigation";
import {
  ChangeEvent,
  useState
} from "react";
import {
  useForm
} from "react-hook-form";
import {
  zodResolver
} from "@hookform/resolvers/zod";
import {
  Button
} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Input
} from "@/components/ui/input";
import {
  Textarea
} from "@/components/ui/textarea";
import {
  updateUser
} from "@/lib/actions/user.actions";
import {
  UserValidation
} from "@/lib/validations/user";
import {
  useUploadThing
} from "@/lib/uploadthing";
import {
  isBase64Image
} from "@/lib/utils";
import Image from "next/image";
import * as z from "zod";

// Type: Props:
interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

// Account Profile:
const AccountProfile = ({
  user,
  btnTitle
}: Props) => {

  // Router:
  const router = useRouter();

  // Path:
  const pathname = usePathname();

  // Upload:
  const {
    startUpload
  } = useUploadThing("media");

  // Files:
  const [files, setFiles] = useState<File[]>([]);

  // Form:
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image ? user.image : "",
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
    },
  });

  // Note: On Submit:
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;

    // Note: Has the Image Changed:
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      // Note: I used "url" instead of "fileUrl":
      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    // Update User:
    await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      userId: user.id,
      bio: values.bio,
      image: values.profile_photo,
    });
    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  // Handle Image:
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    // File Reader:
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Return:
  return (

    // Form:
    <Form {...form}>
      <form
        className='flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}>

        {/* Field: Profile Photo: */}
        <FormField
          control={form.control}
          name='profile_photo'
          render={({
            field
          }) => (

            // Item:
            <FormItem className='flex items-center gap-4'>

              {/* Label: */}
              <FormLabel className='account-form_image-label'>

                {/* Note: If Profile Image Exist: */}
                {field.value ? (

                  // Image:
                  <Image className='rounded-full object-contain'
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority />
                ) :

                  // Note: If Profile Image does not Exist:
                  (

                    // Image:
                    <Image className='object-contain'
                      src='/assets/profile.svg'
                      alt='profile_icon'
                      width={24}
                      height={24} />
                  )}
              </FormLabel>

              {/* Control: */}
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input className='account-form_image-input'
                  type='file'
                  accept='image/*'
                  placeholder='Give yourself a face'
                  onChange={(e) => handleImage(e, field.onChange)} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Field: Name: */}
        <FormField
          control={form.control}
          name='name'
          render={({
            field
          }) => (

            // Item:
            <FormItem className='flex w-full flex-col gap-3'>

              {/* Label: */}
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>

              {/* Control: */}
              <FormControl>
                <Input className='account-form_input no-focus'
                  type='text'
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field: Username: */}
        <FormField
          control={form.control}
          name='username'
          render={({
            field
          }) => (

            // Item:
            <FormItem className='flex w-full flex-col gap-3'>

              {/* Label: */}
              <FormLabel className='text-base-semibold text-light-2'>
                Blabber ID
              </FormLabel>

              {/* Control: */}
              <FormControl>
                <Input className='account-form_input no-focus'
                  type='text'
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field: Bio: */}
        <FormField
          control={form.control}
          name='bio'
          render={({
            field
          }) => (

            // Item:
            <FormItem className='flex w-full flex-col gap-3'>

              {/* Label: */}
              <FormLabel className='text-base-semibold text-light-2'>
                Bio
              </FormLabel>

              {/* Control: */}
              <FormControl>
                <Textarea className='account-form_input no-focus'
                  rows={10}
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit: */}
        {/* Button: */}
        <Button className='bg-primary-500'
          type='submit'>
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
};

// Exports:
export default AccountProfile;