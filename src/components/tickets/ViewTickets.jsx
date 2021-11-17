import React from "react";
import useFetch from "../../services/useFetch";

export default function Tickets() {
    const {error, loading, data} = useFetch("/trackzilla/tickets");

    if(loading) return <div>Loading ....</div>;
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
                    <td> {item.id}</td>
                    <td> {item.title}</td>
                    <td> {item.description}</td>
                    <td >{item.application.name}</td>
                    <td >{item?.release?.releaseDate}</td>
                </tr>);
            })}

            </tbody>
        </table>
    </div>
    );
}