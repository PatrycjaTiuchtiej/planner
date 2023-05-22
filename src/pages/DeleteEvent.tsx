import React, { SyntheticEvent, useState } from 'react';
import { EventModel } from '../types/types';
import { Redirect } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

interface DeleteEventProps {
  event: EventModel;
}

const DeleteEvent = ({ event }: DeleteEventProps) => {
  const [redirect, setRedirect] = useState(false);

  const onClose = () => {
    setRedirect(true);
  };

  const handleDelete = async (id: any) => {
    await deleteDoc(doc(db, "event", id));
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleDelete(event.id)
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
              <h5 className="card-title">Potwierdź usunięcie wydarzenia</h5>
              <div className="text-center my-4">
                <h1 style={{ fontSize: '60px' }}>?</h1>
                <p>Czy na pewno chcesz usunąć wydarzenie?</p>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-danger mx-2 w-25"
                  onClick={onSubmit}
                >
                  Tak
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-2 w-25"
                  onClick={onClose}
                >
                  Nie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEvent;
