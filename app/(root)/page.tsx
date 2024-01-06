import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";
import Image from "next/image";
import Link from "next/link";
import { getAllJobs } from "@/lib/actions/job.actions";
import Search from "@/components/shared/Search";
import LocationFilter from "@/components/shared/LocationFilter";
import OccupationFilter from "@/components/shared/OccupationFilter";
import { SearchParamProps } from "@/types";
import Prefooter from "@/components/shared/Prefooter";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const location = (searchParams?.location as string) || "";
  const occupation = (searchParams?.occupation as string) || "";

  const jobs = await getAllJobs({
    query: searchText,
    location,
    occupation,
    page: 1,
    limit: 6,
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-200 bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Finding Locum made easier for Healthcare Professionals.
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              CareCover is a platform that connects healthcare professionals in
              Canada. We provide a seamless and efficient experience for both
              parties.
            </p>

            <Button size="lg" asChild className="button w-full sm:w-fit">
              <div>
                <Link href="#jobs">Let's Get Started</Link>
                <Image
                  src="/assets/icons/arrow.svg"
                  alt="arrow"
                  width={17}
                  height={17}
                  className="fill-white ml-3"
                />
              </div>
            </Button>
          </div>

          {/* Hero Image */}
          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      {/* Jobs section */}
      <section id="jobs" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">
          Trust by Thousands of Healthcare Professionals
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <LocationFilter />
          <OccupationFilter />
        </div>
        <Collection
          data={jobs?.data}
          emptyTitle="No Job Postings Found"
          emptyStateSubtext="Come back later!"
          collectionType="All_Jobs"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
      {/* Pre Footer with FAQ and shortcuts */}
      <section className="bg-slate-200 bg-contain py-5 md:py-10">
        <Prefooter />
      </section>
    </>
  );
}
