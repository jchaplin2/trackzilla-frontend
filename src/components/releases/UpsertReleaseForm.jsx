import React from "react";
import { useState } from "react";
import TextInput from "../common/TextInput";

import { handleResponse, handleError } from "../../services/apiUtils";
import {saveRelease} from "../../services/releaseService";
import { useNavigate } from "react-router-dom";


export const DESC_REQUIRED_MESSAGE = "Description is required."
export const DATE_REQUIRED_MESSAGE = "Date is required.";



export default function UpsertReleaseForm(props) {

    const releaseDesc = props.data.releaseDesc ? props.data.releaseDesc : "";
    const dateFormatter = Intl.DateTimeFormat('sv-SE');
    const releaseDate = props.data.releaseDate ? props.data.releaseDate : dateFormatter.format(new Date());
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const id = Number(props.data.id) >= 0  ? Number(props.data.id): "";
    const [release, setRelease] = useState({
        id: id,
        releaseDesc: releaseDesc,
        releaseDate: releaseDate
    });
    const [saving, setSaving] = useState(false);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setRelease({...release, [name]: value});
    };

    const formIsValid = (release) => {
        const {releaseDesc, releaseDate} = release;
        const errors = {};

        var fourDigitYearPattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/  ;

        if(!fourDigitYearPattern.test(releaseDate))errors.releaseDate = "Date must be in the pattern YYYY-MM-DD.";

        if (!releaseDesc) errors.releaseDesc = DESC_REQUIRED_MESSAGE;
        if (!releaseDate) errors.releaseDate = DATE_REQUIRED_MESSAGE;

        setErrors(errors);

        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        window.event.preventDefault();
        if(!formIsValid(release)) {
            return;
        }

        setSaving(true);
        try {
            saveRelease(release, navigate, handleResponse, handleError);
        } catch(error) {
            setSaving(false);
            setErrors({ onSave: error.message });
        }

        setRelease({
            id: "",
            releaseDesc: "",
            releaseDate: ""
        });
    };

    return (
        <form aria-label="upsertForm">
            <TextInput
                name="releaseDate"
                label="Release Date"
                onChange={handleInputChange}
                value={release.releaseDate}
                error={errors.releaseDate}
            />

            <TextInput
                name="releaseDesc"
                label="Release Description"
                onChange={handleInputChange}
                value={release.releaseDesc}
                error={errors.releaseDesc}
            />

            <button type="submit" disabled={saving} onClick={handleSave} className="btn btn-primary" >
                {saving ? "Saving..." : "Save"}
            </button>
      </form>
    );
}