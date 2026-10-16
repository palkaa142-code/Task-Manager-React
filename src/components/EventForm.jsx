import { useState } from "react";
import { categories } from "../eventUtils.js";

function createEmptyForm() {
  return {
    id: "",
    name: "",
    date: "",
    category: categories[0],
    description: "",
    venue: "",
    capacity: "",
    registrations: "0"
  };
}

function EventForm({ events, onCreate, onCancel }) {
  const [form, setForm] = useState(createEmptyForm);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  }

  function handleSubmit(eventObject) {
    eventObject.preventDefault();
    const nextErrors = {};

    if (!form.id.trim()) {
      nextErrors.id = "Event ID is required.";
    } else if (
      events.some(
        (event) => event.id.toLowerCase() === form.id.trim().toLowerCase()
      )
    ) {
      nextErrors.id = "This event ID is already in use.";
    }
    if (!form.name.trim()) {
      nextErrors.name = "Event name is required.";
    }
    if (!form.date || Number.isNaN(new Date(`${form.date}T00:00:00`).getTime())) {
      nextErrors.date = "Enter a valid event date.";
    }
    if (!categories.includes(form.category)) {
      nextErrors.category = "Choose a valid category.";
    }
    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    }
    if (!form.venue.trim()) {
      nextErrors.venue = "Venue is required.";
    }

    const capacity = Number(form.capacity);
    if (!Number.isInteger(capacity) || capacity < 1) {
      nextErrors.capacity = "Capacity must be a positive whole number.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const result = onCreate({
      ...form,
      id: form.id.trim(),
      capacity,
      registrations: 0
    });
    if (result.success) {
      setForm(createEmptyForm());
    } else if (result.error) {
      setErrors({ id: result.error });
    }
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span>Event ID</span>
        <input
          name="id"
          value={form.id}
          onChange={handleChange}
          required
        />
        {errors.id && <small className="error-text">{errors.id}</small>}
      </label>
      <label className="field">
        <span>Event name</span>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        {errors.name && <small className="error-text">{errors.name}</small>}
      </label>
      <label className="field">
        <span>Date</span>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        {errors.date && <small className="error-text">{errors.date}</small>}
      </label>
      <label className="field">
        <span>Category</span>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <small className="error-text">{errors.category}</small>
        )}
      </label>
      <label className="field">
        <span>Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          required
        />
        {errors.description && (
          <small className="error-text">{errors.description}</small>
        )}
      </label>
      <label className="field">
        <span>Venue</span>
        <input
          name="venue"
          value={form.venue}
          onChange={handleChange}
          required
        />
        {errors.venue && <small className="error-text">{errors.venue}</small>}
      </label>
      <div className="form-row">
        <label className="field">
          <span>Capacity</span>
          <input
            name="capacity"
            type="number"
            min="1"
            value={form.capacity}
            onChange={handleChange}
            required
          />
          {errors.capacity && (
            <small className="error-text">{errors.capacity}</small>
          )}
        </label>
        <label className="field">
          <span>Number of registrations</span>
          <input
            name="registrations"
            type="number"
            value={form.registrations}
            readOnly
          />
        </label>
      </div>
      <div className="form-actions">
        <button className="button button-create" type="submit">
          Create Event
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EventForm;
