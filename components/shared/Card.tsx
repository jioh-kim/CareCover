import { IJob } from "@/lib/database/models/Job.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
// import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  job: IJob;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ job, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isJobCreator = userId === job.postedBy._id.toString();

  return (
    <div className="group relative flex min-h-[200px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-200px]">
      {/* <Link
        href={`/jobs/${job._id}`}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      /> */}

      {/* IS EVENT CREATOR ... */}
      {isJobCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/jobs/${job._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation jobId={job._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {job.location.name}
            </p>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {job.occupation.name}
            </p>
          </div>
        )}

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(job.startDateTime).dateOnly} -{" "}
          {formatDateTime(job.endDateTime).dateOnly}
        </p>

        <Link href={`/jobs/${job._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {job.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {job.postedBy.firstName} {job.postedBy.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/jobs/${job._id}`} className="flex gap-2">
              <p className="text-primary-500">Edit Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
