import { Request, Response } from 'express';
import { graphql } from 'graphql';
import * as gql from 'gql-query-builder';
import schema from '../../schemas/index';
import { ISortReservations } from 'reservations-model';

class ReservationsController {
  constructor() {}

  getReservations(req: Request, res: Response): void {
    const { sortField, sortOrder } = req.query;
    let variables: ISortReservations = {};
    if(sortField) {
      variables.sortField = sortField;
    }
    if(sortOrder) {
      variables.sortOrder = sortOrder;
    }
    const query = gql.query({
      operation: 'reservations',
      variables,
      fields:[
        'id',
        'fullname',
        'hotelName',
        'arrivalAt',
        'departureAt',
      ],
    });
    graphql({
      schema,
      source: query.query,
      variableValues: query.variables,
    }).then(result => {
      if(result.errors) {
        res.status(400).json(result);
      } else if(result.data) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ errors: [{ message: "Unknown Error"}]});
      }
    });
  }

  getReservationById(req: Request, res: Response): void {
    const { id } = req.params;
    const query = gql.query({
      operation: 'reservation',
      variables:{ id: { value: parseInt(id), required: true } },
      fields:[
        'id',
        'fullname',
        'hotelName',
        'arrivalAt',
        'departureAt',
      ],
    });
    graphql({
      schema,
      source: query.query,
      variableValues: query.variables,
    }).then(result => {
      if(result.errors) {
        res.status(400).json(result);
      } else if(result.data) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ errors: [{ message: "Unknown Error"}]});
      }
    });
  }

  postReservation(req: Request, res: Response): void {
    let {
      fullname,
      hotelName,
      arrivalAt,
      departureAt,
    } = req.body;

    const query = gql.mutation({
      operation: 'reservation',
      variables:{
        fullname: {
          value: fullname,
          required: true,
        },
        hotelName: {
          value: hotelName,
          required: true,
        },
        arrivalAt: {
          value: arrivalAt,
          type: "GraphQLDate",
          required: true,
        },
        departureAt: {
          value: departureAt,
          type: "GraphQLDate",
          required: true,
        },
      },
      fields:[
        'id',
        'fullname',
        'hotelName',
        'arrivalAt',
        'departureAt',
      ],
    });
    graphql({
      schema,
      source: query.query,
      variableValues: query.variables,
    }).then(result => {
      if(result.errors) {
        res.status(400).json(result);
      } else if(result.data) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ errors: [{ message: "Unknown Error"}]});
      }
    });
  }
}


export default ReservationsController;