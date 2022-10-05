import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../common/TextInput";

import {saveTicket} from "../../services/ticketService";
import { handleResponse, handleError } from "../../services/apiUtils";
// import AutoCompleteWithHiddenInput from "../common/AutoCompleteWithHiddenInput";
import SelectInput from "../common/SelectInput";
import AutoCompleteFetchInput from "../common/AutoCompleteFetchInput";

export const TITLE_REQUIRED_MESSAGE = "Name is required."
export const DESC_REQUIRED_MESSAGE = "Desc is required.";
export const APPID_REQUIRED_MESSAGE = "App Id is required.";
export const RELEASEID_REQUIRED_MESSAGE = "Release Id is required.";
export const STATUS_REQUIRED_MESSAGE = "Status is required.";
const BLANK = "";

export default function UpsertTicketForm(props) {

    const ticketTitle = props.data.ticketTitle ? props.data.ticketTitle : "";
    const ticketDesc = props.data.ticketDesc ? props.data.ticketDesc : "";
    const ticketStatus = props.data.ticketStatus ? props.data.ticketStatus : "OPEN";
    const applicationId = Number(props.data.application.id) >= 0 ? Number(props.data.application.id) : "";
    const applicationName = props.data.application.applicationName ? props.data.application.applicationName : "";
    const releaseId = Number(props.data.release.id) >= 0 ? Number(props.data.release.id) : "";
    const releaseName = props.data.release.releaseDesc ? props.data.release.releaseDesc : "";    
    const id = Number(props.data.id) >= 0  ? Number(props.data.id): "";

    const [ticket, setTicket] = useState({
        id: id,
        ticketTitle : ticketTitle,
        ticketDesc : ticketDesc,
        ticketStatus : ticketStatus,
        application : {
            id : applicationId,
            applicationName: applicationName
        },
        release : {
            id : releaseId,
            releaseName: releaseName
        }
    });


    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const handleTicketChange = (event) => {
        const {name, value} = event.target;
        setTicket({...ticket, [name]: value});
    }

    const handleReleaseClickAutoComplete = (data) => {
        setTicket(prevState => ({...prevState, release : { ...prevState.release, "releaseName": data.releaseDesc, "id": data.id}}));
    };

    const handleApplicationClickAutoComplete = (data) => {
        setTicket(prevState => ({...prevState, application : { ...prevState.release, "applicationName": data.applicationName, "id": data.id}}));
    };

    const handleReleaseChangeAutoComplete = (event) => {
        const {value} = event.target;

        setTicket(prevState => ({...prevState, release : { ...prevState.release, 
                "releaseName": value, "id" : value.trim() === BLANK ? BLANK : prevState.release.id }}
        ));
    };

    const handleApplicationChangeAutoComplete = (event) => {
        const {value} = event.target;

        setTicket(prevState => ({...prevState, application : { ...prevState.application, 
                "applicationName": value, "id" : value.trim() === BLANK ? BLANK : prevState.application.id }}
        ));
    };

    const handleReleaseKeyDown = (data) => {
        setTicket(prevState => ({...prevState, release : { ...prevState.release, "releaseName": data[0].releaseDesc, "id": data[0].id}}));
    };

    const handleApplicationKeyDown = (data) => {
        setTicket(prevState => ({...prevState, application : { ...prevState.application, "applicationName": data[0].applicationName, "id": data[0].id}}));
    };

    const formIsValid = () => {
        const {ticketTitle, ticketDesc, application, release, ticketStatus} = ticket;
        const applicationId = parseInt(application.id, 10);
        const releaseId = parseInt(release.id, 10);
        const errors = {};

        if (!ticketTitle) errors.ticketTitle = TITLE_REQUIRED_MESSAGE;
        if (!ticketDesc) errors.ticketDesc = DESC_REQUIRED_MESSAGE;
        if (Number.isNaN(releaseId) || releaseId < 0) errors.applicationId = APPID_REQUIRED_MESSAGE;
        if (Number.isNaN(applicationId) || applicationId < 0) errors.releaseId = RELEASEID_REQUIRED_MESSAGE;
        if (!ticketStatus) errors.ticketStatus = STATUS_REQUIRED_MESSAGE;

        setErrors(errors);

        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    };

    const handleSave = (event) => {
        event.preventDefault();
        if(!formIsValid(ticket)) {
            return;
        }

        setSaving(true);
        try {
            saveTicket(ticket, navigate, handleResponse, handleError);
        } catch(error) {
            setSaving(false);
            setErrors({ onSave: error.message });
        }

        setTicket({
            ticketTitle : "",
            ticketDesc : "",
            ticketStatus : "",
            application :{
                id: ""
            },
            release : {
                id : ""
            }
        });
    };

    return (
        <form aria-label="upsertForm" onSubmit={(e) => {e.preventDefault();}} autoComplete="off">

            <TextInput
                name="ticketTitle"
                label="Ticket Title"
                onChange={handleTicketChange}
                value={ticket.ticketTitle}
                error={errors.ticketTitle}
            />

            <TextInput
                name="ticketDesc"
                label="Ticket Desc"
                onChange={handleTicketChange}
                value={ticket.ticketDesc}
                error={errors.ticketDesc}
            />

            <AutoCompleteFetchInput
                name="applicationName"
                label="Application Name"
                placeholder=""
                value={ticket.application.applicationName}
                displayColumns={['applicationName', 'applicationDesc']}
                path="/trackzilla/applicationsByDesc?desc="
                onChangeAutoComplete={handleApplicationChangeAutoComplete}
                onKeyDownAutoComplete={handleApplicationKeyDown}
                onClickAutoComplete={handleApplicationClickAutoComplete}
                errors={errors.applicationId}
            />

            <AutoCompleteFetchInput
                name="releaseName"
                label="Release Name"
                placeholder=""
                value={ticket.release.releaseName}
                displayColumns={['releaseDate', 'releaseDesc']}
                path="/trackzilla/releasesByDesc?desc="
                onChangeAutoComplete={handleReleaseChangeAutoComplete}
                onKeyDownAutoComplete={handleReleaseKeyDown}
                onClickAutoComplete={handleReleaseClickAutoComplete}
                errors={errors.releaseId}
            />

            {/* <AutoCompleteWithHiddenInput
                name="applicationName"
                label="Application Name"
                placeholder=""
                value={ticket.application.applicationName}
                displayColumns={['applicationName', 'applicationDesc']}
                path="/trackzilla/applicationsByDesc?desc="
                onChangeAutoComplete={handleApplicationChangeAutoComplete}
                onKeyDownAutoComplete={handleApplicationKeyDown}
                onClickAutoComplete={handleApplicationClickAutoComplete}
                hiddenInputName="applicationId"
                hiddenInputValue={ticket.application.id}
                errors={errors.applicationId}
            />

            <AutoCompleteWithHiddenInput
                name="releaseName"
                label="Release Name"
                placeholder=""
                value={ticket.release.releaseName}
                displayColumns={['releaseDate', 'releaseDesc']}
                path="/trackzilla/releasesByDesc?desc="
                onChangeAutoComplete={handleReleaseChangeAutoComplete}
                onKeyDownAutoComplete={handleReleaseKeyDown}
                onClickAutoComplete={handleReleaseClickAutoComplete}
                hiddenInputName="releaseId"
                hiddenInputValue={ticket.release.id}
                errors={errors.releaseId}
            /> */}

            <SelectInput
                name="ticketStatus"
                label="Status"
                onChange={handleTicketChange}
                options={['Open','Closed','In Progress']}
            />

            <button type="submit" disabled={saving} onClick={handleSave} className="btn btn-primary" >
                {saving ? "Saving..." : "Save"}
            </button>
      </form>
    );

}