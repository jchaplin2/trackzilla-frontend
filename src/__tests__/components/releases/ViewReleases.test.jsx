import {render, screen, within} from '@testing-library/react';
import React from 'react';

import configureMockStore from "redux-mock-store";
import {MemoryRouter, Route, Routes} from 'react-router-dom';

import { Provider } from "react-redux";
import '@testing-library/jest-dom'
import App from "../../../App";

import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../../redux/reducers";
import thunk from "redux-thunk";
import NavBar from '../../../components/common/NavBar';
import ViewReleases from '../../../components/releases/ViewReleases';

describe("ViewReleases", () => {

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

    const expectedNumberOfRows = data.length + 1;
    //NOTE: for header row.

    beforeEach(() => {
        const mockStore = configureMockStore([]);

        const store = mockStore({
            releaseReducer: {
                data : data
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter location={history.location} navigator={history} initialEntries={["/viewreleases"]}>
                    <NavBar></NavBar>
                    <Routes>
                        <Route path='/viewreleases'>
                            <ViewReleases></ViewReleases>
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
          /Releases/i
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

        expect(document.body.textContent).toContain("Releases");

    });

    test('displays releases from response', () => {
        const numberOfRows = screen.getAllByRole("row");
        expect(numberOfRows.length).toEqual(expectedNumberOfRows);
    });
});

