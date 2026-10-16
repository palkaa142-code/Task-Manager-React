import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Events from "./pages/Events.jsx";
import { isRegistrationAvailable } from "./eventUtils.js";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [notice, setNotice] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch("/events.json");
        if (!response.ok) {
          throw new Error(`Unable to load events: ${response.status}`);
        }

        const data = await response.json();
        const loadedEvents = data.map((event) => ({
          ...event,
          registrations: Math.floor(Math.random() * (event.capacity + 1))
        }));
        setEvents(loadedEvents);
      } catch (loadError) {
        console.error(loadError);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [retryCount]);

  function handleRegister(id) {
    const selectedEvent = events.find((event) => event.id === id);
    if (!selectedEvent || !isRegistrationAvailable(selectedEvent)) {
      return {
        success: false,
        error: "Registration is closed or this event is full."
      };
    }

    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id && event.registrations < event.capacity
          ? { ...event, registrations: event.registrations + 1 }
          : event
      )
    );
    return { success: true };
  }

  function handleCreate(event) {
    const duplicateId = events.some(
      (item) => item.id.toLowerCase() === event.id.trim().toLowerCase()
    );
    if (!event.id.trim() || duplicateId) {
      return {
        success: false,
        error: duplicateId ? "This event ID is already in use." : "Event ID is required."
      };
    }

    const newEvent = {
      ...event,
      id: event.id.trim(),
      registrations: 0
    };
    setEvents((currentEvents) => [...currentEvents, newEvent]);
    setNotice(`${newEvent.name} was created successfully.`);
    return { success: true };
  }

  function handleDelete(id) {
    const event = events.find((item) => item.id === id);
    if (!event) {
      return false;
    }

    if (!window.confirm(`Delete "${event.name}"? This cannot be undone.`)) {
      return false;
    }

    setEvents((currentEvents) =>
      currentEvents.filter((item) => item.id !== id)
    );
    setNotice(`${event.name} was deleted.`);
    return true;
  }

  function closeOverlay() {
    if (backgroundLocation) {
      navigate(-1);
    } else {
      navigate("/events");
    }
  }

  const eventPage = (
    <Events
      events={events}
      onRegister={handleRegister}
      loading={loading}
      error={error}
      onRetry={() => setRetryCount((count) => count + 1)}
      notice={notice}
      onDismissNotice={() => setNotice("")}
    />
  );

  return (
    <>
      <Navbar />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/events" element={eventPage} />
        <Route
          path="/events/:id"
          element={
            <EventDetails
              events={events}
              onRegister={handleRegister}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path="/create-event"
          element={
            <CreateEvent events={events} onCreate={handleCreate} />
          }
        />
        <Route path="*" element={<Navigate to="/events" replace />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/events/:id"
            element={
              <EventDetails
                events={events}
                onRegister={handleRegister}
                onDelete={handleDelete}
                isModal
                onClose={closeOverlay}
              />
            }
          />
          <Route
            path="/create-event"
            element={
              <CreateEvent
                events={events}
                onCreate={handleCreate}
                isModal
                onClose={closeOverlay}
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
