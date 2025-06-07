import { BarChart, Users, FileText, TrendingUp } from 'lucide-react'

const cardData = [
  {
    title: 'Card 1',
    value: '0',
    icon: BarChart,
    color: 'text-blue-600'
  },
  {
    title: 'Card 2', 
    value: '0',
    icon: Users,
    color: 'text-green-600'
  },
  {
    title: 'Card 3',
    value: '0',
    icon: FileText,
    color: 'text-purple-600'
  },
  {
    title: 'Card 4',
    value: '0',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cardData.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-col items-center text-center">
                <Icon className={`w-8 h-8 ${card.color} mb-2`} />
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Section</h2>
        <p className="text-gray-500">This is a placeholder content section. Replace with your application-specific content.</p>
      </div>
    </div>
  )
}
