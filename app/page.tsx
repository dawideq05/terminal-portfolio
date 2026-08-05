"use client";

import { useEffect, useState } from "react";
import { Terminal } from "@/components/terminal";
import { copy, profile, type Language } from "@/data/profile";

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const text = copy[language];
  const localized = profile[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.en.role,
            address: { "@type": "PostalAddress", addressLocality: "Baszkow (Warta)", addressCountry: "PL" },
            sameAs: profile.links.filter((link) => link.label === "LinkedIn").map((link) => link.href)
          })
        }}
      />
      <div className="page-grid" aria-hidden="true" />
      <nav className="topbar" aria-label="Primary">
        <a className="wordmark" href="#top" aria-label="Back to top">DK<span>_</span></a>
        <div className="topbar-actions">
          <p className="desktop-only">{text.shortcut}</p>
          <button className="language-toggle" type="button" onClick={() => setLanguage(language === "en" ? "pl" : "en")} aria-label={`Switch to ${text.language}`}>
            <span>{language.toUpperCase()}</span> / {text.language}
          </button>
        </div>
      </nav>

      <div className="site-layout" id="top">
        <section className="intro" aria-labelledby="page-title">
          <div className="status"><span /> {text.status}</div>
          <p className="eyebrow">{profile.location}</p>
          <h1 id="page-title">{profile.name}</h1>
          <p className="role">{localized.role}</p>
          <p className="headline">{localized.headline}</p>
          <p className="availability">{localized.availability}</p>
          <div className="profile-links" aria-label={text.linkLabel}>
            {profile.links.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>{link.label} <span aria-hidden="true">↗</span></a>)}
          </div>
        </section>

        <section className="terminal-area" aria-label={text.terminalLabel}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">{text.terminalLabel}</p>
              <h2>{text.terminalSubtitle}</h2>
            </div>
            <p className="command-hint">{text.promptHint}</p>
          </div>
          <Terminal language={language} />
        </section>
      </div>
    </main>
  );
}
