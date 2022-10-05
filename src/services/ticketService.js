const baseUrl =
  process.env.REACT_APP_BASE_API_URL +
  "/trackzilla/tickets/";

export function saveTicket(
  ticket,
  navigate,
  handleResponse,
  handleError
) {
  let ticketId = Number.isInteger(parseInt(ticket.id, 10))
    ? parseInt(ticket.id, 10)
    : "";
  return fetch(baseUrl + ticketId, {
    method: Number.isInteger(ticketId) ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(ticket),
  })
    .then((response) => {
      handleResponse(response);
      navigate("/viewtickets");
    })
    .catch(handleError);
}
