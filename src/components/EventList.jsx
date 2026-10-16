import EventCard from "./EventCard.jsx";

function EventList({ events, onViewDetails, onRegister }) {
  if (events.length === 0) {
    return <p className="empty-state">No events found.</p>;
  }

  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onViewDetails={() => onViewDetails(event.id)}
          onRegister={() => onRegister(event.id)}
        />
      ))}
    </div>
  );
}

export default EventList;
