import { profile, type Language } from "@/data/profile";

export type CommandResult = {
  heading?: string;
  lines: string[];
  tone?: "default" | "muted" | "accent" | "error";
  clear?: boolean;
};

export type NavigationCommand = {
  command: string;
  label: string;
  utility?: boolean;
};

const aliases: Record<string, string> = {
  about: "about",
  "o-mnie": "about",
  omnie: "about",
  skills: "skills",
  umiejetnosci: "skills",
  projects: "projects",
  projekty: "projects",
  education: "education",
  edukacja: "education",
  contact: "contact",
  kontakt: "contact",
  help: "help",
  pomoc: "help",
  clear: "clear",
  wyczysc: "clear"
};

const navigationCommands: Record<Language, NavigationCommand[]> = {
  en: [
    { command: "about", label: "about" },
    { command: "skills", label: "skills" },
    { command: "projects", label: "projects" },
    { command: "education", label: "education" },
    { command: "contact", label: "contact" },
    { command: "help", label: "help", utility: true },
    { command: "clear", label: "clear", utility: true }
  ],
  pl: [
    { command: "o-mnie", label: "o-mnie" },
    { command: "umiejetnosci", label: "umiejetnosci" },
    { command: "projekty", label: "projekty" },
    { command: "edukacja", label: "edukacja" },
    { command: "kontakt", label: "kontakt" },
    { command: "pomoc", label: "pomoc", utility: true },
    { command: "wyczysc", label: "wyczysc", utility: true }
  ]
};

function normalize(value: string) {
  return value.trim().toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function getNavigationCommands(language: Language) {
  return navigationCommands[language];
}

export function getWelcome(language: Language): CommandResult {
  return language === "en"
    ? {
        heading: "Explore my portfolio",
        lines: ["Choose a section below, or ask the AI about my background, projects, or skills."],
        tone: "accent"
      }
    : {
        heading: "Poznaj moje portfolio",
        lines: ["Wybierz sekcje ponizej albo zadaj AI pytanie o moje doswiadczenie, projekty lub umiejetnosci."],
        tone: "accent"
      };
}

export function getCuratedProfileContext(language: Language) {
  const localized = profile[language];
  return {
    name: profile.name,
    location: profile.location,
    role: localized.role,
    about: localized.about,
    skills: localized.skills,
    // These are deliberately separate: navigation exposes selected projects only,
    // while Gemini may answer questions about the additional portfolio project.
    projects: [...localized.projects, ...localized.aiOnlyProjects],
    education: localized.education,
    email: profile.email
  };
}

export function runNavigationCommand(input: string, language: Language): CommandResult {
  const command = aliases[normalize(input)];
  const localized = profile[language];
  const isEnglish = language === "en";

  if (command === "clear") return { lines: [], clear: true };

  if (command === "help") {
    return {
      heading: isEnglish ? "How to use this portfolio" : "Jak korzystac z portfolio",
      lines: isEnglish
        ? [
            "Use the buttons below to explore my background, skills, projects, education, and contact details.",
            "Use the text field to ask the AI a question about my portfolio. Press Enter to send it.",
            "Use clear whenever you want to start a fresh conversation."
          ]
        : [
            "Uzyj przyciskow ponizej, aby poznac moje doswiadczenie, umiejetnosci, projekty, edukacje i dane kontaktowe.",
            "W polu tekstowym zadaj AI pytanie o moje portfolio. Nacisnij Enter, aby je wyslac.",
            "Uzyj wyczysc, gdy chcesz rozpoczac nowa rozmowe."
          ],
      tone: "muted"
    };
  }

  if (command === "about") return { heading: isEnglish ? "About me" : "O mnie", lines: localized.about };

  if (command === "skills") {
    return {
      heading: isEnglish ? "Skills" : "Umiejetnosci",
      lines: Object.entries(localized.skills).map(([group, values]) => `${group}: ${values.join(" · ")}`)
    };
  }

  if (command === "projects") {
    return {
      heading: isEnglish ? "Selected projects" : "Wybrane projekty",
      lines: localized.projects.flatMap((project) => [
        `${project.name} - ${project.description}`,
        `Stack: ${project.stack.join(" · ")}`
      ])
    };
  }

  if (command === "education") return { heading: isEnglish ? "Education" : "Edukacja", lines: localized.education };

  if (command === "contact") {
    return {
      heading: isEnglish ? "Let's talk" : "Porozmawiajmy",
      lines: [localized.contactIntro, `Email: ${profile.email}`, ...profile.links.map((link) => `${link.label}: ${link.href}`)]
    };
  }

  return {
    heading: isEnglish ? "Unavailable section" : "Niedostepna sekcja",
    lines: [isEnglish ? "Please choose one of the navigation buttons below." : "Wybierz jeden z przyciskow nawigacji ponizej."],
    tone: "error"
  };
}
