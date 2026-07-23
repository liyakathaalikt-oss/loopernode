import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronRight, User } from "lucide-react";

import { blogPosts } from "@/content/blog-posts";
import { generateBlogPostSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Newsletter } from "@/components/sections/newsletter";
import { BlogCard } from "@/components/sections/blog-card";
import { ShareButtons } from "./share-buttons";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Loopernode Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  const contentParagraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <main className="flex-1 bg-dark-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogPostSchema({
            title: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.date,
            authorName: post.author.name,
            url: '/blog/' + post.slug
          })),
        }}
      />

      <article className="pt-32 pb-20 md:pb-28">
        <div className="container-custom max-w-4xl mx-auto px-6">
          <Breadcrumb items={breadcrumbs} className="mb-8" />

          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 font-medium border border-primary-500/20 text-sm">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-slate-50 mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-white/[0.08]">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-dark-950 flex items-center justify-center">
                      {post.author.avatar ? (
                        <Image src={post.author.avatar} alt={post.author.name} width={48} height={48} className="object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-slate-300" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-50">{post.author.name}</p>
                    <p className="text-xs text-slate-400">{post.author.role}</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/[0.08] hidden sm:block"></div>
                <div className="flex items-center gap-4 text-sm text-slate-400 hidden sm:flex">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </header>

          {post.image ? (
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-16 border border-white/[0.08]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-16 border border-white/[0.08] bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
               <div className="w-64 h-64 rounded-full bg-white/10 blur-3xl mix-blend-screen" />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-3xl mx-auto mb-16">
            {contentParagraphs.map((paragraph, index) => {
              if (paragraph.startsWith("# ")) {
                return <h1 key={index} className="text-3xl font-bold text-slate-50 mt-12 mb-6">{paragraph.replace("# ", "")}</h1>;
              } else if (paragraph.startsWith("## ")) {
                return <h2 key={index} className="text-2xl font-bold text-slate-50 mt-10 mb-5">{paragraph.replace("## ", "")}</h2>;
              } else if (paragraph.startsWith("### ")) {
                return <h3 key={index} className="text-xl font-bold text-slate-50 mt-8 mb-4">{paragraph.replace("### ", "")}</h3>;
              }
              return (
                <p key={index} className="text-lg leading-relaxed text-slate-300 mb-6">
                  {paragraph}
                </p>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 mb-20">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-[2px] shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-dark-950 flex items-center justify-center">
                  {post.author.avatar ? (
                    <Image src={post.author.avatar} alt={post.author.name} width={80} height={80} className="object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-slate-300" />
                  )}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-slate-50 mb-1">{post.author.name}</h3>
                <p className="text-sm text-primary-400 mb-4">{post.author.role}</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-20 bg-white/[0.02] border-t border-white/[0.05]">
          <div className="container-custom max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold font-heading text-slate-50">Related Articles</h2>
              <Link href="/blog" className="text-primary-400 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <BlogCard
                  key={rp.slug}
                  title={rp.title}
                  excerpt={rp.excerpt}
                  date={rp.date}
                  readTime={rp.readTime}
                  category={rp.category}
                  slug={rp.slug}
                  image={rp.image}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </main>
  );
}
