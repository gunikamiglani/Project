import { emailRule, required } from "./components.jsx";
export const DRAFT_KEY = "propertyflow-draft";
export const ENQUIRIES_KEY = "propertyflow-enquiries";
export const readDraft = () => { try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || {}; } catch { return {}; } };
export const propertyRule = (name, value) => ({ title: required("Property title")(value), type: required("Property type")(value), location: required("Location")(value), price: required("Price")(value), image: value && !/^https?:\/\/[^\s]+$/i.test(value) ? "Enter a valid image URL." : "" })[name] || "";
export const enquiryRule = (name, value) => ({ name: required("Full name")(value), email: value ? emailRule(value) : required("Email")(value), phone: value.trim().length >= 7 ? "" : "Enter a valid phone number.", message: value.trim().length >= 10 ? "" : "Please enter at least 10 characters." })[name] || "";
