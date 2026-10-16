import {
  formatDate,
  getLastRegistrationDate,
  getRegistrationStatus,
  isRegistrationAvailable
} from "../eventUtils.js";

function EventCard({ event, onViewDetails, onRegister }) {
  const available = isRegistrationAvailable(event);
  const status = getRegistrationStatus(event);

  return (
    <article className="event-card">
      <div className="event-card-heading">
        <span className={`category category-${event.category.toLowerCase()}`}>
          {event.category}
        </span>
        <span className={`status status-${available ? "open" : "closed"}`}>
          {status}
        </span>
      </div>
      <h2>{event.name}</h2>
      <dl className="event-summary">
        <div>
          <dt>Event date</dt>
          <dd>{formatDate(event.date)}</dd>
        </div>
        <div>
          <dt>Venue</dt>
          <dd>{event.venue}</dd>
        </div>
        <div>
          <dt>Last date to register</dt>
          <dd>{formatDate(getLastRegistrationDate(event.date))}</dd>
        </div>
        <div>
          <dt>Registrations</dt>
          <dd>
            {event.registrations}/{event.capacity}
          </dd>
        </div>
      </dl>
      <div className="card-actions">
        <button className="button button-secondary" onClick={onViewDetails}>
          View Details
        </button>
        <button
          className="button button-success"
          onClick={onRegister}
          disabled={!available}
        >
          Register
        </button>
      </div>
    </article>
  );
}

export default EventCard;
