import {render, screen, within} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom'

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../../redux/reducers";
import thunk from "redux-thunk";
import ViewApplications from '../../../components/application/ViewApplications';
import NavBar from '../../../components/common/NavBar';

describe("ViewApplications", () => {

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

    const expectedNumberOfRows = data.length + 1;
    //NOTE: for header row.

    beforeEach(() => {
        const mockStore = configureMockStore([]);

        const store = mockStore({
            applicationReducer: {
                data : data
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter location={history.location} navigator={history} initialEntries={["/viewapplications"]}>
                    <NavBar></NavBar>
                    <Routes>
                        <Route path='/viewapplications'>
                            <ViewApplications />
                        </Route>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
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



    test('it navigates to view releases when clicked', () => {
        const menuBar = screen.getByRole("menubar");

        const releasesElement = within(menuBar).getByText(
          /Applications/i
        );
        releasesElement.dispatchEvent(new MouseEvent(
            "click", {bubbles:true}
        ));

        const menu = screen.getByTestId('releases');
        const viewElement = within(menu).getByText(
          /View/i
        );
        viewElement.dispatchEvent(new MouseEvent(
            "click", {bubbles:true}
        ));

        expect(document.body.textContent).toContain("Applications");
    });

    test('displays applications from response', () => {
        const numberOfRows = screen.getAllByRole("row");
        expect(numberOfRows.length).toEqual(expectedNumberOfRows);
    });
});

