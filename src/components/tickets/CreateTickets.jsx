import React from "react";
import UpsertTicketForm from "./UpsertTicketForm";

export default function Tickets(props) {

    return(
        <>
            <h1>Create a Ticket</h1>

            <UpsertTicketForm data={{ release: {}, application: {} }} />
        </>
    );    



}