import {render, screen, within, waitFor} from '@testing-library/react';
import React from 'react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import '@testing-library/jest-dom'
import user from '@testing-library/user-event';
import configureMockStore from "redux-mock-store";

import { createMemoryHistory } from 'history';

import {saveApplication} from '../../../services/applicationService';

import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../../redux/reducers";
import thunk from "redux-thunk";

import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';
import EditApplications from '../../../components/application/EditApplications';
import ViewApplications from '../../../components/application/ViewApplications';

import UpsertApplicationForm from '../../../components/application/UpsertApplicationForm';

import {NAME_REQUIRED_MESSAGE, OWNER_REQUIRED_MESSAGE, DESC_REQUIRED_MESSAGE} from '../../../components/application/UpsertApplicationForm';
import {FETCH_APPLICATIONS_LOADING, FETCH_APPLICATIONS_SUCCESS} from "../../../redux/actions/applicationActions"
import { act } from 'react-dom/test-utils';
import App from '../../../App';

/**
 * Edit Applications Tests
 * 
 * @group unit
 */

describe("EditApplications component", () => {

    let applicationForm, container;

    // const unmockedFetch = global.fetch;

    //NOTE: setloading to true, then false + api success action. 
    const NUMBER_OF_EXPECTED_DISPATCH_CALLS = 3;

    beforeEach(() => {

        window.history.pushState({}, "/editapplication/0", "/editapplication/0");

        const store = createStore(
            rootReducer,
            applyMiddleware(thunk)
        );

         container = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/","/editapplication/0"]} basename="/">
                    <Routes>
                        <Route
                            path="/editapplication/:id"
                            element={<EditApplications />}
                        />
                        <Route
                            path="/viewapplications/"
                            element={<ViewApplications />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })

    test('displays the correct header and inputs have correct labels/values.', async () => {

        await waitFor(() => {
            expect(document.body.textContent).toContain("Edit Application");
            expect(screen.getByLabelText("App Name")).toBeInTheDocument();
            expect(screen.getByLabelText("App Desc")).toBeInTheDocument();
            expect(screen.getByLabelText("App Owner")).toBeInTheDocument();

            applicationForm = screen.getByRole("form", {
                name: /upsertForm/i
            });

            expect(applicationForm).toHaveFormValues({
                    "applicationName": "TimeTracker",
                    "applicationDesc": "A timesheet application.",
                    "applicationOwner": "John Smith"
            });           
        });


    });

    test.skip('to update the correct form values and invoke the correct actions.', async () => {

            const loadingSpinner = container.container.querySelector(".lds-dual-ring");

            expect(loadingSpinner).toBeInTheDocument();

            let appName, appDesc, appOwner;
            await waitFor(() => {
                appName = screen.getByRole("textbox", {
                    name: /App Name/i,
                });

                userEvent.clear(appName);
                userEvent.type(appName, "my name");

                appDesc = screen.getByRole("textbox", {
                    name: /App Desc/i,
                });

                userEvent.clear(appDesc);
                userEvent.type(appDesc, "my desc");

                appOwner = screen.getByRole("textbox", {
                    name: /App Owner/i,
                });

                userEvent.clear(appOwner);
                userEvent.type(appOwner, "my owner");
            });

            await waitFor(() => {
                expect(screen.getByDisplayValue("my owner")).toBeTruthy();
                expect(screen.getByDisplayValue("my name")).toBeTruthy();
                expect(screen.getByDisplayValue("my owner")).toBeTruthy();
            });

            const saveButton = screen.getByRole("button", {
                name: /Save/i,
            });      

            act(() => {
                userEvent.click(saveButton);
            });

        // console.log(screen.getByText("Saving...").innerHTML);
        // console.log(container.container.querySelector("button").textContent);

        // await waitFor(() => {
        //     expect(store.dispatch).toHaveBeenCalledTimes(NUMBER_OF_EXPECTED_DISPATCH_CALLS);
        //     expect(store.dispatch).toHaveBeenNthCalledWith(1, { 
        //         type: FETCH_APPLICATIONS_LOADING, 
        //         loading:true 
        //     });
        //     expect(store.dispatch).toHaveBeenNthCalledWith(2, {
        //         type: FETCH_APPLICATIONS_SUCCESS,
        //         data : data
        //     });
        //     expect(store.dispatch).toHaveBeenNthCalledWith(3, { 
        //         type: FETCH_APPLICATIONS_LOADING, 
        //         loading:false 
        //     });
        // });

    });

    test('displays error messages when form is blank', async () => {
        await waitFor(() => {
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

            expect(screen.getByText(NAME_REQUIRED_MESSAGE)).toBeInTheDocument();
            expect(screen.getByText(DESC_REQUIRED_MESSAGE)).toBeInTheDocument();
            expect(screen.getByText(OWNER_REQUIRED_MESSAGE)).toBeInTheDocument();
        });
    });
});