export type Language = "en" | "pl";

export type Project = {
  name: string;
  description: string;
  stack: string[];
};

export type LocalizedProfile = {
  role: string;
  headline: string;
  availability: string;
  about: string[];
  skills: Record<string, string[]>;
  projects: Project[];
  aiOnlyProjects: Project[];
  education: string[];
  contactIntro: string;
};

export const profile = {
  name: "Dawid Kubiak",
  location: "Baszkow (Warta), Poland",
  email: "dawid172005@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dawidkubiak62616e6b696e67/" },
    { label: "Email", href: "mailto:dawid172005@gmail.com" }
  ],
  en: {
    role: "AI Automation & Data Analyst",
    headline: "I use automation and data to remove repetitive work and improve everyday processes.",
    availability: "Open to junior opportunities in AI automation, data analytics, and banking technology.",
    about: [
      "I am a Banking and Digital Finance student at the University of Lodz with a practical interest in AI automation, data analytics, and business process improvement.",
      "I enjoy finding repetitive work that can be simplified with technology. My projects combine workflow automation, financial analysis, and data interpretation to turn operational problems into useful, measurable solutions."
    ],
    skills: {
      "Automation & AI": ["n8n", "Workflow automation", "AI-assisted content generation", "Google APIs", "JSON"],
      "Data & business": ["Excel", "Power BI", "IBM SPSS", "Financial analysis", "KPI interpretation"],
      "Ways of working": ["Process improvement", "Data organization", "Business reporting", "Problem solving"]
    },
    projects: [
      {
        name: "AI-Assisted Lead Generation & Website Preview Workflow",
        description: "Designed an n8n workflow that identified Polish businesses with limited web presence through Google Maps data, generated tailored outreach emails, and created website preview code for prospects. Production sites were developed separately when interest was confirmed.",
        stack: ["n8n", "Google Maps", "Google APIs", "JSON", "AI integration"]
      },
      {
        name: "Alior Bank Financial Performance Analysis",
        description: "Organized financial data in Excel, calculated and interpreted key indicators, and prepared a written report explaining Alior Bank's financial condition and the meaning of the metrics.",
        stack: ["Excel", "Microsoft Word", "Financial analysis"]
      },
      {
        name: "Railway Company Comparative Analysis",
        description: "Compared a passenger railway company with a rail-infrastructure company to examine differences in business models, operating priorities, financial structures, and key performance indicators.",
        stack: ["Excel", "Microsoft Word", "Comparative analysis"]
      }
    ],
    aiOnlyProjects: [
      {
        name: "Bilingual Terminal Portfolio",
        description: "Built and deployed a bilingual recruiter-focused portfolio with a terminal-inspired interface. It offers local portfolio navigation and a Gemini-powered question field that answers only from curated profile information. The public AI endpoint is protected by an IP-based Vercel rate limit.",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Vercel", "Vercel Analytics", "Vercel Firewall"]
      }
    ],
    education: [
      "Banking and Digital Finance - University of Lodz (student)",
      "Responsible AI: Applying AI Principles with Google Cloud - issued 30 July 2026 (credential 10532213)"
    ],
    contactIntro: "The fastest way to reach me is by email. I am happy to discuss junior opportunities, projects, or how I can support your team."
  },
  pl: {
    role: "Specjalista AI Automation i analizy danych",
    headline: "Wykorzystuje automatyzacje i dane, aby eliminowac powtarzalna prace i usprawniac codzienne procesy.",
    availability: "Jestem otwarty na juniorskie role w automatyzacji AI, analizie danych i technologiach bankowych.",
    about: [
      "Jestem studentem bankowosci i finansow cyfrowych na Uniwersytecie Lodzkim. Interesuje mnie praktyczne wykorzystanie automatyzacji AI, analizy danych i usprawniania procesow biznesowych.",
      "Lubie znajdowac powtarzalna prace, ktora mozna uproscic za pomoca technologii. Moje projekty lacza automatyzacje workflow, analize finansowa i interpretacje danych, aby zamieniac problemy operacyjne w uzyteczne i mierzalne rozwiazania."
    ],
    skills: {
      "Automatyzacja i AI": ["n8n", "Automatyzacja workflow", "Generowanie tresci wspierane przez AI", "Google APIs", "JSON"],
      "Dane i biznes": ["Excel", "Power BI", "IBM SPSS", "Analiza finansowa", "Interpretacja KPI"],
      "Sposob pracy": ["Usprawnianie procesow", "Organizacja danych", "Raportowanie biznesowe", "Rozwiazywanie problemow"]
    },
    projects: [
      {
        name: "Automatyzacja generowania leadow i podgladu strony z AI",
        description: "Zaprojektowalem workflow n8n, ktory na podstawie danych z Google Maps wyszukiwal polskie firmy o ograniczonej obecnosci w sieci, generowal dopasowane maile i przygotowywal kod podgladu strony dla potencjalnych klientow. Produkcyjne strony powstawaly osobno po potwierdzeniu zainteresowania.",
        stack: ["n8n", "Google Maps", "Google APIs", "JSON", "Integracja AI"]
      },
      {
        name: "Analiza wynikow finansowych Alior Banku",
        description: "Uporzadkowalem dane finansowe w Excelu, obliczylem i zinterpretowalem kluczowe wskazniki oraz przygotowalem raport wyjasniajacy kondycje finansowa Alior Banku i znaczenie metryk.",
        stack: ["Excel", "Microsoft Word", "Analiza finansowa"]
      },
      {
        name: "Analiza porownawcza spolek kolejowych",
        description: "Porownalem przewoznika pasazerskiego ze spolka infrastruktury kolejowej, analizujac roznice w modelach biznesowych, priorytetach operacyjnych, strukturach finansowych i kluczowych wskaznikach efektywnosci.",
        stack: ["Excel", "Microsoft Word", "Analiza porownawcza"]
      }
    ],
    aiOnlyProjects: [
      {
        name: "Dwujezyczne portfolio terminalowe",
        description: "Zbudowalem i wdrozylem dwujezyczne portfolio dla rekruterow z interfejsem inspirowanym terminalem. Oferuje lokalna nawigacje po portfolio oraz pole pytan oparte na Gemini, ktore odpowiada wylacznie na podstawie wybranych informacji profilowych. Publiczny endpoint AI jest chroniony limitem zapytan Vercel wedlug adresu IP.",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Vercel", "Vercel Analytics", "Vercel Firewall"]
      }
    ],
    education: [
      "Bankowosc i finanse cyfrowe - Uniwersytet Lodzki (student)",
      "Responsible AI: Applying AI Principles with Google Cloud - wydano 30 lipca 2026 (numer poswiadczenia 10532213)"
    ],
    contactIntro: "Najszybciej skontaktujesz sie ze mna przez e-mail. Chetnie porozmawiam o juniorskich rolach, projektach i wsparciu Twojego zespolu."
  }
} satisfies Record<Language, LocalizedProfile> & {
  name: string;
  location: string;
  email: string;
  links: { label: string; href: string }[];
};

export const copy = {
  en: {
    terminalLabel: "Interactive terminal",
    terminalSubtitle: "Explore with buttons, or ask the AI a question.",
    promptHint: "Ask about my work and experience",
    availableCommands: "Available commands",
    shortcut: "Press / to focus terminal",
    language: "PL",
    linkLabel: "Find me online",
    status: "Open to junior opportunities"
  },
  pl: {
    terminalLabel: "Interaktywny terminal",
    terminalSubtitle: "Poznaj portfolio przez przyciski albo zadaj pytanie AI.",
    promptHint: "Zapytaj o moje projekty i doswiadczenie",
    availableCommands: "Dostepne komendy",
    shortcut: "Nacisnij /, aby przejsc do terminala",
    language: "EN",
    linkLabel: "Znajdz mnie online",
    status: "Otwartosc na juniorskie mozliwosci"
  }
} satisfies Record<Language, Record<string, string>>;
