import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
          Welcome back, {session?.user?.name?.split(' ')[0]}
        </h1>
        <p className="text-slate-400 mt-2">Here's what's happening with your content today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/blog" className="p-6 glass rounded-xl border border-white/10 hover:border-primary-500/50 transition-all cursor-pointer group hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">Blog Posts</h2>
          <p className="text-slate-400">Manage your articles, news, and SEO content.</p>
        </Link>
        
        <Link href="/admin/careers" className="p-6 glass rounded-xl border border-white/10 hover:border-primary-500/50 transition-all cursor-pointer group hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">Careers</h2>
          <p className="text-slate-400">Manage open job postings and departments.</p>
        </Link>
        
        <Link href="/admin/media" className="p-6 glass rounded-xl border border-white/10 hover:border-primary-500/50 transition-all cursor-pointer group hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">Media Library</h2>
          <p className="text-slate-400">Upload and manage images via Vercel Blob.</p>
        </Link>
      </div>
    </div>
  );
}
