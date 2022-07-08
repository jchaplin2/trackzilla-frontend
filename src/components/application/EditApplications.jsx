import React from "react";
import * as actions from "../../redux/actions/releaseActions";
import Spinner from "../common/Spinner";
import { useParams } from "react-router-dom";
import { useFetchWithRedux } from "../../services/useFetch";
import UpsertApplicationForm from "./UpsertApplicationForm";

import { useNavigate } from "react-router-dom";
import { handleResponse, handleError } from "../../services/apiUtils";
import {saveApplication} from "../../services/applicationService";

export default function EditApplications() {
    const { id } = useParams();
    const { reducer } = useFetchWithRedux("/trackzilla/applications", actions, 'applicationReducer');
    const navigate = useNavigate();
    const { data, loading, error } = reducer;
    const dataItem = data[id];
    
    if(loading) return <Spinner/>;
    if(error) throw error;

    const onSubmit = (application) => {
        saveApplication(application, navigate, handleResponse, handleError);
    }

    return(
        <div>
            <h1>Edit Application </h1>

            <UpsertApplicationForm data={dataItem} id={id} onSubmit={onSubmit} />

        </div>
    );
}