import { getJobById } from "@/lib/actions/job.actions";
import { SearchParamProps } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import React from "react";
import Image from "next/image";

const JobDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const job = await getJobById(id);

  console.log(job);

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-contain">
        <div className="grid grid-cols-1 w-1/2">
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{job.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Badge variant="location" className="p-medium-14">
                  {job.location.name}
                </Badge>
                <Badge variant="occupation" className="p-medium-14">
                  {job.occupation.name}
                </Badge>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  Posted by{" "}
                  <span className="text-primary-500">
                    {job.postedBy.firstName} {job.postedBy.lastName}
                  </span>
                </p>
              </div>
            </div>

            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-900"></hr>

            <div className="wrapper grid grid-cols-1 md:grid-cols-2 2xl:gap-0">
              <div className="mb-5 ml-5">
                <span>Application Deadline</span>
                <br />
                <strong>
                  {formatDateTime(job.applicationDeadline).dateOnly}
                </strong>
              </div>

              <div className="mb-5 mr-5">
                <span>Estimated Pay</span>
                <br />
                <strong>
                  ${job.minPay} - ${job.maxPay} / hr
                </strong>
              </div>

              <div className="mt-5 ml-5">
                <span>Posted Date</span>
                <br />
                <strong>{formatDateTime(job.createdAt).dateOnly}</strong>
              </div>

              <div className="mt-5 mr-5">
                <span>Job Period</span>
                <br />
                <strong>
                  {formatDateTime(job.startDateTime).dateOnly} -{" "}
                  {formatDateTime(job.endDateTime).dateOnly}
                </strong>
              </div>
            </div>

            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-900"></hr>

            <div className="flex flex-col gap-2">
              <h2 className="h5-bold text-grey-600">About the role</h2>
              <p className="p-bold-20 text-grey-600">Description: </p>
              <p className="p-medium-16 lg:p-regular-18">{job.description}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">Requirements: </p>
              <p className="p-medium-16 lg:p-regular-18">{job.requirements}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetails;
