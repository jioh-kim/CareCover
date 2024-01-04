import Collection from "@/components/shared/Collection";
import ProfileForm from "@/components/shared/ProfileForm";
import { Button } from "@/components/ui/button";
import { getJobsByUser } from "@/lib/actions/job.actions";
import { getProfileByUserId } from "@/lib/actions/profile.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const jobsPage = Number(searchParams?.jobsPage) || 1;
  
  const organizedJobs = await getJobsByUser({ userId, page: jobsPage });
  console.log(organizedJobs);

  return (
    <>
      {/* My Profile information */}

      {/* Create My Profile */}
      <section className="bg-slate-200 bg-dotted-pattern bg-cover bg-center py-5 md:py-5">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Create Profile</h3>
        </div>
      </section>
      <section className="wrapper my-8">
        <ProfileForm userId={userId} type="Create" />
      </section>

      {/* Edit My Profile */}
      <section className="bg-slate-200 bg-dotted-pattern bg-cover bg-center py-5 md:py-5">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Edit Profile</h3>
        </div>
      </section>
      <section className="wrapper my-8">
        <ProfileForm userId={userId} type="Create" />
      </section>

      {/* Jobs I posted */}
      <section className="bg-slate-200 bg-dotted-pattern bg-cover bg-center py-5 md:py-5">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Jobs</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/jobs/create">Post New</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedJobs?.data}
          emptyTitle="No jobs have been posted by you yet"
          emptyStateSubtext="Go create some now"
          collectionType="Jobs_Posted"
          limit={3}
          page={jobsPage}
          urlParamName="jobsPage"
          totalPages={organizedJobs?.totalPages}
        />
      </section>

      {/* Jobs I applied */}
      <section className="bg-slate-200 bg-dotted-pattern bg-cover bg-center py-5 md:py-5">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Applied Jobs</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/">Explore now</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
