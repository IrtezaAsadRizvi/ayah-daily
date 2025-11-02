import { useSelector } from "react-redux"
const TextInput = ({
    value = '',
    placeholder,
    onInput,
    className = '',
    showCurrency=false
}) => {
    const currentCurrency = useSelector((state) => state.invoice.currency)

    return (
        <div className={`group invoice-control ${className}`}>
            {showCurrency && <span className="absolute left-1 top-0">{currentCurrency?.currencySymbol} </span>}
            <input type='text'
                className={`${showCurrency && 'pl-3'}`}
                onInput={({ target: { value } }) => { onInput(value) }}
                placeholder={placeholder}
                value={value || ''} />
        </div>
    )
}

export default TextInput
