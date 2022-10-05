import React from "react";
import * as actions from "../../redux/actions/releaseActions";
import Spinner from "../common/Spinner";
import { useParams } from "react-router-dom";
import { useFetchWithRedux } from "../../services/useFetch";
import UpsertReleaseForm from "./UpsertReleaseForm";


export default function EditReleases() {
    const { id } = useParams();
    const { reducer } = useFetchWithRedux("/trackzilla/releases", actions, 'releaseReducer');
    const { data, loading, error } = reducer;
    const dataItem = data[id];
    
    if(loading) return <Spinner/>;
    if(error) throw error;

    return(
        <>
            <h1>Edit Releases </h1>

            <UpsertReleaseForm data={dataItem} id={id} />
        </>
    );
}