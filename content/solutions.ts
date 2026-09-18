import { LucideIcon, Users, Network } from 'lucide-react';

export interface SolutionFeature {
  title: string;
  description: string;
  icon: string;
}

export interface Solution {
  slug: string;
  title: string;
  icon: string;
  iconComponent: LucideIcon;
  description: string;
  overview: string;
  features: SolutionFeature[];
  benefits: string[];
}

export const solutions: Solution[] = [
  {
    slug: "ai-workforce",
    title: "Dedicated AI Workforce",
    icon: "Users",
    iconComponent: Users,
    description: "Scale your AI operations instantly with a fully managed, domain-expert data annotation and RLHF workforce.",
    overview: "Building an internal data annotation team is expensive, slow, and operationally complex. Loopernode's Dedicated AI Workforce solution provides you with a fully managed, instantly scalable team of domain-expert annotators. Whether you need 5 data scientists for complex RLHF or 500 labelers for massive computer vision projects, we handle the recruitment, training, QA management, and infrastructure.",
    features: [
      {
        title: "Domain-Expert Recruitment",
        description: "We recruit specialized annotators with backgrounds in medicine, law, engineering, and linguistics to ensure your complex data is handled by experts.",
        icon: "Search"
      },
      {
        title: "Fully Managed Operations",
        description: "Our dedicated Project Managers and QA Leads oversee daily throughput, ensuring SLAs are met without draining your internal engineering resources.",
        icon: "Activity"
      },
      {
        title: "Elastic Scalability",
        description: "Instantly scale your workforce up or down based on your active learning cycles and model training requirements.",
        icon: "Zap"
      },
      {
        title: "Secure Infrastructure",
        description: "Teams operate within strictly monitored, SOC2-compliant clean rooms with device management to guarantee complete data confidentiality.",
        icon: "Shield"
      }
    ],
    benefits: [
      "Zero recruitment or HR overhead",
      "99.5%+ guaranteed data accuracy SLAs",
      "Dedicated account management and QA leads",
      "Seamless integration with your existing tooling (Labelbox, Scale, custom)",
      "Strict data privacy and compliance protocols"
    ]
  },
  {
    slug: "human-in-the-loop",
    title: "Human-in-the-Loop (HITL)",
    icon: "Network",
    iconComponent: Network,
    description: "Integrate continuous human feedback into your ML pipelines to catch edge cases and prevent model drift.",
    overview: "Even the most advanced AI models degrade over time without continuous feedback. Loopernode's Human-in-the-Loop (HITL) architecture integrates our expert workforce directly into your active learning pipelines. As your model encounters low-confidence predictions or complex edge cases in production, those data points are instantly routed via API to our human experts for immediate correction and retraining.",
    features: [
      {
        title: "Active Learning Integration",
        description: "Connect our workforce directly to your ML pipelines via secure APIs to handle real-time edge case routing and exception handling.",
        icon: "Workflow"
      },
      {
        title: "Continuous Model Evaluation",
        description: "Establish robust, ongoing evaluation metrics to track model performance, bias, and drift over time with human oversight.",
        icon: "Database"
      },
      {
        title: "RLHF & Prompt Engineering",
        description: "Deploy domain experts to generate high-quality prompts, rank model outputs, and provide the nuanced feedback required for LLM fine-tuning.",
        icon: "Code"
      },
      {
        title: "Automated QA Validation",
        description: "Implement multi-tiered consensus models and gold-standard benchmark tracking to ensure absolute confidence in human labels.",
        icon: "CheckCircle"
      }
    ],
    benefits: [
      "Prevent model drift and performance degradation in production",
      "Solve the 'long tail' problem of rare edge cases",
      "Accelerate active learning cycles with rapid turnaround times",
      "Enterprise-grade API integration for seamless data flow",
      "Customizable consensus and QA routing logic"
    ]
  }
];
