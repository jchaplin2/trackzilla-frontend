import React, { useState } from "react";

const AutoCompleteFetchInput = ({
    name,
    label,
    placeholder,
    displayColumns,
    value,
    onChangeAutoComplete,
    onClickAutoComplete,
    onKeyDownAutoComplete,
    path
}) => {
    const [autoCompleteData, setAutoCompleteData] = useState([]);

    const handleAutoCompleteClick = (data) => {
        onClickAutoComplete(data);
        setAutoCompleteData([]);
    };

    const handleAutoCompleteChange = (event) => {
        onChangeAutoComplete(event);
      
        const abortController = new AbortController();
        fetchAutoCompleteData(event, abortController);
    };

    const fetchAutoCompleteData = async (event, abortController) => {
        const {value} = event.target;
        if(value === "") {
            setAutoCompleteData([]);
            return;
        }

        const {signal} = abortController;
        const baseUrl = process.env.REACT_APP_BASE_API_URL;
        await fetch(baseUrl + path + value, {
            method: 'GET',
            signal: signal
        }).catch(() => {
            abortController.abort();
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(signal.aborted === false) {
                setAutoCompleteData(data);
            }
        });
    };

    const handleAutoCompleteKeyDown = (e) => {
        if(autoCompleteData.length === 0)
            return;

        if(e.keyCode === 13) {
            e.preventDefault();
            onKeyDownAutoComplete(autoCompleteData);
            setAutoCompleteData([]);
        } else if (e.keyCode === 9) {
            onKeyDownAutoComplete(autoCompleteData);
            setAutoCompleteData([]);
        }
    };


    const renderAutoCompleteTable = (autoCompleteData) => {
        if(!autoCompleteData.length || autoCompleteData.length === 0)
            return "";
        
        const tableRows = autoCompleteData.map((data, i) => {

            const cols = displayColumns.map((col, j) => {
                const colKey = `${name}_cell_${i}_${j}`;
                return (<td key={colKey}> {data[col]} </td>);
            });

            const rowKey = `${name}_row_${i}`;
            return (
                <tr key={rowKey} onClick={(e) => {handleAutoCompleteClick(data, e)}} >
                    {cols}
                </tr>
            );
        });

        const capitalizeFirstLetter = ([ first='', ...rest ]) => {
            return [ first.toUpperCase(), ...rest ].join('');
        }

        const tableHeaders = (data) => {
            const headerTitles = displayColumns.map((header) => {
                const titleArr = header.split(/(?=[A-Z])/);
                titleArr[0] = capitalizeFirstLetter(titleArr[0])
                return titleArr.join(" ");
            });

            const headerCells = headerTitles.map((headerTitle, i) => {
                return (<th key={`${name}_header_${i}`}>{headerTitle}</th>);
            });

            return (
                <tr>
                    {headerCells}
                </tr>
            );
        }

        return (
            <table className="table table-striped table-bordered border" style={{"cursor":"pointer"}}>
                <thead>
                    {tableHeaders(autoCompleteData)}
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        );
    }

    return (
        <div className="form-group mb-3" style={{"position":"relative"}}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input
                    type="text"
                    name={name}
                    id={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => handleAutoCompleteChange(e)}
                    onKeyDown={(e) => handleAutoCompleteKeyDown(e)}
                />
            </div>
            <div style={{"zIndex":"100", "position":"absolute", "backgroundColor":"white"}}>
                {renderAutoCompleteTable(autoCompleteData)}
            </div>
        </div>
    );
};

export default AutoCompleteFetchInput;