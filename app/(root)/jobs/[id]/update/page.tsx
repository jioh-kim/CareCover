import JobForm from "@/components/shared/JobForm";
import { auth } from "@clerk/nextjs";

const UpdateJob = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-slate-200 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Job</h3>
      </section>

      <div className="wrapper my-8">
        {/* pass in userId, and type of "Update" to JobForm */}
        <JobForm userId={userId} type="Update" />
      </div>
    </>
  );
};

export default UpdateJob;
