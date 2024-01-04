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
import OccupationDropdown from "./OccupationDropdown";
import { Input } from "../ui/input";

// File Uploader
import { FileUploader } from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jobDefaultValues, profileDefaultValues } from "@/constants";
import { createProfile, updateProfile } from "@/lib/actions/profile.actions";
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
  profileData?: IProfile;
  profileId?: string;
};

const ProfileForm = ({ userId, type, profileData, profileId }: ProfileFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    profileData && type == "Update"
      ? {
          ...profileData,
        }
      : profileDefaultValues;

  const router = useRouter();

  const { startUpload } = useUploadThing("fileUploader");

  // 1. Define your form.
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    let fileUrl = values.certificationUrl;

    if (type === "Create") {
      try {
        const profileInfo = await createProfile({
          profileDetails: { ...values },
          userId,
          path: "/profile",
        });

        if (profileInfo) {
          console.log("Information updated");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      try {
        const updatedProfileInfo = await updateProfile({
          userId,
          profileDetails: { ...values, _id: profileId || "" },
          path: "/profile",
        });

        if (updatedProfileInfo) {
          router.refresh();
          router.push(`/profile`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className="flex-center flex flex-col gap-5 md:flex-row">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/2 space-y-8"
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
