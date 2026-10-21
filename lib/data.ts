export type Project = {
  id: number;
  num: string;
  type: string;
  title: string;
  desc: string;
  tags: string[];
  note: 'Completed' | 'In Development';
  updated: string;
  link: string;
  details: string;
};

export type Certification = {
  id: number;
  type: string;
  title: string;
  issuer: string;
  link: string;
};

export type Skill = { icon: string; title: string; desc: string; tags: string[] };
export type BlogPostMeta = { slug: string; title: string; tag: string; read: number; date: string; summary: string };

export const projects: Project[] = [
  { id: 1, num: "PROJECT 01", type: "Deep Learning", title: "TraceVision · AI-Powered Cross-Temporal Face Re-Identification & Visual Retrieval System", desc: "Developed and deployed an AI-powered computer vision application combining YOLO-based detection, OSNet person reidentification, tracking, and deep visual similarity search.", tags: ["Python","OSNet","YOLO","Computer Vision","Pytorch","Streamlit"], note: "Completed", updated: "2026-09", link: "https://github.com/nayim2003/Tracevision-AI-Powered-Cross-Tremporal-Face-Re-Identification-and-visual-retrieval-system.git", details: "Pipeline: (1) YOLO person detection, (2) OSNet re-ID feature extraction, (3) multi-frame tracking, (4) deep visual similarity search." },
  { id: 2, num: "PROJECT 02", type: "ML · Classification", title: "Customer Churn Prediction System", desc: "Built an end-to-end churn prediction pipeline with feature engineering, class-imbalance handling, model evaluation, and an interactive dashboard.", tags: ["Python","SQL","Scikit-Learn","XGBoost","Streamlit","SMOTENC","SHAP"], note: "Completed", updated: "2026-09", link: "https://github.com/nayim2003/Customer-Churn-Prediction-System.git", details: "End-to-end churn prediction covering ingestion, cleaning, feature engineering, SMOTENC, XGBoost, ROC-AUC, F1, and SHAP interpretation." },
  { id: 3, num: "PROJECT 03", type: "Predictive Analytics", title: "House Price Prediction System", desc: "Built an end-to-end house price prediction pipeline with data preprocessing, feature engineering, EDA, regression modeling, hyperparameter tuning, and model evaluation.", tags: ["Python","SQL","Scikit-Learn","Power BI","XGBoost","Streamlit"], note: "Completed", updated: "2026-09", link: "https://github.com/nayim2003/House-Price-Prediction-Project.git", details: "Complete regression pipeline with multiple models, hyperparameter tuning, comparison, and interactive app + Power BI dashboard." },
  { id: 4, num: "PROJECT 04", type: "Analytics · Segmentation", title: "Customer Segmentation & Marketing Analytics", desc: "Applied RFM analysis and K-Means clustering to identify customer segments and generate targeted marketing insights.", tags: ["Python","SQL","EDA","Clustering","RFM Analysis","Business Insights","Power BI"], note: "Completed", updated: "2026-09", link: "https://github.com/nayim2003/Customer-Segmentation-RFM-KMeans.git", details: "RFM + K-Means segmentation with business recommendations + Power BI dashboard." },
  { id: 5, num: "PROJECT 05", type: "ML · Risk Scoring", title: "Fraud Detection and Risk Scoring System", desc: "An end-to-end machine learning project to detect fraudulent transactions using preprocessing, EDA, feature engineering, and predictive modeling.", tags: ["Python","Classification","Scikit-learn"], note: "In Development", updated: "2026-10", link: "https://github.com/nayim2003/Fraud-Detection-and--Risk-Scoring-System.git", details: "Velocity features, extreme class imbalance handling, and risk scoring layer." },
  { id: 6, num: "PROJECT 06", type: "Analytics · Forecasting", title: "Client Behavior Prediction with AI model in Banking", desc: "An AI-powered banking project that analyzes customer data to predict behavioral patterns, identify segments, and forecast needs.", tags: ["Python","SQL","Plotly","Scikit-learn","XGBoost","SHAP","FastAPI","Streamlit"], note: "In Development", updated: "2026-10", link: "https://github.com/nayim2003/Client-behavior-prediction-with-AI-model-in-Banking.git", details: "Banking customer analytics: behavioral segmentation, product need forecasting, life-event triggers. FastAPI + Streamlit." },
  { id: 7, num: "PROJECT 07", type: "ML · DL · NLP", title: "FinGuard AI · Financial Documents Intelligence Compliance and Risk Analysis", desc: "Developing an AI-powered financial document intelligence system using NLP and ML to analyze complaints, classify issues, extract insights, and support compliance risk.", tags: ["Python","NLP","Clustering","PCA","EDA"], note: "In Development", updated: "2026-10", link: "https://github.com/nayim2003/FinGuard-AI-Financial-Document-Intelligence-Compliance-and-Risk-Analysis.git", details: "NLP classification, topic clustering with PCA + clustering, compliance risk signals." },
  { id: 8, num: "PROJECT 08", type: "Statistics · CNN", title: "Advanced Machine Learning Analysis in Retail", desc: "Developing an advanced ML solution for retail analytics to analyze sales trends, forecast demand, segment customers, and uncover purchasing patterns.", tags: ["Python","SQL","Power BI","Hypothesis Testing","Statistics","Neural Network","Scikit-Learn","XGBoost"], note: "In Development", updated: "2026-10", link: "https://github.com/nayim2003/Advanced-Machine-Learning-Analysis-in-Retail.git", details: "Hypothesis testing + ML: sales forecasting, demand segmentation, purchase pattern mining, CNN experimentation." }
];

