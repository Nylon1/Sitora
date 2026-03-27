"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ApplyFormSection() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    businessType: "",
    hasWebsite: "No",
    goals: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/success");
    } catch (error) {
      setErrorMessage("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-4 backdrop-blur-xl"
    >
      <input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        className="w-full rounded-xl bg-black/30 p-3 text-white"
        required
      />

      <input
        name="businessName"
        placeholder="Business Name"
        value={form.businessName}
        onChange={handleChange}
        className="w-full rounded-xl bg-black/30 p-3 text-white"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full rounded-xl bg-black/30 p-3 text-white"
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded-xl bg-black/30 p-3 text-white"
        required
      />

      <input
        name="businessType"
        placeholder="Business Type"
        value={form.businessType}
        onChange={handleChange}
        className="w-full rounded-xl bg-black/30 p-3 text-white"
        required
      />

      <select
        name="hasWebsite"
        value={form.hasWebsite}
        onChange={handleChange}
        className="w-full rounded-xl bg-black/30 p-3 text-white"
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>

      <textarea
        name="goals"
        placeholder="Tell us about your goals"
        value={form.goals}
        onChange={handleChange}
        className="w-full rounded-xl bg-black/30 p-3 text-white"
        rows={5}
        required
      />

      {errorMessage ? (
        <p className="text-sm text-red-400">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-cyan-300 py-3 font-bold text-black"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}