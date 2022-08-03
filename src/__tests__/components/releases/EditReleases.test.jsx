import {render, screen, within, waitFor, wait} from '@testing-library/react';
import React from 'react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import '@testing-library/jest-dom'
import configureMockStore from "redux-mock-store";

import { createMemoryHistory } from 'history';

import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../../redux/reducers";
import thunk from "redux-thunk";

import { Provider } from "react-redux";
import EditReleases from '../../../components/releases/EditReleases';
import UpsertReleaseForm from '../../../components/releases/UpsertReleaseForm';
import userEvent from '@testing-library/user-event';

import {DESC_REQUIRED_MESSAGE, DATE_REQUIRED_MESSAGE} from '../../../components/releases/UpsertReleaseForm';
import {FETCH_RELEASES_LOADING, FETCH_RELEASES_SUCCESS} from "../../../redux/actions/releaseActions"
import { act } from 'react-dom/test-utils';
import ViewReleases from '../../../components/releases/ViewReleases';

/**
 * Edit Releases Tests
 * 
 * @group unit
 */

describe("EditReleases component", () => {

    let releaseForm, container;

    beforeEach(() => {
        window.history.pushState({}, "/editrelease/1", "/editrelease/1");
        const store = createStore(
            rootReducer,
            applyMiddleware(thunk)
        );

        container = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/editrelease/1"]}>
                    <Routes>
                        <Route
                            path="/editrelease/:id"
                            element={<EditReleases />}
                        />
                        <Route
                            path="/viewreleases/"
                            element={<ViewReleases />}
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
            expect(document.body.textContent).toContain("Edit Releases");
            expect(screen.getByLabelText("Release Date")).toBeInTheDocument();
            expect(screen.getByLabelText("Release Description")).toBeInTheDocument();

            releaseForm = screen.getByRole("form", {
                name: /upsertForm/i
            });

            expect(releaseForm).toHaveFormValues({
                "releaseDate": "2030-02-14",
                "releaseDesc": "Q1 Release Containing High Priority Bugs."
            });
        });

    });

    test('to update the correct form values and invoke the correct actions.',  async () => {
        const loadingSpinner = container.container.querySelector(".lds-dual-ring");
        expect(loadingSpinner).toBeInTheDocument();

        let releaseDate;
        let releaseDesc;

        await waitFor(() => {

            releaseDate = screen.getByRole("textbox", {
                name: /Release Date/i,
            });

            userEvent.clear(releaseDate);
            userEvent.type(releaseDate, "2022-06-20");

            releaseDesc = screen.getByRole("textbox", {
                name: /Release Description/i,
            });

            userEvent.clear(releaseDesc);
            userEvent.type(releaseDesc, "my totally awesome release!");
        });

        await waitFor(() => {
            expect(screen.getByDisplayValue("2022-06-20")).toBeTruthy();
            expect(screen.getByDisplayValue("my totally awesome release!")).toBeTruthy();
        });

        const saveButton = screen.getByRole("button", {
            name: /Save/i,
        });

        act(() => {
            userEvent.click(saveButton);
        });

        await waitFor(() => {
            expect(screen.getByText("Saving...")).toBeTruthy();
        });
    });

    test('displays error messages when form is blank', async () => {
        const loadingSpinner = container.container.querySelector(".lds-dual-ring");
        expect(loadingSpinner).toBeInTheDocument();

        await waitFor(() => {
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

            expect(screen.getByText(DESC_REQUIRED_MESSAGE)).toBeInTheDocument();
            expect(screen.getByText(DATE_REQUIRED_MESSAGE)).toBeInTheDocument();
        });
    });
});