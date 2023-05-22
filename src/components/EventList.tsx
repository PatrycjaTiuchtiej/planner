import React from 'react';
import { DictOperations, EventModel } from '../types/types';

interface EventListProps {
  events: EventModel[];
  setSelectedEvent: (event: EventModel, operation: DictOperations) => void;
}

const EventList = ({ events, setSelectedEvent }: EventListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
  };

  const handleSetEditSelectedEvent = (event: EventModel) => {
    setSelectedEvent(event, DictOperations.Edit);
  };

  const handleSetDeleteSelectedEvent = (event: EventModel) => {
    setSelectedEvent(event, DictOperations.Delete);
  };

  return (
    <div>
      <div className="list-group mb-5">
        {events.length > 0 &&
          events.map((event) => {
            const formattedStartDate = formatDate(event.startDate);
            const formattedEndDate = formatDate(event.endDate);

            return (
              <div className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{event.name}</h5>
                  <div className="d-flex flex-column">
                    <small>
                      <span className="fw-bold">Start:</span>
                      {` ${formattedStartDate}`}
                    </small>
                    <small>
                      <span className="fw-bold">Koniec:</span>
                      {` ${formattedEndDate}`}
                    </small>
                  </div>
                </div>
                <p className="mb-1">{event.description}</p>
                <div>
                  <button
                    className="btn btn-primary my-3 me-3"
                    onClick={() => handleSetEditSelectedEvent(event)}
                  >
                    Edytuj
                  </button>
                  <button
                    className="btn btn-danger my-3"
                    onClick={() => handleSetDeleteSelectedEvent(event)}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EventList;
