export default function InputBox({label, type, name, onChange, placeholder}) {
    return (
        <div>
            <label className = "font-semibold p-2" for = {name}>{label}</label>
            <input className="text-black " type={type} onChange = {onChange} name={name} placeholder={placeholder} />
        </div>
    )
}