import * as request from 'supertest';

import Server from '../server'

const server = new Server((req, res) => {
  if(req && res) {
    console.log("Req and Res is not null.")
  }
  return Promise.resolve()
});

const data = {
  id: 1,
  fullname: 'Full name',
  hotelName: 'Hilton Hotel',
  arrivalAt: '2019-05-31T11:00:00.000Z',
  departureAt: '2019-06-09T12:00:00.000Z',
};

describe('Testing Express /api ============ ', () => {
  it('Test server status code', async () => {
    await request(server.app).get('/api').expect(200, 'connected');
  });
});

describe('Testing Express /api/reservation ============ ', () => {
  it('Testing POST /api/reservation', async () => {
    await request(server.app)
      .post('/api/reservation')
      .send(data)
      .expect(200, {
        data: {
          reservation: {
            ...data
          }
        }
      });
  });
  
  it('Testing GET /api/reservations', async () => {
    await request(server.app)
      .get('/api/reservations')
      .expect(200, {
        data: {
          reservations: [{
            ...data
          }]
        }
      });
  });

  it('Testing GET /api/reservation/:id', async () => {
    await request(server.app)
      .get('/api/reservation/1')
      .expect(200, {
        data: {
          reservation: {
            ...data
          }
        }
      });
  });

 
});