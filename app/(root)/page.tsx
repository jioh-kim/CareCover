import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-slate-200 bg-dotted-pattern bg-contain py-5 md:py-10">
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
              <Link href="#jobs">Let's Get Started</Link>
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
    </>
  );
}
