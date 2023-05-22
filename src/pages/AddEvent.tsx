import { addDoc, collection } from 'firebase/firestore';
import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AddEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndtDate] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [redirect, setRedirect] = useState(false);

  const addEvent = async (name: any, description: any, startDate: any, endDate: any, uid: any) => {
    await addDoc(collection(db, "event"), {
      name,
      description,
      startDate,
      endDate,
      uid
    });
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    addEvent(name, description, startDate, endDate, user?.uid)
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Dodaj wydarzenie</h5>
              <form onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="nazwa">Nazwa</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="nazwa"
                    placeholder="Wpisz nazwę wydarzenia"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="opis">Opis</label>
                  <textarea
                    className="form-control mb-2"
                    id="opis"
                    rows={3}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="data_poczatkowa">Data początkowa</label>
                  <input
                    type="datetime-local"
                    className="form-control mb-2"
                    id="data_poczatkowa"
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="data_koncowa">Data końcowa</label>
                  <input
                    type="datetime-local"
                    className="form-control mb-4"
                    id="data_koncowa"
                    required
                    onChange={(e) => setEndtDate(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary  w-100">
                  Dodaj
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
