import { CareerForm } from "../career-form";
import { getJobById } from "@/app/actions/careers";
import { notFound } from "next/navigation";

export default async function EditCareerPage({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div>
      <CareerForm initialData={job} />
    </div>
  );
}
