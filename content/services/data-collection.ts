export const dataCollectionOverview = {
  title: "AI Data Collection Services",
  description: "Secure, diverse, and ethically sourced data to fuel your next-generation AI models. We collect exactly what you need.",
  heroDescription: "Power your machine learning algorithms with high-quality, ethically sourced data from across the globe. Our comprehensive data collection services span text, image, video, audio, and specialized sensor data, tailored precisely to your model's domain and use case. We manage the entire pipeline from sourcing strategy to delivery, ensuring compliance, diversity, and uncompromising quality.",
  stats: [
    { value: 50, suffix: "M+", label: "Data Points Collected" },
    { value: 120, suffix: "+", label: "Languages & Dialects" },
    { value: 99, suffix: "%", label: "Data Quality Assurance" },
    { value: 40, suffix: "+", label: "Countries Sourced From" }
  ]
};

export const dataCollectionServices = [
  {
    slug: "image-collection",
    title: "Image Collection",
    description: "Large-scale, highly diverse image datasets designed specifically for computer vision models. We ensure balanced representation across demographics and environments.",
    longDescription: "Our image collection services provide the visual foundation for state-of-the-art computer vision models. Whether you need facial imagery, retail product photos, natural environments, or specialized industrial captures, our global crowd and field teams can acquire it. We rigorously manage lighting conditions, camera angles, resolutions, and demographic diversity to prevent model bias and ensure robust performance in real-world applications.",
    icon: "Image",
    features: [
      "Custom scene and object capture",
      "Demographic and geographic diversity",
      "High-resolution format support",
      "Mobile and DSLR quality imagery",
      "Strict copyright and usage compliance",
      "Automated quality filtering"
    ],
    useCases: [
      "Facial recognition and authentication",
      "Retail product identification",
      "Autonomous vehicle perception",
      "Defect detection in manufacturing"
    ],
    benefits: [
      "Reduces model bias through diverse sourcing",
      "Accelerates time-to-market with rapid collection",
      "Ensures legal compliance with clear usage rights",
      "Improves model accuracy with high-fidelity inputs"
    ],
    category: "data-collection"
  },
  {
    slug: "video-collection",
    title: "Video Collection",
    description: "Dynamic video datasets for action recognition, object tracking, and temporal analysis. Captured across various environments and device types.",
    longDescription: "Capture the complexity of motion with our custom video collection services. We source high-quality video data tailored for action recognition, object tracking, behavioral analysis, and sports analytics. Our contributors capture specific scenarios, actions, or environments based on your exact parameters, ensuring you receive the precise temporal data required to train sophisticated video understanding models.",
    icon: "Video",
    features: [
      "Specific action and gesture capture",
      "Multi-angle recording",
      "Varying framerates and resolutions",
      "In-cabin and dashcam footage",
      "Security and surveillance scenarios",
      "Drone and aerial videography"
    ],
    useCases: [
      "Human action recognition",
      "Traffic monitoring and autonomous driving",
      "Sports performance analytics",
      "Retail customer behavior tracking"
    ],
    benefits: [
      "Provides rich temporal context for complex models",
      "Supports multi-modal AI development",
      "Highly customizable scenarios and environments",
      "Scalable collection across global locations"
    ],
    category: "data-collection"
  },
  {
    slug: "audio-collection",
    title: "Audio Collection",
    description: "Comprehensive speech and audio data for NLP, ASR, and acoustic models. Includes multiple languages, dialects, and acoustic environments.",
    longDescription: "Voice AI requires vast amounts of high-quality audio data to understand accents, dialects, and intent accurately. Our audio collection services capture natural conversational speech, scripted monologues, wake words, and background noise environments. With a global network of native speakers, we provide the linguistic diversity necessary to build inclusive and highly accurate speech recognition and natural language processing systems.",
    icon: "Mic",
    features: [
      "Scripted and spontaneous speech",
      "Wake word and command collection",
      "Over 120 languages and dialects",
      "Controlled and natural acoustic environments",
      "Multi-speaker conversational data",
      "Background noise and ambient audio"
    ],
    useCases: [
      "Automatic Speech Recognition (ASR)",
      "Voice assistants and smart speakers",
      "Speaker identification and diarization",
      "Call center analytics and sentiment analysis"
    ],
    benefits: [
      "Improves speech recognition accuracy across demographics",
      "Enhances natural language understanding",
      "Builds robust models resistant to background noise",
      "Enables global product expansion with localized data"
    ],
    category: "data-collection"
  },
  {
    slug: "text-collection",
    title: "Text Collection",
    description: "Vast text corpora for language model training and fine-tuning. Ranging from conversational dialogues to domain-specific professional writing.",
    longDescription: "Fuel your Large Language Models (LLMs) with high-quality, domain-specific text data. We collect, aggregate, and generate text corpora ranging from casual conversational dialogues to highly technical medical, legal, and financial documents. Our text collection ensures linguistic richness, domain accuracy, and formatting consistency, providing the essential building blocks for summarization, translation, and generative AI models.",
    icon: "FileText",
    features: [
      "Domain-specific text sourcing (legal, medical, etc.)",
      "Multilingual text corpora",
      "Conversational dialogue generation",
      "Question-answering dataset creation",
      "Sentiment and intent variations",
      "Strict copyright clearance"
    ],
    useCases: [
      "LLM pre-training and fine-tuning",
      "Chatbot and virtual assistant training",
      "Machine translation systems",
      "Document summarization and extraction"
    ],
    benefits: [
      "Enhances domain-specific language comprehension",
      "Improves generative output quality and relevance",
      "Reduces hallucination through accurate source data",
      "Scales language support for global applications"
    ],
    category: "data-collection"
  },
  {
    slug: "sensor-collection",
    title: "Sensor Collection",
    description: "IoT and sensor data for edge AI and industrial applications. We collect telemetry, LiDAR, radar, and environmental sensor readings.",
    longDescription: "Beyond traditional media, we specialize in collecting complex sensor data crucial for robotics, autonomous systems, and industrial IoT. Our teams can deploy and monitor sensors to gather LiDAR point clouds, radar signatures, IMU telemetry, temperature, and pressure readings. We ensure precise calibration and synchronization of multi-sensor setups to provide cohesive datasets for complex fusion models.",
    icon: "Activity",
    features: [
      "LiDAR and radar data capture",
      "IMU and telemetry recording",
      "Multi-sensor synchronization",
      "Environmental and weather data",
      "Industrial machine IoT logs",
      "Custom hardware deployment"
    ],
    useCases: [
      "Autonomous vehicle sensor fusion",
      "Predictive maintenance in manufacturing",
      "Robotic navigation and mapping",
      "Smart agriculture and environmental monitoring"
    ],
    benefits: [
      "Enables advanced spatial awareness models",
      "Provides ground truth for complex physical environments",
      "Supports predictive modeling for hardware systems",
      "Facilitates robust edge AI deployment"
    ],
    category: "data-collection"
  },
  {
    slug: "medical-data",
    title: "Medical Data Collection",
    description: "Healthcare datasets meticulously sourced with full HIPAA and GDPR compliance. Includes medical imaging, EHR data, and clinical notes.",
    longDescription: "Developing AI for healthcare requires stringent privacy controls and absolute data accuracy. We source de-identified medical data, including X-rays, MRIs, CT scans, electronic health records (EHR), and clinical notes. Our partnerships with healthcare institutions and rigorous anonymization protocols ensure you receive high-quality clinical data that strictly adheres to HIPAA, GDPR, and other global healthcare regulations.",
    icon: "Stethoscope",
    features: [
      "HIPAA and GDPR compliant sourcing",
      "Rigorous de-identification and anonymization",
      "Diverse modality support (DICOM, text, etc.)",
      "Partnerships with certified medical institutions",
      "Demographically balanced patient data",
      "Expert medical oversight"
    ],
    useCases: [
      "Disease detection from medical imaging",
      "Predictive patient outcome modeling",
      "Clinical trial patient matching",
      "Medical text summarization"
    ],
    benefits: [
      "Accelerates clinical AI development safely",
      "Ensures strict regulatory compliance",
      "Improves diagnostic model accuracy",
      "Mitigates bias in healthcare algorithms"
    ],
    category: "data-collection"
  },
  {
    slug: "satellite-data",
    title: "Satellite Data Collection",
    description: "Geospatial and remote sensing data for earth observation AI. High-resolution imagery from diverse satellite constellations.",
    longDescription: "Unlock the power of Earth observation with our comprehensive satellite data collection. We aggregate high-resolution optical, SAR (Synthetic Aperture Radar), and multispectral imagery from leading satellite operators. Whether you need historical archives for change detection or recent captures for monitoring, we provide the geospatial data necessary for agricultural analysis, urban planning, and environmental tracking.",
    icon: "Globe",
    features: [
      "Optical and SAR imagery sourcing",
      "Multispectral and hyperspectral data",
      "Historical and current captures",
      "Global coverage capabilities",
      "Various resolution tiers",
      "Atmospheric correction applied"
    ],
    useCases: [
      "Crop health and yield prediction",
      "Urban development tracking",
      "Disaster response and damage assessment",
      "Deforestation and environmental monitoring"
    ],
    benefits: [
      "Provides macro-level insights for large-scale models",
      "Supports time-series analysis for change detection",
      "Enables continuous monitoring of remote areas",
      "Reduces the cost of field-based data gathering"
    ],
    category: "data-collection"
  },
  {
    slug: "web-data",
    title: "Web Data Collection",
    description: "Ethical web scraping and structured data extraction. We transform massive unstructured web content into clean, actionable datasets.",
    longDescription: "The web is the largest repository of human knowledge, but extracting useful data requires sophisticated engineering. We build robust, scalable pipelines to ethically scrape, structure, and aggregate web data. From e-commerce product catalogs and financial news to public forums and company directories, we deliver clean, structured datasets tailored to your specific schema requirements, ready for immediate ingestion.",
    icon: "Globe2",
    features: [
      "Distributed and scalable scraping infrastructure",
      "Dynamic content and SPA rendering",
      "Anti-bot mitigation and ethical compliance",
      "Custom schema extraction and structuring",
      "Real-time and batch collection",
      "Automated data quality validation"
    ],
    useCases: [
      "Market research and competitive analysis",
      "Financial sentiment modeling",
      "E-commerce price monitoring",
      "Knowledge graph construction"
    ],
    benefits: [
      "Provides real-time insights from public data",
      "Eliminates the need for internal scraping infrastructure",
      "Ensures reliable data delivery despite site changes",
      "Maintains ethical boundaries and terms of service compliance"
    ],
    category: "data-collection"
  },
  {
    slug: "synthetic-data",
    title: "Synthetic Data Generation",
    description: "AI-generated training datasets to overcome data scarcity and privacy issues. Perfectly labeled and endlessly scalable.",
    longDescription: "When real-world data is too scarce, sensitive, or expensive to collect, our synthetic data generation services bridge the gap. We utilize advanced generative models and simulation engines (like Unreal Engine and Unity) to create photorealistic images, diverse text, and tabular data. This approach provides perfectly annotated, edge-case rich datasets that preserve privacy while dramatically accelerating model training cycles.",
    icon: "Cpu",
    features: [
      "Photorealistic 3D environment simulation",
      "Generative text and tabular data creation",
      "Pixel-perfect automated labeling",
      "Rare edge-case and anomaly generation",
      "Strict privacy preservation (no PII)",
      "Infinite scalability and variations"
    ],
    useCases: [
      "Bootstrapping models before real data is available",
      "Training autonomous vehicles in simulated environments",
      "Financial fraud detection modeling",
      "Overcoming class imbalance in datasets"
    ],
    benefits: [
      "Completely eliminates privacy and PII concerns",
      "Reduces data acquisition costs significantly",
      "Guarantees 100% accurate annotations",
      "Enables rapid iteration and testing of edge cases"
    ],
    category: "data-collection"
  },
  {
    slug: "data-engineering",
    title: "Data Engineering",
    description: "Robust ETL pipelines, data transformation, and normalization to prepare your raw data for machine learning models.",
    longDescription: "Raw data is rarely ready for machine learning. Our data engineering services build the robust pipelines necessary to extract, transform, and load (ETL) your data efficiently. We handle schema conversions, data normalization, deduplication, and integration across disparate sources. Our scalable infrastructure ensures that your data flows seamlessly from storage to training, minimizing bottlenecks and maximizing model developer productivity.",
    icon: "Database",
    features: [
      "Custom ETL pipeline development",
      "Data normalization and standardization",
      "Automated deduplication and merge conflict resolution",
      "Cloud-native data warehouse integration",
      "Real-time streaming data processing",
      "Version control for datasets"
    ],
    useCases: [
      "Preparing legacy data for modern AI systems",
      "Consolidating multiple data streams into a single source",
      "Automating data updates for continuous learning models",
      "Optimizing data formats for faster training"
    ],
    benefits: [
      "Dramatically reduces data preparation time",
      "Ensures consistent data formatting across projects",
      "Scales easily with growing dataset sizes",
      "Improves overall model training efficiency"
    ],
    category: "data-collection"
  },
  {
    slug: "data-curation",
    title: "Data Curation",
    description: "Expert cleaning, metadata tagging, and filtering to elevate dataset quality and relevance for specific AI tasks.",
    longDescription: "High volume means nothing without high quality. Our data curation services sift through massive datasets to identify the most valuable, representative, and relevant examples for your specific model. We apply advanced heuristics, clustering algorithms, and expert human review to filter out noise, append rich metadata tags, and ensure optimal class balance, resulting in smaller, smarter datasets that train better models.",
    icon: "Filter",
    features: [
      "Algorithmic and human-in-the-loop filtering",
      "Advanced metadata extraction and tagging",
      "Dataset bias analysis and mitigation",
      "Class rebalancing and outlier removal",
      "Semantic similarity clustering",
      "Data quality scoring"
    ],
    useCases: [
      "Creating golden datasets for model evaluation",
      "Reducing training costs by selecting high-impact data",
      "Improving model fairness by balancing demographics",
      "Organizing unstructured data lakes for searchability"
    ],
    benefits: [
      "Increases model accuracy with higher signal-to-noise ratio",
      "Reduces compute costs by training on curated subsets",
      "Mitigates algorithmic bias proactively",
      "Makes large datasets easily navigable and searchable"
    ],
    category: "data-collection"
  },
  {
    slug: "data-anonymization",
    title: "Data Anonymization",
    description: "Rigorous PII removal and data masking to ensure compliance with GDPR, HIPAA, and global privacy regulations.",
    longDescription: "Protecting user privacy is paramount in AI development. Our data anonymization services utilize state-of-the-art techniques to redact, mask, and synthesize Personally Identifiable Information (PII) from text, images, and audio. We balance strict regulatory compliance (GDPR, HIPAA, CCPA) with preserving the underlying utility and statistical properties of the data, ensuring your models learn the patterns, not the people.",
    icon: "Shield",
    features: [
      "Automated PII detection (text, audio, video)",
      "Face and license plate blurring in images/video",
      "Voice masking and alteration in audio",
      "Entity replacement and tokenization in text",
      "Differential privacy techniques",
      "Compliance audit reporting"
    ],
    useCases: [
      "Sharing datasets with third-party researchers",
      "Using customer support logs for chatbot training",
      "Developing medical AI with patient records",
      "Analyzing dashcam footage for autonomous driving"
    ],
    benefits: [
      "Guarantees compliance with strict privacy laws",
      "Protects brand reputation and user trust",
      "Unlocks sensitive data silos for safe AI training",
      "Maintains data utility while removing individual identifiers"
    ],
    category: "data-collection"
  },
  {
    slug: "ai-consultancy",
    title: "AI Consultancy",
    description: "Strategic guidance on dataset design, ML pipeline architecture, and AI readiness for enterprise projects.",
    longDescription: "Navigating the complexities of AI implementation requires seasoned expertise. Our AI consultancy services provide strategic guidance from dataset inception to model deployment. We help you define data requirements, design scalable labeling ontologies, evaluate ML pipeline architectures, and assess overall AI readiness. Partner with our experts to avoid costly missteps and accelerate your journey from proof-of-concept to production.",
    icon: "Lightbulb",
    features: [
      "Data strategy and roadmap development",
      "Ontology and taxonomy design",
      "ML pipeline architecture review",
      "Vendor and tooling evaluation",
      "AI readiness assessments",
      "Custom workflow optimization"
    ],
    useCases: [
      "Planning a new enterprise AI initiative",
      "Optimizing an underperforming ML model",
      "Transitioning from prototype to scalable production",
      "Establishing internal data governance practices"
    ],
    benefits: [
      "Aligns data strategy with business objectives",
      "Prevents costly architectural rework later",
      "Accelerates project timelines with expert guidance",
      "Maximizes ROI on AI infrastructure investments"
    ],
    category: "data-collection"
  },
  {
    slug: "quality-assurance",
    title: "Quality Assurance",
    description: "Multi-layered human review and double verification processes to guarantee industry-leading data accuracy.",
    longDescription: "Your model is only as good as its ground truth. Our dedicated Quality Assurance services implement rigorous, multi-tiered validation protocols to ensure unparalleled data accuracy. We employ consensus scoring, expert double-blind verification, and statistical sampling to catch edge cases and errors. We provide detailed accuracy reports and continuous feedback loops to maintain the highest quality standards throughout the project lifecycle.",
    icon: "CheckCircle",
    features: [
      "Multi-tier human verification",
      "Consensus-based quality scoring",
      "Statistical sampling and error rate tracking",
      "Automated anomaly detection",
      "Detailed quality and compliance reporting",
      "Continuous feedback and guideline refinement"
    ],
    useCases: [
      "Validating high-stakes medical or legal annotations",
      "Auditing third-party vendor data deliveries",
      "Establishing golden benchmark datasets",
      "Monitoring ongoing labeling project health"
    ],
    benefits: [
      "Guarantees near-perfect ground truth accuracy",
      "Builds confidence in model performance and safety",
      "Identifies and corrects systemic labeling errors early",
      "Provides verifiable metrics for enterprise compliance"
    ],
    category: "data-collection"
  }
];
