import {render, screen, within, waitFor} from '@testing-library/react';
import React from 'react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import '@testing-library/jest-dom'
import user from '@testing-library/user-event';
import configureMockStore from "redux-mock-store";

import { createMemoryHistory } from 'history';

import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';
import EditApplications from '../../../components/application/EditApplications';
import UpsertApplicationForm from '../../../components/application/UpsertApplicationForm';

describe("EditApplications component", () => {

    let applicationForm;

    const unmockedFetch = global.fetch;

    const data = [
        {
            "id": 0,
            "applicationName": "TimeTracker",
            "applicationDesc": "A timesheet application.",
            "applicationOwner": "John Smith"
        },
        {
            "id": 1,
            "applicationName": "Trackzilla",
            "applicationDesc": "A bug tracking application",
            "applicationOwner": "Kesha Williams"
        },
        {
            "id": 2,
            "applicationName": "Expenses",
            "applicationDesc": "An application used to submit expenses",
            "applicationOwner": "Jane Doe"
        }
    ];

    beforeEach(() => {
        const mockStore = configureMockStore([]);

        const store = mockStore({
            applicationReducer: {
                data : data
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter location={history.location} navigator={history} initialEntries={["/editapplication/1"]}>
                    <Routes>
                        <Route path='/editapplication/:id'>
                            <EditApplications>
                                <UpsertApplicationForm />
                            </EditApplications>
                        </Route>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        applicationForm = screen.getByRole("form", {
            name: /upsertForm/i
        });
    })

    beforeAll(() => {
        global.fetch = (url, params) => {
            return Promise.resolve({
                json : () => Promise.resolve(data)
            });
        };
    });

    afterAll(() => {
        global.fetch = unmockedFetch;
    });

    test('displays the correct header and inputs have correct labels/values.', () => {
        expect(document.body.textContent).toContain("Edit Application");
        expect(screen.getByLabelText("App Name")).toBeInTheDocument;
        expect(screen.getByLabelText("App Desc")).toBeInTheDocument;
        expect(screen.getByLabelText("App Owner")).toBeInTheDocument;

        expect(applicationForm).toHaveFormValues({
            "applicationName": "Trackzilla",
            "applicationDesc": "A bug tracking application",
            "applicationOwner": "Kesha Williams"
        });

    });

    test('to update the correct form values',  async () => {
        const appName = screen.getByRole("textbox", {
            name: /App Name/i,
        });

        userEvent.clear(appName);
        userEvent.type(appName, "my name");

        const appDesc = screen.getByRole("textbox", {
            name: /App Desc/i,
        });

        userEvent.clear(appDesc);
        userEvent.type(appDesc, "my desc");


        const appOwner = screen.getByRole("textbox", {
            name: /App Owner/i,
        });

        userEvent.clear(appOwner);
        userEvent.type(appOwner, "my owner");


        expect(applicationForm).toHaveFormValues({
            "applicationName": "my name",
            "applicationDesc": "my desc",
            "applicationOwner": "my owner"
        });

    });

    test('displays error messages when form is blank', () => {
        const appName = screen.getByRole("textbox", {
            name: /App Name/i,
        });
        userEvent.clear(appName);

        const appDesc = screen.getByRole("textbox", {
            name: /App Desc/i,
        });
        userEvent.clear(appDesc);

        const appOwner = screen.getByRole("textbox", {
            name: /App Owner/i,
        });
        userEvent.clear(appOwner);

        const saveButton = screen.getByRole("button", {
            name: /Save/i,
        });

        userEvent.click(saveButton);

        expect(screen.getByText("Name is required.")).toBeInTheDocument();
        expect(screen.getByText("Desc is required.")).toBeInTheDocument();
        expect(screen.getByText("Owner is required.")).toBeInTheDocument();
    });
});