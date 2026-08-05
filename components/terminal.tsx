"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { getNavigationCommands, getWelcome, runNavigationCommand, type CommandResult } from "@/lib/command-engine";
import type { Language } from "@/data/profile";

type Entry = { id: string; input?: string; result: CommandResult };

function createEntryId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function Terminal({ language }: { language: Language }) {
  const [value, setValue] = useState("");
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [entries, setEntries] = useState<Entry[]>(() => [{ id: "welcome", result: getWelcome(language) }]);
  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const isEnglish = language === "en";

  useEffect(() => {
    setEntries([{ id: "welcome", result: getWelcome(language) }]);
    setValue("");
    setQuestionHistory([]);
    setHistoryIndex(-1);
    inputRef.current?.focus();
  }, [language]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [entries]);

  useEffect(() => {
    const focusQuestion = (event: globalThis.KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusQuestion);
    return () => window.removeEventListener("keydown", focusQuestion);
  }, []);

  const askAi = async (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question) return;

    const entryId = createEntryId();
    const loadingResult: CommandResult = {
      heading: isEnglish ? "Asking AI..." : "Pytam AI...",
      lines: [isEnglish ? "Preparing a concise answer from my portfolio." : "Przygotowuje krotka odpowiedz na podstawie portfolio."],
      tone: "muted"
    };

    setEntries((current) => [...current, { id: entryId, input: question, result: loadingResult }]);
    setQuestionHistory((current) => (current.at(-1) === question ? current : [...current, question]));
    setHistoryIndex(-1);
    setValue("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question, language })
      });
      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json().catch(() => ({})) : {};
      const result: CommandResult = response.status === 429
        ? {
            heading: isEnglish ? "AI limit reached" : "Osiagnieto limit AI",
            lines: [isEnglish ? "Please wait a few minutes before asking another question." : "Odczekaj kilka minut przed kolejnym pytaniem."],
            tone: "error"
          }
        : response.ok
        ? {
            heading: isEnglish ? "AI Assistant" : "Asystent AI",
            lines: (data.answer || "").split("\n").filter(Boolean),
            tone: "accent"
          }
        : {
            heading: isEnglish ? "Error" : "Blad",
            lines: [data.error || (isEnglish ? "Failed to get an AI response." : "Nie udalo sie uzyskac odpowiedzi AI.")],
            tone: "error"
          };

      setEntries((current) => current.map((entry) => entry.id === entryId ? { ...entry, result } : entry));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : isEnglish ? "Network or server error." : "Blad sieci lub serwera.";
      setEntries((current) => current.map((entry) => entry.id === entryId ? {
        ...entry,
        result: { heading: isEnglish ? "Error" : "Blad", lines: [message], tone: "error" }
      } : entry));
    }

    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const selectSection = (command: string) => {
    const result = runNavigationCommand(command, language);
    if (result.clear) {
      setEntries([]);
    } else {
      setEntries((current) => [...current, { id: createEntryId(), input: command, result }]);
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askAi(value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!questionHistory.length) return;
      const next = historyIndex === -1 ? questionHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(questionHistory[next]);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= questionHistory.length) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(next);
        setValue(questionHistory[next]);
      }
    }
  };

  return (
    <section className="terminal-shell" aria-labelledby="terminal-title" onClick={() => inputRef.current?.focus()}>
      <header className="terminal-bar">
        <div className="terminal-dots" aria-hidden="true"><span /><span /><span /></div>
        <p id="terminal-title">portfolio@dawid:~</p>
        <span className="terminal-state">online</span>
      </header>
      <div className="terminal-content">
        <div className="transcript" ref={transcriptRef} aria-live="polite" aria-label={isEnglish ? "Portfolio and AI conversation" : "Portfolio i rozmowa z AI"}>
          {entries.map((entry) => (
            <div className="terminal-entry" key={entry.id}>
              {entry.input && <p className="command-line"><span>{entry.input.includes(" ") ? "you@portfolio:~$" : "portfolio@dawid:~$"}</span> {entry.input}</p>}
              <div className={`result result--${entry.result.tone ?? "default"}`}>
                {entry.result.heading && <p className="result-heading">{entry.result.heading}</p>}
                {entry.result.lines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
              </div>
            </div>
          ))}
        </div>
        <form className="terminal-input-row" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="terminal-question">{isEnglish ? "Ask the AI about Dawid" : "Zapytaj AI o Dawida"}</label>
          <span aria-hidden="true">AI&gt;</span>
          <input
            id="terminal-question"
            autoComplete="off"
            autoFocus
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={isEnglish ? "Ask about my automation, projects, or skills..." : "Zapytaj o automatyzacje, projekty lub umiejetnosci..."}
          />
        </form>
        <p className="ai-disclosure">
          {isEnglish
            ? "AI answers only from this portfolio. Please do not share sensitive personal information."
            : "AI odpowiada tylko na podstawie tego portfolio. Nie podawaj wrazliwych danych osobowych."}
        </p>
      </div>
      <footer className="terminal-footer" aria-label={isEnglish ? "Portfolio sections" : "Sekcje portfolio"}>
        {getNavigationCommands(language).map((item) => (
          <button className={item.utility ? "terminal-utility" : undefined} type="button" key={item.command} onClick={(event) => { event.stopPropagation(); selectSection(item.command); }}>
            {item.label}
          </button>
        ))}
      </footer>
    </section>
  );
}
