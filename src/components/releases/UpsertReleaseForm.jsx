import React from "react";
import { useState } from "react";
import TextInput from "../common/TextInput";
import {saveRelease} from "../../services/releaseService";
import { useNavigate } from "react-router-dom";

export default function UpsertReleaseForm(props) {

    const releaseDesc = props.data.releaseDesc ? props.data.releaseDesc : "";
    const releaseDate = props.data.releaseDate ? props.data.releaseDate : new Date().toLocaleDateString('en-US', {month: "2-digit", day:"2-digit", year:"numeric"});
    const [errors, setErrors] = useState({});
    const id = props.data.id ? props.data.id : 0;

    const [release, setRelease] = useState({
        id: id,
        releaseDesc: releaseDesc,
        releaseDate: releaseDate
    });
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setRelease({...release, [name]: value});
    };

    const formIsValid = (release) => {
        const {releaseDesc, releaseDate} = release;
        const errors = {};

        if (!releaseDesc) errors.releaseDesc = "Description is required.";
        if (!releaseDate) errors.releaseDate = "Date is required.";

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
            saveRelease(release);
        } catch(error) {
            setErrors({ onSave: error.message });
        } finally {
            setSaving(false);
        }

        setRelease({
            id: "",
            releaseDesc: "",
            releaseDate: ""
        });

        navigate("/viewreleases");
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