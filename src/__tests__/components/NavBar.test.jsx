import React from 'react';
import {
  render,
  screen,
  within,
} from "@testing-library/react";
import '@testing-library/jest-dom'

import configureMockStore from "redux-mock-store";

import {MemoryRouter} from 'react-router-dom';
import { Provider } from "react-redux";

import NavBar from "../../components/common/NavBar";
import App from "../../App";

/**
 * View Applications Tests
 * 
 * @group unit
 */

describe("NavBar", () => {

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

  test("renders the nav menu.", () => {

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
              <MemoryRouter initialEntries={["/"]}>
                <App>
                </App>
              </MemoryRouter>
          </Provider>
    );

    const menuBar = screen.getByRole("menubar");

    const releasesElement = within(menuBar).getByText(
      /Releases/i
    );

    expect(releasesElement).toBeInTheDocument();

    const ticketsElement = within(menuBar).getByText(
      /Tickets/i
    );
    expect(ticketsElement).toBeInTheDocument();

    const applicationsElement = within(menuBar).getByText(
      /Applications/i
    );
    expect(applicationsElement).toBeInTheDocument();
  });
});
