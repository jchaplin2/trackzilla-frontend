import {render, screen, within, waitFor, wait, fireEvent, getByRole} from '@testing-library/react';
import React from 'react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import '@testing-library/jest-dom'


import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../../redux/reducers";
import thunk from "redux-thunk";

import { Provider } from "react-redux";
import EditTickets from '../../../components/tickets/EditTickets';
// import userEvent from '@testing-library/user-event';


import {TITLE_REQUIRED_MESSAGE, DESC_REQUIRED_MESSAGE} from '../../../components/tickets/UpsertTicketForm';
import { act } from 'react-dom/test-utils';
import ViewTickets from '../../../components/tickets/ViewTickets';
import userEvent from '@testing-library/user-event';

/**
 * Edit Releases Tests
 * 
 * @group unit
 */

describe("EditTickets component", () => {

    let ticketForm, container;

    beforeEach(() => {
        window.history.pushState({}, "/editticket/1", "/editticket/1");
        const store = createStore(
            rootReducer,
            applyMiddleware(thunk)
        );

        container = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/editticket/1"]}>
                    <Routes>
                        <Route
                            path="/editticket/:id"
                            element={<EditTickets />}
                        />
                        <Route
                            path="/viewtickets/"
                            element={<ViewTickets />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

    });

    test('displays the correct header and inputs have correct labels/values.', async () => {

        const loadingSpinner = container.container.querySelector(".lds-dual-ring");
        expect(loadingSpinner).toBeInTheDocument();

        await waitFor(() => {
            expect(document.body.textContent).toContain("Edit Ticket");
            expect(screen.getByLabelText("Ticket Title")).toBeInTheDocument();
            expect(screen.getByLabelText("Ticket Desc")).toBeInTheDocument();
            expect(screen.getByLabelText("Application Name")).toBeInTheDocument();
            expect(screen.getByLabelText("Release Name")).toBeInTheDocument();
            expect(screen.getByLabelText("Status")).toBeInTheDocument();

            ticketForm = screen.getByRole("form", {
                name: /upsertForm/i
            });

            expect(ticketForm).toHaveFormValues({
                "ticketTitle": "Sort Feature",
                "ticketDesc": "Add the ability to sort tickets by severity",
                "applicationName":"Trackzilla",
                "releaseName": "Q2 Release Containing High Priority Enhancements",
                "ticketStatus":"OPEN",
            });
        });

    });

    test('to update the correct form values and invoke the correct actions.',  async () => {
        const loadingSpinner = container.container.querySelector(".lds-dual-ring");
        expect(loadingSpinner).toBeInTheDocument();

        let ticketTitle;
        let ticketDesc;
        let applicationName;
        let releaseName;
        let ticketStatus;

        await waitFor(() => {
            ticketTitle = screen.getByRole("textbox", {
                name: /Ticket Title/i,
            });

            ticketDesc = screen.getByRole("textbox", {
                name: /Ticket Desc/i,
            });

            releaseName = screen.getByRole("textbox", {
                name: /Release Name/i,
            });

            applicationName = screen.getByRole("textbox", {
                name: /Application Name/i,
            });
            
            ticketStatus = userEvent.selectOptions (
                screen.getByRole('combobox'),
                screen.getByRole("option", {name : 'Open'})
            );
        });

        await userEvent.clear(ticketTitle);
        await userEvent.type(ticketTitle, "My new ticket");
        
        await userEvent.clear(ticketDesc);
        await userEvent.type(ticketDesc, "my desc");
        
        await userEvent.clear(releaseName);
        await act(() => userEvent.type(releaseName, "First Release"));

        await userEvent.clear(applicationName); 
        await act(() => userEvent.type(applicationName, "First Application"));

        expect(screen.getByDisplayValue("My new ticket")).toBeTruthy();
        expect(screen.getByDisplayValue("my desc")).toBeTruthy();
        expect(screen.findByDisplayValue("First Release")).toBeTruthy();
        expect(screen.findByDisplayValue("First Application")).toBeTruthy();
        expect(screen.getByDisplayValue("Open")).toBeTruthy();

        const saveButton = screen.getByRole("button", {
            name: /Save/i,
        });

        act(() => {
            userEvent.click(saveButton);
        });

        expect(screen.findByText("Saving...")).toBeTruthy();
    });

    test('displays error messages when form is blank', async () => {
        const loadingSpinner = container.container.querySelector(".lds-dual-ring");
        expect(loadingSpinner).toBeInTheDocument();

        let ticketTitle, ticketDesc, releaseName, applicationName;

        await waitFor(() => {

            ticketTitle = screen.getByRole("textbox", {
                name: /Ticket Title/i,
            });

            ticketDesc = screen.getByRole("textbox", {
                name: /Ticket Desc/i,
            });

            releaseName = screen.getByRole("textbox", {
                name: /Release Name/i,
            });

            applicationName = screen.getByRole("textbox", {
                name: /Application Name/i,
            });
        });

        await userEvent.clear(ticketTitle);
        await userEvent.clear(ticketDesc);
        await userEvent.clear(releaseName);
        await userEvent.clear(applicationName);

        const saveButton = screen.getByRole("button", {
            name: /Save/i,
        });

        act(() => {
            userEvent.click(saveButton);
        });

        expect(screen.getByText(TITLE_REQUIRED_MESSAGE)).toBeInTheDocument();
        expect(screen.getByText(DESC_REQUIRED_MESSAGE)).toBeInTheDocument();
    });
});