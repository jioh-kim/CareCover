"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OccupationDropdown from "./OccupationDropdown";
import { Input } from "../ui/input";

// File Uploader
import { FileUploader } from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jobDefaultValues, profileDefaultValues } from "@/constants";
import { createProfile } from "@/lib/actions/profile.actions";
import { IProfile } from "@/lib/database/models/Profile.model";

const profileFormSchema = z.object({
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters." })
    .max(160, { message: "Bio must not be longer than 30 characters." }),
  occupationId: z.string(),
  licenseNumber: z.string(),
  yearOfExp: z.string(),
  certificationUrl: z.string().optional(),
});

type ProfileFormProps = {
  userId: string;
  type: "Create" | "Update";
  profile?: IProfile;
  profileId?: string;
};

const ProfileForm = ({ userId, type }: ProfileFormProps) => {

  console.log("user Id is", userId);

  const [files, setFiles] = useState<File[]>([]);
  const initialValues = profileDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("fileUploader");

  // 1. Define your form.
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    const profileData = values;
    console.log(profileData);

    let fileUrl = values.certificationUrl;

    try {
      const updatedProfileInfo = await createProfile({
        profileDetails: { ...values },
        userId,
        path: "/profile",
      });

      if (updatedProfileInfo) {
        console.log("Information updated");
      }
    } catch (error) {
      console.log(error);
    }

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(values, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Occupation */}
            <FormField
              control={form.control}
              name="occupationId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <OccupationDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* License Number */}
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Year of Experience */}
            <FormField
              control={form.control}
              name="yearOfExp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Experience</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="3"
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certificationUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Certification</FormLabel>
                  <FormControl className="h-72">
                    <FileUploader
                      fileUrl={field.value ?? ""}
                      onFieldChange={field.onChange}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? "Submitting..." : `Update Profile`}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProfileForm;
