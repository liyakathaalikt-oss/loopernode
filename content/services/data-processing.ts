export const dataProcessingOverview = {
  title: "Advanced Data Processing",
  description: "Transform raw, unstructured data into clean, formatted, and enriched datasets optimized for machine learning.",
  heroDescription: "Data processing is the critical bridge between collection and training. Our automated and human-in-the-loop processing pipelines clean, normalize, and enrich your raw data, resolving inconsistencies and formatting issues that degrade model performance. We optimize your datasets to ensure maximum signal, minimal noise, and perfect compatibility with your specific machine learning architecture.",
  stats: [
    { value: 10, suffix: "PB+", label: "Data Processed" },
    { value: 99.9, suffix: "%", label: "Uptime & Reliability" },
    { value: 50, suffix: "+", label: "Supported Formats" },
    { value: 5, suffix: "x", label: "Faster Training Prep" }
  ]
};

export const dataProcessingServices = [
  {
    slug: "data-cleaning",
    title: "Data Cleaning",
    description: "Identify and remove noise, fix structural errors, and handle missing values to create pristine training sets.",
    longDescription: "Garbage in, garbage out. Our data cleaning services rigorously scrub your datasets to remove anomalies, duplicate records, and corrupted files. We employ sophisticated algorithms to handle missing values through intelligent imputation or strategic deletion, and we correct structural inconsistencies. The result is a high-fidelity dataset that prevents models from learning spurious correlations and improves overall accuracy.",
    icon: "Wrench",
    features: [
      "Automated anomaly and outlier detection",
      "Duplicate record identification and merging",
      "Missing value imputation techniques",
      "Structural error correction",
      "Noise reduction in audio/image files",
      "Data type validation"
    ],
    useCases: [
      "Preparing CRM data for predictive analytics",
      "Scrubbing sensor logs before time-series forecasting",
      "Cleaning scraped web data for NLP tasks",
      "Sanitizing legacy databases for migration"
    ],
    benefits: [
      "Directly improves model accuracy and reliability",
      "Prevents training crashes due to corrupted files",
      "Reduces manual data wrangling time for data scientists",
      "Creates a trustworthy foundation for all AI initiatives"
    ],
    category: "data-processing"
  },
  {
    slug: "dataset-validation",
    title: "Dataset Validation",
    description: "Rigorous integrity checks, schema validation, and consistency verification to ensure data readiness.",
    longDescription: "Before data enters your training pipeline, it must be validated. We implement strict schema validation to ensure every data point conforms to expected formats and constraints. We perform cross-referencing consistency checks and statistical validation to verify that the dataset accurately represents the target domain, catching systemic errors before they impact model development.",
    icon: "ShieldCheck",
    features: [
      "Strict schema and format validation",
      "Statistical distribution checking",
      "Cross-record consistency verification",
      "Label and annotation integrity checks",
      "Automated validation pipelines",
      "Detailed error reporting"
    ],
    useCases: [
      "Validating vendor data deliveries",
      "Ensuring compliance with internal data governance",
      "Checking dataset drift over time",
      "Verifying complex relational data integrity"
    ],
    benefits: [
      "Catches errors early in the ML lifecycle",
      "Ensures smooth ingestion into training systems",
      "Builds confidence in dataset quality",
      "Automates tedious manual verification tasks"
    ],
    category: "data-processing"
  },
  {
    slug: "normalization",
    title: "Data Normalization",
    description: "Standardize data formats, scale numerical values, and normalize distributions for stable model training.",
    longDescription: "Machine learning algorithms perform best when data is normalized. We scale numerical features, standardize date and time formats across time zones, and encode categorical variables consistently. By transforming data into a unified, standardized format, we help your models converge faster during training and prevent variables with larger scales from dominating the learning process.",
    icon: "SlidersHorizontal",
    features: [
      "Min-max scaling and Z-score standardization",
      "Datetime standardization and timezone conversion",
      "Consistent categorical encoding",
      "Text case and encoding normalization",
      "Image resizing and aspect ratio standardization",
      "Audio sample rate and volume normalization"
    ],
    useCases: [
      "Preparing financial data for algorithmic trading",
      "Standardizing patient records from multiple hospitals",
      "Resizing image datasets for CNN architectures",
      "Normalizing global sales data for forecasting"
    ],
    benefits: [
      "Accelerates model convergence and reduces training time",
      "Prevents feature dominance issues",
      "Ensures compatibility across disparate data sources",
      "Simplifies model deployment and inference"
    ],
    category: "data-processing"
  },
  {
    slug: "formatting",
    title: "Data Formatting",
    description: "Convert between complex formats and structure unstructured data to meet specific pipeline requirements.",
    longDescription: "Data rarely arrives in the format your model needs. We handle complex format conversions—from raw text to structured JSON, DICOM to standard image formats, or proprietary sensor logs to accessible CSVs. We excel at parsing unstructured data (like PDFs or emails) and structuring it into machine-readable formats, ensuring seamless integration into your existing ML infrastructure.",
    icon: "FileJson",
    features: [
      "Unstructured to structured data conversion",
      "Cross-format translation (e.g., XML to JSON, DICOM to PNG)",
      "Custom parsing of proprietary log files",
      "PDF and document data extraction",
      "Optimized formatting for specific ML frameworks",
      "Batch and streaming format conversion"
    ],
    useCases: [
      "Extracting structured tables from financial PDFs",
      "Converting medical imaging for cloud processing",
      "Structuring customer feedback emails for sentiment analysis",
      "Preparing data specifically for TensorFlow or PyTorch"
    ],
    benefits: [
      "Eliminates data silos by making formats interoperable",
      "Saves engineering time on custom parser development",
      "Unlocks value from previously inaccessible unstructured data",
      "Optimizes data loading speeds for training"
    ],
    category: "data-processing"
  },
  {
    slug: "enrichment",
    title: "Data Enrichment",
    description: "Augment your existing datasets with external context, metadata, and calculated features to improve predictive power.",
    longDescription: "Enhance the predictive power of your models by appending external context. Our data enrichment services merge your internal data with trusted third-party sources. We append demographic information, geographic coordinates, weather data, or financial indicators to your existing records. We also calculate complex derived features, providing your models with a deeper, more comprehensive view of the problem space.",
    icon: "PlusCircle",
    features: [
      "Third-party API integration and data merging",
      "Geocoding and spatial enrichment",
      "Demographic and firmographic appending",
      "Feature engineering and derivation",
      "Entity resolution and linking",
      "Real-time enrichment capabilities"
    ],
    useCases: [
      "Enriching customer profiles for personalized recommendations",
      "Adding weather data to supply chain forecasting models",
      "Appending company details to B2B lead datasets",
      "Enhancing fraud detection with IP geolocation data"
    ],
    benefits: [
      "Significantly improves model predictive accuracy",
      "Uncovers hidden patterns through added context",
      "Maximizes the value of existing internal data",
      "Reduces the need for complex internal feature engineering"
    ],
    category: "data-processing"
  },
  {
    slug: "ai-dataset-optimization",
    title: "AI Dataset Optimization",
    description: "Balance class distributions, reduce bias, and optimize dataset composition for robust, fair model training.",
    longDescription: "A perfectly labeled dataset can still produce a flawed model if the composition is unbalanced. We optimize datasets by analyzing class distributions and implementing strategic oversampling or undersampling to handle rare events. We actively identify and mitigate demographic or systemic biases within the data, ensuring your resulting AI models are not only accurate but also fair, robust, and generalizable.",
    icon: "Zap",
    features: [
      "Class imbalance detection and resolution",
      "Algorithmic bias auditing and mitigation",
      "Strategic downsampling and upsampling (SMOTE)",
      "Core-set selection for efficient training",
      "Data augmentation (image flipping, text synonym replacement)",
      "Dataset splitting optimization (Train/Val/Test)"
    ],
    useCases: [
      "Improving detection rates for rare medical conditions",
      "Mitigating racial or gender bias in facial recognition",
      "Reducing training costs by selecting optimal data subsets",
      "Creating robust evaluation datasets"
    ],
    benefits: [
      "Produces fairer, more ethical AI models",
      "Improves performance on rare but critical edge cases",
      "Optimizes compute resources by training on the right data",
      "Increases overall model generalizability"
    ],
    category: "data-processing"
  },
  {
    slug: "quality-monitoring",
    title: "Quality Monitoring",
    description: "Continuous tracking of dataset health, drift detection, and automated alerting to maintain model performance over time.",
    longDescription: "Data is not static; it evolves. Our quality monitoring services provide continuous oversight of your data pipelines. We implement automated drift detection to alert you when the statistical properties of incoming data diverge from your training sets. By continuously tracking data health metrics, we ensure that your deployed models remain accurate and reliable as real-world conditions change.",
    icon: "Activity",
    features: [
      "Data drift and concept drift detection",
      "Automated data quality dashboards",
      "Real-time alerting for anomalies",
      "Continuous statistical monitoring",
      "Pipeline health tracking",
      "Automated retraining triggers"
    ],
    useCases: [
      "Monitoring production data for deployed ML models",
      "Tracking shifting consumer behavior in retail data",
      "Detecting sensor degradation in IoT networks",
      "Maintaining accuracy of financial forecasting models"
    ],
    benefits: [
      "Prevents silent model degradation in production",
      "Provides actionable insights for when to retrain",
      "Maintains trust in AI systems over time",
      "Automates the operational oversight of ML data"
    ],
    category: "data-processing"
  }
];
