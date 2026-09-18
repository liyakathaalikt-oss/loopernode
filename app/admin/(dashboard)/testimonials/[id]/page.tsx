import { notFound } from "next/navigation";
import { getTestimonialById } from "@/app/actions/testimonials";
import { TestimonialForm } from "../testimonial-form";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
          Edit Testimonial
        </h1>
        <p className="text-slate-400 mt-2">Update the review from {testimonial.clientName}.</p>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6 md:p-8">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </div>
  );
}
