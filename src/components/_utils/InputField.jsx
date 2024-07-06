import { useEffect } from "react";

export default function InputField({inputData}) {
    const {id, label, type, placeholder, idClassName ,inputClassName, value, onChange} = inputData;

    useEffect(() => {
    }, []);

    return (
        <div id={id} className={idClassName}>
            {label && <label htmlFor={id}>{label}</label>}
            <input 
                type={type}
                className={inputClassName}
                placeholder={placeholder}
                />
        </div>
    )
}