import * as request from 'supertest';
import Server from '../server'
const server = new Server((req, res) => {
  if(req && res) {
    console.log("Req & Res are not null")
  }
  return Promise.resolve()
});

const createReservationMutation = `
  mutation createReservation($fullname: String!, $hotelName: String!, $arrivalAt: GraphQLDate!, $departureAt: GraphQLDate!) {
    reservation(
      fullname: $fullname,
      hotelName: $hotelName,
      arrivalAt: $arrivalAt,
      departureAt: $departureAt
    ) {
      id,
      fullname,
      hotelName,
      arrivalAt,
      departureAt
    }
  }
`;

const getSingleReservationQuery = `
  query getReservation($id: Int!) {
    reservation(
      id: $id
    ) {
      id,
      fullname,
      hotelName,
      arrivalAt,
      departureAt
    }
  }
`;

const getAllReservationsQuery = `
  query getReservations($sortField: ReservationsortField, $sortOrder: sortOrder) {
    reservations(
      sortField: $sortField,
      sortOrder: $sortOrder
    ) {
      id,
      fullname,
      hotelName,
      arrivalAt,
      departureAt
    }
  }
`;

const data = {
  id: 1,
  fullname: 'John Smith',
  hotelName: 'Hilton Hotel',
  arrivalAt: '2019-05-31T11:00:00.000Z',
  departureAt: '2019-06-09T12:00:00.000Z',
};

describe('Testing GraphQL API ============ ', () => {
  it('Testing mutation createReservation', async () => {
    await request(server.app)
      .post('/graphql')
      .send({
        operationName: 'createReservation',
        query: createReservationMutation,
        variables: data
      })
      .expect(200, {
        data: {
          reservation: {
            ...data
          }
        }
      });
  });

  
 
  it('Testing get single reservation by id', async () => {
    await request(server.app)
      .post('/graphql')
      .send({
        operationName: 'getReservation',
        query: getSingleReservationQuery,
        variables: {
          id: 1
        }
      })
      .expect(200, {
        data: {
          reservation: {
            ...data
          }
        }
      });
  });

  it('Testing get all reservations', async () => {
    await request(server.app)
      .post('/graphql')
      .send({
        operationName: 'getReservations',
        query: getAllReservationsQuery,
        variables: {
          sortField: 'id',
          sortOrder: 'DESC'
        }
      })
      .expect(200, {
        data: {
          reservations: [{
            ...data
          }]
        }
      });
  });
  
});