import React from "react";
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from '@testing-library/user-event';

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />)

    const header = screen.getByText(/checkout form/i);
    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
    render(<CheckoutForm />);

    const firstInput = screen.getByLabelText(/first name/i);
    const lastInput = screen.getByLabelText(/last name/i);
    const addressInput = screen.getByLabelText(/address/i);
    const cityInput = screen.getByLabelText(/city/i);
    const stateInput = screen.getByLabelText(/state/i);
    const zipInput = screen.getByLabelText(/zip/i);

    userEvent.type(firstInput, 'Dartagnan');
    userEvent.type(lastInput, 'von Pingel');
    userEvent.type(addressInput, '123 elmo street');
    userEvent.type(cityInput, 'lehi');
    userEvent.type(stateInput,  'utah');
    userEvent.type(zipInput, '84043');

    const checkout = screen.getByRole('button', /checkout/i);
    userEvent.click(checkout);

    const successText = screen.queryByText(/you have ordered some plants!/i)
    expect(successText).toBeInTheDocument();

    const userText = screen.queryByText(/dartagnan von pingel/i);
    expect(userText).toBeInTheDocument();

});
