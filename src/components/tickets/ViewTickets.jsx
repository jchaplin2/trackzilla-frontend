import React from "react";
import { useFetchWithRedux } from "../../services/useFetch";
import * as actions from "../../redux/actions/ticketActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

export default function Tickets() {
    const { reducer } = useFetchWithRedux("/trackzilla/tickets", actions, 'ticketReducer');
    const { data, loading, error } = reducer;

    if(loading) return <Spinner/>;
    if(error) throw error;

    return(
    <div className="jumbotron">
        <h3>Tickets</h3>
        <table className="table table-striped">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Application</th>
                <th scope="col">Release Date</th>
            </tr>
            </thead>
            <tbody>

            {data.map((item, i) => {
                return (<tr key={i}>
                    <td>
                        <Link role="link" to={`/editticket/${i}`} >{item.id + 1}</Link>
                    </td>
                    <td> {item.ticketTitle}</td>
                    <td> {item.ticketDesc}</td>
                    <td >{item?.application?.applicationName}</td>
                    <td >{item?.release?.releaseDate}</td>
                </tr>);
            })}

            </tbody>
        </table>
    </div>
    );
}