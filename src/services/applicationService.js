import { handleResponse, handleError } from "./apiUtils";

const baseUrl =
  process.env.REACT_APP_BASE_API_URL +
  "/trackzilla/applications/";

export function saveApplication(application, navigate) {
  return fetch(baseUrl + (application.id || ""), {
    method: application.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(application),
  })
    .then((response) => {
      handleResponse(response);
      navigate("/viewapplications");
    })
    .catch(handleError);
}
