import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, ArrowRight, X } from "lucide-react";
import { ServiceDoodle } from "./ServiceDoodle";
import { ServiceBlueprintDoodle } from "./ServiceBlueprintDoodle";

interface ServiceItem {
  n: string;
  title: string;
  desc: string;
  standard: string;
  trigger: string;
  cta: string;
}

interface Group {
  id: string;
  title: string;
  forText: string;
  triggerText: string;
  services: ServiceItem[];
}



const serviceGroups: Group[] = [
  {
    id: "run-finance-operations",
    title: "Group 1: Run my finance operations",
    forText: "CFOs and Controllers at fast-growing companies.",
    triggerText: "I need books closed, AP/AR running, payroll done without hiring.",
    services: [
      {
        n: "01",
        title: "Accounting Process Outsourcing",
        desc: "End-to-end finance ops: bookkeeping, AP, AR, R2R, payroll, FP&A. Iris reconciles in seconds. Senior controllers review exceptions daily.",
        standard: "Daily exception review · monthly close in 4-5 days · audit-ready ledger · one dashboard",
        trigger: "Close drags past day 7 · errors slip in · CFO sees numbers last",
        cta: "Add to subscription →"
      },
      {
        n: "02",
        title: "Virtual CFO Services",
        desc: "Fractional CFO leadership for high-growth companies and PE-backed portfolios, backed by our AI agents.",
        standard: "Board reporting · cash forecasting · investor decks · KPI design · monthly business review",
        trigger: "Pre-Series B · post-acquisition · CFO seat open · PE portfolio company without finance leadership",
        cta: "Add to subscription →"
      },
      {
        n: "03",
        title: "Interim Resource Alignment",
        desc: "Pre-vetted controllers, managers, and analysts deployed in days, not months.",
        standard: "Drop-in or hybrid-pod options · matched to your stack and stage · senior practitioner backstop",
        trigger: "Maternity/paternity gap · hiring takes too long · interim controller while you search",
        cta: "Talk to us →"
      }
    ]
  },
  {
    id: "audit-ready",
    title: "Group 2: Get audit-ready and stay that way",
    forText: "CFOs heading into audits, post-acquisition entities, PE-backed companies.",
    triggerText: "Auditor's coming and we're not ready.",
    services: [
      {
        n: "04",
        title: "Internal Controls & SOX Compliance",
        desc: "Design, test, and remediate controls that stand up to scrutiny. Guardian flags control breaks in real time.",
        standard: "Risk assessment · control design · testing program · remediation · year-round monitoring",
        trigger: "First SOX year · ICFR remediation findings · post-IPO controls · PE portco prep",
        cta: "Add to subscription →"
      },
      {
        n: "05",
        title: "Technical Accounting",
        desc: "Complex transactions, US GAAP and IFRS positions delivered with rigor. Human judgment first, AI handles documentation.",
        standard: "Revenue recognition (ASC 606) · lease accounting (ASC 842) · business combinations · stock comp · memos that hold up to auditors",
        trigger: "New contract structures · M&A transaction · IPO-related accounting · auditor questioning a position",
        cta: "Talk to a technical lead →"
      },
      {
        n: "06",
        title: "Audit Outsourcing (for firms)",
        desc: "Co-source and outsource models for assurance firms under capacity pressure. Workpapers in your format, your timeline, white-labeled if needed.",
        standard: "PCAOB-aligned workpapers · senior reviewer on every file · capacity surge during busy season",
        trigger: "Tax season overflow · firm losing client work to capacity gaps · M&A integration on the firm side",
        cta: "Talk to us about firm partnerships →"
      },
      {
        n: "07",
        title: "Financial Audit Readiness",
        desc: "PBC playbooks, pre-audit closes, and clean walk-throughs before day one. Atlas auto-builds the PBC list.",
        standard: "PBC list automation · pre-audit close · walk-through prep · auditor liaison · post-audit remediation",
        trigger: "First-year audit · auditor change · prior-year findings · IPO countdown",
        cta: "Add to subscription →"
      }
    ]
  },
  {
    id: "prepare-transaction",
    title: "Group 3: Prepare for a transaction",
    forText: "Pre-IPO companies, M&A targets, PE portfolio companies.",
    triggerText: "We have 12 months to be ready.",
    services: [
      {
        n: "08",
        title: "IPO Readiness",
        desc: "End-to-end IPO prep, from books to SOX to S-1 narrative, backed by our Virtual CFO bench.",
        standard: "Audit-ready financials · SOX-ready controls · S-1 drafting support · investor reporting infrastructure · first-earnings playbook",
        trigger: "S-1 in 12-24 months · pre-IPO audit selection · investor diligence · post-IPO operating cadence",
        cta: "Talk to an IPO lead →"
      },
      {
        n: "09",
        title: "Tax Advisory",
        desc: "Cross-border structuring, provisioning, and ongoing tax compliance.",
        standard: "Federal/state/local provisions · transfer pricing · entity structuring · ongoing compliance filings · tax memo trail",
        trigger: "International expansion · entity restructuring · tax season · new state nexus",
        cta: "Add to subscription →"
      },
      {
        n: "10",
        title: "MacTax",
        desc: "Specialized tax advisory and compliance for high-growth enterprises and cross-border operations.",
        standard: "Strategic tax positioning · cross-border compliance · automated nexus analysis",
        trigger: "Scaling globally · complex multinational tax planning needs",
        cta: "Talk to us →"
      }
    ]
  },
  {
    id: "modernize-finance-stack",
    title: "Group 4: Modernize your finance stack",
    forText: "CFOs picking ERP, automating, or evaluating AI for finance.",
    triggerText: "Our tech stack isn't keeping up.",
    services: [
      {
        n: "11",
        title: "Technology Services",
        desc: "ERP, RPA, and private AI deployments for the office of the CFO. Want our AI agents on your own infrastructure? Start here.",
        standard: "ERP selection and implementation · RPA for repetitive workflows · private AI deployment · integration with existing stack",
        trigger: "ERP migration · build-vs-buy AI decisions · governance on existing AI tools · tech consolidation",
        cta: "Talk to a tech lead →"
      }
    ]
  }
];

