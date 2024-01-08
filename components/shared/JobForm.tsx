"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
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
import { useEffect, useState } from "react";

// New components for map
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import usePlacesAutocomplete from "use-places-autocomplete";

type JobFormProps = {
  userId: string;
  type: "Create" | "Update";
  job?: IJob;
  jobId?: string;
};

const JobForm = ({ userId, type, job, jobId }: JobFormProps) => {
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

  // For Maps Autocomplete search for the form
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      types: ["address"],
    },
    debounce: 300,
  });

  const handleSelect =
    ({ description }: any) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API by setting the second parameter to "false"
      setValue(description, false);
      setOpen(false);
      clearSuggestions();
    };

  return (
    <>
      <div className="flex-center flex flex-col gap-5 md:flex-row">
        {/* Occupation */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-1/2"
          >
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

            {/* City */}
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
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

            {/* Clinic Address */}
            <FormField
              control={form.control}
              name="clinicAddress"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Clinic Address</FormLabel>
                  <Command>
                    <CommandInput
                      placeholder="716 Rainbow Street, Toronto, ON, Canada"
                      value={value}
                      onValueChange={setValue}
                      disabled={!ready}
                    />
                    <CommandGroup>
                      {data.map((suggestion) => (
                        <CommandItem
                          value={suggestion.description}
                          key={suggestion.place_id}
                          onSelect={() => {
                            handleSelect(suggestion)(); // Call handleSelect to update local state and clear suggestions
                            form.setValue(
                              "clinicAddress",
                              suggestion.description
                            ); // Update react-hook-form state
                          }}
                        >
                          {/* <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              suggestion.description === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          /> */}
                          {suggestion.description}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
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
                  <FormControl className="h-60">
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

            {/* Requirements */}
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Job Requirements</FormLabel>
                  <FormControl className="h-60">
                    <Textarea placeholder="Insurance?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salary */}
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="minPay"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Pay Range (Hourly)</FormLabel>
                    <FormControl>
                      <Input placeholder="Min" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h2 className="h1 pt-10 px-5">—</h2>

              <FormField
                control={form.control}
                name="maxPay"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="invisible">Max Pay range</FormLabel>
                    <FormControl>
                      <Input placeholder="Max" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Start date time */}
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-grow">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "flex-grow pl-3 text-left font-normal",
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
                  <FormItem className="flex flex-col flex-grow">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "flex-grow pl-3 text-left font-normal",
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
                            "flex pl-3 text-left font-normal",
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