export const certifications: Certification[] = [
  { id: 1, type: "Data Science & ML", title: "Data Science and Machine Learning with Python", issuer: "Ostad", link: "https://ostad.app/share/certificate/c47914-md.-nayim-howlader" },
  { id: 2, type: "Data Analytics", title: "Applied Data Science with Python", issuer: "IBM Skills Network", link: "https://cognitiveclass.ai/certificates/1ab8ea1b-be0f-4f1d-84ee-a228d2642f71" },
  { id: 3, type: "Advanced Analytics", title: "Data Analyst: Career Preparation", issuer: "IBM Skills Network", link: "https://cognitiveclass.ai/certificates/f90d9a1e-4858-4107-b100-57539eb93080" },
  { id: 4, type: "Data Science", title: "Python for Data Science and Machine Learning", issuer: "UniAthena", link: "https://uniathena.com/verify/certificate?certID=8569-2186-8493" },
  { id: 5, type: "Machine Learning", title: "Machine Learning with Python", issuer: "IBM Skills Network", link: "https://courses.cognitiveclass.ai/certificates/b476b838f7b447dc87d97d100aa8aaae" },
  { id: 6, type: "Business Intelligence", title: "Master Microsoft Power BI in 21 Days", issuer: "Udemy", link: "http://ude.my/UC-56664993-f5fb-42c4-bb47-5daf5ceaf99e" },
  { id: 7, type: "Python", title: "The Complete Python Bootcamp from Zero to Expert", issuer: "Udemy", link: "https://ude.my/UC-91a8dafe-f013-4f39-a4fe-fbc8f5f5b309" },
  { id: 8, type: "SQL", title: "Learn MySQL from scratch for Data Science and Analytics", issuer: "Udemy", link: "https://ude.my/UC-2b445999-e331-4f40-bc24-517072381c16" },
  { id: 9, type: "Data Science", title: "Python for Data Science and Machine Learning", issuer: "Udemy", link: "https://www.udemy.com/certificate/UC-3ffc72ad-b470-4606-95cf-1b488f23451c/" },
  { id: 10, type: "DevOps", title: "IBM DevOps and Software Engineering Professional Certificate", issuer: "IBM Skills Network", link: "https://cognitiveclass.ai/certificates/d609706c-5e6d-487f-bebe-a1a8ea28bbb1" },
  { id: 11, type: "Machine Learning", title: "Python for Machine Learning and Data Science", issuer: "Great Learning Academy", link: "https://www.mygreatlearning.com/certificate/NPFVSSHR?referrer_code=GLZFZHG8RR4QK" },
  { id: 12, type: "SQL", title: "SQL: From Zero to Hero Unleash the Data Superpowers", issuer: "Udemy", link: "https://ude.my/UC-b397624a-93c4-4cdd-8139-17d824aba122" },
  { id: 13, type: "Data Analysis", title: "Data Analysis with Python", issuer: "IBM Skills Network", link: "https://courses.cognitiveclass.ai/certificates/631ec52264f6420eba72ad6df2bef399" },
  { id: 14, type: "Machine Learning", title: "Machine Learning Basics", issuer: "IBM Skills Network", link: "https://cognitiveclass.ai/certificates/dc06e78e-9276-4348-aeed-8a54f09a6280" },
];

