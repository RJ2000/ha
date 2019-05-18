/// <reference path="../../models/reservations.d.ts" />
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType,
} from 'graphql';
import {
  GraphQLDate,
  GraphQLsortOrder,
} from './scalars';
import { ISortReservations, IMakeReservation } from 'reservations-model';
import reservationsEntity from '../typings/reservations';

export const ReservationType = new GraphQLObjectType({
  name: 'Reservation',
  fields: {
    id: {
      type: GraphQLInt
    },
    fullname: {
      type: GraphQLString
    },
    hotelName: {
      type: GraphQLString,
    },
    arrivalAt: {
      type: GraphQLDate,
    },
    departureAt: {
      type: GraphQLDate,
    },
  },
});

export const ReservationsortFieldType = new GraphQLEnumType({
  name: 'ReservationsortField',
  values: {
    id: {value: 'id'}, 
    fullname: {value: 'fullname'}, 
    hotelName: {value: 'hotelName'},
    arrivalAt: {value: 'arrivalAt'}, 
    departureAt: {value: 'departureAt'},
  }
});

export const ReservationsQueryType = new GraphQLObjectType({
  name: 'ReservationsQuery',
  fields: {
    reservation:{
      type: ReservationType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        }
      },
      resolve: async (flag,{id}) => reservationsEntity.getReservationById(flag,id),
    },
    reservations:{
      type: new GraphQLList(ReservationType),
      args: {
        sortField: {
          type: ReservationsortFieldType,
        },
        sortOrder: {
          type: GraphQLsortOrder,
        },
      },
      resolve: async (flag,options: ISortReservations) => reservationsEntity.getReservations(flag,options),
    },
  }
});

export const ReservationsMutationType = new GraphQLObjectType({
  name: 'ReservationsMutation',
  fields: {
    reservation:{
      type: ReservationType,
      args:{
        fullname: {
          type: new GraphQLNonNull(GraphQLString),
        },
        hotelName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        arrivalAt: {
          type: new GraphQLNonNull(GraphQLDate),
        },
        departureAt: {
          type: new GraphQLNonNull(GraphQLDate),
        },
      },
      resolve: async (flag,input) => reservationsEntity.createReservation(flag, input as IMakeReservation),
    }
  }
})

export const ReservationSchema = new GraphQLSchema({
  query: ReservationsQueryType,
  mutation: ReservationsMutationType,
});