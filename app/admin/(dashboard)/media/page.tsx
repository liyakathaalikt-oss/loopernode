import { getMedia } from "@/app/actions/media";
import { MediaUploader } from "./media-uploader";
import { MediaGrid } from "./media-grid";

export default async function MediaLibraryPage() {
  const media = await getMedia();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
          Media Library
        </h1>
        <p className="text-slate-400 mt-2">Upload and manage images across your website.</p>
      </div>

      <div className="mb-10">
        <MediaUploader />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white border-b border-white/10 pb-2">Uploaded Assets</h2>
        <MediaGrid items={media} />
      </div>
    </div>
  );
}