export const skills: Skill[] = [
  { icon: "⌘", title: "Programming & Data", desc: "Prepare, transform, validate, and analyze structured datasets.", tags: ["Python","SQL","Pandas","NumPy"] },
  { icon: "◫", title: "Statistics & EDA", desc: "Explore distributions, identify patterns, test hypotheses, and interpret data.", tags: ["EDA","Hypothesis Testing","Regression","Time Series"] },
  { icon: "⌁", title: "Supervised Machine Learning", desc: "Build and evaluate predictive models for classification and regression problems.", tags: ["Scikit-learn","XGBoost","Classification","Regression"] },
  { icon: "◈", title: "Unsupervised Machine Learning", desc: "Explore hidden patterns, discover groups, and investigate similarities in unlabeled data.", tags: ["Clustering","K-Means","PCA","DBSCAN"] },
  { icon: "▥", title: "Data Visualization", desc: "Communicate analytical findings through clear charts, dashboards, and reports.", tags: ["Matplotlib","Seaborn","Plotly","Power BI"] },
  { icon: "▤", title: "NLP & Development Tools", desc: "Explore text analytics and organize reproducible data science workflows.", tags: ["NLP","TF-IDF","FastAPI","Streamlit","Docker","MLflow"] },
];

export const experience = [
  {
    title: "Data Analyst",
    company: "Sarte Fashion Ltd.",
    date: "01 Feb 2024 – 31 Dec 2025",
    bullets: [
      "Conducted exploratory data analysis (EDA), statistical analysis, and trend identification using Python, Pandas, NumPy, and SQL to support business and investment decisions, contributing to a 20% improvement in portfolio performance.",
      "Developed and evaluated statistical and machine learning models, including Generalized Linear Models (GLM) and Random Forest, for predictive analytics and demand forecasting, supporting data-driven business strategies.",
      "Built automated data cleaning, preprocessing, and feature engineering pipelines for cross-sectional and time-series datasets, reducing data processing time by 40% and improving data accuracy by 12%.",
      "Created data visualizations, analytical reports, and actionable business insights using Matplotlib, Seaborn, and Plotly, collaborating with cross-functional stakeholders to communicate findings and support strategic decision-making."
    ]
  }
];

export const education = [
  { title: "BSc (Honours) in Statistics", lines: ["Dhaka College, Dhaka Central University","Department of Statistics"], status: "Academic details — update current status as applicable" },
  { title: "Higher Secondary Certificate (HSC)", lines: ["Science Group","Government Nalchity College, Jhalakati","Board of Intermediate and Secondary Education Barishal"], status: "" }
];

