import {render, screen, waitFor, within} from '@testing-library/react';
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
 * View Applications Tests
 * 
 * @group unit
 */

describe("ViewApplications", () => {

    const expectedNumberOfRows = 4;
    //NOTE: for header row.

    beforeEach(() => {

        window.history.pushState({}, "viewapplications", "/viewapplications");

        const store = createStore(
            rootReducer,
            applyMiddleware(thunk)
        );

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/","/viewapplications"]} basename="/">
                    <App/>                
                </MemoryRouter>
            </Provider>
        );
    });

    test('it navigates to view releases when clicked', () => {
        
        const menuBar = screen.getByRole("menubar");

        const applicationsElement = within(menuBar).getByText(
          /Applications/i
        );
        applicationsElement.dispatchEvent(new MouseEvent(
            "click", {bubbles:true}
        ));

        const menu = screen.getByTestId('applications');
        const viewElement = within(menu).getByText(
          /View/i
        );
        viewElement.dispatchEvent(new MouseEvent(
            "click", {bubbles:true}
        ));

        expect(document.body.textContent).toContain("Applications");
    });

    test('displays applications from response', async () => {

        await waitFor(() => {
            const numberOfRows = screen.getAllByRole("row");
            expect(numberOfRows.length).toEqual(expectedNumberOfRows);
        });
    });
});

