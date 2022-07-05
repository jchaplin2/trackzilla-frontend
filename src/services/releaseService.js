import { handleResponse, handleError } from "./apiUtils";

const baseUrl =
  process.env.REACT_APP_BASE_API_URL +
  "/trackzilla/releases/";

export function saveRelease(release) {
  return fetch(baseUrl + (release.id || ""), {
    method: release.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(release),
  })
    .then(handleResponse)
    .catch(handleError);
}
