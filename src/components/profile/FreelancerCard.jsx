const FreelancerCard = ({ info }) => (
  <div className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-200">
    <h3 className="text-xl font-bold text-green-800 mb-4">Freelancer Profile</h3>
    <div className="space-y-4">
      <div>
        <p className="font-medium text-green-600">Skills</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {info.skills.split(", ").map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div><p className="font-medium text-green-600">Level</p><p className="capitalize font-bold">{info.experience_level}</p></div>
      <div><p className="font-medium text-green-600">Rate</p><p className="text-3xl font-bold text-green-800">${info.hourly_rate}/hr</p></div>
      {info.portfolio_link && (
        <a href={info.portfolio_link} target="_blank" rel="noopener noreferrer" className="text-green-700 underline font-medium">
          View Portfolio
        </a>
      )}
      <div className="pt-3 border-t border-green-200">
        <p className="font-medium text-green-600">AI Skill Score</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-3xl font-bold text-green-700">{info.ai_skill_score}</span>
          <div className="flex-1 bg-gray-300 rounded-full h-4">
            <div className="bg-green-600 h-4 rounded-full transition-all" style={{ width: `${info.ai_skill_score}%` }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default FreelancerCard;