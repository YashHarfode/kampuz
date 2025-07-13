export function Card({ icon, title, description, actionText }) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-full bg-blue-50 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-primary font-medium hover:underline">
        {actionText} →
      </button>
    </div>
  );
}