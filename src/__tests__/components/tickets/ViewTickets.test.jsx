import {render, screen, waitFor, within} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom'
import App from "../../../App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../../redux/reducers";
import thunk from "redux-thunk";

/**
 * View Applications Tests
 * 
 * @group unit
 */

describe("ViewTickets", () => {

    const expectedNumberOfRows = 6;
    //NOTE: for header row.

    beforeEach(() => {
        window.history.pushState({}, "viewtickets", "/viewtickets");

        const store = createStore(
            rootReducer,
            applyMiddleware(thunk)
        );

        render(
            <Provider store={store} >
                <MemoryRouter initialEntries={["/", "/viewtickets"]} basename="/">
                    <App/>
                </MemoryRouter>
            </Provider>
        );
    });

    test('it navigates to view tickets when clicked', () => {

        const menuBar = screen.getByRole("menubar");

        const ticketsElement = within(menuBar).getByText(
          /Tickets/i
        );
        ticketsElement.dispatchEvent(new MouseEvent(
            "click", {bubbles:true}
        ));

        const menu = screen.getByTestId('tickets');
        const viewElement = within(menu).getByText(
          /View/i
        );
        viewElement.dispatchEvent(new MouseEvent(
            "click", {bubbles:true}
        ));

        expect(document.body.textContent).toContain("Tickets");

    });

    test('displays tickets from response', async () => {
        await waitFor(() => {
            const numberOfRows = screen.getAllByRole("row");
            expect(numberOfRows.length).toEqual(expectedNumberOfRows);
        });
    });
});

