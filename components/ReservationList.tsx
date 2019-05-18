import './ReservationList.scss';
import graphqltag from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import {IReservation} from "reservations-model";

export const reservationsQuery = graphqltag`
  query getReservations($sortField: ReservationsortField, $sortOrder: sortOrder) {
    reservations(sortField: $sortField, sortOrder: $sortOrder) {
      id,
      fullname,
      hotelName,
      arrivalAt,
      departureAt
    }
  }
`;

export const reservationsVars = {
    sortField:'id',
    sortOrder:'DESC',
  };
  const weekIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  export interface IItemDate {
    date: string | number | Date;
  }
  
  export const ItemDate = ({ date }: IItemDate) => {
    if(typeof date === 'string' || typeof date === 'number') {
      date = new Date(date);
    }
    const day = date.getUTCDate();
    const month = monthIndex[date.getUTCMonth()];
    const week = weekIndex[date.getUTCDay()];
    return (
      <div className="Date">
        <div className="Day">{day}</div>
        <div className="Container">
          <div className="Month">{month}</div>
          <div className="Week">{week}</div>
        </div>
      </div>
    )
  }

  export const ReservationItem = ({ id, fullname, hotelName, arrivalAt, departureAt }: IReservation) => {
    return (
      <div className="ReservationItem" data-id={id}>
        <div className="Guest">
          <div className="FullName">{fullname}</div>
          <div className="Hotel"><span>Hotel: </span><span className="HotelName">{hotelName}</span></div>
        </div>
        <div className="Arrival">
            <div>Arrive</div>
            <ItemDate date={arrivalAt} />
        </div>
        <div className="Departure">
            <div>Depart</div>
            <ItemDate date={departureAt} />
        </div>
      </div>
    )
  }

  export const EmptyReservationList = () => {
      return (
          <div className="EmptyReservationList">
              No reservations.
          </div>
      )
  }

  export interface IReservationResult {
    reservations: IReservation[];
  }

  export default function ReservationList() {
    
    return (<div className="ReservationList">
          <div className="ReservationListContent">
                <div>Reservation List</div>
                <Query query={reservationsQuery} variables={reservationsVars}>
                    {({ loading, error, networkStatus, data }: QueryResult<IReservationResult>) => {
                        if (error || !data) return (
                            <div className="ReservationResult">
                                Oops! Error...
                            </div>
                        );
                        if (loading) return (
                            <div className="ReservationResult">
                                Loading...
                            </div>
                        );

                        return (
                        <div className="ReservationResult">
                                {data.reservations.length>0?data.reservations.map(
                                    (reservation) =>
                                    (<ReservationItem key={reservation.id} {...reservation} />)
                                ): <EmptyReservationList />}
                            
                        </div>
                        )
                    }}
                </Query>
          </div>
      </div>
      );
}