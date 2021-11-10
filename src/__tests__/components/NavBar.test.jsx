import {
  render,
  screen,
  within,
} from "@testing-library/react";
import {MemoryRouter}  from "react-router-dom";
import NavBar from "../../components/NavBar";

describe("", () => {
  test("renders the nav menu.", () => {
    render(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
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
