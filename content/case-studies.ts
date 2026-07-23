export const caseStudies = [
  {
    slug: "autonomous-vehicle-perception",
    title: "Scaling Perception for Next-Gen Autonomous Vehicles",
    client: "Meridian Autonomics",
    industry: "Autonomous Vehicles",
    challenge: "Meridian Autonomics required a massive influx of perfectly annotated 3D LiDAR and 2D camera data to improve their urban navigation models. Their internal team was bottlenecked, struggling to annotate complex sensor fusion data at the required scale and accuracy, threatening their deployment timeline.",
    solution: "Loopernode deployed a dedicated team of 500 expert annotators trained specifically on Meridian's sensor fusion guidelines. We implemented an automated pipeline to handle data transfer and utilized AI-assisted pre-labeling for 3D cuboids, drastically accelerating the manual review and adjustment process.",
    results: [
      "Delivered 2.5 million perfectly annotated frames within 6 months.",
      "Achieved 99.7% accuracy, exceeding the client's SLA of 98%.",
      "Reduced cost per annotation by 40% through tooling efficiencies.",
      "Accelerated the client's model deployment timeline by one full quarter."
    ],
    image: "/images/case-studies/autonomous-vehicle.jpg"
  },
  {
    slug: "medical-imaging-disease-detection",
    title: "Accelerating AI-Assisted Radiology Diagnostics",
    client: "HealthBridge AI",
    industry: "Healthcare",
    challenge: "HealthBridge AI was developing a model to detect early-stage anomalies in chest X-rays. They lacked a diverse, HIPAA-compliant dataset and required highly specialized medical annotation that standard crowd-sourcing platforms could not provide.",
    solution: "Loopernode sourced 100,000 diverse, de-identified X-rays globally. We then assembled a specialized team of certified radiologists to perform precise bounding box and segmentation annotation, utilizing a rigorous double-blind consensus protocol to ensure diagnostic accuracy.",
    results: [
      "Sourced and anonymized 100k+ diverse X-rays in 8 weeks.",
      "Maintained strict HIPAA and GDPR compliance throughout the pipeline.",
      "Achieved a 95% inter-annotator agreement among medical experts.",
      "Model accuracy improved by 18% on rare anomalous edge cases."
    ],
    image: "/images/case-studies/medical-imaging.jpg"
  },
  {
    slug: "ecommerce-product-categorization",
    title: "Global E-commerce Product Taxonomy Localization",
    client: "Quantum Commerce",
    industry: "E-commerce",
    challenge: "Expanding into 15 new international markets, Quantum Commerce needed to accurately categorize, tag, and translate metadata for over 5 million product images to power their localized search and recommendation engines.",
    solution: "We deployed a multilingual workforce covering all 15 target languages. Our team utilized an intelligent, hierarchical categorization tool that streamlined the selection of over 5,000 distinct product attributes, combining image recognition with native-language text verification.",
    results: [
      "Processed 5 million product listings in under 12 weeks.",
      "Supported 15 languages with native-level accuracy.",
      "Improved client's search relevancy score by 22%.",
      "Reduced product return rates due to inaccurate descriptions by 15%."
    ],
    image: "/images/case-studies/ecommerce.jpg"
  },
  {
    slug: "voice-assistant-multi-accent",
    title: "Eliminating Bias in Enterprise Voice Assistants",
    client: "Aura Systems",
    industry: "NLP / Audio",
    challenge: "Aura Systems found their voice assistant performed poorly for users with heavy regional accents. They urgently needed to retrain their ASR models with diverse, conversational audio data to improve inclusivity and user experience.",
    solution: "Loopernode executed a global data collection campaign, sourcing thousands of participants across 20 specific demographic and dialect groups. We collected natural, unscripted conversational audio in various acoustic environments and provided verbatim, timestamped transcriptions.",
    results: [
      "Collected and transcribed over 5,000 hours of diverse audio.",
      "Represented 20 distinct regional accents and dialects.",
      "Decreased Word Error Rate (WER) by 30% for minority dialect speakers.",
      "Significantly boosted overall user satisfaction and engagement metrics."
    ],
    image: "/images/case-studies/voice-assistant.jpg"
  },
  {
    slug: "agricultural-drone-analysis",
    title: "Precision Agriculture via Aerial Crop Monitoring",
    client: "AgriVision Tech",
    industry: "Agriculture",
    challenge: "AgriVision needed to train models to identify crop disease and pest infestations from high-resolution drone imagery. The data was massive, and the subtle visual cues of early disease required highly trained eyes to annotate accurately.",
    solution: "We trained a dedicated team on agronomist guidelines to identify specific blights and pests. Using high-resolution polygon segmentation, the team meticulously labeled thousands of acres of drone imagery, identifying healthy versus distressed foliage.",
    results: [
      "Segmented over 50,000 high-resolution aerial images.",
      "Identified 12 distinct crop diseases with 98% accuracy.",
      "Enabled client's models to detect distress 2 weeks earlier than human scouts.",
      "Supported precision pesticide application, reducing chemical use by 20%."
    ],
    image: "/images/case-studies/agriculture.jpg"
  },
  {
    slug: "financial-document-ocr",
    title: "Automating Invoice Processing with High-Fidelity OCR",
    client: "FinTech Solutions Global",
    industry: "Finance",
    challenge: "Processing thousands of non-standard invoices daily was highly manual and error-prone. The client needed to train an advanced OCR extraction model but lacked cleanly structured ground truth data from diverse invoice templates.",
    solution: "Loopernode ingested 200,000 varied invoice formats (PDFs, scans, mobile photos). Our annotators used specialized bounding box tools to map specific fields (Total, Tax, Vendor ID) to a standardized JSON schema, resolving edge cases like faded text or handwritten notes.",
    results: [
      "Structured 200,000 complex invoices into clean JSON data.",
      "Achieved 99.9% accuracy on critical financial fields.",
      "Reduced client's manual processing time by 85%.",
      "Decreased accounts payable error rates to near zero."
    ],
    image: "/images/case-studies/financial-document.jpg"
  }
];
