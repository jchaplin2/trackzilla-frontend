import {render, screen, within} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom'
import App from "../../../App";

describe("ViewReleases", () => {

    test('it navigates to view releases when clicked', () => {
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        );

        const menuBar = screen.getByRole("menubar");

        const releasesElement = within(menuBar).getByText(
          /Tickets/i
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

        expect(document.body.textContent).toContain("Tickets");

    });
});

