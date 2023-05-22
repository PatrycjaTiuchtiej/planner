import React, { useEffect, useState } from 'react';
import EventList from '../components/EventList';
import { DictOperations, EventModel } from '../types/types';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { query, collection, where, onSnapshot, getDocs } from "firebase/firestore";


const Home = (props: {
  setSelectedEvent: (event: EventModel, operation: DictOperations) => void;
}) => {
  const history = useHistory();
  const [events, setEvents] = useState<any[]>([]);//useState([]);
  const [user, loading, error] = useAuthState(auth);
  const fetchEvents = async () => {
    const q = query(collection(db, "event"), where("uid", "==", user?.uid));
    await getDocs(q)
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setEvents(newData);                
            console.log(events, newData);
        })
  }
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEventClick = () => {
    history.push('/addEvent');
  };

  // const events = [
  //   {
  //     id: '1',
  //     name: 'a',
  //     description: 'aaa',
  //     startDate: '2015-10-1 2:00 PM GMT+1:00',
  //     endDate: '2015-10-1 3:00 PM GMT+1:00',
  //   } as EventModel,
  //   {
  //     id: '2',
  //     name: 'b',
  //     description: 'bbb',
  //     startDate: '2016-10-1 2:00 PM GMT+1:00',
  //     endDate: '2016-10-1 3:00 PM GMT+1:00',
  //   } as EventModel,
  //   {
  //     id: '3',
  //     name: 'c',
  //     description: 'ccc',
  //     startDate: '2014-11-1 2:00 PM GMT+1:00',
  //     endDate: '2015-12-4 3:00 PM GMT+1:00',
  //   } as EventModel,
  //   {
  //     id: '4',
  //     name: 'd',
  //     description: 'ddd',
  //     startDate: '2019-11-1 2:00 PM GMT+1:00',
  //     endDate: '2019-12-4 3:00 PM GMT+1:00',
  //   } as EventModel,
  // ];

  return (
    <div className="col-md-6 mx-auto mt-4">
      <div className="pb-3 h3 d-flex justify-content-between">
        {user?.email
          ? 'Cześć, ' + user.email + '! :)'
          : 'Nie jesteś zalogowany :('}{' '}
        <button
          className="btn btn-outline-secondary"
          onClick={handleAddEventClick}
        >
          Dodaj wydarzenie
        </button>
      </div>

      {events && (
        <EventList events={events} setSelectedEvent={props.setSelectedEvent} />
      )}
    </div>
  );
};

export default Home;