export const blogPostsMeta: BlogPostMeta[] = [
  { slug: "why-eda-first", title: "Why I start every ML project with EDA, not modeling", tag: "Machine Learning", read: 5, date: "2024-11-15", summary: "Data tells the story before any algorithm does. Here's my workflow for making sure I understand the problem first." },
  { slug: "p-value-explained", title: "Hypothesis testing, explained without the math horror", tag: "Statistics", read: 7, date: "2024-10-22", summary: "A p-value is not the probability your hypothesis is right. Let's untangle what it actually means." },
  { slug: "data-portfolio-guide", title: "Building a data portfolio that actually gets noticed", tag: "Career", read: 6, date: "2024-09-08", summary: "What recruiters look for, what they skip, and how to make your GitHub reflect your thinking." },
];

export const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#intro", label: "Intro" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#education", label: "Education" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/#labs", label: "ML Labs" },
  { href: "/#playground", label: "Playground" },
  { href: "/#abtest", label: "Statistics" },
  { href: "/#python", label: "Python" },
  { href: "/#sql", label: "SQL" },
  { href: "/#gallery", label: "Visualization" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export const USERNAME = "nayim2003";
export const EMAIL = "mdnayimhowlader66@gmail.com";
export const WHATSAPP = "8801857872494";
export const ZOOM = "https://us05web.zoom.us/j/6870343515?pwd=RKgcHRa3sxhF6RZw4CJjbMgrpMa5nX.1";

export const LABS = [
  { num: '01', title: 'Linear Regression Fit', badge: 'OLS', badgeClass: 'blue', desc: 'Adjust slope & intercept to minimize squared error.', type: 'linear' },
  { num: '02', title: 'Sigmoid Activation', badge: 'σ(x)', badgeClass: 'violet', desc: 'Squashes input into (0, 1). Gain controls steepness.', type: 'sigmoid' },
  { num: '03', title: 'Gradient Descent (Live)', badge: 'OPT', badgeClass: '', desc: 'Ball rolls downhill on a loss curve.', type: 'gd' },
  { num: '04', title: 'K-Means Clustering', badge: 'K-MEANS', badgeClass: 'gold', desc: 'Live clustering — centroids move each iteration.', type: 'kmeans' },
  { num: '05', title: 'Normal Distribution', badge: 'N(μ, σ²)', badgeClass: 'blue', desc: 'Adjust mean and standard deviation.', type: 'normal' },
  { num: '06', title: 'Monte Carlo · π', badge: 'MC', badgeClass: 'violet', desc: 'Random points in square. Estimate π.', type: 'monte' },
  { num: '07', title: 'ROC Curve & AUC', badge: 'AUC', badgeClass: '', desc: 'Adjust threshold to see TPR/FPR tradeoff.', type: 'roc' },
  { num: '08', title: 'Loss Landscape', badge: '2D HEAT', badgeClass: 'gold', desc: 'Contour heat map of loss surface.', type: 'loss' },
  { num: '09', title: 'Confusion Matrix', badge: 'CLICK', badgeClass: 'red', desc: 'Click cells to adjust metrics.', type: 'confusion' },
  { num: '10', title: 'Precision–Recall Curve', badge: 'PR', badgeClass: 'blue', desc: 'Move threshold slider.', type: 'pr' },
  { num: '11', title: 'Bias–Variance Tradeoff', badge: 'MSE', badgeClass: 'violet', desc: 'Slide complexity to see tradeoff.', type: 'biasvar' },
  { num: '12', title: 'PCA · 2D Projection', badge: 'PCA', badgeClass: 'gold', desc: 'Rotate principal axis.', type: 'pca' },
  { num: '13', title: 'Matrix Multiplication', badge: 'A·B', badgeClass: 'blue', desc: '2×2 matrix multiply.', type: 'matrix' },
  { num: '14', title: 'Time Series · AR(1)', badge: 'AR', badgeClass: 'violet', desc: 'Adjust φ for persistence.', type: 'timeseries' },
  { num: '15', title: 'K-Nearest Neighbors', badge: 'KNN', badgeClass: 'red', desc: 'Click to move star.', type: 'knn' },
];
