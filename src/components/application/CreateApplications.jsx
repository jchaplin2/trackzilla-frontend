import React from "react";

import UpsertApplicationForm from "./UpsertApplicationForm";

import { useNavigate } from "react-router-dom";
import { handleResponse, handleError } from "../../services/apiUtils";
import {saveApplication} from "../../services/applicationService";

export default function CreateApplications() {

    const navigate = useNavigate();

    const onSubmit = (application) => {
        saveApplication(application, navigate, handleResponse, handleError);
    }

    return (<div>
        <div>Create Applications</div>

        <UpsertApplicationForm data={{}} onSubmit={onSubmit} />
    </div>);
}