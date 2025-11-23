const StatCard = ({ label, value, color }) => {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-300",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
    green: "bg-green-100 text-green-800 border-green-300",
    purple: "bg-purple-100 text-purple-800 border-purple-300",
    blue: "bg-blue-100 text-blue-800 border-blue-300",
    teal: "bg-teal-100 text-teal-800 border-teal-300",
  };
  return (
    <div className={`p-5 rounded-xl border-2 ${colors[color]} shadow text-center`}>
      <p className="text-sm opacity-80">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};
export default StatCard;