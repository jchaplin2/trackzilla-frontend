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

});

