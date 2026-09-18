import { ServiceForm } from "../service-form";

export default function NewServicePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
          Add New Service
        </h1>
        <p className="text-slate-400 mt-2">Create a new service offering.</p>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6 md:p-8">
        <ServiceForm />
      </div>
    </div>
  );
}
