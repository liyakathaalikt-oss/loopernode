import { notFound } from "next/navigation";
import { getCaseStudyById } from "@/app/actions/case-studies";
import { CaseStudyForm } from "../case-study-form";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const study = await getCaseStudyById(id);

  if (!study) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
          Edit Case Study
        </h1>
        <p className="text-slate-400 mt-2">Update the success story for {study.client}.</p>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6 md:p-8">
        <CaseStudyForm study={study} />
      </div>
    </div>
  );
}
