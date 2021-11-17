import React from "react";
import useFetch from "../../services/useFetch";

export default function ViewApplications() {
    const {error, loading, data} = useFetch("/trackzilla/applications");

    if(loading) return <div>Loading ....</div>;
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