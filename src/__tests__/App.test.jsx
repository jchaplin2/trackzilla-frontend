import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';

import React from 'react';
import {MemoryRouter} from 'react-router-dom';

import '@testing-library/jest-dom'

import App from "../App";

describe("", () => {
    test('App renders', () => {
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        );

        expect(screen.getByText(/Defect and Enhancement Tracking/i)).toBeInTheDocument();
    });

    test('it navigates when link is clicked', () => {
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
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

