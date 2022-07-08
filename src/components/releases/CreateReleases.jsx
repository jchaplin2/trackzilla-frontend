import React from "react";
import UpsertReleaseForm from "./UpsertReleaseForm";

import { useNavigate } from "react-router-dom";
import { handleResponse, handleError } from "../../services/apiUtils";
import {saveRelease} from "../../services/releaseService";

export default function CreateReleases(){

    const navigate = useNavigate();

    const onSubmit = (release) => {
        saveRelease(release, navigate, handleResponse, handleError);
    }

    return(
        <div>
            <div>Create a Release</div>

            <UpsertReleaseForm data={{}} onSubmit={onSubmit} />
        </div>
    );    
}