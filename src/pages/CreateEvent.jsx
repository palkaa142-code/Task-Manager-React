import { Link, useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm.jsx";
import Modal from "../components/Modal.jsx";

function CreateEvent({ events, onCreate, isModal = false, onClose }) {
  const navigate = useNavigate();

  function closeForm() {
    if (onClose) {
      onClose();
    } else {
      navigate("/events");
    }
  }

  function createEvent(event) {
    const result = onCreate(event);
    if (result.success) {
      closeForm();
    }
  }

  const form = (
    <EventForm
      events={events}
      onCreate={createEvent}
      onCancel={closeForm}
    />
  );

  if (isModal) {
    return (
      <Modal title="Create an event" onClose={closeForm}>
        {form}
      </Modal>
    );
  }

  return (
    <main className="page-shell">
      <Link className="back-link" to="/events">
        ← Back to events
      </Link>
      <section className="form-page-card">
        <p className="eyebrow">Share something happening on campus</p>
        <h1>Create an event</h1>
        {form}
      </section>
    </main>
  );
}

export default CreateEvent;
