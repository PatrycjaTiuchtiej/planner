import React, { SyntheticEvent, useState } from 'react';
import { EventModel } from '../types/types';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface EditEventProps {
  event: EventModel;
}

const EditEvent = ({ event }: EditEventProps) => {
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);

  const defaultStartDate = moment(event.startDate).format('YYYY-MM-DDTHH:mm');
  const defaultEndDate = moment(event.endDate).format('YYYY-MM-DDTHH:mm');

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndtDate] = useState(defaultEndDate);

  const [redirect, setRedirect] = useState(false);

  const handleEdit = async (event: any, name: any, description: any, startDate: any, endDate: any) => {
    await updateDoc(doc(db, "event", event.id), { name: name, description: description, startDate: startDate, endDate: endDate });
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleEdit(event, name, description, startDate, endDate)
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
              <h5 className="card-title">Edytuj wydarzenie</h5>
              <form onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="nazwa">Nazwa</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="nazwa"
                    value={name}
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
                    value={description}
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
                    value={startDate}
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="data_koncowa">Data końcowa</label>
                  <input
                    type="datetime-local"
                    className="form-control mb-4"
                    value={endDate}
                    id="data_koncowa"
                    required
                    onChange={(e) => setEndtDate(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary  w-100">
                  Zapisz
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
