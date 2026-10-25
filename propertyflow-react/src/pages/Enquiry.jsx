import { useState } from "react";
import { Field, useValidatedForm } from "../components.jsx";
import { useAuth } from "../AuthContext.jsx";
import { ENQUIRIES_KEY, enquiryRule } from "../validation.js";
import { Heading } from "../layout/Shared.jsx";
function Enquiry() {
  const { user, notify } = useAuth(),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    initial = { name: user.name, email: user.email, phone: "", message: "" },
    f = useValidatedForm(initial, enquiryRule);
  const send = async (e) => {
    e.preventDefault();
    if (!f.validateAll()) return;
    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      const rows = JSON.parse(localStorage.getItem(ENQUIRIES_KEY) || "[]");
      rows.push({
        ...f.values,
        id: Date.now(),
        date: new Date().toISOString(),
      });
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(rows));
      f.reset(initial);
      notify("Enquiry sent successfully!");
    } catch {
      setError("We could not save your enquiry. Please try again.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="page-section">
      <Heading eyebrow="GET IN TOUCH" title="Make an Enquiry">
        Tell us what you're looking for.
      </Heading>
      <form className="property-form" noValidate onSubmit={send}>
        {error && (
          <p className="form-status" role="alert">
            {error}
          </p>
        )}
        <Field
          label="Full Name"
          name="name"
          value={f.values.name}
          onChange={f.change}
          onBlur={f.blur}
          error={f.errors.name}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={f.values.email}
          onChange={f.change}
          onBlur={f.blur}
          error={f.errors.email}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          value={f.values.phone}
          onChange={f.change}
          onBlur={f.blur}
          error={f.errors.phone}
        />
        <Field
          as="textarea"
          label="Message"
          name="message"
          rows="6"
          value={f.values.message}
          onChange={f.change}
          onBlur={f.blur}
          error={f.errors.message}
        />
        <button className="btn btn-primary" disabled={busy}>
          {busy ? "Sending…" : "Send Enquiry"}
        </button>
      </form>
    </section>
  );
}
export default Enquiry;
