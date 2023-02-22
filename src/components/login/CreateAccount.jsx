import React from "react";
import { useState } from "react";
import TextInput from "../common/TextInput";

import { useNavigate } from "react-router-dom";

export const USERNAME_REQUIRED_MESSAGE = "Username is required."
export const EMAIL_REQUIRED_MESSAGE = "Email is required."
export const PASSWORD_REQUIRED_MESSAGE = "Password is required.";

const signUpUrl =
  process.env.REACT_APP_BASE_API_URL +
  "/api/auth/signup";

export default function Login() {
        const [user, setUser] = useState({
            email: "",
            username: "",
            password: "",
            roles: ["ROLE_USER"]
        });
        const [errors, setErrors] = useState({});
        const [saving, setSaving] = useState(false);

        const navigate = useNavigate();

        const handleInputChange = (event) => {
            const {name, value} = event.target;
            setUser({...user, [name]: value});
        };

        const handleSignUp = () => {
            window.event.preventDefault();
            if(!formIsValid(user)) {
                return;
            }

            setSaving(true);

            fetch(signUpUrl, {
                method: "POST",
                mode: "cors",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(user),
            }).then((response) => response.json())
            .then((data) => {
              navigate("/login");
            }).catch(error => {
                setSaving(false);
                setErrors({ onSave: error.message });
            });
        };

        const formIsValid = (user) => {
            const {username, password, email} = user;
            const errors = {};

            if (!username) errors.username = USERNAME_REQUIRED_MESSAGE;
            if (!password) errors.password = PASSWORD_REQUIRED_MESSAGE;
            if (!email) errors.password = EMAIL_REQUIRED_MESSAGE;

            setErrors(errors);

            // Form is valid if the errors object still has no properties
            return Object.keys(errors).length === 0;
        };

        return (
            <form aria-label="upsertForm">

                <TextInput
                    name="email"
                    label="Email"
                    onChange={handleInputChange}
                    value={user.email}
                    error={errors.email}
                />

                <TextInput
                    name="username"
                    label="User Name"
                    onChange={handleInputChange}
                    value={user.username}
                    error={errors.username}
                />

                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <div className="field">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder=""
                            value={user.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Role</label>
                    <div className="field">
                        <select className="form-select" multiple aria-label="multiple select example">
                            <option selected value="ROLE_USER">User</option>
                            <option value="ROLE_APPLICATION_USER">Application User</option>
                            <option value="ROLE_TICKET_USER">Ticket User</option>
                            <option value="ROLE_RELEASE_USER"> Release User</option>
                        </select>
                    </div>
                </div>

                <button type="submit" disabled={saving} onClick={handleSignUp} className="btn btn-primary" >
                    {saving ? "Loading..." : "Create Account"}
                </button>

        </form>
    );
}