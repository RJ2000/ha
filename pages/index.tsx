import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import App from '../components/App';
import Slogan from '../components/Slogan';
import MakeReservation from '../components/MakeReservation';
import ReservationList from '../components/ReservationList';

function IndexPage() {
  return (
    <div>
        <Header />
        <App>
          <Slogan />
          <MakeReservation />
        </App>
        <ReservationList />
        <Footer />
    </div>
);
}

export default IndexPage;