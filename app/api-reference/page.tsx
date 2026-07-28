/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import { 
  Code, 
  Key, 
  Globe, 
  Zap, 
  Terminal, 
  Package, 
  AlertCircle, 
  Lock 
} from 'lucide-react';

import { Hero } from '@/components/sections/hero';
import { SectionTitle } from '@/components/sections/section-title';
import { FeatureCard } from '@/components/sections/feature-card';
import { CTABanner } from '@/components/sections/cta-banner';
import { FadeUp, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations/motion-wrapper';

export const metadata = generatePageMetadata({
  title: 'API Reference | Loopernode Developer Portal',
  description: 'Explore the Loopernode REST API reference, authentication protocols, endpoint endpoints grid, rate limits, HTTP status codes, and official SDKs.',
  path: '/api-reference',
});

export default function ApiReferencePage() {
  const endpoints = [
    {
      method: 'POST',
      path: '/datasets',
      title: 'Create Dataset',
      description: 'Initialize a new dataset container with specific modal configurations, metadata schema, and retention rules.',
    },
    {
      method: 'GET',
      path: '/datasets',
      title: 'List Datasets',
      description: 'Retrieve a paginated collection of active datasets within your organization with status filtering.',
    },
    {
      method: 'POST',
      path: '/annotations',
      title: 'Submit Annotations',
      description: 'Upload bounding boxes, polygon masks, sentiment tags, or custom task labels to a dataset target.',
    },
    {
      method: 'GET',
      path: '/annotations/{id}',
      title: 'Get Annotation',
      description: 'Fetch detailed geometric vectors, confidence scores, worker metrics, and audit history for an annotation.',
    },
    {
      method: 'POST',
      path: '/projects',
      title: 'Create Project',
      description: 'Spin up an enterprise labeling campaign defining consensus requirements, workforce routing, and QA thresholds.',
    },
    {
      method: 'GET',
      path: '/projects/{id}/status',
      title: 'Project Status',
      description: 'Monitor real-time execution progress, completion velocity, consensus percentage, and active worker counts.',
    },
  ];

  const rateLimits = [
    {
      tier: 'Free Tier',
      limit: '100 requests / hour',
      concurrency: '10 concurrent requests',
      burst: '15 req/sec burst limit',
      badgeColor: 'border-slate-500/30 text-slate-400 bg-slate-500/10',
    },
    {
      tier: 'Pro Tier',
      limit: '1,000 requests / hour',
      concurrency: '50 concurrent requests',
      burst: '50 req/sec burst limit',
      badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    },
    {
      tier: 'Enterprise Tier',
      limit: 'Unlimited',
      concurrency: 'Custom dedicated pool',
      burst: 'Custom burst allocation',
      badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
    },
  ];

  const errorCodes = [
    {
      code: '400',
      title: 'Bad Request',
      description: 'Malformed JSON payload, missing mandatory fields, or invalid enum parameters sent in request body.',
    },
    {
      code: '401',
      title: 'Unauthorized',
      description: 'Missing, expired, or invalid API key provided in the Authorization Bearer header.',
    },
    {
      code: '404',
      title: 'Not Found',
      description: 'The requested resource ID (dataset, project, or annotation) does not exist or has been deleted.',
    },
    {
      code: '429',
      title: 'Too Many Requests',
      description: 'Rate limit threshold exceeded for your current tier plan. Check X-RateLimit-Reset header for retry delay.',
    },
  ];

  const sdks = [
    {
      name: 'Python SDK',
      icon: <Package className="w-6 h-6 text-indigo-400" />,
      packageCmd: 'pip install loopernode-python',
      language: 'python',
      codeSnippet: `import loopernode

client = loopernode.Client(api_key="lnr_live_...")
dataset = client.datasets.create(
    name="Autonomous Vision v2",
    modality="image_segmentation"
)`,
    },
    {
      name: 'Node.js SDK',
      icon: <Terminal className="w-6 h-6 text-cyan-400" />,
      packageCmd: 'npm install @loopernode/sdk',
      language: 'typescript',
      codeSnippet: `import { Loopernode } from '@loopernode/sdk';

const client = new Loopernode({ apiKey: process.env.LOOPERNODE_API_KEY });
const project = await client.projects.get('prj_884920');
console.log(project.status);`,
    },
    {
      name: 'Go SDK',
      icon: <Globe className="w-6 h-6 text-violet-400" />,
      packageCmd: 'go get github.com/loopernode/loopernode-go',
      language: 'go',
      codeSnippet: `package main

import "github.com/loopernode/loopernode-go"

client := loopernode.NewClient("lnr_live_...")
res, err := client.Annotations.Submit(ctx, payload)`,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A1B] text-slate-200">
      {/* SECTION 1: Hero */}
      <section className="pt-20 md:pt-28 pb-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <Hero
          headline="API"
          highlightedText="Reference"
          description="Explore our robust REST API documentation and official developer SDKs to programmatically manage datasets, submit annotations, and automate model training pipelines."
          primaryCTA={{ label: 'Get API Key', href: '/contact' }}
          secondaryCTA={{ label: 'Explore SDKs', href: '#sdks' }}
        />
      </section>

      {/* SECTION 2: API Overview */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="DEVELOPER PORTAL"
            title="API"
            highlightedWord="Overview"
            description="The Loopernode API is built on RESTful principles, returning standard JSON payloads for all requests and using predictable HTTP response codes."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <FeatureCard
            icon={<Globe className="w-6 h-6 text-indigo-400" />}
            title="Base URL"
            description="All API requests should be directed to the global HTTPS base endpoint: https://api.loopernode.in/v1"
          />
          <FeatureCard
            icon={<Code className="w-6 h-6 text-cyan-400" />}
            title="JSON Format"
            description="Requests and responses use Content-Type: application/json. Timestamp fields follow ISO-8601 UTC standard."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-violet-400" />}
            title="RESTful Design"
            description="Utilizes standard HTTP methods (GET, POST, PUT, DELETE) with deterministic status codes and structured errors."
          />
        </StaggerContainer>
      </section>

      {/* SECTION 3: Authentication */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="SECURITY & ACCESS"
            title="API Key"
            highlightedWord="Authentication"
            description="Authenticate your requests by passing your API secret key in the Authorization header as a Bearer token."
            align="center"
          />
        </FadeUp>

        <div className="mt-12 max-w-4xl mx-auto backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-50 font-heading">Bearer Token Authentication</h3>
              <p className="text-slate-400 text-sm">Keep your API key secure. Do not share key credentials in public web repositories.</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-300 text-sm leading-relaxed">
              Include your secret key in the <code className="text-cyan-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">Authorization</code> HTTP header for every API call.
            </p>

            <div className="font-mono bg-dark-900 rounded-lg p-4 text-sm overflow-x-auto text-slate-200 border border-white/10">
              <div className="text-slate-500 mb-2">{/* Example cURL API Request */}&#47;&#47; Example cURL API Request</div>
              <div><span className="text-indigo-400">curl</span> -X GET <span className="text-emerald-400">"https://api.loopernode.in/v1/datasets"</span> \</div>
              <div className="pl-4"><span className="text-cyan-400">-H</span> <span className="text-emerald-400">"Authorization: Bearer lnr_live_8f92a1b4c3d7"</span> \</div>
              <div className="pl-4"><span className="text-cyan-400">-H</span> <span className="text-emerald-400">"Content-Type: application/json"</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Endpoints Grid */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="REST RESOURCES"
            title="Core API"
            highlightedWord="Endpoints"
            description="Explore the primary endpoints for managing dataset collections, submitting annotation jobs, and tracking project statuses."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {endpoints.map((endpoint, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wide border ${
                        endpoint.method === 'POST'
                          ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                          : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <span className="font-mono text-sm text-slate-300 bg-white/5 px-2.5 py-1 rounded border border-white/10 group-hover:text-white transition-colors">
                      {endpoint.path}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-50 font-heading mb-2">
                    {endpoint.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {endpoint.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>HTTPS Endpoint</span>
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 5: Rate Limits */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="USAGE TIERS"
            title="API Rate"
            highlightedWord="Limits"
            description="Rate limits safeguard API stability and availability across all enterprise teams and developer accounts."
            align="center"
          />
        </FadeUp>

        <div className="mt-16 max-w-4xl mx-auto backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 bg-white/[0.02] flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span className="font-semibold text-slate-200">Rate Limit Headers</span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              <code className="text-cyan-400">X-RateLimit-Limit</code> | <code className="text-cyan-400">X-RateLimit-Remaining</code> | <code className="text-cyan-400">X-RateLimit-Reset</code>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {rateLimits.map((item, idx) => (
              <div key={idx} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${item.badgeColor}`}>
                    {item.tier}
                  </span>
                </div>
                <div className="text-slate-100 font-medium text-sm">
                  {item.limit}
                </div>
                <div className="text-slate-400 text-sm">
                  {item.concurrency}
                </div>
                <div className="text-slate-400 text-sm font-mono text-right md:text-left">
                  {item.burst}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Error Codes */}
      <section className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="STATUS & ERRORS"
            title="HTTP Error"
            highlightedWord="Codes"
            description="Our API returns conventional HTTP response status codes to indicate the success or failure of requests."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-5xl mx-auto">
          {errorCodes.map((err, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono font-bold text-lg text-rose-400">{err.code}</span>
                    <h3 className="text-lg font-bold text-slate-100 font-heading">{err.title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {err.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 7: SDK Section */}
      <section id="sdks" className="py-20 md:py-28 container mx-auto px-4 border-b border-white/5">
        <FadeUp>
          <SectionTitle
            eyebrow="CLIENT LIBRARIES"
            title="Official"
            highlightedWord="SDKs"
            description="Get started quickly in your favorite programming language with native type safety and automated error handling."
            align="center"
          />
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {sdks.map((sdk, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      {sdk.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-50 font-heading">{sdk.name}</h3>
                  </div>

                  <div className="mb-4">
                    <code className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-indigo-300 block overflow-x-auto">
                      {sdk.packageCmd}
                    </code>
                  </div>

                  <div className="font-mono bg-dark-900 rounded-lg p-4 text-sm overflow-x-auto text-slate-300 border border-white/10">
                    <pre className="text-xs leading-relaxed">{sdk.codeSnippet}</pre>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION 8: CTABanner */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <FadeIn>
          <CTABanner
            headline="Ready to integrate?"
            description="Obtain your API credentials today and start building high-performance dataset pipelines with Loopernode."
            primaryCTA={{ label: 'Get API Key', href: '/contact' }}
            secondaryCTA={{ label: 'Contact Support', href: '/contact' }}
          />
        </FadeIn>
      </section>
    </main>
  );
}
