export const homeFAQs = [
  {
    question: "What types of data can Loopernode collect and label?",
    answer: "We handle almost all data modalities, including images, video, text, audio, 3D point clouds (LiDAR), and sensor data. Our services span basic bounding boxes to complex semantic segmentation, RLHF for language models, and synthetic data generation."
  },
  {
    question: "How do you ensure data security and privacy?",
    answer: "Security is built into our core infrastructure. We are SOC 2 Type II compliant, support on-premise or secure cloud deployments, and offer strict HIPAA and GDPR compliance protocols, including rigorous data anonymization and PII removal."
  },
  {
    question: "How do you maintain high accuracy at scale?",
    answer: "We use a multi-layered approach combining AI-assisted pre-labeling, highly trained dedicated human teams, consensus scoring, and rigorous QA verification processes. We guarantee up to 99.5% accuracy depending on project requirements."
  },
  {
    question: "Can you scale quickly for large enterprise projects?",
    answer: "Yes. With a global network of over 10,000 vetted annotators and dedicated project managers, we can rapidly scale teams to handle millions of data points per week without sacrificing quality or consistency."
  },
  {
    question: "What is your pricing model?",
    answer: "Our pricing is highly customizable based on the complexity, volume, and modality of the data. We offer per-unit pricing for straightforward tasks, and dedicated team (FTE) pricing for complex, long-term enterprise engagements."
  },
  {
    question: "Do you offer pilot projects?",
    answer: "Absolutely. We encourage pilot projects for new enterprise clients. It allows us to align on annotation guidelines, calibrate our QA processes, and prove our quality and throughput before you commit to a larger contract."
  },
  {
    question: "How long does onboarding typically take?",
    answer: "For standard projects, onboarding and initial data delivery can begin in as little as 48 hours. For highly complex projects requiring custom tooling or specialized medical/legal annotators, onboarding usually takes 1-2 weeks."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve leading enterprises across autonomous vehicles, healthcare, retail, agriculture, finance, robotics, and generative AI companies building foundational foundational language and multimodal models."
  }
];

export const contactFAQs = [
  {
    question: "How quickly will your sales team respond?",
    answer: "Our enterprise sales team typically responds to all inquiries within 24 business hours to schedule an initial discovery call."
  },
  {
    question: "Do you sign NDAs before discussing projects?",
    answer: "Yes, we are happy to sign standard Non-Disclosure Agreements before discussing any specifics of your proprietary models or data requirements."
  },
  {
    question: "What information should I have ready for the initial call?",
    answer: "It is helpful to know your data modality (text, image, etc.), estimated volume, desired turnaround time, and a brief description of your ML model's objective."
  },
  {
    question: "Do you work with startups?",
    answer: "While our focus is on enterprise scale, we do partner with well-funded AI startups that have significant, ongoing data needs and clear scaling roadmaps."
  },
  {
    question: "Can I speak directly with an engineer?",
    answer: "Yes, during the evaluation process, we often bring in our solutions architects and data engineers to ensure our technical capabilities perfectly align with your pipeline requirements."
  }
];

export const dataCollectionFAQs = [
  {
    question: "How do you source human contributors for data collection?",
    answer: "We utilize a globally distributed, vetted crowd network combined with targeted recruitment campaigns to ensure we capture diverse demographics, languages, and environments based on your specific requirements."
  },
  {
    question: "Who owns the rights to the collected data?",
    answer: "You do. All data collected specifically for your custom project is fully transferred to you with exclusive commercial rights, ensuring you have complete ownership of your intellectual property."
  },
  {
    question: "Can you collect data in specific geographical locations?",
    answer: "Yes, our network allows us to target data collection in over 40 countries, enabling you to build localized models or capture specific regional environments and dialects."
  },
  {
    question: "How do you prevent bias during collection?",
    answer: "We design collection strategies with strict quotas for demographics, lighting conditions, environments, and device types. We actively monitor incoming data to ensure the final dataset is balanced and representative."
  },
  {
    question: "What is synthetic data and when should I use it?",
    answer: "Synthetic data is AI-generated or simulated data. It is ideal when real data is too expensive, slow to acquire, or heavily restricted by privacy laws (like PII). It is also excellent for generating rare edge cases."
  }
];

export const dataLabelingFAQs = [
  {
    question: "Who is actually labeling my data?",
    answer: "Your data is labeled by vetted, trained professionals. For complex tasks (like medical or RLHF), we use subject matter experts. We do not use anonymous, unmanaged crowds for high-precision enterprise tasks."
  },
  {
    question: "Can you use our custom annotation tools?",
    answer: "Yes, our annotators are highly adaptable. We can work directly within your proprietary platform, use leading third-party tools, or utilize our own secure internal annotation platform."
  },
  {
    question: "How do you handle ambiguous edge cases?",
    answer: "We establish a direct feedback loop with your team. Ambiguous cases are flagged by annotators, reviewed by our QA managers, and escalated to your team to refine the guidelines, ensuring consistent handling going forward."
  },
  {
    question: "What is RLHF and do you support it?",
    answer: "Reinforcement Learning from Human Feedback (RLHF) is used to align LLMs. We heavily support this, providing expert annotators to write prompts, rank responses, and evaluate model outputs for safety and helpfulness."
  },
  {
    question: "Do you guarantee annotation quality?",
    answer: "Yes. We agree upon a quality SLA (Service Level Agreement) before the project begins—often 98% or higher. If a batch falls below this threshold, it is re-reviewed and corrected at no additional cost."
  }
];

export const dataProcessingFAQs = [
  {
    question: "What formats can you ingest and output?",
    answer: "We support virtually all standard and custom data formats, including JSON, CSV, XML, DICOM, COCO, and proprietary log files. We deliver the processed data in the exact structure required by your ML pipeline."
  },
  {
    question: "How do you handle PII during processing?",
    answer: "We implement automated pipelines to redact, blur, or tokenize Personally Identifiable Information (PII) such as faces, license plates, names, and contact details before the data is used for training."
  },
  {
    question: "Can you integrate directly with our cloud storage?",
    answer: "Yes, we build secure, automated ETL pipelines that pull directly from and push to your AWS S3, Google Cloud Storage, or Azure Blob environments, streamlining data transfer."
  },
  {
    question: "What does dataset optimization entail?",
    answer: "Optimization involves analyzing the statistical distribution of your data to find imbalances. We then apply techniques like downsampling overrepresented classes or augmenting rare classes to create a more robust training set."
  },
  {
    question: "Is your data processing automated or manual?",
    answer: "It is a hybrid approach. We use scalable automated scripts for heavy lifting like format conversion and initial cleaning, but apply human-in-the-loop review for complex deduplication and subjective data curation."
  }
];
