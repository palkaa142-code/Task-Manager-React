import { useState } from "react";
import Modal from "./Modal.jsx";

function RegistrationModal({ event, onRegister, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  }

  function handleSubmit(eventObject) {
    eventObject.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }
    if (!/^[a-z0-9]+(?:[._%+-][a-z0-9]+)*@gmail\.com$/i.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address ending in @gmail.com.";
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const result = onRegister(event.id);
    if (result.success) {
      setSuccess(true);
    } else {
      setErrors({ form: result.error });
    }
  }

  return (
    <Modal title={`Register for ${event.name}`} onClose={onClose}>
      {success ? (
        <div className="success-panel">
          <p>Your registration was successful.</p>
          <button className="button button-primary" onClick={onClose}>
            Close
          </button>
        </div>
      ) : (
        <form className="form-stack" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Full name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.name && <small className="error-text">{errors.name}</small>}
          </label>
          <label className="field">
            <span>Gmail address</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && (
              <small className="error-text">{errors.email}</small>
            )}
          </label>
          <label className="field">
            <span>Contact number</span>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              inputMode="numeric"
              autoComplete="tel"
            />
            {errors.phone && (
              <small className="error-text">{errors.phone}</small>
            )}
          </label>
          {errors.form && <p className="error-text">{errors.form}</p>}
          <div className="form-actions">
            <button className="button button-success" type="submit">
              Submit Registration
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default RegistrationModal;
