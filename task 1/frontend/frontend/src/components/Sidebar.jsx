import { BookOpen, Users, Award, GraduationCap, Mail, Phone, X } from 'lucide-react'

const Sidebar = ({ onClose }) => {
  const categories = [
    { icon: Award, label: 'Master of Business Warfare', count: 1 },
    { icon: GraduationCap, label: 'Leadership Essentials', count: 1 },
    { icon: Users, label: '100 Board Members Program', count: 1 },
    { icon: BookOpen, label: 'Business War Tactics', count: 1 },
  ]

  const resources = [
    { label: 'Why Choose Iron Lady', href: '#' },
    { label: 'Success Stories', href: '#' },
    { label: '78K+ Women Leaders', href: '#' },
    { label: 'Contact: +91-6360823123', href: '#' },
  ]

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-primary-700">Iron Lady</h2>
          <button onClick={onClose} className="lg:hidden p-1">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Program Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.label}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-primary-50 transition-colors text-left group"
              >
                <div className="flex items-center space-x-3">
                  <category.icon size={20} className="text-primary-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                    {category.label}
                  </span>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Resources
          </h3>
          <div className="space-y-1">
            {resources.map((resource) => (
              <a
                key={resource.label}
                href={resource.href}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors"
              >
                {resource.label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
              Join the Ecosystem
            </button>
            <button className="w-full px-4 py-2.5 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-sm font-medium">
              Call +91-6360823123
            </button>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default Sidebar
