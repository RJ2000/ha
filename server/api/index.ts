import { Router } from 'express';
import Reservations from './reservations/index';

class API {
  public router: Router;
  public reservations: Reservations;

  constructor(router: Router) {
    this.router = router;
    this.reservations = new Reservations();
  }

  mount(): void {
    this.router.get('/', (req, res) => {
      if(req && res) {
        console.log("Log request and response data");
      }
      res.status(200).send("connected");
    });
    this.reservations.mount(this.router);
  }
}

export default API;