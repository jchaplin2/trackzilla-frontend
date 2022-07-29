const baseUrl =
  process.env.REACT_APP_BASE_API_URL +
  "/trackzilla/releases/";

export function saveRelease(
  release,
  navigate,
  handleResponse,
  handleError
) {
  let releaseId = Number.isInteger(parseInt(release.id))
    ? parseInt(release.id)
    : "";
  return fetch(baseUrl + releaseId, {
    method: releaseId >= 0 ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(release),
  })
    .then((response) => {
      handleResponse(response);
      navigate("/viewreleases");
    })
    .catch(handleError);
}
