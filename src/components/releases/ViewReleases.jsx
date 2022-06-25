import React from "react";
import { useFetchWithRedux } from "../../services/useFetch";
import * as actions from "../../redux/actions/releaseActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

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
                    <td> 
                        <Link role="link" to={`/editrelease/${i}`} >{item.id + 1}</Link>
                    </td>
                    <td>{item.releaseDate}</td>
                    <td>{item.releaseDesc}</td>
                </tr>);
            })}

            </tbody>
        </table>
    </div>
    );
}