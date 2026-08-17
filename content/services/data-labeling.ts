export const dataLabelingOverview = {
  title: "Precision Data Labeling Services",
  description: "High-quality, scalable annotation for computer vision, NLP, and audio models, powered by expert human-in-the-loop workflows.",
  heroDescription: "Transform raw data into pristine ground truth with our enterprise-grade data labeling services. We combine advanced tooling, AI-assisted pre-labeling, and a highly trained global workforce to deliver uncompromising accuracy at scale. From complex 3D point clouds to nuanced RLHF for language models, our dedicated teams ensure your algorithms learn from the best possible examples.",
  aeo: {
    question: "What is AI Data Labeling?",
    answer: "AI Data Labeling (or Data Annotation) is the process of attaching precise, descriptive metadata to raw datasets—such as bounding boxes on images or sentiment tags on text. This labeled 'ground truth' allows machine learning and generative AI algorithms to accurately recognize patterns, comprehend context, and generate high-quality outputs."
  },
  stats: [
    { value: 500, suffix: "M+", label: "Annotations Completed" },
    { value: 99.5, suffix: "%", label: "Accuracy Guarantee" },
    { value: 10, suffix: "k+", label: "Expert Annotators" },
    { value: 24, suffix: "/7", label: "Global Operations" }
  ]
};

