import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronRight, User } from "lucide-react";
import { PrismaClient } from "@prisma/client";

import { generateBlogPostSchema } from "@/lib/schema";
import { generateKeywords } from "@/app/config/seo-keywords";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Newsletter } from "@/components/sections/newsletter";
import { BlogCard } from "@/components/sections/blog-card";
import { ShareButtons } from "./share-buttons";

import prisma from "@/lib/prisma";
interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}


export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Loopernode Blog`,
    description: post.excerpt,
    keywords: generateKeywords('blog'),
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author || "Loopernode Team"],
      tags: post.tags ? post.tags.split(',') : [],
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}


export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post) {
    notFound();
  }

  const relatedDbPosts = await prisma.blogPost.findMany({
    where: { 
      slug: { not: slug },
      published: true
    },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  const relatedPosts = relatedDbPosts.map(rp => ({
    title: rp.title,
    excerpt: rp.excerpt || "",
    date: new Date(rp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: "5 min read",
    category: rp.category || "General",
    slug: rp.slug,
    image: rp.coverImage || "",
  }));

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <main className="flex-1 bg-dark-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogPostSchema({
            title: post.title,
            description: post.excerpt || "",
            image: post.coverImage || "",
            datePublished: post.createdAt.toISOString(),
            authorName: post.author || "Loopernode Team",
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
                {post.category || "General"}
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
                      <User className="w-6 h-6 text-slate-300" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-50">{post.author || "Loopernode Team"}</p>
                    <p className="text-xs text-slate-400">Author</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/[0.08] hidden sm:block"></div>
                <div className="flex items-center gap-4 text-sm text-slate-400 hidden sm:flex">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </header>

          {post.coverImage ? (
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-16 border border-white/[0.08]">
              <Image
                src={post.coverImage}
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

          {/* Render TipTap HTML Content */}
          <div 
            className="prose prose-invert prose-lg prose-headings:font-bold prose-a:text-primary-400 max-w-3xl mx-auto mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-20 bg-white/[0.02] border-t border-white/[0.05]">
          <div className="container-custom max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold font-heading text-slate-50">Related Articles</h2>
              <Link prefetch={false} href="/blog" className="text-primary-400 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                Browse All Articles <ChevronRight className="w-4 h-4" />
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
