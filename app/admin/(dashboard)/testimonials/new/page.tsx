import { TestimonialForm } from "../testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
          Add Testimonial
        </h1>
        <p className="text-slate-400 mt-2">Publish a new customer review.</p>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6 md:p-8">
        <TestimonialForm />
      </div>
    </div>
  );
}