export const dataLabelingServices = [
  {
    slug: "image-annotation",
    title: "Image Annotation",
    description: "Precise bounding boxes, polygons, and semantic segmentation for autonomous driving, medical imaging, and retail computer vision.",
    longDescription: "Our image annotation services provide pixel-perfect ground truth for all computer vision applications. Whether you need simple 2D bounding boxes for object detection, intricate polygons for complex shapes, or dense semantic segmentation for scene understanding, our expert annotators deliver. We specialize in challenging domains including medical imaging, satellite imagery analysis, and high-precision autonomous vehicle perception.",
    icon: "Image",
    features: [
      { title: "Bounding boxes, polygons, and keypoints", description: "Meticulous outlining of objects with pinpoint accuracy to train highly reliable object detection models." },
      { title: "Semantic and instance segmentation", description: "Pixel-perfect classification for complex visual parsing, ensuring distinct separation of background and foreground elements." },
      { title: "OCR and document transcription", description: "Precise extraction of text from varied image formats to build robust optical character recognition capabilities." },
      { title: "Medical imaging (DICOM) annotation", description: "HIPAA-compliant labeling by trained professionals to support advanced healthcare diagnostic algorithms." },
      { title: "Satellite and aerial imagery labeling", description: "High-level spatial tagging for geographic mapping, agricultural monitoring, and urban planning applications." },
      { title: "Multi-layered QA workflows", description: "Rigorous human and automated checks to guarantee industry-leading annotation accuracy before final delivery." }
    ],
    useCases: [
      "Autonomous driving perception systems",
      "Retail shelf analysis and checkout automation",
      "Medical anomaly detection",
      "Agricultural crop health monitoring"
    ],
    benefits: [
      "High pixel-level accuracy for robust models",
      "Scalable workforce for massive datasets",
      "Domain-specific expertise for complex tasks",
      "Fast turnaround times to accelerate training"
    ],
    category: "data-labeling"
  },
  {
    slug: "text-annotation",
    title: "Text Annotation",
    description: "Advanced NLP annotation including NER, sentiment analysis, RLHF, and instruction tuning for sophisticated Large Language Models.",
    longDescription: "Elevate your Large Language Models with our comprehensive text annotation and RLHF (Reinforcement Learning from Human Feedback) services. We provide Named Entity Recognition (NER), intent classification, and sentiment analysis for traditional NLP. For modern generative models, our highly educated annotators craft specialized prompt responses, rank model outputs for alignment, and conduct rigorous instruction tuning to ensure your LLMs are helpful, honest, and harmless.",
    icon: "FileText",
    features: [
      { title: "Named Entity Recognition (NER) & POS tagging", description: "Accurate categorization of people, places, and syntactic structures to empower natural language understanding." },
      { title: "Sentiment and intent classification", description: "Nuanced tagging of emotional tone and user goals to refine customer service chatbots and analysis tools." },
      { title: "RLHF and reward modeling", description: "Expert human feedback loops designed to align your generative AI with safe, helpful, and desired behaviors." },
      { title: "Instruction tuning and prompt generation", description: "Crafting precise conversational pairs to dramatically improve your language model's zero-shot task execution." },
      { title: "Text summarization and generation QA", description: "Evaluating generated content for factual accuracy, coherence, and stylistic consistency against source material." },
      { title: "Multilingual NLP support", description: "Native-speaker level annotation across multiple dialects to ensure your models perform flawlessly on a global scale." }
    ],
    useCases: [
      "LLM alignment and fine-tuning",
      "Customer service chatbot training",
      "Financial document information extraction",
      "Social media monitoring and moderation"
    ],
    benefits: [
      "Improves LLM safety, alignment, and accuracy",
      "Enhances nuanced understanding of context and tone",
      "Supports complex, multi-turn dialogue training",
      "Scales easily across different languages and domains"
    ],
    category: "data-labeling"
  },
  {
    slug: "3d-point-cloud",
    title: "3D Point Cloud Annotation",
    description: "Expert 3D cuboid and semantic segmentation of LiDAR and sensor data for autonomous vehicles and robotics.",
    longDescription: "Navigate the complexities of spatial data with our specialized 3D point cloud annotation. Essential for autonomous vehicles and robotics, our teams expertly label LiDAR and radar data using 3D cuboids, semantic segmentation, and instance tracking. We utilize advanced sensor fusion techniques, linking 3D point clouds with 2D camera data to provide comprehensive, multi-modal ground truth for dynamic physical environments.",
    icon: "Box",
    features: [
      { title: "3D cuboid tracking across frames", description: "Consistent spatial bounding and temporal tracking of objects to ensure smooth autonomous navigation training." },
      { title: "Semantic and instance segmentation of LiDAR", description: "Detailed classification of individual points within point clouds to enable precise environmental understanding." },
      { title: "Sensor fusion (LiDAR + Camera)", description: "Synchronized annotation bridging 2D imagery and 3D spatial data for robust, multi-modal model development." },
      { title: "Bird's Eye View (BEV) annotation", description: "Top-down perspective labeling essential for holistic scene generation and vehicle path planning algorithms." },
      { title: "Lane and road boundary mapping", description: "Accurate tracing of road infrastructure and drivable areas critical for autonomous driving safety." },
      { title: "High-precision alignment QA", description: "Strict quality control utilizing specialized 3D visualization tools to prevent calibration and labeling drift." }
    ],
    useCases: [
      "Autonomous vehicle navigation and obstacle avoidance",
      "Industrial robotics and automation",
      "Drone-based mapping and surveying",
      "AR/VR environment construction"
    ],
    benefits: [
      "Crucial for safe autonomous system deployment",
      "Provides accurate spatial and volumetric context",
      "Handles high-density, complex sensor data",
      "Experienced teams reduce iteration cycles"
    ],
    category: "data-labeling"
  },
  {
    slug: "audio-annotation",
    title: "Audio Annotation",
    description: "Accurate transcription, speaker diarization, and emotion detection for speech recognition and acoustic models.",
    longDescription: "Transform raw audio into actionable data with our precision audio annotation services. We provide meticulous phonetic transcription, speaker diarization (identifying who spoke when), and precise timestamping. Beyond basic transcription, we annotate intent, emotion, and background acoustic events, enabling the development of nuanced conversational AI and sophisticated audio analysis tools across multiple languages and dialects.",
    icon: "Mic",
    features: [
      { title: "Verbatim and non-verbatim transcription", description: "Highly accurate text conversion of speech, capturing stutters and filler words or providing clean, readable text." },
      { title: "Speaker diarization and timestamping", description: "Precise identification of distinct speakers mapped to exact timestamps for complex multi-party audio analysis." },
      { title: "Emotion and tone classification", description: "Tagging subtle vocal inflections and acoustic cues to train empathetic and context-aware conversational AI." },
      { title: "Keyword spotting and wake word labeling", description: "Targeted tagging of specific trigger phrases to optimize smart devices and hands-free control systems." },
      { title: "Acoustic event detection", description: "Identifying and categorizing background noises like sirens, breaking glass, or machinery for safety applications." },
      { title: "Multilingual native-speaker annotators", description: "Leveraging cultural and linguistic expertise to accurately transcribe complex regional accents and slang." }
    ],
    useCases: [
      "Training Automatic Speech Recognition (ASR) models",
      "Call center sentiment and compliance analysis",
      "Voice assistant personalization",
      "Media subtitling and closed captioning"
    ],
    benefits: [
      "Enhances ASR accuracy in noisy environments",
      "Improves conversational AI user experience",
      "Captures nuanced emotional context",
      "Ensures culturally and linguistically accurate models"
    ],
    category: "data-labeling"
  },
  {
    slug: "video-annotation",
    title: "Video Annotation",
    description: "Temporal object tracking, pose estimation, and action recognition for dynamic video analysis and sports analytics.",
    longDescription: "Video data requires an understanding of motion and time. Our video annotation services track objects continuously across frames, interpolate movement, and classify complex temporal actions. Whether you are building skeletal pose estimation models for sports analytics, tracking vehicles in traffic footage, or analyzing human behavior in retail environments, we provide consistent, high-quality temporal ground truth.",
    icon: "Video",
    features: [
      { title: "Object tracking with temporal interpolation", description: "Seamless bounding box tracking that anticipates movement across missing frames to build reliable kinetic models." },
      { title: "Skeletal pose estimation and keypoints", description: "Precise mapping of human joints and body language to support advanced biomechanical and sports analysis AI." },
      { title: "Action and event recognition", description: "Tagging specific behaviors and milestones within a timeline to enable automated video summarization and alerting." },
      { title: "Polygon tracking for moving boundaries", description: "Dynamic shape outlining that adjusts frame-by-frame for objects changing perspective or morphing in shape." },
      { title: "Multi-camera tracking integration", description: "Linking identities of subjects as they move across different camera feeds to support security and retail tracking." },
      { title: "High-framerate video support", description: "Specialized tools and workflows designed to handle the massive data load of 60fps+ slow-motion analysis." }
    ],
    useCases: [
      "Sports performance and biomechanical analysis",
      "Security and behavioral monitoring",
      "Traffic flow and congestion modeling",
      "Human-computer interaction studies"
    ],
    benefits: [
      "Captures fluid motion and temporal dependencies",
      "Reduces manual effort via interpolation tools",
      "Supports complex behavioral modeling",
      "Ensures consistency across long video sequences"
    ],
    category: "data-labeling"
  },
  {
    slug: "annotation-teams",
    title: "Annotation Teams",
    description: "Dedicated, managed workforce tailored to your specific project needs, ensuring consistency, security, and scalability.",
    longDescription: "For long-term or highly specialized projects, we provide dedicated Annotation Teams. These are managed, consistent groups of annotators and QA specialists trained exclusively on your guidelines and domain. We provide project managers to handle daily operations, ensure strict SLA adherence, and maintain rigorous security protocols (including secure facilities if required), acting as a seamless extension of your internal AI team.",
    icon: "Users",
    features: [
      { title: "Dedicated, consistent annotator pool", description: "Retaining the same highly trained individuals on your project to ensure labeling styles never drift or degrade." },
      { title: "Expert project and QA management", description: "Oversight by experienced managers who proactively resolve edge cases and refine guidelines before errors scale." },
      { title: "Custom training and guideline development", description: "Collaborative onboarding processes to translate your specific model requirements into actionable labeling rubrics." },
      { title: "Scalable resource allocation", description: "The flexibility to instantly increase your team size during data surges without sacrificing annotation quality." },
      { title: "Strict data security and NDA compliance", description: "Operating in locked-down environments with stringent access controls to protect your proprietary IP." },
      { title: "Custom SLA and KPI reporting", description: "Transparent dashboards tracking throughput, consensus scores, and accuracy metrics in real-time." }
    ],
    useCases: [
      "Continuous learning models requiring daily data",
      "Highly complex, domain-specific labeling (e.g., legal)",
      "Projects requiring strict data isolation and security",
      "Scaling internal data ops teams seamlessly"
    ],
    benefits: [
      "Highest consistency due to minimal team churn",
      "Reduces internal management overhead",
      "Rapidly scales up or down based on volume",
      "Ensures deep domain expertise over time"
    ],
    category: "data-labeling"
  }
];
