import React from "react";
import { useState } from "react";
import TextInput from "../common/TextInput";
import {saveApplication} from "../../services/applicationService";
import { useNavigate } from "react-router-dom";

export default function UpsertApplicationForm(props) {

    const applicationName = props.data.applicationName ? props.data.applicationName : "";
    const applicationDesc = props.data.applicationDesc ? props.data.applicationDesc : "";
    const applicationOwner = props.data.applicationOwner ? props.data.applicationOwner : "";

    const [errors, setErrors] = useState({});
    const id = Number(props.data.id) >= 0  ? Number(props.data.id): "";

    const [application, setApplication] = useState({
        id: id,
        applicationName : applicationName,
        applicationDesc : applicationDesc,
        applicationOwner : applicationOwner
    });

    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setApplication({...application, [name]: value});
    };

    const formIsValid = (application) => {
        const {applicationName, applicationDesc, applicationOwner} = application;
        const errors = {};

        if (!applicationName) errors.applicationName = "Name is required.";
        if (!applicationDesc) errors.applicationDesc = "Desc is required.";
        if (!applicationOwner) errors.applicationOwner = "Owner is required.";

        setErrors(errors);

        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        window.event.preventDefault();
        if(!formIsValid(application)) {
            return;
        }

        setSaving(true);
        try {
            saveApplication(application, navigate);
        } catch(error) {
            setErrors({ onSave: error.message });
        } finally {
            setSaving(false);
        }

        setApplication({
            id: "",
            applicationName : "",
            applicationDesc : "",
            applicationOwner : ""
        });
    };

    return (
        <form aria-label="upsertForm">

            <TextInput
                name="applicationName"
                label="App Name"
                onChange={handleInputChange}
                value={application.applicationName}
                error={errors.applicationName}
            />

            <TextInput
                name="applicationDesc"
                label="App Desc"
                onChange={handleInputChange}
                value={application.applicationDesc}
                error={errors.applicationDesc}
            />

            <TextInput
                name="applicationOwner"
                label="App Owner"
                onChange={handleInputChange}
                value={application.applicationOwner}
                error={errors.applicationOwner}
            />

            <button type="submit" disabled={saving} onClick={handleSave} className="btn btn-primary" >
                {saving ? "Saving..." : "Save"}
            </button>
      </form>
    );
}