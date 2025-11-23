const InfoRow = ({ label, value, bold }) => (
    <div>
        <p className="font-medium text-gray-500 text-sm">{label}</p>
        <p className={`text-lg ${bold ? "font-bold text-indigo-700" : ""}`}>{value}</p>
    </div>
);
export default InfoRow;