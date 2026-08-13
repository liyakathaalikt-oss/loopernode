import { CareerForm } from "../career-form";
import { getJobById } from "@/app/actions/careers";
import { notFound } from "next/navigation";

export default async function EditCareerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <div>
      <CareerForm initialData={job} />
    </div>
  );
}
