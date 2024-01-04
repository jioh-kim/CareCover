"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { jobFormSchema } from "@/lib/validator";
import * as z from "zod";
import { jobDefaultValues } from "@/constants";
import LocationDropdown from "./LocationDropdown";
import OccupationDropdown from "./OccupationDropdown";
import { Textarea } from "../ui/textarea";
// New components for date picker
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IJob } from "@/lib/database/models/Job.model";
import { useRouter } from "next/navigation";
import { createJob, updateJob } from "@/lib/actions/job.actions";
import { useState } from "react";

type JobFormProps = {
  userId: string;
  type: "Create" | "Update";
  job?: IJob;
  jobId?: string;
};

const JobForm = ({ userId, type, job, jobId }: JobFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const initialValues =
    job && type === "Update"
      ? {
          ...job,
          startDateTime: new Date(job.startDateTime),
          endDateTime: new Date(job.endDateTime),
          applicationDeadline: new Date(job.applicationDeadline),
        }
      : jobDefaultValues;

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof jobFormSchema>) {
    // const jobData = values;

    // console.log(jobData);

    if (type === "Create") {
      try {
        const newJob = await createJob({
          job: { ...values },
          userId,
          path: "/profile",
        });

        if (newJob) {
          form.reset();
          router.push(`/jobs/${newJob._id}`);
        }

        return JSON.parse(JSON.stringify(newJob));
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!jobId) {
        router.back();
        return;
      }
      try {
        const updatedJob = await updateJob({
          userId,
          job: { ...values, _id: jobId },
          path: `/jobs/${jobId}`,
        });

        if (updatedJob) {
          form.reset();
          router.push(`/jobs/${updatedJob._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className="flex-center flex flex-col gap-5 md:flex-row">
        {/* Occupation */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

            {/* Location */}

            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <LocationDropdown
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

            {/* Title */}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder=" " {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Job Description</FormLabel>
                  <FormControl className="h-72">
                    <Textarea
                      placeholder="Treating patients? etc, idk lol"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Introduce the duties and responsibilities of the role.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start date time */}
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End date time */}
              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Application Deadline*/}

            <FormField
              control={form.control}
              name="applicationDeadline"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel>Application Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
              {form.formState.isSubmitting ? "Submitting..." : `${type} Job `}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default JobForm;
