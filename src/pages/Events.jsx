import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EventList from "../components/EventList.jsx";
import Filter from "../components/Filter.jsx";
import RegistrationModal from "../components/RegistrationModal.jsx";
import SearchBar from "../components/SearchBar.jsx";

function Events({
  events,
  onRegister,
  loading,
  error,
  onRetry,
  notice,
  onDismissNotice
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [registrationEventId, setRegistrationEventId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const registrationEvent = events.find(
    (event) => event.id === registrationEventId
  );

  const filteredEvents = useMemo(
    () =>
      events.filter((event) => {
        const matchesName = event.name
          .toLowerCase()
          .includes(search.trim().toLowerCase());
        const matchesCategory =
          category === "All" || event.category === category;
        return matchesName && matchesCategory;
      }),
    [events, search, category]
  );

  function openDetails(id) {
    navigate(`/events/${encodeURIComponent(id)}`, {
      state: { backgroundLocation: location }
    });
  }

  function openCreateEvent() {
    navigate("/create-event", {
      state: { backgroundLocation: location }
    });
  }

  return (
    <>
      <main className="page-shell">
        <section className="page-heading">
          <div>
            <p className="eyebrow">Campus life, all in one place</p>
            <h1>Upcoming events</h1>
            <p className="page-intro">
              Find an event, explore the details, and save your place.
            </p>
          </div>
          <button className="button button-create" onClick={openCreateEvent}>
            + Create Event
          </button>
        </section>

        {notice && (
          <div className="notice" role="status">
            <span>{notice}</span>
            <button
              className="notice-close"
              onClick={onDismissNotice}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        <section className="toolbar" aria-label="Search and filter events">
          <SearchBar search={search} onSearchChange={setSearch} />
          <Filter category={category} onCategoryChange={setCategory} />
        </section>

        {loading ? (
          <p className="state-message">Loading events...</p>
        ) : error ? (
          <div className="state-message error-state">
            <p>Unable to load events. Please try again.</p>
            <button className="button button-secondary" onClick={onRetry}>
              Retry
            </button>
          </div>
        ) : (
          <EventList
            events={filteredEvents}
            onViewDetails={openDetails}
            onRegister={setRegistrationEventId}
          />
        )}
      </main>
      {registrationEvent && (
        <RegistrationModal
          event={registrationEvent}
          onRegister={onRegister}
          onClose={() => setRegistrationEventId("")}
        />
      )}
    </>
  );
}

export default Events;
