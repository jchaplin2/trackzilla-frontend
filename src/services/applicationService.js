import { handleResponse, handleError } from "./apiUtils";

const baseUrl =
  process.env.REACT_APP_BASE_API_URL +
  "/trackzilla/applications/";

export function saveApplication(application) {
  return fetch(baseUrl + (application.id || ""), {
    method: application.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(application),
  })
    .then(handleResponse)
    .catch(handleError);
}
