import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EventDetailsContent from "../components/EventDetailsContent.jsx";
import Modal from "../components/Modal.jsx";
import RegistrationModal from "../components/RegistrationModal.jsx";

function EventDetails({
  events,
  onRegister,
  onDelete,
  isModal = false,
  onClose
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const event = events.find((item) => item.id === id);

  function closeDetails() {
    if (onClose) {
      onClose();
    } else {
      navigate("/events");
    }
  }

  function deleteEvent() {
    if (onDelete(event.id)) {
      closeDetails();
    }
  }

  if (!event) {
    return (
      <main className="page-shell">
        <section className="state-message">
          <h1>Event not found</h1>
          <p>This event may have been removed or the link may be incorrect.</p>
          <Link className="button button-secondary" to="/events">
            Back to events
          </Link>
        </section>
      </main>
    );
  }

  const content = (
    <EventDetailsContent
      event={event}
      onRegister={() => setRegistrationOpen(true)}
      onDelete={deleteEvent}
      showDelete={isModal}
    />
  );
  const registrationDialog = registrationOpen && (
    <RegistrationModal
      event={event}
      onRegister={onRegister}
      onClose={() => setRegistrationOpen(false)}
    />
  );

  if (isModal) {
    return (
      <>
        <Modal title="Event details" onClose={closeDetails}>
          <h3 className="detail-event-name">{event.name}</h3>
          {content}
        </Modal>
        {registrationDialog}
      </>
    );
  }

  return (
    <>
      <main className="page-shell">
        <Link className="back-link" to="/events">
          ← Back to events
        </Link>
        <section className="detail-page-card">
          <p className="eyebrow">Event details</p>
          <h1>{event.name}</h1>
          {content}
        </section>
      </main>
      {registrationDialog}
    </>
  );
}

export default EventDetails;
