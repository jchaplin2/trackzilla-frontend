import { rest } from "msw";

const releaseData = [
  {
    id: 0,
    releaseDate: "2029-12-14",
    releaseDesc: "Q4 Release with some year end patches.",
  },
  {
    id: 1,
    releaseDate: "2030-02-14",
    releaseDesc:
      "Q1 Release Containing High Priority Bugs.",
  },
];

const applicationData = [
  {
    id: 0,
    applicationName: "TimeTracker",
    applicationDesc: "A timesheet application.",
    applicationOwner: "John Smith",
  },
  {
    id: 1,
    applicationName: "Trackzilla",
    applicationDesc: "A bug tracking application",
    applicationOwner: "Kesha Williams",
  },
  {
    id: 2,
    applicationName: "Expenses",
    applicationDesc:
      "An application used to submit expenses",
    applicationOwner: "Jane Doe",
  },
];

const ticketData = [
  {
    id: 0,
    application: {
      id: 1,
      applicationName: "Trackzilla",
      applicationDesc: "A bug tracking application",
      applicationOwner: "Kesha Williams",
    },
    release: {
      id: 0,
      releaseDate: "2029-12-14",
      releaseDesc: "Q4 Release with some year end patches.",
    },
    ticketTitle: "Navigation",
    ticketDesc: "Fix Broken Navigation",
    ticketStatus: "CLOSED",
  },
  {
    id: 1,
    application: {
      id: 1,
      applicationName: "Trackzilla",
      applicationDesc: "A bug tracking application",
      applicationOwner: "Kesha Williams",
    },
    release: {
      id: 2,
      releaseDate: "2030-05-27",
      releaseDesc:
        "Q2 Release Containing High Priority Enhancements",
    },
    ticketTitle: "Sort Feature",
    ticketDesc:
      "Add the ability to sort tickets by severity",
    ticketStatus: "OPEN",
  },
  {
    id: 2,
    application: {
      id: 4,
      applicationName: "Invoice Search",
      applicationDesc:
        "An application used to search invoices ",
      applicationOwner: "Mary Richards",
    },
    release: null,
    ticketTitle: "Search Feature",
    ticketDesc: "Add the ability to search by invoice date",
    ticketStatus: "IN PROGRESS",
  },
  {
    id: 3,
    application: {
      id: 5,
      applicationName: "Audits",
      applicationDesc:
        "An application used for auditing purposes.",
      applicationOwner: "Tiffany Stewart",
    },
    release: {
      id: 1,
      releaseDate: "2030-02-14",
      releaseDesc:
        "Q1 Release Containing High Priority Bugs",
    },
    ticketTitle: "Audit",
    ticketDesc: "Add the ability to audit by year",
    ticketStatus: "CLOSED",
  },
  {
    id: 4,
    application: {
      id: 3,
      applicationName: "Bookings",
      applicationDesc:
        "An application used to book tickets",
      applicationOwner: "John Doe",
    },
    release: {
      id: 2,
      releaseDate: "2030-05-27",
      releaseDesc:
        "Q2 Release Containing High Priority Enhancements",
    },
    ticketTitle: "Booking Feature",
    ticketDesc: "Add the ability to book tickets online",
    ticketStatus: "OPEN",
  },
];

const apiUrl = process.env.REACT_APP_BASE_API_URL;

const handlers = [
  rest.get(
    `${apiUrl}/trackzilla/releases`,
    async (req, res, ctx) => {
      return res(ctx.json(releaseData));
    }
  ),
  rest.get(
    `${apiUrl}/trackzilla/applications`,
    async (req, res, ctx) => {
      return res(ctx.json(applicationData));
    }
  ),
  rest.get(
    `${apiUrl}/trackzilla/tickets`,
    async (req, res, ctx) => {
      return res(ctx.json(ticketData));
    }
  ),
  rest.put(
    `${apiUrl}/trackzilla/applications/0`,
    async (req, res, ctx) => {
      return res(ctx.json(applicationData[0]));
    }
  ),
  rest.put(
    `${apiUrl}/trackzilla/releases/1`,
    async (req, res, ctx) => {
      return res(ctx.json(releaseData[1]));
    }
  ),
];

export { handlers };
