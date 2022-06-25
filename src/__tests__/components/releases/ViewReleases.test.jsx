import {render, screen, within} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import '@testing-library/jest-dom'
import App from "../../../App";

import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../../redux/reducers";
import thunk from "redux-thunk";

describe("ViewReleases", () => {

    test('it navigates to view releases when clicked', () => {

        const store = createStore(
            rootReducer,
            applyMiddleware(thunk)
        );

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App/>
                </MemoryRouter>
            </Provider>
        );

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
});

