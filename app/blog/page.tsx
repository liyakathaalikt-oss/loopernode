import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

import { Hero } from "@/components/sections/hero";
import { SectionTitle } from "@/components/sections/section-title";
import { BlogCard } from "@/components/sections/blog-card";
import { Newsletter } from "@/components/sections/newsletter";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper";
import { generatePageMetadata } from "@/lib/metadata";
import { blogPosts } from "@/content/blog-posts";

export const metadata: Metadata = generatePageMetadata({
  title: "Insights & Resources | Loopernode",
  description: "Explore the latest insights, best practices, and trends in AI data services, computer vision, and machine learning.",
  path: '/blog'
});

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured) || blogPosts[0];
  
  return (
    <main className="flex-1 bg-dark-950">
      <Hero
        headline="Insights &"
        highlightedText="Resources"
        description="Discover the latest trends, best practices, and expert perspectives in AI data services, computer vision, and model training."
        primaryCTA={{ label: "Subscribe to Newsletter", href: "#newsletter" }}
      />

      <section className="py-20 md:py-28 relative">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <SectionTitle
            title="Featured Article"
            description="Our latest deep dive into the world of AI data services."
            align="left"
          />

          <FadeUp>
            <Link href={`/blog/${featuredPost.slug}`} className="block group mt-10">
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden grid md:grid-cols-2 gap-8 items-center transition-all duration-300 hover:border-primary-500/30 hover:bg-white/[0.05]">
                <div className="relative aspect-video md:aspect-square w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 overflow-hidden">
                  {featuredPost.image ? (
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-50">
                      <div className="w-32 h-32 rounded-full bg-white/10 blur-3xl mix-blend-screen" />
                    </div>
                  )}
                </div>
                <div className="p-8 md:p-12 lg:pl-0 flex flex-col justify-center h-full">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 font-medium border border-primary-500/20">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-50 mb-4 leading-tight group-hover:text-primary-400 transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-lg text-slate-300 mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden bg-dark-950 flex items-center justify-center">
                          {featuredPost.author.avatar ? (
                            <Image src={featuredPost.author.avatar} alt={featuredPost.author.name} width={40} height={40} className="object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-50">{featuredPost.author.name}</p>
                        <p className="text-xs text-slate-400">{featuredPost.author.role}</p>
                      </div>
                    </div>
                    
                    <span className="inline-flex items-center gap-2 text-primary-400 font-medium group-hover:gap-3 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 bg-white/[0.02]">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionTitle
              title="Latest Articles"
              description="Browse articles on AI Trends, Computer Vision, Best Practices, and more."
              align="left"
            />
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                  slug={post.slug}
                  image={post.image}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
