export const dataLabelingOverview = {
  title: "Precision Data Labeling Services",
  description: "High-quality, scalable annotation for computer vision, NLP, and audio models, powered by expert human-in-the-loop workflows.",
  heroDescription: "Transform raw data into pristine ground truth with our enterprise-grade data labeling services. We combine advanced tooling, AI-assisted pre-labeling, and a highly trained global workforce to deliver uncompromising accuracy at scale. From complex 3D point clouds to nuanced RLHF for language models, our dedicated teams ensure your algorithms learn from the best possible examples.",
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
      "Bounding boxes, polygons, and keypoints",
      "Semantic and instance segmentation",
      "OCR and document transcription",
      "Medical imaging (DICOM) annotation",
      "Satellite and aerial imagery labeling",
      "Multi-layered QA workflows"
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
      "Named Entity Recognition (NER) & POS tagging",
      "Sentiment and intent classification",
      "RLHF and reward modeling",
      "Instruction tuning and prompt generation",
      "Text summarization and generation QA",
      "Multilingual NLP support"
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
      "3D cuboid tracking across frames",
      "Semantic and instance segmentation of LiDAR",
      "Sensor fusion (LiDAR + Camera)",
      "Bird's Eye View (BEV) annotation",
      "Lane and road boundary mapping",
      "High-precision alignment QA"
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
      "Verbatim and non-verbatim transcription",
      "Speaker diarization and timestamping",
      "Emotion and tone classification",
      "Keyword spotting and wake word labeling",
      "Acoustic event detection",
      "Multilingual native-speaker annotators"
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
      "Object tracking with temporal interpolation",
      "Skeletal pose estimation and keypoints",
      "Action and event recognition",
      "Polygon tracking for moving boundaries",
      "Multi-camera tracking integration",
      "High-framerate video support"
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
      "Dedicated, consistent annotator pool",
      "Expert project and QA management",
      "Custom training and guideline development",
      "Scalable resource allocation",
      "Strict data security and NDA compliance",
      "Custom SLA and KPI reporting"
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
