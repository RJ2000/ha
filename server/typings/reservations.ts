/// <reference path="../../models/reservations.d.ts" />
import { IReservation, ISortReservations, IMakeReservation } from 'reservations-model';

class ReservationsEntity {
  previousId: number; allReservations: IReservation[];

  constructor() {
    this.previousId = 1;
    this.allReservations = [];
  }

  createReservation(flag:any,body: IMakeReservation): IReservation {
    //log the call
    console.log("createReservation logging", flag?flag:"called");
    const reservation = {
      id: this.previousId++, ...body,
    };
    this.allReservations.push(reservation);
    return reservation;
  }

  getReservations(flag:any,value: ISortReservations): IReservation[] {
    //log the call
    console.log("getReservation logging", flag?flag:"called");
    const { sortField, sortOrder } = value;
    let sortedReservations = this.allReservations.sort((a, b) => (sortOrder === 'DESC' ? b.id - a.id : a.id - b.id));
    if(sortField && sortField !== 'id') {
      sortedReservations = sortedReservations.sort((a, b) => {
        let sortIndex = 0;
        let aVal = a[sortField];
        let bVal = b[sortField];
        if(typeof aVal === 'string' && typeof bVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
          sortIndex = bVal.localeCompare(aVal);
        }
        if(typeof aVal === 'number' && typeof bVal === 'number') {
          sortIndex = aVal - bVal;
        }
        return sortIndex * (sortOrder === 'DESC' ? 1 : -1)
      })
    }
    return sortedReservations;
  }
  
  getReservationById(flag:any,id: number): IReservation {
    //log the call
    console.log("getReservationById logging", flag?flag:"called");
    if(!id) { throw "id is required";}
    const response = this.allReservations.find(a => (a.id === id));
    if(!response) {
      throw "Reservation is not found";
    }
    return response;
  }
}

export default new ReservationsEntity();