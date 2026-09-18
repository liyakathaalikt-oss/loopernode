export const caseStudies = [
  {
    slug: "autonomous-vehicle-perception",
    title: "Scaling Perception for Next-Gen Autonomous Vehicles",
    client: "Meridian Autonomics",
    industry: "Autonomous Vehicles",
    challenge: "Meridian Autonomics faced a critical bottleneck in their urban navigation models due to a severe shortage of high-fidelity, synchronized 3D LiDAR and 2D camera data. Their internal annotation teams were overwhelmed by the complexity of sensor fusion tasks, jeopardizing an impending autonomous fleet deployment.",
    solution: "We rapidly provisioned an air-gapped workforce of 500 domain-specific annotators rigorously trained on Meridian's proprietary sensor fusion taxonomy. By engineering an automated ETL pipeline and integrating AI-assisted 3D cuboid pre-labeling, we exponentially accelerated the human-in-the-loop validation process.",
    results: [
      "Processed and delivered 2.5 million synchronized sensor frames in just 6 months.",
      "Shattered the 98% SLA by achieving a sustained 99.7% annotation accuracy.",
      "Slashed cost-per-annotation by 40% via proprietary AI-assisted tooling.",
      "Accelerated the client's autonomous fleet deployment by a full operational quarter."
    ],
    image: "/images/case-studies/autonomous-vehicle.jpg"
  },
  {
    slug: "medical-imaging-disease-detection",
    title: "Accelerating AI-Assisted Radiology Diagnostics",
    client: "HealthBridge AI",
    industry: "Healthcare",
    challenge: "Developing an early-detection model for chest X-ray anomalies, HealthBridge AI struggled to source a globally diverse, HIPAA-compliant dataset. Furthermore, standard crowd-sourcing platforms completely failed to meet the rigorous clinical accuracy required for medical-grade segmentation.",
    solution: "We orchestrated the global sourcing and aggressive de-identification of 100,000 diverse X-rays. Subsequently, we deployed a closed team of board-certified radiologists to execute pixel-perfect segmentation under a strict, double-blind consensus protocol to guarantee clinical validity.",
    results: [
      "Successfully sourced and anonymized over 100,000 diverse X-rays in just 8 weeks.",
      "Maintained zero-breach HIPAA and GDPR compliance across the entire data lifecycle.",
      "Achieved an unprecedented 95% inter-annotator agreement among board-certified experts.",
      "Boosted client model accuracy by 18% specifically on rare, life-threatening edge cases."
    ],
    image: "/images/case-studies/medical-imaging.jpg"
  },
  {
    slug: "ecommerce-product-categorization",
    title: "Global E-commerce Product Taxonomy Localization",
    client: "Quantum Commerce",
    industry: "E-commerce",
    challenge: "During a rapid expansion into 15 new international markets, Quantum Commerce's localization pipelines collapsed. They urgently needed to accurately categorize, tag, and translate highly nuanced metadata for over 5 million product images to power localized recommendation engines.",
    solution: "We instantly provisioned a multilingual annotation workforce composed of native speakers across all 15 target regions. Utilizing our proprietary hierarchical categorization engine, the team rapidly parsed over 5,000 distinct product attributes by combining visual recognition with rigorous native-language text verification.",
    results: [
      "Categorized and translated metadata for 5 million product listings in under 12 weeks.",
      "Achieved native-level semantic accuracy across all 15 localized markets.",
      "Drove a 22% improvement in the client's localized search relevancy algorithms.",
      "Indirectly reduced product return rates by 15% through precision product tagging."
    ],
    image: "/images/case-studies/ecommerce.jpg"
  },
  {
    slug: "voice-assistant-multi-accent",
    title: "Eliminating Bias in Enterprise Voice Assistants",
    client: "Aura Systems",
    industry: "NLP / Audio",
    challenge: "Aura Systems identified a critical bias failure: their flagship voice assistant performed unacceptably poorly for users with heavy regional accents. They required an immediate influx of highly diverse, conversational audio data to retrain their ASR models and restore user trust.",
    solution: "Loopernode engineered a targeted global audio collection campaign, aggressively sourcing thousands of participants across 20 specific, hard-to-capture demographic and dialect groups. We captured natural, unscripted conversational audio across varied acoustic environments and delivered verbatim, timestamped transcriptions.",
    results: [
      "Successfully collected and meticulously transcribed over 5,000 hours of unique audio.",
      "Captured statistically significant representation across 20 distinct regional dialects.",
      "Slashed Word Error Rate (WER) by an astonishing 30% for minority dialect speakers.",
      "Directly contributed to a measurable spike in overall user engagement and retention."
    ],
    image: "/images/case-studies/voice-assistant.jpg"
  },
  {
    slug: "agricultural-drone-analysis",
    title: "Precision Agriculture via Aerial Crop Monitoring",
    client: "AgriVision Tech",
    industry: "Agriculture",
    challenge: "AgriVision Tech's drone analytics models were failing to detect early-stage crop blights. They possessed massive volumes of high-resolution aerial imagery, but the visual cues for disease onset were so subtle that standard annotation teams were producing unusable, noisy ground truth.",
    solution: "We partnered with certified agronomists to develop strict visual rubrics, then trained an elite cohort of annotators specifically for this project. Utilizing ultra-high-resolution polygon segmentation tools, this specialized team meticulously isolated minute signs of distress across thousands of acres of imagery.",
    results: [
      "Successfully segmented over 50,000 high-resolution multi-spectral aerial images.",
      "Accurately classified 12 distinct, highly confusing crop diseases with 98% precision.",
      "Empowered the client's models to detect blights a full 2 weeks earlier than human field scouts.",
      "Directly enabled precision pesticide protocols, reducing chemical runoff by 20%."
    ],
    image: "/images/case-studies/agriculture.jpg"
  },
  {
    slug: "financial-document-ocr",
    title: "Automating Invoice Processing with High-Fidelity OCR",
    client: "FinTech Solutions Global",
    industry: "Finance",
    challenge: "FinTech Solutions Global was hemorrhaging operational costs due to highly manual, error-prone invoice processing. To train a next-generation OCR extraction model, they desperately needed cleanly structured ground truth data spanning thousands of chaotic, non-standard document templates.",
    solution: "We ingested an unstructured corpus of 200,000 varied document formats, including degraded scans and mobile photos. Our teams utilized custom bounding box interfaces to rigorously map complex financial fields to a standardized JSON schema, expertly resolving faded text and handwritten anomalies.",
    results: [
      "Transformed 200,000 chaotic, unstructured invoices into pristine JSON datasets.",
      "Hit a remarkable 99.9% extraction accuracy on critical, high-liability financial fields.",
      "Permanently reduced the client's manual document processing time by 85%.",
      "Drove accounts payable error rates down to near absolute zero."
    ],
    image: "/images/case-studies/financial-document.jpg"
  }
];
