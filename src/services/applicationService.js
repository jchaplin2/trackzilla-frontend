const baseUrl =
  process.env.REACT_APP_BASE_API_URL +
  "/trackzilla/applications/";

export function saveApplication(
  application,
  navigate,
  handleResponse,
  handleError
) {
  let applicationId =
    Number.isInteger(parseInt(application.id))
      ? parseInt(application.id)
      : "";
  return fetch(baseUrl + applicationId, {
    method: Number.isInteger(applicationId)
      ? "PUT"
      : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(application),
  })
    .then((response) => {
      handleResponse(response);
      navigate("/viewapplications");
    })
    .catch(handleError);
}
