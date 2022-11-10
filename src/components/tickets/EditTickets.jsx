import React from "react";
import * as actions from "../../redux/actions/ticketActions";
import Spinner from "../common/Spinner";
import { useParams } from "react-router-dom";
import { useFetchWithRedux } from "../../services/useFetch";
import UpsertTicketForm from "./UpsertTicketForm";

export default function Tickets(props) {

    const { id } = useParams();
    const { reducer } = useFetchWithRedux("/trackzilla/tickets", actions, 'ticketReducer');
    const { data, loading, error } = reducer;
    const dataItem = data[id];
    
    if(loading) return <Spinner/>;
    if(error) throw error;

    return(
        <>
            <h1>Edit Ticket</h1>

            <UpsertTicketForm data={dataItem} id={id} />
        </>
    );    



}