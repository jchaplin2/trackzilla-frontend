import React from "react";
import useFetch from "../../services/useFetch";

export default function Releases() {
    const {error, loading, data} = useFetch("/trackzilla/releases");

    if(loading) return <div>Loading ....</div>;
    if(error) throw error;

    return(
    <div className="jumbotron">
        <h3>Releases</h3>
        <table className="table table-striped">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Release Date</th>
                <th scope="col">Description</th>
            </tr>
            </thead>
            <tbody>

            {data.map((item, i) => {
                return (<tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.releaseDate}</td>
                    <td>{item.description}</td>
                </tr>);
            })}

            </tbody>
        </table>
    </div>
    );
}