const serviceDetails: Record<string, {
  title: string;
  subtitle: string;
  intro: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  capabilities: Array<{
    title: string;
    desc: string;
    activities: string[];
  }>;
}> = {
  "01": {
    title: "Accounting Process Outsourcing",
    subtitle: "Reimagine the value proposition of our seamless Finance operations.",
    intro: "Embracing the reality of the volatile dynamics of the global economy, it has become imperative for every enterprise to explore possibilities of improvising the Accounting functions to gain a competitive edge. Today the CXO fraternity across the globe seeks accounting outsourcing service delivery specialists who would not only bring cost benefits by reducing operating expenditure but also establish benchmarks for superior governance and conformity to regulations. We at 4AT leverage our rich industry experience to provide an extensive range of accounting services at the best value vis-à-vis cost factor.",
    sections: [
      {
        title: "Strategic Transformation",
        content: "We enable you transform the accounting operations from a conventional transactional role to a strategic collaboration with an intelligent operating model. It’s an opportunity to adopt innovative methodologies to move from a reactive partnership to a more responsive and proactive one."
      },
      {
        title: "Timely strategic guidance",
        content: "Discover how we help your finance operations enhance the efficiency by providing timely, strategic guidance and service delivery. Our Accounting Process Outsourcing (APO) portfolio operating model enables finance and accounts COE to deliver seamless service delivery in niche operating areas."
      },
      {
        title: "Cost Alignment",
        content: "‘COST’ – one word that always gets undivided attention of any business head or stakeholders. The constant pressures to bring down the cost coupled with increasing need for regulatory compliance and demands for a closer alignment to the business are driving organizations towards new Finance and Accounting Operating models. Chief Financial Officers (CFO) of leading organizations are incorporating Finance and Accounting services outsourcing as a strategy to change their operating models. 4AT offers industry recognized Financial Services Offshoring Solutions that support end-to-end functions."
      },
      {
        title: "Key Highlights of APO Services",
        content: "• Responsive team structure\n• KPI Reporting\n• SLA & Process Management\n• Controls Critical to Quality Reviews\n• Periodic Stakeholder Reviews\n• Leadership Governance Meetings"
      }
    ],
    capabilities: [
      {
        title: "Book-keeping",
        desc: "Recording day-to-day financial transaction is a critical element of standards and compliance norms. Beyond the ‘must do’ mind-set, it is imperative to have the right standards and mechanism to maintain the records for accuracy and integrity. Ensuring an expert intervention helps an enterprise strategize, organize, analyse, execute and report appropriate decisions attributed to the sanctity of a robust book-keeping process.",
        activities: [
          "Maintaining descriptive company - specific data",
          "Maintaining detailed transactions of current and prior years",
          "Performing Banking tasks",
          "Reconcile Bank Accounts",
          "Maintaining daily transactions",
          "Producing and organizing all source documents",
          "Preparing financial statements",
          "Preparing financial reports for management dashboard"
        ]
      },
      {
        title: "Order-to-cash",
        desc: "An efficient Order-to-Cash (OTC) business transformations have helped organizations benefit from the identifying and plugging revenue leakages besides cost and working capital optimization. Our Order-to-Cash (OTC) process aligns with our clients’ operational framework and requirements. Our capability incorporates the controls necessary to increase revenue and margins, reduce risk, and improve working capital for your business. Our expertise in OTC provides end-to-end solution to give full view of the process by bringing process controls and optimizations.",
        activities: [
          "Customer Master",
          "Order Management",
          "Credit Risk management",
          "Contract Administration",
          "Invoice Management",
          "Billing Management",
          "B2B Collections",
          "Accounts Receivable",
          "Cash Application",
          "Customer Support",
          "OTC Accounting"
        ]
      },
      {
        title: "Accounts Payable",
        desc: "An integral function for any organization, Accounts Payable (AP), plays a critical role in order to optimize cash flow by smart and strategic management of payables. Our capability in AP domain engages the right operating mechanism and framework for strategic approach. Our expertise in management and centralization of AP processes, a smarter and paperless methodology, productivity and process accuracy enhancement including industry standard benchmark for invoice processing and vendor management provides value to our clients.",
        activities: [
          "Invoice Processing",
          "Payment Processing",
          "Document Management",
          "e - Invoicing",
          "Reconciliation",
          "Reports and analysis",
          "Purchase Order management",
          "PO Vs Invoice vs GRN matching",
          "Variance detection",
          "Debit memo processing",
          "Credit memo processing",
          "Aging report and analysis",
          "Periodic AP Ledger Processing",
          "Vendor Management",
          "Vendor Master",
          "Help Desk and Others AP activities"
        ]
      },
      {
        title: "Record to report",
        desc: "Our R2R capability enables the organizations improve the finance function with efficient, effective, sustainable and world-class processes. We have expertise in developing financial reporting, asset tracking, treasury support, and a variety of accounting-transaction and decision-support activities. Review and interpretation of data to produce journal entries, Accounting books closing, reconciliations and periodic accounting summaries, our experts with exceptional quality of services, exposed to domain specific software, ERP and other tools.",
        activities: [
          "Monthly Books Closing",
          "Journal entry postings",
          "Reconciliations",
          "Fixed Assets Accounting",
          "Intercompany Accounting",
          "Sub - ledger balancing",
          "GL maintenance",
          "Cost inventory",
          "Management accounting",
          "Audit support and Escheatment Accounting Process"
        ]
      },
      {
        title: "Payroll Accounting",
        desc: "Trained and well versed with employee benefits and compensation working process. Our domain experience in payroll cycle management provides value-based services to our clients to improve cycle time and process accuracy. We have end-to-end expertise in managing comprehensive Payroll processes, from issuing tax forms – preparing work schedules – proper allotment of funds, employee Insurance and other benefits. Our understanding of newer engagement models like time sheet, work order and other industry specific workings helps us build our capability.",
        activities: [
          "Payroll data validation",
          "Bank register vs Employee register reconciliation",
          "Cost center validation",
          "Cost center mapping",
          "Payroll journal entries",
          "Statutory deductions",
          "Accounting for Income tax, Provident fund and other deductions",
          "Arrears and variable pay calculation",
          "Payroll processing",
          "Gross salary and Net salary validation",
          "Loans, advances, dues recovery",
          "Payroll disbursal processing",
          "Bank statement preparation"
        ]
      },
      {
        title: "FP&A",
        desc: "The core team and the CXO engagement brings strong industry expertise in planning and consolidation of financial reports, budget/forecast submissions, business and leadership interactions and liaison with business and management to formulate right reports, executive summaries and periodic management information system reports. Our team has rich experience in utilization & operational metrics, financial and non-financial reporting. With a long tenured industry exposure, our FP&A service delivery brings the edge for the clients.",
        activities: [
          "Planning and Budgeting",
          "Income Statement",
          "Balance Sheet",
          "Cash Flow",
          "Group Consolidation",
          "Legal financial planning and analysis",
          "Vendor analysis",
          "Travel and living expense analysis",
          "Budget file and model management",
          "Uploading models into financial systems",
          "True - up of budget assumptions",
          "Data inputs for expense estimates",
          "Variance analysis"
        ]
      }
    ]
  },
  "04": {
    title: "Internal Controls & SOX Compliance",
    subtitle: "Maintain the right balance between Risks and Controls mechanism to stay agile, competitive and compliant.",
    intro: "Successful enterprises walk on a tightrope to maintain the right balance between risks and control mechanisms. CFOs across industries understand that having accurate financial data is critical to building credibility, shareholder interest, and long-term sustenance. Without proper risk mitigation processes, organizations stand exposed to errors, fraud, and operational inefficiencies.",
    sections: [
      {
        title: "Compliance & Value Creation",
        content: "While some business owners assume that meticulous control systems are only for large corporations, in reality, these functions are critical for companies of all sizes. 4AT brings an outcome-oriented framework of due-diligence to not only ensure compliance but to drive efficiency and effectiveness across your operations."
      },
      {
        title: "Reliability & Dependability",
        content: "Our operating mechanism emphasizes process modeling and optimization to complement a fool-proof process performance. The domain experts at 4AT have proven expertise in bringing tangible value, improving quality, and ensuring that every finer aspect of critical processes is risk-free and up to the highest standards."
      }
    ],
    capabilities: [
      {
        title: "Control Design & Risk Assessment",
        desc: "Developing robust Internal Control over Financial Reporting (ICFR) frameworks and identifying vulnerabilities to stay compliant and agile.",
        activities: [
          "Designing ICFR controls",
          "Risk assessment performance for Financial Statements",
          "Controls benchmarking and rationalization"
        ]
      },
      {
        title: "Walkthroughs & Documentation",
        desc: "Mapping process flows, documenting control pathways, and ensuring clear alignment with organizational and regulatory guidelines.",
        activities: [
          "Perform walkthrough of controls",
          "Documentation of controls and flow charts",
          "Management reporting and executive dashboards"
        ]
      },
      {
        title: "Testing & Remediation",
        desc: "Rigorous testing of controls for effectiveness and establishing swift remediation workflows to report and resolve weaknesses.",
        activities: [
          "Controls Testing (TOD & TOC)",
          "Testing of controls for effectiveness",
          "Remediation process for ineffective controls",
          "Reporting ineffectiveness of controls to management"
        ]
      }
    ]
  },
  "05": {
    title: "Technical Accounting",
    subtitle: "Manoeuvre through complex and innumerable accounting and financial reporting needs.",
    intro: "Complex accounting challenges require in-depth knowledge and the specialized skills of experts. A common nightmare for any Financial Controller is the constantly changing accounting standards and their interpretation. With 4AT by your side, your enterprise can be freed from these fears and the risks of breaching compliance.",
    sections: [
      {
        title: "Big 4 Experience & Expertise",
        content: "We bring our Technical Accounting service delivery with a value-driven operating model, drawing on our niche experience with the prolific 'Big 4' accounting firms. Our experienced professionals have managed mid-size to large-scale enterprises across key industries in various CPA firm roles."
      },
      {
        title: "Rigorous Financial Standards",
        content: "Whether it is handling new guidance, complex transactions, or dealing with auditor queries, our domain experts provide the rigor and precision required to build robust accounting position papers and compliant financial reports."
      }
    ],
    capabilities: [
      {
        title: "Standards & Guidance Implementation",
        desc: "Assisting controllers with the adoption and interpretation of changing regulatory and GAAP frameworks.",
        activities: [
          "New Accounting standards and interpretation",
          "New Accounting Guidance",
          "Assistance with SEC comment letters"
        ]
      },
      {
        title: "Financial Statements & Audits",
        desc: "Support and structure for building correct financial reports and liaising with external auditors on complex accounting positions.",
        activities: [
          "Preparing Financial Statements and Audits",
          "Technical and accounting analysis"
        ]
      },
      {
        title: "Accounting Areas & Impairments",
        desc: "Handling high-scrutiny transaction areas, consolidation models, and asset evaluations.",
        activities: [
          "Revenue recognition",
          "Business combinations",
          "Consolidations",
          "Leases",
          "Goodwill",
          "Asset impairment analysis"
        ]
      }
    ]
  },
  "06": {
    title: "Audit Outsourcing",
    subtitle: "Deliver uncompromised accountability and controllership with minimized disruption.",
    intro: "Constant changes in non-negotiable regulations require enterprises to build enhanced transparency. Shareholders, boards, and bankers seek unshakeable trust in financial statements. 4AT's Audit Outsourcing services deliver audit and assurance excellence that goes beyond cost marginalization to provide long-term advisory value, leveraging our deep regulatory understanding and industry expertise.",
    sections: [
      {
        title: "Big 4 Exposure & Methodologies",
        content: "Given our industry experience and 'Big 4' exposure, our team employs proven methodologies to deliver tangible audit solutions. In today's dynamic global scenario, a major portion of the audit process can be outsourced with minimal captive intervention, resulting in significant cost savings and efficiency gains."
      },
      {
        title: "Service Excellence & Trust",
        content: "We focus on delivering high-quality, PCAOB-aligned audit workpapers while causing minimal disruption to your daily finance operations. We strive to provide the best experience to our clients by focusing on incremental value, quality, and productivity."
      }
    ],
    capabilities: [
      {
        title: "Planning & Reporting",
        desc: "End-to-end support for audit file setup, risk assessment, draft opinions, and checklist verification.",
        activities: [
          "Roll forward of previous year audit files",
          "Determination of materiality & risk assessment",
          "Financial statement tie outs & GAAP/GAAS checklists",
          "Summarization of analyst, IA, and board reports",
          "Drafting management representation letters & audit reports"
        ]
      },
      {
        title: "Substantive Testing",
        desc: "Rigorous detail-level testing across all primary balance sheet and income statement account groups.",
        activities: [
          "Cash, Bank, and Investment testing",
          "A/R, Inventory, and A/P testing & reconciliations",
          "Property, plant, and equipment testing",
          "Revenue, COS, and operating expenses testing",
          "Payroll, debt, and lease testing",
          "Journal entry profiling and testing"
        ]
      },
      {
        title: "Employee Benefit Plans (EBP)",
        desc: "Specialized planning, reporting, and substantive testing workflow solutions for EBP audits.",
        activities: [
          "Roll forward of EBP files & planning memos",
          "Financial statement tie outs & Form 5500 preparation",
          "Participant testing & full scope investment testing",
          "End-to-end audits with manager coordination"
        ]
      }
    ]
  },
  "07": {
    title: "Financial Audit Readiness",
    subtitle: "Navigate audits with compliance, accuracy, and authenticity under Big 4 guidance.",
    intro: "Our Financial Audit Readiness service defines the key tasks and activities required to make reporting entities fully audit-ready. We optimize your overall bookkeeping and accounting processes, aligning them with the methodologies auditors use to assess financial statements. With our prolific 'Big 4' expertise, we provide the tools and competencies to help you sail through both internal and external audits.",
    sections: [
      {
        title: "Conceptual Alignment",
        content: "We align your team with the conceptual foundations of financial statement assertions and reporting objectives. Auditors seek complete authenticity and accuracy of supporting documents; we prepare your team to demonstrate both clearly and efficiently."
      },
      {
        title: "Remediation & Monitoring",
        content: "We implement corrective action plans and support post-audit remediation. Beyond the immediate audit window, we help establish ongoing monitoring of internal control financial reporting (ICFR) activities to sustain auditable financial statements year-round."
      }
    ],
    capabilities: [
      {
        title: "Audit Infrastructure & Liaison",
        desc: "Establishing the audit readiness workspace, managing communications, and acting as the direct auditor liaison.",
        activities: [
          "Audit liaison services and infrastructure support",
          "External auditor communications",
          "PBC (prepared by client) and audit timeline management",
          "Development of corrective action plans"
        ]
      },
      {
        title: "Remediation & Sustenance",
        desc: "Assisting with pre- and post-audit findings and establishing continuous controls monitoring to sustain auditability.",
        activities: [
          "Implementation support for remediation efforts",
          "Assistance to continue monitoring ICFR activities",
          "Sustaining auditable financial statements"
        ]
      },
      {
        title: "Documentation & File Prep",
        desc: "Compiling necessary documentation trails and preparing standard working papers for the audit team.",
        activities: [
          "Financial management process improvement and support",
          "Identification and creation of supporting documentation",
          "Preparing the audit file and rolling forward previous files"
        ]
      }
    ]
  },
  "09": {
    title: "Tax Advisory",
    subtitle: "Navigate the complex tax maze and prevent surprise exposures with expert oversight.",
    intro: "Tax compliance is a critical non-negotiable for businesses of any scale. Handling highly complex, regulated tax landscapes poses ongoing risks of penalties and sanctions due to inadvertent errors. With rapidly evolving regulatory codes, real-time expert intervention is essential. 4AT’s Tax Advisory services provide tailormade strategies and compliance structures to protect and position your business optimally.",
    sections: [
      {
        title: "Mitigate Risk & Penalties",
        content: "Our certified tax professionals help your enterprise avoid surprise exposures and compliance breaches. We keep a constant check on evolving local, state, and federal tax laws to guarantee your filings are accurate, audit-proof, and fully compliant."
      },
      {
        title: "Strategic Tax Structure",
        content: "We look beyond basic compliance to deliver value. By structuring entities, managing provisions, and applying strategic tax intelligence, we optimize your operational tax alignment to support long-term business value."
      }
    ],
    capabilities: [
      {
        title: "Tax Filings & Compliance",
        desc: "Preparing, consolidating, and executing tax filing requirements to guarantee absolute conformity to regulations.",
        activities: [
          "Tax computation workings",
          "Consolidation of Tax Returns",
          "Filing services",
          "Compliance and regulatory requirement checks"
        ]
      },
      {
        title: "Strategy & Provisions",
        desc: "Structuring tax strategies and preparing necessary provision trails for financial reporting.",
        activities: [
          "Tax compliance and provisions",
          "Tax strategy and structure assistance"
        ]
      }
    ]
  },
  "08": {
    title: "IPO Readiness",
    subtitle: "Navigate the complex journey from a private to a public status successfully.",
    intro: "Transitioning from a privately owned enterprise to going public is one of the most monumental milestones for any organization. Paving the path toward a successful IPO is extremely challenging and time-consuming. The key to success is preparation. Once you decide to pursue an IPO, developing a comprehensive, forward-looking, and risk-averse strategy is critical.",
    sections: [
      {
        title: "Assess & Identify Gaps",
        content: "Our IPO Readiness service is designed to guide your business through every stage of this public transformation. We conduct process-driven assessments, identify accounting gaps that present risks, and design mitigation strategies to secure a smooth transition."
      },
      {
        title: "Compliance & Collaboration",
        content: "From internal audit transformation to technical accounting policies, we align all operations with strict public reporting regulations. We also assist in direct coordination with lawyers, bankers, and underwriters to keep the transaction timeline on track."
      }
    ],
    capabilities: [
      {
        title: "Assessments & Strategy",
        desc: "Establishing the blueprint for going public, identifying operational gaps, and designing strategic roadmaps.",
        activities: [
          "IPO Readiness assessment",
          "Gap analysis and mitigation strategies",
          "IPO roadmap development",
          "Coordination with lawyers, bankers and underwriters"
        ]
      },
      {
        title: "Accounting & Policy Infrastructure",
        desc: "Building the rigorous GAAP/IFRS reporting foundations and drafting corporate policies required for SEC compliance.",
        activities: [
          "Accounting standard evaluation and implementation",
          "Preparation of Financial accounting statements",
          "Preparation of accounting manual",
          "Development of Accounting policies"
        ]
      },
      {
        title: "Process & Control Optimization",
        desc: "Upgrading internal workflows, control structures, and auditing practices to meet public market expectations.",
        activities: [
          "Finance process improvements",
          "Control assessment",
          "Internal Audit transformation",
          "Compliance and regulation assistance"
        ]
      }
    ]
  },
  "02": {
    title: "Virtual CFO Services",
    subtitle: "High-quality financial strategy and operations leadership at an affordable engagement cost.",
    intro: "Hiring a full-time, dedicated Chief Financial Officer (CFO) is a daunting and cost-intensive process, especially for start-ups, small-to-medium enterprises, or PE-backed portfolios. Our Virtual CFO services deliver high-quality strategic direction, financial system designs, and day-to-day corporate financial management without the payroll overhead.",
    sections: [
      {
        title: "Value Generation & Funding",
        content: "Our virtual CFOs act as true partners, helping you build sustainable business models, navigate funding rounds, manage capital restructuring, and handle complex mergers and acquisitions. We bring conventional C-suite leadership with flexible, modular engagement frameworks."
      },
      {
        title: "Systems & Performance",
        content: "We implement advanced financial systems, conduct thorough gap analyses, and execute objective-oriented cost-cutting measures. We bridge the gap between transactional accounting and strategic financial management to drive long-term business performance."
      }
    ],
    capabilities: [
      {
        title: "Financial Strategy & Forecasting",
        desc: "Designing short-term and long-term forecasts and executing strategic interventions to improve business metrics.",
        activities: [
          "Short-term and long-term forecasting",
          "Designing financial systems & implementation",
          "Gap analysis for corporate financial strategies",
          "Objective-oriented cost cutting measures",
          "Cash flow analysis and restructuring"
        ]
      },
      {
        title: "Corporate Transactions & Restructuring",
        desc: "Strategic guidance for high-impact milestones including M&A, capital restructuring, and interim C-suite leadership.",
        activities: [
          "Facilitating Mergers & Acquisitions",
          "Capital restructuring",
          "Interim CFO services",
          "Risk mitigation framework development"
        ]
      },
      {
        title: "Record Sanctuary & Compliance",
        desc: "Ensuring the accuracy and integrity of daily reporting structures and interpreting local regulations.",
        activities: [
          "Ensuring standards for robust bookkeeping",
          "Facilitating and auditing Financial Reports",
          "Interpretation of regulations and operational impact"
        ]
      }
    ]
  },
  "03": {
    title: "Interim Resource Alignment",
    subtitle: "Seamless business continuity with pre-vetted, certified F&A experts.",
    intro: "Interim Resource Alignment in Finance & Accounting is a game-changer for enterprises where operations cannot pause. Whether due to maternity/paternity leave, unexpected departures, or long search timelines, losing key team members puts business continuity at risk. 4AT provides pre-vetted, certified experts to keep your operations running seamlessly.",
    sections: [
      {
        title: "Mitigate Disruption",
        content: "We deploy qualified F&A professionals designed to plug resource gaps in days. From accounting managers to senior controllers, our teams adapt immediately to your tools, stack, and calendar, preventing pauses in reporting and operations."
      },
      {
        title: "Flexible Deployments",
        content: "We match resources to your specific stage and stack. Whether you need short-term cover for busy seasons or long-term operational support while search processes occur, we back every placement with 4AT's senior leadership guidance."
      }
    ],
    capabilities: [
      {
        title: "Regular & Specialized Ops",
        desc: "Coverage for day-to-day general ledgers, transactions, and complex niche project needs.",
        activities: [
          "Regular accounting activities",
          "Specialized activities",
          "Technical accounting operations"
        ]
      },
      {
        title: "Reporting & Regulation",
        desc: "Sustaining financial reporting deadlines and regulatory compliance filings without gaps.",
        activities: [
          "Financial Statements and reportings",
          "Periodic regulatory functions"
        ]
      },
      {
        title: "Flexible Engagements",
        desc: "Deploying resources under custom timeline models to meet immediate staffing requirements.",
        activities: [
          "Short-term engagements",
          "Long-term engagements"
        ]
      }
    ]
  },
  "10": {
    title: "MacTax",
    subtitle: "A single platform portal for all your tax filing as well as advisory needs.",
    intro: "Ever get agonized with the tax filing process because it's complex and time-consuming? MacTax is a single-platform system that combines the best of the filing process with expert advisory offerings. Simplify your tax filing process, guarantee 100% accuracy, secure transactions, and get assured returns with peace of mind.",
    sections: [
      {
        title: "Integrated Advisory & Filings",
        content: "Stop working with separate vendors for tax filing and professional advice. MacTax Online is an insightful service provider for all your Income Tax filings. It provides tools that ensure eased filing of returns alongside real-time support from tax experts."
      },
      {
        title: "IRS & Federal Competency",
        content: "Our highly competent tax professionals have wide experience, competency, and a deep understanding of Internal Revenue Service (IRS) processes. Fully compliant with IRS and Federal norms, the simplicity of the MacTax process guarantees compliance without agony."
      }
    ],
    capabilities: [
      {
        title: "Income Tax Filing Services",
        desc: "Simplified filing tools and workflows backed by certified tax practitioners.",
        activities: [
          "Tax filing and returns preparation",
          "100% accuracy audits",
          "Safe and secured e-transactions",
          "IRS compliance mapping"
        ]
      },
      {
        title: "Unified Tax Portal",
        desc: "A single dashboard bringing together strategic advice and standard compliance activities.",
        activities: [
          "Tax strategy integration",
          "IRS & Federal norm alignment",
          "Online tax query support"
        ]
      }
    ]
  },
  "11": {
    title: "Technology Services",
    subtitle: "Smart Technology Support & Consulting Services built to drive business growth.",
    intro: "Modern workplaces have gone through remarkable digital evolutions. Stepping into an era where boundaries are meaningless, having scalable, niche, and proficient technology systems is a core requirement to thrive. 4AT’s Technology Services align custom private AI, enterprise IT consulting, and immersive designs directly with the office of the CFO.",
    sections: [
      {
        title: "Enterprise IT Consulting & Staffing",
        content: "Our Enterprise IT Consulting assesses your technology strategies to design operational and implementation roadmaps. Through our Technology Staff Augmentation model, we cater to the growing need for niche developers, engineers, and analysts to significantly reduce costs without conceding service quality."
      },
      {
        title: "SBuS® & Skill Passport® Platforms",
        content: "Smart Business Solutions (SBuS®) acts as a pivotal expertise in business re-engineering driven by our cornerstones: People, Process, and Technology. Alongside, Skill Passport® bridges skill gaps through result-driven assessments and immersive learning platforms."
      }
    ],
    capabilities: [
      {
        title: "IT Consulting & Roadmaps",
        desc: "Structuring technological roadmaps and deploying dedicated tech teams to fit your specific requirements.",
        activities: [
          "Enterprise IT Consulting",
          "Strategic, architectural, and operational roadmaps",
          "Staff Augmentation and dedicated scaling pod structures",
          "M&A tech stack consolidation and assessment"
        ]
      },
      {
        title: "SBuS® Cloud & App Platforms",
        desc: "Cloud-based smart application frameworks designed to augment your process performance.",
        activities: [
          "Smart Business Solutions (SBuS) implementation",
          "Immersive workflow application design",
          "Workforce and process automation integration"
        ]
      },
      {
        title: "Skill Passport® Gateway",
        desc: "Result-driven competency evaluation and digital skills training infrastructure.",
        activities: [
          "Skill Passport® digital platform setup",
          "Competency gap analysis & mapping",
          "Niche skills learning pathways"
        ]
      }
    ]
  }
};

