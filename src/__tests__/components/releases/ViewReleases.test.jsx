import {act, render, screen, waitFor, within} from '@testing-library/react';
import React from 'react';

import configureMockStore from "redux-mock-store";
import {MemoryRouter, Route, Routes} from 'react-router-dom';

import { Provider } from "react-redux";
import '@testing-library/jest-dom'
import App from "../../../App";

import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../../redux/reducers";
import thunk from "redux-thunk";

/**
 * View Releases Tests
 * 
 * @group unit
 */

describe("ViewReleases", () => {

    const expectedNumberOfRows = 3;
    //NOTE: for header row.

    beforeEach(() => {

        const store = createStore(
            rootReducer,
            applyMiddleware(thunk)
        );

        window.history.pushState({}, "viewreleases", "/viewreleases");

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/","/viewreleases/"]} basename="/" >
                    <App/>
                </MemoryRouter>
            </Provider>
        );
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
        act(() => {
            viewElement.dispatchEvent(new MouseEvent(
                "click", {bubbles:true}
            ));
        });


        expect(document.body.textContent).toContain("Releases");

    });

    test('displays releases from response', async () => {
        await waitFor(() => {
            const numberOfRows = screen.getAllByRole("row");
            expect(numberOfRows.length).toEqual(expectedNumberOfRows);
        });
    });
});

