"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  preferredDate: string;
  message: string;
  referral: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  sessionType: "",
  preferredDate: "",
  message: "",
  referral: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData(initialFormData);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-accent/30 bg-secondary p-8 text-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto text-accent"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 className="mt-4 font-serif text-2xl font-bold text-text-primary">
          Message Sent!
        </h3>
        <p className="mt-2 font-sans text-text-muted">
          Thank you for reaching out. I will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-lg bg-accent px-6 py-2 font-sans text-sm font-medium uppercase tracking-label text-primary transition-colors hover:bg-accent/90"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-text-muted/20 bg-secondary px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-5"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block font-sans text-sm text-text-muted"
        >
          Name <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={inputClasses}
        />
      </div>

      {/* Email & Phone */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block font-sans text-sm text-text-muted"
          >
            Email <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block font-sans text-sm text-text-muted"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Session Type */}
      <div>
        <label
          htmlFor="sessionType"
          className="mb-1.5 block font-sans text-sm text-text-muted"
        >
          Session Type
        </label>
        <select
          id="sessionType"
          name="sessionType"
          value={formData.sessionType}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">Select a session type</option>
          <option value="Wedding">Wedding</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Portrait/Graduate">Portrait / Graduate</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Preferred Date */}
      <div>
        <label
          htmlFor="preferredDate"
          className="mb-1.5 block font-sans text-sm text-text-muted"
        >
          Preferred Date
        </label>
        <input
          type="date"
          id="preferredDate"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block font-sans text-sm text-text-muted"
        >
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your vision, your event, or what you are looking for..."
          className={`${inputClasses} resize-vertical`}
        />
      </div>

      {/* How did you hear about us */}
      <div>
        <label
          htmlFor="referral"
          className="mb-1.5 block font-sans text-sm text-text-muted"
        >
          How did you hear about us?
        </label>
        <select
          id="referral"
          name="referral"
          value={formData.referral}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">Select an option</option>
          <option value="Google">Google Search</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="Referral">Friend / Referral</option>
          <option value="Wedding Venue">Wedding Venue</option>
          <option value="Realtor">Realtor</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-accent py-3.5 font-sans text-sm font-medium uppercase tracking-label text-primary transition-colors hover:bg-accent/90"
      >
        Send Message
      </button>
    </form>
  );
}
