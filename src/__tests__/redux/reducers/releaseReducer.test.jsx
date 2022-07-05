import * as actions from "../../../redux/actions/releaseActions";
import releaseReducer from "../../../redux/reducers/releaseReducer";

describe('releaseReducer', () => {

    test('it has the correct state when success action invoked.', () => {

        const data = [
            {
                "id": 0,
                "releaseDate": "2029-12-14",
                "releaseDesc": "Q4 Release with some year end patches."
            },
            {
                "id": 1,
                "releaseDate": "2030-02-14",
                "releaseDesc": "Q1 Release Containing High Priority Bugs."
            }
        ];

        const fetchSuccessAction = {
            type: actions.FETCH_RELEASES_SUCCESS,
            data: data
        };
        expect(releaseReducer({}, fetchSuccessAction)).toEqual({"data":data});
    });

    test('it has the correct state when loading action invoked.', () => {
        const fetchLoadingAction = {
            type: actions.FETCH_RELEASES_LOADING,
            loading: true
        };

        expect(releaseReducer({}, fetchLoadingAction)).toEqual({"loading":true});
    });

    test('it has the correct state when error action invoked.', () => {
        const error = {
            error: "Something failed!!"
        };

        const fetchErrorAction = {
            type: actions.FETCH_RELEASES_FAILURE,
            error: error
        };

        expect(releaseReducer({}, fetchErrorAction)).toEqual({"error":error});
    });

});