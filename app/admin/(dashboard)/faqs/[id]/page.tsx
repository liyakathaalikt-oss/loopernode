import { notFound } from "next/navigation";
import { getFaqById } from "@/app/actions/faqs";
import { FaqForm } from "../faq-form";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await getFaqById(id);

  if (!faq) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
          Edit FAQ
        </h1>
        <p className="text-slate-400 mt-2">Update the FAQ.</p>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6 md:p-8">
        <FaqForm faq={faq} />
      </div>
    </div>
  );
}
