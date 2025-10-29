'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/db/supabase'
import { Database } from '@/lib/types/database'
import { User } from '@supabase/supabase-js'

type Drill = Database['public']['Tables']['drills']['Row']
type DrillCategory = Database['public']['Enums']['drill_category']
type SkillLevel = Database['public']['Enums']['skill_level']

export default function DrillLibraryPage() {
  const router = useRouter()
  const [drills, setDrills] = useState<Drill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<DrillCategory | 'all'>('all')
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<SkillLevel | 'all'>('all')
  const [selectedAgeRange, setSelectedAgeRange] = useState<'all' | '8-10' | '11-13' | '14-16' | '17+'>('all')

  useEffect(() => {
    // Check authentication
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        console.log('❌ No user found, redirecting to game-tracking page...')
        router.push('/demo/game-tracking')
        return
      }

      console.log('✅ User authenticated:', user.email)
      setUser(user)
      loadDrills()
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        console.log('❌ User signed out, redirecting...')
        router.push('/demo/game-tracking')
      } else {
        console.log('✅ User session active:', session.user.email)
        setUser(session.user)
        loadDrills()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Reload drills when filters change
  useEffect(() => {
    if (user) {
      loadDrills()
    }
  }, [selectedCategory, selectedSkillLevel, selectedAgeRange, user])

  async function loadDrills() {
    try {
      setLoading(true)
      setError(null)

      console.log('🔍 Loading drills with filters:', {
        category: selectedCategory,
        skillLevel: selectedSkillLevel,
        ageRange: selectedAgeRange
      })

      let query = supabase
        .from('drills')
        .select('*')
        .eq('is_global', true) // Only show global drills for now
        .order('category')
        .order('title')

      // Apply category filter
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory)
      }

      // Apply skill level filter
      if (selectedSkillLevel !== 'all') {
        query = query.eq('skill_level', selectedSkillLevel)
      }

      // Apply age range filter
      if (selectedAgeRange !== 'all') {
        const ageRanges = {
          '8-10': { min: 8, max: 10 },
          '11-13': { min: 11, max: 13 },
          '14-16': { min: 14, max: 16 },
          '17+': { min: 17, max: 21 },
        }
        const range = ageRanges[selectedAgeRange]
        query = query
          .lte('age_min', range.max)
          .gte('age_max', range.min)
      }

      const { data, error: fetchError } = await query

      if (fetchError) {
        console.error('❌ Error fetching drills:', fetchError)
        throw fetchError
      }

      console.log(`✅ Loaded ${data?.length || 0} drills`)
      setDrills(data || [])
    } catch (err) {
      console.error('❌ Error loading drills:', err)
      setError(err instanceof Error ? err.message : 'Failed to load drills')
    } finally {
      setLoading(false)
    }
  }

  // Filter drills by search query (client-side)
  const filteredDrills = drills.filter(drill => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      drill.title.toLowerCase().includes(query) ||
      drill.description.toLowerCase().includes(query) ||
      drill.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  })

  // Group drills by category
  const drillsByCategory = filteredDrills.reduce((acc, drill) => {
    if (!acc[drill.category]) {
      acc[drill.category] = []
    }
    acc[drill.category].push(drill)
    return acc
  }, {} as Record<string, Drill[]>)

  const categories: DrillCategory[] = [
    'shooting', 'passing', 'skating', 'breakouts', 'forechecking', 'backchecking',
    'defensive_zone', 'power_play', 'penalty_kill', 'transition', 'faceoffs',
    'warm_up', 'cool_down', 'conditioning', 'small_area_games', 'scrimmage'
  ]

  const skillLevels: SkillLevel[] = ['beginner', 'intermediate', 'advanced', 'all']

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Drill Library</h1>
          <p className="text-gray-600">
            Browse our library of {drills.length} hockey drills. Filter by category, skill level, and age group.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Search Bar */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Drills
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as DrillCategory | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Level Filter */}
            <div>
              <label htmlFor="skill-level" className="block text-sm font-medium text-gray-700 mb-2">
                Skill Level
              </label>
              <select
                id="skill-level"
                value={selectedSkillLevel}
                onChange={(e) => setSelectedSkillLevel(e.target.value as SkillLevel | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Skill Levels</option>
                {skillLevels.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Age Range Filter */}
            <div>
              <label htmlFor="age-range" className="block text-sm font-medium text-gray-700 mb-2">
                Age Range
              </label>
              <select
                id="age-range"
                value={selectedAgeRange}
                onChange={(e) => setSelectedAgeRange(e.target.value as typeof selectedAgeRange)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Ages</option>
                <option value="8-10">8-10 years</option>
                <option value="11-13">11-13 years</option>
                <option value="14-16">14-16 years</option>
                <option value="17+">17+ years</option>
              </select>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(selectedCategory !== 'all' || selectedSkillLevel !== 'all' || selectedAgeRange !== 'all' || searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-2 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {selectedCategory.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-2 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSkillLevel !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {selectedSkillLevel.charAt(0).toUpperCase() + selectedSkillLevel.slice(1)}
                  <button
                    onClick={() => setSelectedSkillLevel('all')}
                    className="ml-2 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedAgeRange !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  Ages {selectedAgeRange}
                  <button
                    onClick={() => setSelectedAgeRange('all')}
                    className="ml-2 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredDrills.length} of {drills.length} drills
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading drills...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {/* Drills List (Grouped by Category) */}
        {!loading && !error && (
          <div className="space-y-8">
            {Object.entries(drillsByCategory).map(([category, categoryDrills]) => (
              <div key={category}>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                  {category.replace(/_/g, ' ')} ({categoryDrills.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryDrills.map(drill => (
                    <div
                      key={drill.id}
                      onClick={() => setSelectedDrill(drill)}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="mb-3">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{drill.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="px-2 py-0.5 bg-gray-100 rounded">
                            {drill.duration_minutes} min
                          </span>
                          {drill.skill_level && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded capitalize">
                              {drill.skill_level}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {drill.description}
                      </p>

                      {drill.age_min && drill.age_max && (
                        <p className="text-xs text-gray-500 mb-2">
                          Ages: {drill.age_min}-{drill.age_max}
                        </p>
                      )}

                      {drill.tags && drill.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {drill.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {drill.tags.length > 3 && (
                            <span className="inline-block px-2 py-0.5 text-gray-500 text-xs">
                              +{drill.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* No Results */}
            {filteredDrills.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No drills found matching your filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedSkillLevel('all')
                    setSelectedAgeRange('all')
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Drill Detail Modal */}
        {selectedDrill && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedDrill(null)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedDrill.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 rounded-md text-sm font-medium capitalize">
                        {selectedDrill.category.replace(/_/g, ' ')}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                        {selectedDrill.duration_minutes} min
                      </span>
                      {selectedDrill.skill_level && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium capitalize">
                          {selectedDrill.skill_level}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDrill(null)}
                    className="ml-4 text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Age Range */}
                {selectedDrill.age_min && selectedDrill.age_max && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Age Range:</strong> {selectedDrill.age_min}-{selectedDrill.age_max} years
                    </p>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedDrill.description}</p>
                </div>

                {/* Tags */}
                {selectedDrill.tags && selectedDrill.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDrill.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Metadata (addresses_situations) */}
                {selectedDrill.addresses_situations && Object.keys(selectedDrill.addresses_situations).length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Addresses Game Situations</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <p className="text-sm text-blue-900 mb-2">
                        This drill can help improve the following areas identified in game analytics:
                      </p>
                      <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                        {Object.entries(selectedDrill.addresses_situations as Record<string, boolean>)
                          .filter(([_, value]) => value === true)
                          .map(([key, _]) => (
                            <li key={key}>
                              {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Player Requirements */}
                {(selectedDrill.players_min || selectedDrill.players_max) && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Players Required</h3>
                    <p className="text-gray-700">
                      {selectedDrill.players_min && selectedDrill.players_max
                        ? `${selectedDrill.players_min}-${selectedDrill.players_max} players`
                        : selectedDrill.players_min
                        ? `Minimum ${selectedDrill.players_min} players`
                        : `Maximum ${selectedDrill.players_max} players`}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => setSelectedDrill(null)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
                  >
                    Close
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    onClick={() => {
                      alert('Add to practice plan feature coming soon!')
                    }}
                  >
                    Add to Practice Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
