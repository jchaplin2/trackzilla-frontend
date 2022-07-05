import * as actions from "../../../redux/actions/applicationActions";
import applicationReducer from "../../../redux/reducers/applicationReducer";

describe('applicationReducer', () => {

    test('it has the correct state when success action invoked.', () => {

        const data = [
            {
                "id": 0,
                "applicationName": "TimeTracker",
                "applicationDesc": "A timesheet application.",
                "applicationOwner": "John Smith"
            },
            {
                "id": 1,
                "applicationName": "Trackzilla",
                "applicationDesc": "A bug tracking application",
                "applicationOwner": "Kesha Williams"
            },
            {
                "id": 2,
                "applicationName": "Expenses",
                "applicationDesc": "An application used to submit expenses",
                "applicationOwner": "Jane Doe"
            }
        ];

        const fetchSuccessAction = {
            type: actions.FETCH_APPLICATIONS_SUCCESS,
            data: data
        };
        expect(applicationReducer({}, fetchSuccessAction)).toEqual({"data":data});
    });

    test('it has the correct state when loading action invoked.', () => {
        const fetchLoadingAction = {
            type: actions.FETCH_APPLICATIONS_LOADING,
            loading: true
        };

        expect(applicationReducer({}, fetchLoadingAction)).toEqual({"loading":true});
    });

    test('it has the correct state when error action invoked.', () => {
        const error = {
            error: "Something failed!!"
        };

        const fetchErrorAction = {
            type: actions.FETCH_APPLICATIONS_FAILURE,
            error: error
        };

        expect(applicationReducer({}, fetchErrorAction)).toEqual({"error":error});
    });

});