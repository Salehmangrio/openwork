const ClientCard = ({ info }) => (
    <div className="bg-blue-50 p-6 rounded-xl shadow-lg border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4">Company Details</h3>
        <div className="space-y-3">
            <div><p className="font-medium text-blue-600">Company</p><p className="text-lg">{info.company_name}</p></div>
            <div><p className="font-medium text-blue-600">Type</p><p>{info.organization_type}</p></div>
            <div><p className="font-medium text-blue-600">Location</p><p>{info.location}</p></div>
            <div className="pt-3 border-t border-blue-200">
                <p className="font-medium text-blue-600">Total Spent</p>
                <p className="text-3xl font-bold text-blue-800">${info.total_spent.toLocaleString()}</p>
            </div>
        </div>
    </div>
);

export default ClientCard;