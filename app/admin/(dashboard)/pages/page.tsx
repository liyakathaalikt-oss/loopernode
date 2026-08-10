import { getGlobalContent } from "@/app/actions/content";
import { GlobalContentForm } from "./global-form";

export default async function PagesManager() {
  const homepage = await getGlobalContent("homepage");
  const about = await getGlobalContent("about");
  const contact = await getGlobalContent("contact");
  const seo = await getGlobalContent("seo");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
          Global Pages & Settings
        </h1>
        <p className="text-slate-400 mt-2">Manage static content across your website using JSON data blocks.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <GlobalContentForm title="Homepage Configuration" contentKey="homepage" initialData={homepage} />
        <GlobalContentForm title="About Us Page" contentKey="about" initialData={about} />
        <GlobalContentForm title="Contact Information" contentKey="contact" initialData={contact} />
        <GlobalContentForm title="Global SEO Defaults" contentKey="seo" initialData={seo} />
      </div>
    </div>
  );
}
