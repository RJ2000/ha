/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import { IReservation } from "reservations-model";
import { ReservationForm } from '../MakeReservation';
import { ItemDate, ReservationItem } from '../ReservationList';

import { createShallow } from '@material-ui/core/test-utils';

const materialUIShallow = createShallow();

describe('Testing MaterialUI <ReservationForm /> ============', () => {

  it('Testing the ReservationForm', () => {
    const wrapper = materialUIShallow(<ReservationForm onSubmit={(event) => {}} />);
    expect(wrapper.exists('TextField#fullname')).toEqual(true);
    expect(wrapper.exists('TextField#hotelName')).toEqual(true);
    expect(wrapper.exists('TextField#arrivalAt')).toEqual(true);
    expect(wrapper.exists('TextField#departureAt')).toEqual(true);
    expect(wrapper.debug().indexOf('WithStyles(Button)')!=-1).toEqual(true);
    expect(
      wrapper.find('TextField#fullname').props()
    ).toEqual(expect.objectContaining({
      placeholder: "Your full name",
      fullWidth: true,
    }));

    expect(
      wrapper.find('TextField#hotelName').props()
    ).toEqual(expect.objectContaining({
      placeholder: "Hotel name",
      fullWidth: true,
    }));

    expect(
      wrapper.find('TextField#arrivalAt').props()
    ).toEqual(expect.objectContaining({
      className: "date-picker",
      fullWidth: true,
      label: "Arrival Date"
    }));

    expect(
      wrapper.find('TextField#departureAt').props()
    ).toEqual(expect.objectContaining({
      label: "Departure Date",
      fullWidth: true,
      className: "date-picker",

    }));
  });

  it('Testing ItemDate', () => {
    const itemDate = shallow(<ItemDate date={"2019-05-31"} />);

    expect(
      itemDate.find('div.Day').text()
    ).toEqual('31');

    expect(
      itemDate.find('div.Month').text()
    ).toEqual('May');

    expect(
      itemDate.find('div.Week').text()
    ).toEqual('Fri');

  });


});

describe('Testing ReservationList item ============', () => {
  it('Testing redendering ReservationList Item', () => {

    const data: IReservation = {
      id: 123,
      fullname: "Full Name",
      hotelName: "Hilton",
      arrivalAt: new Date("2019-05-31"),
      departureAt: new Date("2019-06-09"),
    };

    const wrapper = materialUIShallow(<ReservationItem {...data} />);

    expect(
      wrapper.find('.ReservationItem').prop('data-id')
    ).toEqual(data.id);

    expect(
      wrapper.find('.FullName').text()
    ).toEqual(data.fullname);

    expect(
      wrapper.find('.HotelName').text()
    ).toEqual(data.hotelName);

    expect(
      wrapper.find('.Arrival div').text()
    ).toEqual('Arrive');

    expect(
      wrapper.find('.Arrival ItemDate').prop('date')
    ).toEqual(data.arrivalAt);

    expect(
      wrapper.find('.Departure ItemDate').prop('date')
    ).toEqual(data.departureAt);

  });
});

