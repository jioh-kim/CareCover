import { getJobById } from "@/lib/actions/job.actions";
import { SearchParamProps } from "@/types";
import { formatDateTime } from "@/lib/utils";
import React from "react";
import Image from "next/image";

const JobDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const job = await getJobById(id);

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{job.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {job.location.name}
                  </p>
                </div>

                <div className="flex gap-3">
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {job.occupation.name}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  Posted by{" "}
                  <span className="text-primary-500">
                    {job.postedBy.firstName} {job.postedBy.lastName}
                  </span>
                </p>
              </div>
            </div>

            {/* <CheckoutButton job={job} /> */}

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(job.startDateTime).dateOnly} -{" "}
                    {formatDateTime(job.endDateTime).dateOnly}
                  </p>
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">
                  Location: {job.location.name}
                </p>
              </div>

            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">Job Description: </p>
              <p className="p-medium-16 lg:p-regular-18">{job.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetails;
