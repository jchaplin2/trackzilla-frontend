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
