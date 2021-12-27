import React from "react";
import { useFetchWithRedux } from "../../services/useFetch";
import * as actions from "../../redux/actions/applicationActions";
import Spinner from "../common/Spinner";

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
                    <td>{item.id}</td>
                    <td> {item.name} </td>
                    <td> {item.description} </td>
                    <td> {item.owner}</td>
                </tr>);
            })}

            </tbody>
        </table>
    </div>
    );
}