import {render, screen, within, waitFor, wait} from '@testing-library/react';
import React from 'react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import '@testing-library/jest-dom'
import configureMockStore from "redux-mock-store";

import { createMemoryHistory } from 'history';

import { Provider } from "react-redux";
import EditReleases from '../../../components/releases/EditReleases';
import UpsertReleaseForm from '../../../components/releases/UpsertReleaseForm';
import userEvent from '@testing-library/user-event';

import {DESC_REQUIRED_MESSAGE, DATE_REQUIRED_MESSAGE} from '../../../components/releases/UpsertReleaseForm';
import {FETCH_RELEASES_LOADING, FETCH_RELEASES_SUCCESS} from "../../../redux/actions/releaseActions"
import { act } from 'react-dom/test-utils';

/**
 * Edit Releases Tests
 * 
 * @group unit
 */

describe("EditReleases component", () => {

    let releaseForm;
    let store;

    const unmockedFetch = global.fetch;

    //NOTE: setloading to true, then false + api success action. 
    const NUMBER_OF_EXPECTED_DISPATCH_CALLS = 3;

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

        store = mockStore({
            releaseReducer: {
                data : data
            }
        });

        store.dispatch = jest.fn();

        const onSubmit = (release) => {
            saveRelease(release, navigate, jest.mock, jest.mock);
        }

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/editrelease/1"]}>
                    <Routes>
                        <Route
                            path="/editrelease/:id"
                            element={<EditReleases />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        releaseForm = screen.getByRole("form", {
            name: /upsertForm/i
        });
    });

    test('displays the correct header and inputs have correct labels/values.', () => {
        expect(document.body.textContent).toContain("Edit Releases");
        expect(screen.getByLabelText("Release Date")).toBeInTheDocument();
        expect(screen.getByLabelText("Release Description")).toBeInTheDocument();

        expect(releaseForm).toHaveFormValues({
            "releaseDate": "2030-02-14",
            "releaseDesc": "Q1 Release Containing High Priority Bugs."
        });

    });

    test('to update the correct form values and invoke the correct actions.',  async () => {
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

        //TODO, define local data object??

        expect(releaseForm).toHaveFormValues({
            "releaseDate": "2022-06-20",
            "releaseDesc": "my totally awesome release!"
        });

        const saveButton = screen.getByRole("button", {
            name: /Save/i,
        });

        act(() => {
            userEvent.click(saveButton);
        });

        // await waitFor(() => {
        //     expect(store.dispatch).toHaveBeenCalledTimes(NUMBER_OF_EXPECTED_DISPATCH_CALLS);
        //     expect(store.dispatch).toHaveBeenNthCalledWith(1, { 
        //         type: FETCH_RELEASES_LOADING, 
        //         loading:true 
        //     });
        //     expect(store.dispatch).toHaveBeenNthCalledWith(2, {
        //         type: FETCH_RELEASES_SUCCESS,
        //         data : data
        //     });
        //     expect(store.dispatch).toHaveBeenNthCalledWith(3, { 
        //         type: FETCH_RELEASES_LOADING, 
        //         loading:false 
        //     });
        // });
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

        expect(screen.getByText(DESC_REQUIRED_MESSAGE)).toBeInTheDocument();
        expect(screen.getByText(DATE_REQUIRED_MESSAGE)).toBeInTheDocument();
    });
});