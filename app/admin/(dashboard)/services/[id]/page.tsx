import { notFound } from "next/navigation";
import { getServiceById } from "@/app/actions/content";
import { ServiceForm } from "../service-form";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
          Edit Service
        </h1>
        <p className="text-slate-400 mt-2">Update the details of this service.</p>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6 md:p-8">
        <ServiceForm service={service} />
      </div>
    </div>
  );
}
