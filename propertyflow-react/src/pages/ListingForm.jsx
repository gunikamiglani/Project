import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProperty } from "../store.js";
import { LOCATIONS, PROPERTY_TYPES } from "../data/properties.js";
import { Field, useValidatedForm } from "../components.jsx";
import { useAuth } from "../AuthContext.jsx";
import { DRAFT_KEY, propertyRule, readDraft } from "../validation.js";
import { Heading } from "../layout/Shared.jsx";
function ListingForm() {
  const d = useDispatch(),
    nav = useNavigate(),
    { user, notify } = useAuth(),
    [busy, setBusy] = useState(false),
    saved = readDraft(),
    f = useValidatedForm(
      {
        title: saved.title || "",
        type: saved.type || "",
        location: saved.location || "",
        price: saved.price || "",
        image: saved.image || "",
        description: saved.description || "",
      },
      propertyRule,
    );
  const publish = async (e) => {
    e.preventDefault();
    if (!f.validateAll()) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 250));
    d(
      addProperty({
        id: Date.now(),
        ...f.values,
        image:
          f.values.image ||
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
        beds: 3,
        baths: 2,
        area: "1,500 sq.ft",
        owner: user.email,
      }),
    );
    localStorage.removeItem(DRAFT_KEY);
    notify("Property published successfully!");
    setBusy(false);
    nav("/properties");
  };
  return (
    <section className="page-section">
      <Heading eyebrow="PROPERTY LISTING" title="List Your Property">
        Showcase your property to potential buyers.
      </Heading>
      <form className="property-form" noValidate onSubmit={publish}>
        <div className="form-grid">
          <Field
            label="Property Title"
            name="title"
            value={f.values.title}
            onChange={f.change}
            onBlur={f.blur}
            error={f.errors.title}
            placeholder="The Grand Residence"
          />
          <Field
            as="select"
            label="Property Type"
            name="type"
            value={f.values.type}
            onChange={f.change}
            onBlur={f.blur}
            error={f.errors.type}
          >
            <option value="">Select Type</option>
            {PROPERTY_TYPES.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </Field>
          <Field
            as="select"
            label="Location"
            name="location"
            value={f.values.location}
            onChange={f.change}
            onBlur={f.blur}
            error={f.errors.location}
          >
            <option value="">Select Location</option>
            {LOCATIONS.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </Field>
          <Field
            label="Price"
            name="price"
            value={f.values.price}
            onChange={f.change}
            onBlur={f.blur}
            error={f.errors.price}
            placeholder="1.25 Cr"
          />
        </div>
        <Field
          label="Image URL"
          name="image"
          type="url"
          value={f.values.image}
          onChange={f.change}
          onBlur={f.blur}
          error={f.errors.image}
          hint="Optional; a default image is used when blank."
        />
        <Field
          as="textarea"
          label="Description"
          name="description"
          rows="6"
          value={f.values.description}
          onChange={f.change}
          onBlur={f.blur}
          error={f.errors.description}
          placeholder="Describe your property…"
        />
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              localStorage.setItem(DRAFT_KEY, JSON.stringify(f.values));
              notify("Your draft has been saved.");
            }}
          >
            Save Draft
          </button>
          <button className="btn btn-primary" disabled={busy}>
            {busy ? "Publishing…" : "Publish Property"}
          </button>
        </div>
      </form>
    </section>
  );
}
export default ListingForm;
