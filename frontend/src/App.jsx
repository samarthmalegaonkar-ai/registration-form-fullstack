import React, { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL ?? "/api/registrations";

export default function App() {
  const [status, setStatus] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "", text: "" });
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const registration = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registration),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(
          details || `The server returned an error (${response.status}).`,
        );
      }

      form.reset();
      setStatus({
        type: "success",
        text: "Thanks! Your registration has been submitted.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        text:
          error instanceof TypeError
            ? "Could not connect to the server. Make sure the backend and database are running."
            : error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page">
      <section className="form-card" aria-labelledby="form-title">
        <div className="eyebrow">GET STARTED</div>
        <h1 id="form-title">Create your account</h1>
        <p className="intro">Enter your details below to complete registration.</p>

        <form onSubmit={handleSubmit}>
          <div className="name-row">
            <label>
              First name
              <input
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Jane"
                required
                maxLength="80"
              />
            </label>
            <label>
              Last name
              <input
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Smith"
                required
                maxLength="80"
              />
            </label>
          </div>

          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              required
              maxLength="254"
            />
          </label>

          <label>
            Phone number
            <input
              name="mobileNumber"
              type="tel"
              autoComplete="tel"
              placeholder="+91 1234567890"
              pattern="[0-9+()\- ]{7,20}"
              title="Enter 7 to 20 digits, spaces, or + ( ) - characters."
              required
              maxLength="20"
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit registration"}
            {!isSubmitting && <span aria-hidden="true">→</span>}
          </button>
        </form>

        {status.text && (
          <p className={`status ${status.type}`} role="status">
            {status.text}
          </p>
        )}
        <p className="privacy-note">Your details are securely saved to our database.</p>
      </section>
    </main>
  );
}
