"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { contact, site } from "@/content/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success";

// On a static host (GitHub Pages) there's no API route, so the form opens the
// visitor's mail client with a prefilled message instead of POSTing.
const STATIC_MODE = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    if (STATIC_MODE) {
      const subject = `North Alpha inquiry — ${data.interest || "General"} — ${data.name || ""}`;
      const body = [
        `Name: ${data.name || ""}`,
        `Email: ${data.email || ""}`,
        data.company ? `Company: ${data.company}` : null,
        `Interested in: ${data.interest || "Not sure yet"}`,
        "",
        data.message || "",
      ]
        .filter((l) => l !== null)
        .join("\n");
      window.location.href = `mailto:${site.ownerEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      form.reset();
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? "Something went wrong.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      toast.error(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="surface flex flex-col items-center gap-4 p-8 text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <p className="max-w-md text-lg text-foreground">
          {STATIC_MODE
            ? "Your email app should have opened with your message ready to send. If it didn't, email me directly."
            : contact.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface space-y-5 p-6 sm:p-8" noValidate>
      {/* Honeypot — hidden from users; bots fill it and get rejected server-side */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="company_url">Do not fill this in</label>
        <input
          id="company_url"
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">
            Company{" "}
            <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input id="company" name="company" autoComplete="organization" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interest">I&apos;m interested in</Label>
          <select
            id="interest"
            name="interest"
            defaultValue={contact.interests[contact.interests.length - 1]}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {contact.interests.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" name="message" required rows={5} />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(cta({ variant: "primary", size: "md" }), "w-full sm:w-auto")}
        >
          {status === "submitting" ? "Sending…" : contact.button}
        </button>
        {STATIC_MODE ? (
          <span className="text-xs text-muted-foreground">
            Opens in your email app on this preview.
          </span>
        ) : null}
      </div>
    </form>
  );
}
