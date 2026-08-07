import { LucideIcon, Stethoscope, ShoppingBag, Car, Tractor, Factory, Scale, CircleDollarSign, ShoppingCart, Bot, Radar, ShieldAlert, GraduationCap } from 'lucide-react';

export interface IndustryUseCase {
  title: string;
  description: string;
}

export interface Industry {
  slug: string;
  name: string;
  icon: string; // We will use strings or Lucide components, let's stick to the component names
  iconComponent: LucideIcon;
  description: string;
  overview: string;
  useCases: IndustryUseCase[];
}

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "Stethoscope",
    iconComponent: Stethoscope,
    description: "HIPAA-compliant data processing for medical imaging, EHR analysis, and predictive diagnostics.",
    overview: "In the highly regulated healthcare sector, the accuracy of machine learning models is literally a matter of life and death. Loopernode provides strictly HIPAA and SOC2-compliant data annotation services for medical imaging (MRI, CT, X-Ray), electronic health records (EHR), and robotic surgery video feeds. Our domain-expert annotators possess clinical backgrounds, ensuring your medical AI models are trained on flawless, pixel-perfect ground truth data.",
    useCases: [
      {
        title: "Medical Image Segmentation",
        description: "Pixel-perfect polygon annotation for tumor detection, organ segmentation, and anomaly classification in DICOM files."
      },
      {
        title: "EHR Named Entity Recognition",
        description: "De-identifying PII and extracting critical medical entities (symptoms, diagnoses, medications) from unstructured clinical notes."
      },
      {
        title: "Surgical Video Analysis",
        description: "Frame-by-frame temporal annotation of surgical procedures to train autonomous medical robots and assist in post-op review."
      }
    ]
  },
  {
    slug: "retail",
    name: "Retail",
    icon: "ShoppingBag",
    iconComponent: ShoppingBag,
    description: "Computer vision and NLP data for shelf monitoring, recommendation engines, and customer sentiment.",
    overview: "Modern retail is driven by highly personalized, frictionless experiences powered by AI. We help global retailers and FMCG brands process massive volumes of visual and text data to train inventory management robots, cashier-less checkout systems, and hyper-personalized recommendation engines. Our annotation pipelines can scale to handle millions of SKUs with unprecedented accuracy.",
    useCases: [
      {
        title: "Shelf Space Monitoring",
        description: "Bounding box and semantic segmentation of retail shelves to track out-of-stock items, planogram compliance, and brand placement."
      },
      {
        title: "Visual Search & Try-On",
        description: "Detailed keypoint annotation of clothing and accessories to power augmented reality fitting rooms and reverse image search."
      },
      {
        title: "Customer Sentiment Analysis",
        description: "Processing millions of product reviews using NLP to extract granular sentiment, feature requests, and defect reporting."
      }
    ]
  },
  {
    slug: "automotive",
    name: "Automotive",
    icon: "Car",
    iconComponent: Car,
    description: "In-cabin monitoring and driver behavior datasets for advanced ADAS and safety systems.",
    overview: "As vehicles transition from driver-assist to fully autonomous, the requirement for flawless edge-case data grows exponentially. We provide automotive OEMs with high-fidelity annotation for in-cabin driver monitoring systems (DMS) and external sensor suites. Our highly secure, globally distributed workforce can annotate petabytes of driving footage to ensure your ADAS systems react perfectly in any environment.",
    useCases: [
      {
        title: "In-Cabin Monitoring (DMS)",
        description: "Tracking driver gaze, facial expressions, and posture using keypoints to detect drowsiness and distraction."
      },
      {
        title: "Pedestrian & Traffic Sign Detection",
        description: "High-volume bounding box and polygon annotation of diverse urban, suburban, and rural driving environments."
      },
      {
        title: "Audio Event Recognition",
        description: "Labeling external acoustic events (sirens, horns, crashes) to provide multi-modal context to autonomous driving systems."
      }
    ]
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    icon: "Tractor",
    iconComponent: Tractor,
    description: "Satellite and drone imagery annotation for crop health monitoring, yield prediction, and precision farming.",
    overview: "Precision agriculture relies on vast amounts of aerial and sensor data to optimize yields and reduce resource waste. Loopernode partners with AgTech pioneers to annotate drone footage, satellite imagery, and IoT sensor logs. By generating precise training data for weed detection and crop health analysis, we help farmers implement targeted interventions that save millions of gallons of water and reduce pesticide usage.",
    useCases: [
      {
        title: "Crop Yield Estimation",
        description: "Annotating high-resolution drone imagery to count individual plants, fruits, or livestock across thousands of acres."
      },
      {
        title: "Weed & Disease Detection",
        description: "Semantic segmentation of multi-spectral imagery to differentiate healthy crops from invasive weeds or blighted plants."
      },
      {
        title: "Autonomous Harvesters",
        description: "Providing 3D spatial mapping and object detection data to train robotic arms for delicate fruit picking."
      }
    ]
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: "Factory",
    iconComponent: Factory,
    description: "Defect detection imagery and sensor logs for automated quality control and predictive maintenance.",
    overview: "Industry 4.0 is defined by the integration of AI into the factory floor. Loopernode accelerates this transformation by providing industrial enterprises with highly accurate training data for visual inspection and predictive maintenance models. We process complex thermal, acoustic, and visual data streams to help manufacturers detect microscopic defects before they halt production lines.",
    useCases: [
      {
        title: "Automated Defect Detection",
        description: "Micro-level polygon annotation of microscopic scratches, dents, or soldering errors on PCB boards and manufactured parts."
      },
      {
        title: "Predictive Maintenance",
        description: "Time-series annotation of acoustic and vibration sensor data to train ML models that predict machinery failure."
      },
      {
        title: "Worker Safety Compliance",
        description: "Monitoring factory video feeds to detect missing PPE (helmets, vests) and unsafe interactions with heavy machinery."
      }
    ]
  },
  {
    slug: "legal",
    name: "Legal",
    icon: "Scale",
    iconComponent: Scale,
    description: "Secure text annotation and entity extraction for contract analysis, e-discovery, and compliance.",
    overview: "The legal industry requires unparalleled confidentiality and precision when processing unstructured text. We provide strictly secure, NDA-bound data annotation services for law firms and LegalTech companies. From training LLMs to summarize complex litigation documents to building automated contract review tools, we handle highly sensitive data with rigorous security protocols.",
    useCases: [
      {
        title: "Automated Contract Review",
        description: "Extracting clauses, obligations, and liabilities from massive PDF and text corpuses to train contract lifecycle models."
      },
      {
        title: "E-Discovery & Classification",
        description: "Categorizing millions of emails and internal documents to accelerate the discovery phase of high-stakes litigation."
      },
      {
        title: "Legal Entity Extraction",
        description: "Identifying and linking complex legal entities, jurisdictions, and precedents across decades of case law."
      }
    ]
  },
  {
    slug: "finance",
    name: "Finance",
    icon: "CircleDollarSign",
    iconComponent: CircleDollarSign,
    description: "Document OCR, sentiment analysis, and transaction structuring for fraud detection and automated processing.",
    overview: "Financial institutions rely on AI to detect fraud, automate underwriting, and process millions of daily transactions. Loopernode delivers highly secure, SOC2-compliant data processing for FinTechs and legacy banks. We specialize in complex OCR verification, financial sentiment analysis, and structuring chaotic transaction logs to train highly robust predictive models.",
    useCases: [
      {
        title: "KYC & Document Verification",
        description: "Annotating diverse, multi-lingual identity documents and bank statements to train robust automated OCR models."
      },
      {
        title: "Financial Sentiment Analysis",
        description: "Processing global news feeds, earnings calls, and social media data to train algorithmic trading signals."
      },
      {
        title: "Transaction Categorization",
        description: "Structuring millions of raw merchant strings into clean, categorized datasets for personal finance applications."
      }
    ]
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    icon: "ShoppingCart",
    iconComponent: ShoppingCart,
    description: "Product categorization, visual search datasets, and localized translation for global marketplaces.",
    overview: "E-commerce platforms live or die by their search functionality and product discovery. We help the world's largest online marketplaces structure chaotic vendor data, categorize millions of SKUs, and train powerful multimodal search engines. Our global workforce also provides culturally nuanced localized data for expanding into new international markets.",
    useCases: [
      {
        title: "Taxonomy & Categorization",
        description: "Mapping unstructured product titles and descriptions into rigid, multi-tiered e-commerce taxonomies."
      },
      {
        title: "Multimodal Search",
        description: "Pairing user search queries with relevant product images to train CLIP-based models for hybrid text-to-image search."
      },
      {
        title: "Review Moderation",
        description: "Labeling user-generated content for spam, toxicity, and fake reviews to maintain marketplace integrity."
      }
    ]
  },
  {
    slug: "robotics",
    name: "Robotics",
    icon: "Bot",
    iconComponent: Bot,
    description: "Sensor fusion, grasping datasets, and spatial mapping for industrial and consumer robotics.",
    overview: "Training a robot to interact with the physical world requires vast amounts of multi-dimensional spatial data. Loopernode specializes in annotating complex 3D environments for both industrial warehouse robots and consumer-facing service bots. We combine video, LiDAR, and tactile sensor data to provide the ground truth required for advanced robotic manipulation and path planning.",
    useCases: [
      {
        title: "Robotic Grasping & Manipulation",
        description: "Annotating 3D bounding boxes and physical center-of-mass points to teach robotic arms how to safely handle fragile items."
      },
      {
        title: "Spatial Mapping & SLAM",
        description: "Labeling dense indoor point clouds to help service robots navigate complex human environments."
      },
      {
        title: "Human-Robot Interaction",
        description: "Annotating human gestures, speech, and intent to train robots for seamless collaboration in shared workspaces."
      }
    ]
  },
  {
    slug: "autonomous-vehicles",
    name: "Autonomous Vehicles",
    icon: "Radar",
    iconComponent: Radar,
    description: "Massive scale 3D LiDAR, BEV, and video annotation for self-driving perception and planning.",
    overview: "Autonomous driving requires the absolute highest standard of data accuracy at an unprecedented scale. Loopernode partners with leading AV companies to process millions of frames of sensor fusion data. We provide expert annotation for complex urban environments, utilizing advanced 3D LiDAR cuboids, Bird's Eye View (BEV) mapping, and continuous video tracking.",
    useCases: [
      {
        title: "3D LiDAR Cuboid Annotation",
        description: "Precision drawing of 3D bounding boxes around vehicles, pedestrians, and cyclists across consecutive LiDAR sweeps."
      },
      {
        title: "Sensor Fusion Alignment",
        description: "Synchronizing and annotating overlapping camera, radar, and LiDAR data to provide a unified ground truth."
      },
      {
        title: "Lane & Boundary Segmentation",
        description: "Creating highly detailed vector maps of complex intersections, merging lanes, and temporary construction zones."
      }
    ]
  },
  {
    slug: "insurance",
    name: "Insurance",
    icon: "ShieldAlert",
    iconComponent: ShieldAlert,
    description: "Damage assessment imagery and claim document processing for automated underwriting and claims.",
    overview: "The insurance industry is rapidly moving toward automated claims processing and instant underwriting. We help InsurTech firms train computer vision models that can instantly assess vehicle or property damage from smartphone photos. We also process complex handwritten and typed claims documents to fully automate the data intake pipeline.",
    useCases: [
      {
        title: "Automated Damage Assessment",
        description: "Semantic segmentation of vehicle dents, scratches, and structural damage to estimate repair costs instantly."
      },
      {
        title: "Aerial Roof Inspection",
        description: "Analyzing high-resolution drone imagery to detect hail damage, missing shingles, and structural vulnerabilities."
      },
      {
        title: "Claims Document OCR",
        description: "Extracting critical data fields from diverse, unstructured medical bills and repair invoices."
      }
    ]
  },
  {
    slug: "education",
    name: "Education",
    icon: "GraduationCap",
    iconComponent: GraduationCap,
    description: "EdTech datasets for personalized learning algorithms, automated grading, and student engagement monitoring.",
    overview: "AI is democratizing personalized education globally. Loopernode supports EdTech platforms by providing expert annotation for educational content, student interaction logs, and specialized LLM fine-tuning for AI tutors. We ensure all educational data processing strictly adheres to COPPA and FERPA privacy regulations.",
    useCases: [
      {
        title: "AI Tutor Fine-Tuning",
        description: "Generating highly accurate, pedagogical Q&A pairs (RLHF) to train safe and effective LLM-based student tutors."
      },
      {
        title: "Automated Essay Scoring",
        description: "Providing thousands of expert-graded essays with detailed rubric breakdowns to train NLP grading models."
      },
      {
        title: "Student Engagement Analysis",
        description: "Analyzing anonymized classroom video feeds to track overall classroom focus and participation metrics."
      }
    ]
  }
];
