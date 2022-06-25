import {render, screen, within, waitFor} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import React from 'react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import '@testing-library/jest-dom'
import user from '@testing-library/user-event';
import configureMockStore from "redux-mock-store";

import { createMemoryHistory } from 'history';

import { Provider } from "react-redux";
import EditReleases from '../../../components/releases/EditReleases';
import UpsertReleaseForm from '../../../components/releases/UpsertReleaseForm';
import userEvent from '@testing-library/user-event';

describe("EditReleases component", () => {

    let releaseForm;

    const unmockedFetch = global.fetch;

    const data = [
        {
            "id": 0,
            "releaseDate": "2029-12-14",
            "releaseDesc": "Q4 Release with some year end patches."
        },
        {
            "id": 1,
            "releaseDate": "2030-02-14",
            "releaseDesc": "Q1 Release Containing High Priority Bugs."
        }
    ];

    beforeEach(() => {
        const mockStore = configureMockStore([]);

        const store = mockStore({
            releaseReducer: {
                data : data
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter location={history.location} navigator={history} initialEntries={["/editrelease/1"]}>
                    <Routes>
                        <Route path='/editrelease/:id'>
                            <EditReleases>
                                <UpsertReleaseForm />
                            </EditReleases>
                        </Route>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        releaseForm = screen.getByRole("form", {
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
        expect(document.body.textContent).toContain("Edit Releases");
        expect(screen.getByLabelText("Release Date")).toBeInTheDocument;
        expect(screen.getByLabelText("Release Description")).toBeInTheDocument;

        expect(releaseForm).toHaveFormValues({
            "releaseDate": "2030-02-14",
            "releaseDesc": "Q1 Release Containing High Priority Bugs."
        });

    });

    test('to update the correct form values',  async () => {
        const releaseDate = screen.getByRole("textbox", {
            name: /Release Date/i,
        });

        userEvent.clear(releaseDate);
        userEvent.type(releaseDate, "2022-06-20");

        const releaseDesc = screen.getByRole("textbox", {
            name: /Release Description/i,
        });

        userEvent.clear(releaseDesc);
        userEvent.type(releaseDesc, "my totally awesome release!");

        expect(releaseForm).toHaveFormValues({
            "releaseDate": "2022-06-20",
            "releaseDesc": "my totally awesome release!"
        });

    });

    test('displays error messages when form is blank', () => {
        const releaseDate = screen.getByRole("textbox", {
            name: /Release Date/i,
        });
        userEvent.clear(releaseDate);

        const releaseDesc = screen.getByRole("textbox", {
            name: /Release Description/i,
        });
        userEvent.clear(releaseDesc);

        const saveButton = screen.getByRole("button", {
            name: /Save/i,
        });

        userEvent.click(saveButton);

        expect(screen.getByText("Description is required.")).toBeInTheDocument();
        expect(screen.getByText("Date is required.")).toBeInTheDocument();
    });
});