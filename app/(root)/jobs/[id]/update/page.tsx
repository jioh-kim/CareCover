import JobForm from "@/components/shared/JobForm";
import { getJobById } from "@/lib/actions/job.actions";
import { auth } from "@clerk/nextjs";

interface UpdateJobProps {
  params: {
    id: string;
  };
}

const UpdateJob = async ({ params: {id} } : UpdateJobProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const job = await getJobById(id)

  return (
    <>
      <section className="bg-slate-200 bg-cover bg-center py-5 md:py-5">
        <h3 className="wrapper h3-bold text-center">Update Job Posting</h3>
      </section>

      <div className="wrapper my-8">
        {/* pass in userId, and type of "Update" to JobForm */}
        <JobForm
          type="Update"
          job={job}
          userId={userId}
          jobId={job._id}
        />
      </div>
    </>
  );
};

export default UpdateJob;
