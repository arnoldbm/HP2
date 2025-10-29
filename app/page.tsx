export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            HP2 - Hockey Practice Planner
          </h1>
          <p className="text-gray-600 mb-8">
            AI-powered practice planning with live game tracking
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Demo Pages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/demo/game-tracking"
                  className="block p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    🏒 Game Tracking
                  </h3>
                  <p className="text-blue-700 text-sm">
                    Track live game events with interactive ice surface
                  </p>
                </a>

                <a
                  href="/demo/analytics"
                  className="block p-6 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    📊 Analytics & AI Plans
                  </h3>
                  <p className="text-purple-700 text-sm">
                    View game analytics and generate AI practice plans
                  </p>
                </a>

                <a
                  href="/demo/practice-history"
                  className="block p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    📋 Practice History
                  </h3>
                  <p className="text-green-700 text-sm">
                    View all saved practice plans (AI-generated and manual)
                  </p>
                </a>

                <a
                  href="/demo/drills"
                  className="block p-6 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">
                    🥅 Drill Library
                  </h3>
                  <p className="text-orange-700 text-sm">
                    Browse and search the drill library
                  </p>
                </a>

                <a
                  href="/demo/ice-surface"
                  className="block p-6 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                    🧊 Ice Surface
                  </h3>
                  <p className="text-indigo-700 text-sm">
                    Interactive ice surface component demo
                  </p>
                </a>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Getting Started
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Start at <strong>Game Tracking</strong> to log events from a game</li>
                <li>View <strong>Analytics</strong> to see game insights and generate AI practice plans</li>
                <li>Check <strong>Practice History</strong> to see all your saved plans</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
