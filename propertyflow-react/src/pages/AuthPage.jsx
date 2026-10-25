import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Field,
  emailRule,
  required,
  useValidatedForm,
} from "../components.jsx";
import { useAuth } from "../AuthContext.jsx";
function AuthPage({ registering }) {
  const { login, register, notify } = useAuth(),
    nav = useNavigate(),
    loc = useLocation(),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    initial = { name: "", email: "", password: "" },
    rule = (n, v) =>
      ({
        name: required("Full name")(v),
        email: v ? emailRule(v) : required("Email")(v),
        password: v.length >= 6 ? "" : "Use at least 6 characters.",
      })[n] || "",
    f = useValidatedForm(initial, rule);
  const submit = async (e) => {
    e.preventDefault();
    if (!f.validateAll()) return;
    setBusy(true);
    setError("");
    await new Promise((r) => setTimeout(r, 200));
    try {
      (registering ? register : login)(f.values);
      notify(
        registering ? "Account created successfully!" : "Login successful!",
      );
      nav(loc.state?.from || "/dashboard", { replace: true });
    } catch (x) {
      setError(x.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">PROPERTYFLOW</div>
        <span className="eyebrow">
          {registering ? "JOIN PROPERTYFLOW" : "WELCOME BACK"}
        </span>
        <h1>{registering ? "Create your account." : "Welcome back."}</h1>
        <p>
          {registering
            ? "Start discovering exceptional properties."
            : "Log in to continue your property journey."}
        </p>
        <form noValidate onSubmit={submit}>
          {error && (
            <p className="form-status" role="alert">
              {error}
            </p>
          )}
          {registering && (
            <Field
              label="Full Name"
              name="name"
              value={f.values.name}
              onChange={f.change}
              onBlur={f.blur}
              error={f.errors.name}
            />
          )}
          <Field
            label="Email Address"
            name="email"
            type="email"
            value={f.values.email}
            onChange={f.change}
            onBlur={f.blur}
            error={f.errors.email}
          />
          <Field
            label="Password"
            name="password"
            type="password"
            value={f.values.password}
            onChange={f.change}
            onBlur={f.blur}
            error={f.errors.password}
          />
          <button className="btn btn-primary btn-full" disabled={busy}>
            {busy ? "Please wait…" : registering ? "Create Account" : "Log In"}
          </button>
        </form>
        <p className="auth-switch">
          {registering
            ? "Already have an account? "
            : "Don't have an account? "}
          <Link to={registering ? "/login" : "/register"}>
            {registering ? "Log in" : "Create one"}
          </Link>
        </p>
      </div>
    </section>
  );
}
export default AuthPage;
