/// <reference path="../models/reservations.d.ts" />
import React, { FormEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ApolloConsumer } from 'react-apollo';
import { NormalizedCacheObject, ApolloClient } from 'apollo-boost';
import graphqltag from 'graphql-tag'
import {IMakeReservation, IReservation} from "reservations-model";
import './MakeReservation.scss';


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

export const createReservationMutation = graphqltag`
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


export interface IReservationForm {
  onSubmit: (event: FormEvent) => void;
}

export const ReservationForm = ({ onSubmit }: IReservationForm) => {
 
  return (
    <form className="reservation-form" onSubmit={onSubmit} >
        <TextField
          id="fullname"
          name="fullname"
          label="Your full name"
          style={{ margin: 8 }}
          placeholder="Your full name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="hotelName"
          name="hotelName"
          label="Hotel name"
          style={{ margin: 8 }}
          placeholder="Hotel name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="arrivalAt"
          name="arrivalAt"
          label="Arrival Date"
          className="date-picker"
          fullWidth
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="departureAt"
          name="departureAt"
          label="Departure Date"
          className="date-picker"
          fullWidth
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" fullWidth type="submit" color="primary">
          Register
        </Button>
    </form>
  );
}

function handleClick(event: FormEvent, client: ApolloClient<NormalizedCacheObject>) {
  event.preventDefault();
  const form:HTMLFormElement = (event.target as HTMLFormElement);
  const formData:FormData = new FormData(form);
  form.reset();
  let isValid:Boolean = true;
  const data: IMakeReservation = {
    fullname: '',
    hotelName: '',
    arrivalAt: '',
    departureAt: '',
  };
  Object.keys(data).forEach(key => {
    const value = formData.get(key);
    if(value) {
      (data as any)[key] = value;
    } else {
      isValid = false;
      //TODO: add client side errors
    }
  });
  if(isValid) {
    createReservation(data, client);
  }
}

export interface IReservationResult {
  reservations: IReservation[];
}

export default function MakeReservation() {
  return (
    <div className="MakeReservation">
        <ApolloConsumer>
          {client => (<ReservationForm onSubmit={(event: FormEvent) => handleClick(event, client)} />)}
        </ApolloConsumer>
    </div>
  )
}

export interface IMakeReservationMutation {
  reservation: IReservation;
}

function createReservation({ fullname, hotelName, arrivalAt, departureAt }: IMakeReservation, client: ApolloClient<any>) {
  client.mutate<IMakeReservationMutation>({
    mutation: createReservationMutation,
    variables: {
      fullname,
      hotelName,
      arrivalAt,
      departureAt,
    },
    update: (proxy, { data }) => {
      if(data) {
        const { reservation } = data;
        const prevData = proxy.readQuery<IReservationResult>({
          query: reservationsQuery,
          variables: reservationsVars,
        });
        if(prevData) {
          proxy.writeQuery<IReservationResult>({
            query: reservationsQuery,
            data: {
              ...data,
              reservations: [reservation, ...prevData.reservations]
            },
            variables: reservationsVars,
          })
        }
      }
    }
  });
}