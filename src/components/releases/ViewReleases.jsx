import React from "react";
import { useFetchWithRedux } from "../../services/useFetch";
import * as actions from "../../redux/actions/releaseActions";
import Spinner from "../common/Spinner";

export default function ViewReleases() {
    const { reducer } = useFetchWithRedux("/trackzilla/releases", actions, 'releaseReducer');
    const { data, loading, error } = reducer;

    if(loading) return <Spinner/>;
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