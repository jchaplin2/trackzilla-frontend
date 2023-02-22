import React, {useContext} from "react";
import { useState } from "react";
import TextInput from "../common/TextInput";

import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

export const USERNAME_REQUIRED_MESSAGE = "Username is required."
export const PASSWORD_REQUIRED_MESSAGE = "Password is required.";

const signInUrl =
  process.env.REACT_APP_BASE_API_URL +
  "/api/auth/signin";

  const LOGIN_TIMEOUT_IN_SECONDS = 600;

export default function Login() {
        const [user, setUser] = useState({
            username: "",
            password: ""
        });
        const [errors, setErrors] = useState({});

        const authContext = useContext(AuthContext);
        
        const [signInSaving, setSignInSaving] = useState(false);

        const navigate = useNavigate();

        const handleInputChange = (event) => {
            const {name, value} = event.target;
            setUser({...user, [name]: value});
        };

        const handleSignIn = () => {
            window.event.preventDefault();
            if(!formIsValid(user)) {
                return;
            }

            setSignInSaving(true);

            fetch(signInUrl, {
                method: "POST",
                mode: "cors",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(user),
            }).then((response) => response.json())
            .then((data) => {
              const expirationTime = new Date(
                new Date().getTime() + LOGIN_TIMEOUT_IN_SECONDS * 1000
              );
              authContext.login(data, expirationTime);
              navigate("/");
            }).catch(error => {
                setSignInSaving(false);
                setErrors({ onSave: error.message });
            });
        };

        const formIsValid = (user) => {
            const {username, password} = user;
            const errors = {};

            if (!username) errors.username = USERNAME_REQUIRED_MESSAGE;
            if (!password) errors.password = PASSWORD_REQUIRED_MESSAGE;

            setErrors(errors);

            // Form is valid if the errors object still has no properties
            return Object.keys(errors).length === 0;
        };

        return (
            <form aria-label="upsertForm">
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

                <button type="submit" disabled={signInSaving} onClick={handleSignIn} className="btn btn-primary" >
                    {signInSaving ? "Loading..." : "Log In"}
                </button>
        </form>
    );
}