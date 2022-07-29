import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';

import configureMockStore from "redux-mock-store";

import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { Provider } from "react-redux";

import '@testing-library/jest-dom'

import App from "../App";

/**
 * Application Unit Tests
 * 
 * @group unit
 */

describe("App", () => {

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

    test('it renders', () => {

        const mockStore = configureMockStore([]);

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

        const store = mockStore({
            releaseReducer: {
                data : data
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter location={history.location} navigator={history} initialEntries={["/"]}>
                  <App/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Defect and Enhancement Tracking/i)).toBeInTheDocument();
    });

});

