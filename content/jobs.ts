export interface JobListing {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  postedDate: string;
  description: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  preferredSkills: string[];
  technologies: string[];
  benefits: string[];
}

const standardBenefits = [
  'Remote Work',
  'Flexible Hours',
  'Learning & Development',
  'Career Growth',
  'Performance Bonus',
  'Global Projects',
  'Paid Leave',
  'Collaborative Team'
];

export const jobs: JobListing[] = [
  {
    slug: 'ai-data-annotation-specialist',
    title: 'AI Data Annotation Specialist',
    department: 'Data Operations',
    location: 'Remote (Global)',
    type: 'Contract',
    experience: '1-3 years',
    postedDate: '2025-08-01',
    description: 'Provide high-quality bounding box, semantic segmentation, and NLP annotations to train the next generation of AI models.',
    overview: 'As an AI Data Annotation Specialist at Loopernode, you will be at the forefront of AI development, meticulously labeling complex datasets that serve as the ground truth for state-of-the-art computer vision and natural language processing models. Your precision directly impacts the safety and efficacy of autonomous systems and healthcare diagnostics.',
    responsibilities: [
      'Accurately label and classify image, video, and text data according to strict project guidelines.',
      'Perform 2D bounding box, polygon, and 3D point cloud (LiDAR) annotations.',
      'Review and refine LLM (Large Language Model) outputs for safety, helpfulness, and factual accuracy.',
      'Conduct peer-to-peer quality assurance checks on datasets before final delivery.',
      'Identify edge cases in raw data and report them to the ML Engineering team.',
      'Maintain an annotation accuracy rate of 99% or higher.',
      'Participate in weekly calibration sessions to align on complex labeling rules.',
      'Manage multiple concurrent annotation projects using CVAT and Label Studio.',
      'Provide feedback to the tooling team to improve internal annotation software.'
    ],
    qualifications: [
      'Education: Bachelor’s degree in any field, or equivalent practical experience.',
      'Technical Skills: High computer literacy; experience with annotation platforms (CVAT, Labelbox, Scale).',
      'Industry Experience: 1+ years in data labeling, QA, or a highly detail-oriented role.',
      'Communication Skills: Strong written English for describing complex visual scenarios and LLM prompts.',
      'Problem Solving: Ability to independently resolve ambiguous edge cases using critical thinking.',
      'Team Collaboration: Comfortable working asynchronously with global teams.'
    ],
    preferredSkills: [
      'Basic understanding of Python or JSON formatting.',
      'Familiarity with medical imaging or autonomous vehicle data.',
      'Experience with 3D sensor fusion data (LiDAR/Radar).'
    ],
    technologies: ['CVAT', 'Label Studio', 'Microsoft Office', 'Computer Vision', 'NLP'],
    benefits: standardBenefits
  },
  {
    slug: 'ai-data-collection-specialist',
    title: 'AI Data Collection Specialist',
    department: 'Data Acquisition',
    location: 'Remote (Global)',
    type: 'Contract',
    experience: 'Entry Level',
    postedDate: '2025-07-28',
    description: 'Source, capture, and organize diverse multimodal datasets to power generalized machine learning applications.',
    overview: 'The AI Data Collection Specialist is responsible for gathering high-quality, diverse, and ethically sourced raw data from various environments. You will capture photos, record audio, shoot videos, or scrape public text repositories to create the foundational blocks for new AI initiatives across multiple industries.',
    responsibilities: [
      'Source and capture high-resolution images, videos, and audio clips following strict parameters.',
      'Scrape, clean, and format publicly available text datasets for LLM training.',
      'Ensure all collected data strictly adheres to privacy laws and ethical guidelines (GDPR/CCPA).',
      'Organize and catalog massive raw data files using cloud storage solutions (AWS S3/Google Cloud).',
      'Deploy and monitor automated web scraping scripts.',
      'Validate the quality and resolution of multimedia files before upload.',
      'Coordinate with global freelancers to acquire geo-specific datasets.',
      'Maintain comprehensive metadata logs for all collected assets.',
      'Troubleshoot hardware and sensor issues during physical data collection drives.'
    ],
    qualifications: [
      'Education: High school diploma or equivalent; Associate’s degree preferred.',
      'Technical Skills: Proficiency with high-end camera equipment, audio recorders, and cloud storage.',
      'Industry Experience: Previous experience in photography, videography, or digital archiving.',
      'Communication Skills: Clear communication for coordinating with freelance data gatherers.',
      'Problem Solving: Resourcefulness in finding niche data sources.',
      'Team Collaboration: Reliable and communicative in a remote setting.'
    ],
    preferredSkills: [
      'Experience with basic web scraping (BeautifulSoup, Selenium).',
      'Knowledge of basic video/audio editing software.',
      'Understanding of copyright and data privacy laws.'
    ],
    technologies: ['AWS', 'Google Cloud', 'Excel', 'Python'],
    benefits: standardBenefits
  },
  {
    slug: 'data-quality-assurance-specialist',
    title: 'Data Quality Assurance Specialist',
    department: 'Quality Assurance',
    location: 'Remote (US / EU)',
    type: 'Full-time',
    experience: '3+ years',
    postedDate: '2025-07-25',
    description: 'Audit annotated datasets, enforce precision guidelines, and build automated verification scripts for edge cases.',
    overview: 'Quality is our ultimate differentiator. As a Data QA Specialist, you are the final gatekeeper before a dataset is delivered to an enterprise client. You will manually review complex annotations, run automated sanity checks, and provide actionable feedback to the annotation teams to correct recurring errors and improve overall pipeline precision.',
    responsibilities: [
      'Conduct rigorous audits of image, video, and text annotations against client rubrics.',
      'Develop and run automated Python scripts to programmatically validate data formats (JSON/XML).',
      'Identify systemic labeling errors and update documentation accordingly.',
      'Calculate and report on inter-annotator agreement (IAA) metrics.',
      'Provide constructive, detailed feedback to annotators to improve their accuracy.',
      'Approve final datasets for delivery to the ML Engineering teams.',
      'Collaborate with Project Managers to redefine guidelines when edge cases emerge.',
      'Monitor and evaluate the performance of automated pre-labeling models.',
      'Maintain comprehensive QA logs and performance dashboards.'
    ],
    qualifications: [
      'Education: Bachelor’s degree in Computer Science, Statistics, or related field.',
      'Technical Skills: Strong SQL, Python scripting, and data visualization skills.',
      'Industry Experience: 3+ years in QA, data labeling, or ML operations.',
      'Communication Skills: Excellent ability to explain complex errors clearly and diplomatically.',
      'Problem Solving: Analytical mindset capable of finding patterns in large data samples.',
      'Team Collaboration: Ability to work closely with both technical engineers and non-technical annotators.'
    ],
    preferredSkills: [
      'Experience building dashboards in Tableau or PowerBI.',
      'Advanced knowledge of JSON schema validation.',
      'Previous experience training or managing junior QA staff.'
    ],
    technologies: ['Python', 'Excel', 'Label Studio', 'Computer Vision', 'NLP'],
    benefits: standardBenefits
  },
  {
    slug: 'ai-data-engineer',
    title: 'AI Data Engineer',
    department: 'Engineering',
    location: 'Remote (US / CA)',
    type: 'Full-time',
    experience: '4+ years',
    postedDate: '2025-07-20',
    description: 'Design and build scalable data pipelines, automate preprocessing tasks, and optimize database architectures for massive AI datasets.',
    overview: 'As an AI Data Engineer, you will build the backbone of our data operations. You will architect robust, scalable pipelines that can ingest, clean, and transform petabytes of unstructured data into pristine formats ready for model training. You will work closely with ML researchers to optimize data flow and reduce infrastructure bottlenecks.',
    responsibilities: [
      'Design, build, and maintain scalable ETL/ELT pipelines for multimodal data.',
      'Automate data cleaning, normalization, and deduplication processes using Python.',
      'Optimize database queries and storage architectures across AWS and GCP.',
      'Integrate third-party APIs to stream continuous data into our internal lakes.',
      'Implement data versioning systems (e.g., DVC) for reproducible machine learning.',
      'Monitor pipeline health, latency, and throughput, resolving bottlenecks proactively.',
      'Collaborate with the dev team to integrate annotation tools with cloud storage.',
      'Ensure robust data security, encryption, and compliance protocols are enforced.',
      'Write comprehensive technical documentation for all engineered pipelines.'
    ],
    qualifications: [
      'Education: BS or MS in Computer Science, Data Engineering, or related technical field.',
      'Technical Skills: Expert in Python, SQL, and cloud infrastructure (AWS/GCP).',
      'Industry Experience: 4+ years of experience building data pipelines in production.',
      'Communication Skills: Ability to articulate complex architectural decisions to stakeholders.',
      'Problem Solving: Deep expertise in debugging distributed systems and optimizing performance.',
      'Team Collaboration: Seamless collaboration via Git, Jira, and Agile methodologies.'
    ],
    preferredSkills: [
      'Experience with Apache Airflow, Spark, or Kafka.',
      'Familiarity with vector databases (Pinecone, Milvus).',
      'Knowledge of ML ops frameworks (Kubeflow, MLflow).'
    ],
    technologies: ['Python', 'AWS', 'Google Cloud', 'Git', 'AI/ML'],
    benefits: standardBenefits
  },
  {
    slug: 'project-manager-ai-data-services',
    title: 'Project Manager, AI Data Services',
    department: 'Product & Ops',
    location: 'Remote (UK / EU)',
    type: 'Full-time',
    experience: '5+ years',
    postedDate: '2025-07-15',
    description: 'Coordinate enterprise dataset delivery timelines, manage client feedback loops, and align technical roadmap priorities.',
    overview: 'As a Project Manager for AI Data Services, you are the conductor of our data delivery orchestra. You will act as the primary liaison between our enterprise clients, data operations, and engineering teams, ensuring that highly complex projects are delivered on time, within budget, and to our strict 99% quality standards.',
    responsibilities: [
      'Manage the end-to-end lifecycle of enterprise data annotation and collection projects.',
      'Facilitate daily stand-ups with data leads and weekly syncs with enterprise clients.',
      'Translate technical client requirements into actionable annotation guidelines.',
      'Identify project risks, scope creep, and develop proactive mitigation strategies.',
      'Track KPIs, resource allocation, annotator velocity, and budget burn rates.',
      'Negotiate delivery timelines and manage client expectations effectively.',
      'Coordinate the onboarding of new specialized annotation tools when required.',
      'Lead post-mortem meetings to extract learnings and improve future processes.',
      'Ensure all project documentation in Confluence and Jira is up to date.'
    ],
    qualifications: [
      'Education: Bachelor’s degree in Business, IT, or a related field.',
      'Technical Skills: Strong proficiency in Jira, Asana, and enterprise project management tools.',
      'Industry Experience: 5+ years of PM experience, specifically within AI, tech, or data operations.',
      'Communication Skills: Exceptional client-facing communication and presentation skills.',
      'Problem Solving: Ability to dynamically reallocate resources to hit aggressive deadlines.',
      'Team Collaboration: Proven ability to lead cross-functional global teams.'
    ],
    preferredSkills: [
      'PMP, Scrum Master, or Agile certification.',
      'Familiarity with the machine learning lifecycle.',
      'Experience managing budgets exceeding $1M.'
    ],
    technologies: ['Microsoft Office', 'Excel', 'AI/ML', 'Label Studio'],
    benefits: standardBenefits
  },
  {
    slug: 'business-development-executive',
    title: 'Business Development Executive',
    department: 'Growth',
    location: 'Remote (US)',
    type: 'Full-time',
    experience: '6+ years',
    postedDate: '2025-07-10',
    description: 'Drive enterprise partner acquisitions, develop strategic sales channels, and expand our market presence in autonomous tech.',
    overview: 'We are seeking a highly driven Business Development Executive to dramatically expand our footprint in the autonomous vehicle, robotics, and healthcare AI sectors. You will identify key enterprise targets, navigate complex procurement cycles, negotiate high-value contracts, and build long-lasting strategic partnerships with leading AI labs.',
    responsibilities: [
      'Identify, prospect, and qualify high-value enterprise AI and machine learning clients.',
      'Lead complex sales cycles from initial outreach to successful contract closure.',
      'Draft highly tailored proposals, SLAs, and pricing models for massive data projects.',
      'Attend global industry conferences to represent Loopernode and generate inbound leads.',
      'Collaborate closely with marketing to refine go-to-market strategies and sales collateral.',
      'Maintain an accurate, up-to-date sales pipeline within the CRM (Salesforce/HubSpot).',
      'Conduct in-depth market research to identify emerging trends in AI data needs.',
      'Build and nurture long-term relationships with CTOs, VP of Engineering, and AI Directors.',
      'Consistently meet and exceed quarterly and annual revenue targets.'
    ],
    qualifications: [
      'Education: Bachelor’s degree in Business, Marketing, or a technical discipline.',
      'Technical Skills: Proficiency with CRM software (Salesforce/HubSpot) and sales analytics.',
      'Industry Experience: 6+ years of B2B enterprise sales experience in SaaS, Data, or AI.',
      'Communication Skills: World-class negotiation, pitching, and executive-level communication.',
      'Problem Solving: Ability to navigate complex corporate procurement and legal structures.',
      'Team Collaboration: Works seamlessly with Project Managers to ensure smooth client handoffs.'
    ],
    preferredSkills: [
      'Existing network of decision-makers within the AI/ML industry.',
      'Proven track record of closing 7-figure enterprise contracts.',
      'Deep understanding of generative AI and LLM trends.'
    ],
    technologies: ['Microsoft Office', 'Excel', 'AI/ML', 'NLP'],
    benefits: standardBenefits
  }
];
