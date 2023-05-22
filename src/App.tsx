import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import { DictOperations, EventModel } from './types/types';
import { useHistory } from 'react-router-dom';
import DeleteEvent from './pages/DeleteEvent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  // document.cookie = `jwt=${'alamakota2'}; path=/; secure; sameSite=strict`;

  const history = useHistory();

  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);

  const handleSelectedEvent = (
    event: EventModel,
    operation: DictOperations
  ) => {
    setSelectedEvent(event);
    switch (operation) {
      case DictOperations.Edit:
        history.push(`/editEvent/${event.id}`);
        break;
      case DictOperations.Delete:
        history.push(`/deleteEvent/${event.id}`);
        break;
      default:
        history.push('/');
    }
  };


  return (
    <div className="App">
      <Nav/>

      <Route
        path="/"
        exact
        component={() => (
          <Home setSelectedEvent={handleSelectedEvent}/>
        )}
      />
      <Route path="/login" component={() => <Login/>} />
      <Route path="/register" component={Register} />
      <Route path="/addEvent" component={AddEvent} />
      <Route
        path="/editEvent/:id"
        component={() => <EditEvent event={selectedEvent!} />}
      />
      <Route
        path="/deleteEvent/:id"
        component={() => <DeleteEvent event={selectedEvent!} />}
      />
    </div>
  );
}

export default App;
