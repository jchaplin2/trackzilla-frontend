import React from "react";
import * as actions from "../../redux/actions/applicationActions";
import Spinner from "../common/Spinner";
import { useParams } from "react-router-dom";
import { useFetchWithRedux } from "../../services/useFetch";
import UpsertApplicationForm from "./UpsertApplicationForm";

export default function EditApplications() {
    const { id } = useParams();
    const { reducer } = useFetchWithRedux("/trackzilla/applications", actions, 'applicationReducer');
    const { data, loading, error } = reducer;
    const dataItem = data[id];
    
    if(loading) return <Spinner/>;
    if(error) throw error;

    return(
        <div>
            <h1>Edit Application </h1>

            <UpsertApplicationForm data={dataItem} id={id} />

        </div>
    );
}