export function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedService]);

  return (
    <section id="services" className="relative bg-transparent py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="grid lg:grid-cols-12 gap-8 mb-24 items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-6">
                Services
              </div>
              <h2 className="text-display text-[clamp(2.5rem,5.2vw,4.5rem)] text-white font-black leading-[0.95]">
                Eleven services
                <span className="block mt-2 py-2 px-1 text-[clamp(1.4rem,3vw,2.6rem)] tracking-tight bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(99,102,241,0.25)] animate-gradient-x">
                  Grouped by what&apos;s keeping you up at night
                </span>
              </h2>
            </div>
            <p className="lg:col-span-4 lg:col-start-9 self-end text-lg text-white leading-relaxed font-light">
              Most buyers don&apos;t shop service-by-service. They have a problem (close cycles too long, audit coming, growing too fast) and they want to know what fixes it. Here&apos;s the shortcut.
            </p>
          </div>

        {/* Rows by Group */}
        <div className="space-y-24 lg:space-y-32">
          {serviceGroups.map((group, gIdx) => (
            <div 
              key={group.title}
              id={group.id}
              className="grid scroll-mt-28 grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-white/10"
            >
              {/* Left Column: Group Info (Sticky) */}
              <div className="lg:col-span-4 flex flex-col items-start lg:sticky lg:top-28 h-fit">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-purple-400 mb-4">
                  Scenario {gIdx + 1}
                </div>
                <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-white mb-4 leading-tight">
                  {group.title.replace(/^Group \d+: /, '')}
                </h3>
                
                <div className="space-y-4 w-full">
                  <div className="text-sm text-white">
                    <span className="text-zinc-400 uppercase tracking-wider text-xs block mb-1">Target</span>
                    <p className="font-light">{group.forText}</p>
                  </div>
                  
                  <div className="rounded-xl border border-white/15 bg-[#0b1020]/85 p-4 border-l-2 border-l-sky-500/50">
                    <span className="text-sky-400 uppercase tracking-wider text-[10px] font-bold block mb-1">Trigger Scenario</span>
                    <p className="text-zinc-300 italic text-sm font-light">
                      &ldquo;{group.triggerText}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Services Grid */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.services.map((service, sIdx) => (
                  <div key={service.title} className="h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: sIdx * 0.1 }}
                      className="group relative h-full rounded-[2rem] overflow-hidden border border-white/15 bg-[#0b1020]/85 p-8 flex flex-col justify-between"
                      style={{ boxShadow: "inset 0 1px 0 rgba(34, 211, 238, 0.13)" }}
                    >
                      {/* Glow Accent Blob */}
                      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl bg-sky-500/15 pointer-events-none" />

                      {/* Top indicator bar */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-sky-500/50 opacity-50 group-hover:opacity-100 transition-opacity" />

                      <div>
                        {/* Service Number, Doodle & Title */}
                        <div 
                          onClick={() => setSelectedService(service)}
                          className="flex items-center gap-4 mb-6 cursor-pointer group/header select-none"
                        >
                          <div className="flex-shrink-0 transition-transform duration-300 group-hover/header:scale-105">
                            <ServiceDoodle serviceId={service.n} sizeClass="w-14 h-14" />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <span className="text-xs font-mono font-bold text-sky-400 select-none block mb-1">
                              {service.n}
                            </span>
                            <h4 className="text-xl font-bold tracking-tight text-white group-hover/header:text-sky-400 transition-colors leading-tight">
                              {service.title}
                            </h4>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-white text-sm font-light leading-relaxed mb-6">
                          {service.desc}
                        </p>

                        {/* Structured Details */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                          {/* What's Standard */}
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 mb-1.5">
                              <Check className="h-3 w-3 text-sky-400" />
                              What&apos;s Standard
                            </span>
                            <p className="text-xs text-zinc-300 font-light leading-relaxed">
                              {service.standard}
                            </p>
                          </div>

                          {/* Trigger to Add */}
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 mb-1.5">
                              <AlertCircle className="h-3 w-3 text-purple-400" />
                              Trigger to Add
                            </span>
                            <p className="text-xs text-zinc-300 font-light leading-relaxed">
                              {service.trigger}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="mt-8 pt-4 flex flex-col gap-2.5 pointer-events-auto w-full">
                        <button
                          onClick={() => setSelectedService(service)}
                          className="w-full inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 px-4 py-2.5 text-[11px] font-semibold text-sky-400 hover:bg-sky-400 hover:text-black hover:border-sky-400 transition-all duration-300 justify-center cursor-pointer select-none"
                        >
                          Learn More
                        </button>
                        <a
                          href="/contact"
                          className="w-full inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 justify-center select-none"
                        >
                          {service.cta.replace(/[\[\]]/g, '').replace(/→/g, '').trim()}
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Service Details */}
      <AnimatePresence>
        {selectedService && (() => {
          const detail = serviceDetails[selectedService.n];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md pointer-events-auto"
            >
              {/* Dismiss area */}
              <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedService(null)} />
              
              <motion.div
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-[#05081c]/95 border border-white/10 rounded-2xl w-[94vw] md:w-[88vw] max-w-6xl h-[88vh] overflow-hidden text-white shadow-2xl flex flex-col"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 md:top-8 md:right-8 h-10 w-10 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center cursor-pointer z-50"
                >
                  <X className="h-5 w-5" />
                </button>

                <div
                  className="overflow-y-auto custom-scrollbar flex-1 p-6 md:p-10 scroll-smooth flex flex-col gap-6"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {detail ? (
                    <div className="space-y-8 pr-2">
                      <div className="pr-8 md:pr-10">
                        <ServiceBlueprintDoodle serviceId={selectedService.n} />
                      </div>

                      {/* Header */}
                      <div>
                        <span className="text-xs font-mono text-sky-400 tracking-wider">SERVICE {selectedService.n}</span>
                        <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight text-white">{detail.title}</h2>
                        <p className="text-lg text-sky-400/90 font-light mt-3 leading-relaxed">{detail.subtitle}</p>
                      </div>

                      <hr className="border-white/5" />

                      {/* Intro & Sections */}
                      <div className="space-y-6">
                        <p className="text-white font-light leading-relaxed text-base md:text-lg">{detail.intro}</p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {detail.sections.map((sec, idx) => (
                            <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
                              <h4 className="text-sm md:text-[15px] font-semibold uppercase tracking-wider text-sky-400 mb-2">{sec.title}</h4>
                              <p className="text-sm md:text-[15px] text-white/90 font-light leading-relaxed whitespace-pre-line">{sec.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <hr className="border-white/5" />

                      {/* Capabilities Overview */}
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white mb-6">Service Capabilities Overview</h3>
                        <div className="space-y-6">
                          {detail.capabilities.map((cap, idx) => (
                            <div key={idx} className="border-b border-white/5 pb-6 last:border-b-0">
                              <h4 className="text-lg font-bold text-white mb-2">{cap.title}</h4>
                              <p className="text-sm md:text-[15px] text-white/90 font-light leading-relaxed mb-4">{cap.desc}</p>
                              
                              <div className="mt-2">
                                <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold block mb-2">Key Activities:</span>
                                <div className="flex flex-wrap gap-2">
                                  {cap.activities.map((act, aIdx) => (
                                    <span key={aIdx} className="text-xs md:text-[13px] bg-white/[0.04] border border-white/5 text-white/90 px-3 py-1 rounded-full font-light">
                                      {act}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <hr className="border-white/5" />

                      {/* Modal CTA Button */}
                      <div className="pt-4 pb-2 flex justify-center">
                        <a
                          href="/contact"
                          onClick={() => setSelectedService(null)}
                          className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-8 py-3.5 text-sm font-semibold text-black hover:bg-sky-400 transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] cursor-pointer select-none"
                        >
                          {selectedService.cta.replace(/[\[\]]/g, '').replace(/→/g, '').trim()}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-8 w-full max-w-lg mx-auto">
                      <ServiceBlueprintDoodle serviceId={selectedService.n} />
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedService.title} Details</h2>
                        <p className="text-sm md:text-[15px] text-white/90 mt-2 max-w-md">Detailed capabilities, activity logs, and key SLA structures for this service will be uploaded shortly.</p>
                      </div>
                      <div className="border-l-2 border-sky-500/30 pl-4 py-2 text-left max-w-lg">
                        <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold block mb-1">Overview Description</span>
                        <p className="text-white/90 text-sm md:text-[15px] font-light leading-relaxed">{selectedService.desc}</p>
                      </div>
                      <div className="pt-4">
                        <a
                          href="/contact"
                          onClick={() => setSelectedService(null)}
                          className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-8 py-3.5 text-sm font-semibold text-black hover:bg-sky-400 transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] cursor-pointer select-none"
                        >
                          {selectedService.cta.replace(/[\[\]]/g, '').replace(/→/g, '').trim()}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
