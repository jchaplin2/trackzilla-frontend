import React from "react";
import { useFetchWithRedux } from "../../services/useFetch";
import * as actions from "../../redux/actions/applicationActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

export default function ViewApplications() {
    const { reducer } = useFetchWithRedux("/trackzilla/applications", actions, 'applicationReducer');
    const { data, loading, error } = reducer;

    if(loading) return <Spinner/>;
    if(error) throw error;

    return(
    <div className="jumbotron">
        <h3>Applications</h3>
        <table className="table table-striped">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Owner</th>
            </tr>
            </thead>
            <tbody>

            {data.map((item, i) => {
                return (<tr key={i}>
                    <td> 
                        <Link role="link" to={`/editapplication/${i}`} >{item.id + 1}</Link>
                    </td>
                    <td> {item.applicationName} </td>
                    <td> {item.applicationDesc} </td>
                    <td> {item.applicationOwner}</td>
                </tr>);
            })}

            </tbody>
        </table>
    </div>
    );
}