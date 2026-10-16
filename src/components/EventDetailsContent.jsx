import {
  formatDate,
  getLastRegistrationDate,
  getRegistrationStatus,
  isRegistrationAvailable
} from "../eventUtils.js";

function EventDetailsContent({ event, onRegister, onDelete, showDelete }) {
  const available = isRegistrationAvailable(event);

  return (
    <>
      <dl className="details-list">
        <div>
          <dt>ID</dt>
          <dd>{event.id}</dd>
        </div>
        <div>
          <dt>Event name</dt>
          <dd>{event.name}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{formatDate(event.date)}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{event.category}</dd>
        </div>
        <div className="details-description">
          <dt>Description</dt>
          <dd>{event.description}</dd>
        </div>
        <div>
          <dt>Venue</dt>
          <dd>{event.venue}</dd>
        </div>
        <div>
          <dt>Capacity</dt>
          <dd>{event.capacity}</dd>
        </div>
        <div>
          <dt>Registrations</dt>
          <dd>
            {event.registrations}/{event.capacity}
          </dd>
        </div>
        <div>
          <dt>Last date to register</dt>
          <dd>{formatDate(getLastRegistrationDate(event.date))}</dd>
        </div>
        <div>
          <dt>Registration status</dt>
          <dd>{getRegistrationStatus(event)}</dd>
        </div>
      </dl>
      {(available || showDelete) && (
        <div className="details-actions">
          {available && (
            <button className="button button-success" onClick={onRegister}>
              Register
            </button>
          )}
          {showDelete && (
            <button
              className="button button-danger button-delete-small"
              onClick={onDelete}
            >
              Delete Event
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default EventDetailsContent;
