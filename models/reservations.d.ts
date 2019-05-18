declare module "reservations-model" {
  export interface IReservation {
    id: number,
    fullname: string,
    hotelName: string,
    arrivalAt: string | number | Date,
    departureAt: string | number | Date,
  }

  export interface ISortReservations {
    sortField?: ReservationVariables,
    sortOrder?: string,
  }

  export enum ReservationVariables {
    id = "id",
    fullname = "fullname",
    hotelName = "hotelName",
    arrivalAt = "arrivalAt",
    departureAt = "departureAt",
  }

  export interface IMakeReservation {
    fullname: string,
    hotelName: string,
    arrivalAt: string | number | Date,
    departureAt: string | number | Date,
  }
 
}
