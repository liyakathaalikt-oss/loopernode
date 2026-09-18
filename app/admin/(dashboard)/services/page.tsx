import { getServices } from "@/app/actions/content";
import { Plus, PenSquare } from "lucide-react";
import { DeleteServiceButton } from "./delete-button";

export default async function ServicesManagerPage() {
  const services = await getServices();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
            Services
          </h1>
          <p className="text-slate-400 mt-2">Manage the services you offer.</p>
        </div>
        
        <a href="/admin/services/new" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"><Plus size={18} />New Service</a>
      </div>

      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                  No services found. Create your first service!
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    {service.title}
                    <div className="text-xs text-slate-500 font-normal mt-1">{service.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    {service.order}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <a href={`/admin/services/${service.id}`} className="p-2 text-slate-400 hover:text-primary-400 hover:bg-primary-400/10 rounded-lg transition-colors"><PenSquare size={18} /></a>
                    <DeleteServiceButton id={service.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
