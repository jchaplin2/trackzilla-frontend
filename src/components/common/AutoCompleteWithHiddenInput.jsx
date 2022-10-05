import React from "react";
import AutoCompleteFetchInput from "./AutoCompleteFetchInput";

const AutoCompleteWithHiddenInput = ({
    name,
    label,
    placeholder,
    value,
    onChangeAutoComplete,
    onClickAutoComplete,
    onKeyDownAutoComplete,
    displayColumns,
    path,
    hiddenInputName,
    hiddenInputValue
}) => {
    return ( <>
        <AutoCompleteFetchInput
            name={name}
            label={label}
            placeholder={placeholder}
            value={value}
            path={path}
            displayColumns={displayColumns}
            onChangeAutoComplete={onChangeAutoComplete}
            onKeyDownAutoComplete={onKeyDownAutoComplete}
            onClickAutoComplete={onClickAutoComplete}
        />
        <input type="hidden" defaultValue={hiddenInputValue} name={hiddenInputName} id={hiddenInputName} />
    </>);
};

export default AutoCompleteWithHiddenInput;