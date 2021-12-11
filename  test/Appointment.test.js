import React from 'react';
import ReactDOM from 'react-dom';
import {Appointment, AppointmentsDayView} from '../src/Appointment';
import ReactTestUtils from 'react-dom/test-utils';

let container;
let customer;
let appointments;

beforeEach(() => {
    container = document.createElement('div');
    appointments = [
        {
            startsAt: new Date().setHours(12, 0),
            customer: {firstName: 'Ashley'}
        },
        {
            startsAt: new Date().setHours(13, 0),
            customer: {firstName: 'Jordan'}
        }
    ];
});

const render = component => ReactDOM.render(component, container);

describe('AppointmentsDayView', () => {
    it.skip('renders each appointment in an li', () => {

        render(<AppointmentsDayView appointments={appointments}/>);

        expect(container.querySelectorAll('li')).toHaveLength(2);

        expect(
            container.querySelectorAll('li')[0].textContent
        ).toEqual('12:00');

        expect(
            container.querySelectorAll('li')[1].textContent
        ).toEqual('13:00');
    });

    it.skip('initially shows a message saying there are no appointments today', () => {
        render(<AppointmentsDayView appointments={[]}/>);
        expect(container.textContent).toMatch(
            'There are no appointments scheduled for today.'
        );
    });

    it.skip('selects the first appointment by default', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.textContent).toMatch('Jordan');
    });

    it('renders multiple appointments in an ol element', () => {

        render(<AppointmentsDayView appointments={appointments}/>);

        expect(container.querySelector('ol')).not.toBeNull();

        expect(
            container.querySelector('ol').children
        ).toHaveLength(2);
    });

    it('has a button element in each li', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(
            container.querySelectorAll('li > button')
        ).toHaveLength(2);
        expect(
            container.querySelectorAll('li > button')[0].type
        ).toEqual('button');
    });

    it('renders another appointment when selected', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        const button = container.querySelectorAll('button')[1];
        ReactTestUtils.Simulate.click(button);
        expect(container.textContent).toMatch('Jordan');
    });
})

describe.skip('Appointment', () => {

    it('render the customer first name', () => {

        customer = {firstName: 'Ashley'};

        render(<Appointment customer={customer}/>);

        expect(container.textContent).toMatch('Ashley');
    });

    it('renders another customer first name', () => {

        customer = {firstName: 'Jordan'};

        render(<Appointment customer={customer}/>);

        expect(container.textContent).toMatch('Jordan');
    });
});
