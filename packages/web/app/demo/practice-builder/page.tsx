'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/db/supabase'
import { useTeam } from '@/lib/contexts/team-context'
import Link from 'next/link'

// Types
interface Drill {
  id: string
  title: string
  description: string
  category: string
  duration_minutes: number
  skill_level: string
  age_min: number | null
  age_max: number | null
}

interface PracticeDrill {
  drillId: string
  drill: Drill
  section: 'warm_up' | 'main' | 'cool_down'
  duration_minutes: number
  notes: string
  sequence_order: number
}

interface PracticeMetadata {
  practice_date: string
  duration_minutes: number
  location: string
  notes: string
  objectives: string
}

export default function PracticeBuilderPage() {
  // Auth & Team state
  const { selectedTeamId, selectTeam } = useTeam()
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Practice metadata
  const [practiceMetadata, setPracticeMetadata] = useState<PracticeMetadata>({
    practice_date: new Date().toISOString().split('T')[0],
    duration_minutes: 60,
    location: '',
    notes: '',
    objectives: '',
  })

  // Drill library state
  const [allDrills, setAllDrills] = useState<Drill[]>([])
  const [filteredDrills, setFilteredDrills] = useState<Drill[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [loadingDrills, setLoadingDrills] = useState(false)

  // Practice plan state
  const [practiceDrills, setPracticeDrills] = useState<PracticeDrill[]>([])
  const [draggedDrill, setDraggedDrill] = useState<Drill | PracticeDrill | null>(null)
  const [draggedFrom, setDraggedFrom] = useState<'library' | 'practice' | null>(null)

  // Save state
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Auth check
  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError) {
          console.log('Auth error, clearing session:', userError)
          await supabase.auth.signOut()
          setError('Please sign in to create practice plans')
          setLoading(false)
          return
        }

        if (!user) {
          setError('Please sign in to create practice plans')
          setLoading(false)
          return
        }

        setUserId(user.id)

        // Auto-select first team if none selected
        if (!selectedTeamId) {
          const { data: teamMembers, error: teamError } = await supabase
            .from('team_members')
            .select('team_id')
            .eq('user_id', user.id)
            .limit(1)

          if (teamError || !teamMembers || teamMembers.length === 0) {
            setError('No team found. Please join a team first.')
            setLoading(false)
            return
          }

          selectTeam(teamMembers[0].team_id)
        }

        setLoading(false)
      } catch (err) {
        console.error('Auth error:', err)
        setError('Authentication error')
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Load drills
  useEffect(() => {
    async function loadDrills() {
      if (!selectedTeamId) return

      setLoadingDrills(true)
      try {
        const { data, error: drillsError } = await supabase
          .from('drills')
          .select('*')
          .order('category')
          .order('title')

        if (drillsError) throw drillsError

        setAllDrills(data || [])
        setFilteredDrills(data || [])
        console.log(`✅ Loaded ${data?.length || 0} drills`)
      } catch (err) {
        console.error('Error loading drills:', err)
        setError('Failed to load drill library')
      } finally {
        setLoadingDrills(false)
      }
    }

    loadDrills()
  }, [selectedTeamId])

  // Filter drills based on search and category
  useEffect(() => {
    let filtered = allDrills

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(d => d.category === categoryFilter)
    }

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(d =>
        d.title.toLowerCase().includes(search) ||
        d.description.toLowerCase().includes(search)
      )
    }

    setFilteredDrills(filtered)
  }, [searchTerm, categoryFilter, allDrills])

  // Drag handlers for drills from library
  const handleDragStart = (drill: Drill, from: 'library' | 'practice') => {
    setDraggedDrill(drill)
    setDraggedFrom(from)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDropOnSection = (section: 'warm_up' | 'main' | 'cool_down') => {
    if (!draggedDrill) return

    if (draggedFrom === 'library') {
      // Adding from library
      const drill = draggedDrill as Drill
      const newPracticeDrill: PracticeDrill = {
        drillId: drill.id,
        drill: drill,
        section,
        duration_minutes: drill.duration_minutes,
        notes: '',
        sequence_order: practiceDrills.filter(pd => pd.section === section).length,
      }
      setPracticeDrills([...practiceDrills, newPracticeDrill])
    } else if (draggedFrom === 'practice') {
      // Moving between sections
      const existingDrill = draggedDrill as PracticeDrill
      setPracticeDrills(practiceDrills.map(pd =>
        pd.drillId === existingDrill.drillId && pd.section === existingDrill.section
          ? { ...pd, section, sequence_order: practiceDrills.filter(d => d.section === section).length }
          : pd
      ))
    }

    setDraggedDrill(null)
    setDraggedFrom(null)
  }

  const removeDrill = (drillId: string, section: string) => {
    setPracticeDrills(practiceDrills.filter(pd => !(pd.drillId === drillId && pd.section === section)))
  }

  const updateDrillDuration = (drillId: string, section: string, duration: number) => {
    setPracticeDrills(practiceDrills.map(pd =>
      pd.drillId === drillId && pd.section === section
        ? { ...pd, duration_minutes: duration }
        : pd
    ))
  }

  const updateDrillNotes = (drillId: string, section: string, notes: string) => {
    setPracticeDrills(practiceDrills.map(pd =>
      pd.drillId === drillId && pd.section === section
        ? { ...pd, notes }
        : pd
    ))
  }

  // Calculate total time
  const totalAllocatedTime = practiceDrills.reduce((sum, pd) => sum + pd.duration_minutes, 0)
  const timeRemaining = practiceMetadata.duration_minutes - totalAllocatedTime

  // Save practice plan
  const savePracticePlan = async () => {
    if (!selectedTeamId || !userId) return

    setSaving(true)
    setSaveSuccess(false)

    try {
      // Insert practice
      const { data: practice, error: practiceError } = await supabase
        .from('practices')
        .insert({
          team_id: selectedTeamId,
          practice_date: practiceMetadata.practice_date,
          duration_minutes: practiceMetadata.duration_minutes,
          location: practiceMetadata.location || null,
          notes: practiceMetadata.notes || null,
          objectives: practiceMetadata.objectives || null,
          generated_by_ai: false,
          status: 'planned',
        })
        .select()
        .single()

      if (practiceError) throw practiceError

      // Insert practice drills
      const drillsToInsert = practiceDrills.map((pd, idx) => ({
        practice_id: practice.id,
        drill_id: pd.drillId,
        section: pd.section,
        sequence_order: idx,
        duration_minutes: pd.duration_minutes,
        notes: pd.notes || null,
        modifications: null,
        completed: false,
      }))

      const { error: drillsError } = await supabase
        .from('practice_drills')
        .insert(drillsToInsert)

      if (drillsError) throw drillsError

      console.log('✅ Practice plan saved successfully')
      setSaveSuccess(true)

      // Reset form after 2 seconds
      setTimeout(() => {
        window.location.href = '/demo/practice-history'
      }, 2000)
    } catch (err) {
      console.error('Error saving practice plan:', err)
      alert('Failed to save practice plan. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Get drills by section
  const getDrillsBySection = (section: 'warm_up' | 'main' | 'cool_down') => {
    return practiceDrills
      .filter(pd => pd.section === section)
      .sort((a, b) => a.sequence_order - b.sequence_order)
  }

  const getSectionTime = (section: 'warm_up' | 'main' | 'cool_down') => {
    return getDrillsBySection(section).reduce((sum, pd) => sum + pd.duration_minutes, 0)
  }

  // Get unique categories
  const categories = Array.from(new Set(allDrills.map(d => d.category))).sort()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading practice builder...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Practice Plan Builder</h1>
              <p className="text-sm md:text-base text-gray-600">Create a custom practice plan by selecting drills from the library</p>
            </div>
            <Link
              href="/demo/practice-history"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-center whitespace-nowrap min-h-[44px] flex items-center justify-center touch-manipulation"
            >
              View History
            </Link>
          </div>

          {/* Practice Metadata Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div>
              <label htmlFor="practice-date" className="block text-sm font-medium text-gray-700 mb-2">
                Practice Date *
              </label>
              <input
                id="practice-date"
                type="date"
                value={practiceMetadata.practice_date}
                onChange={(e) => setPracticeMetadata({ ...practiceMetadata, practice_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Total Duration (min) *
              </label>
              <input
                id="duration"
                type="number"
                min="15"
                max="180"
                value={practiceMetadata.duration_minutes}
                onChange={(e) => setPracticeMetadata({ ...practiceMetadata, duration_minutes: parseInt(e.target.value) || 60 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={practiceMetadata.location}
                onChange={(e) => setPracticeMetadata({ ...practiceMetadata, location: e.target.value })}
                placeholder="Ice Arena, Rink name, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end">
              <div className={`w-full px-4 py-3 rounded-md text-center font-semibold ${
                timeRemaining === 0
                  ? 'bg-green-100 text-green-800'
                  : timeRemaining < 0
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {timeRemaining >= 0 ? `${timeRemaining} min remaining` : `${Math.abs(timeRemaining)} min over`}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="objectives" className="block text-sm font-medium text-gray-700 mb-2">
                Objectives
              </label>
              <textarea
                id="objectives"
                value={practiceMetadata.objectives}
                onChange={(e) => setPracticeMetadata({ ...practiceMetadata, objectives: e.target.value })}
                placeholder="What are the goals for this practice?"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                id="notes"
                value={practiceMetadata.notes}
                onChange={(e) => setPracticeMetadata({ ...practiceMetadata, notes: e.target.value })}
                placeholder="Any additional notes or reminders"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Main Content: Drill Library + Practice Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Drill Library */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 md:p-6 lg:sticky lg:top-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">📚 Drill Library</h2>
              <p className="text-sm text-gray-600 mb-4 md:hidden">
                Tap the colored buttons to add drills to your practice sections
              </p>

              {/* Search and Filter */}
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Search drills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Drill List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {loadingDrills ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading drills...</p>
                  </div>
                ) : filteredDrills.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No drills found</p>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredDrills.map(drill => (
                    <div
                      key={drill.id}
                      draggable
                      onDragStart={() => handleDragStart(drill, 'library')}
                      className="p-3 border border-gray-200 rounded-md hover:border-blue-400 hover:bg-blue-50 cursor-move transition-colors"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm flex-1">{drill.title}</h3>
                        <span className="text-xs text-gray-600 font-semibold ml-2 whitespace-nowrap">
                          {drill.duration_minutes} min
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">{drill.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                          {drill.category}
                        </span>
                        {drill.skill_level && drill.skill_level !== 'all' && (
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                            {drill.skill_level}
                          </span>
                        )}
                      </div>

                      {/* Mobile-friendly "Add to Section" buttons */}
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <button
                          onClick={() => handleDropOnSection('warm_up')}
                          onClickCapture={(e) => {
                            e.stopPropagation()
                            setDraggedDrill(drill)
                            setDraggedFrom('library')
                          }}
                          className="flex items-center justify-center gap-1 py-2 px-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-md text-xs font-semibold text-amber-900 transition-colors touch-manipulation active:scale-95 min-h-[44px]"
                          title="Add to Warm-up"
                        >
                          <span className="text-sm">🔥</span>
                          <span className="hidden sm:inline">Warm-up</span>
                        </button>
                        <button
                          onClick={() => handleDropOnSection('main')}
                          onClickCapture={(e) => {
                            e.stopPropagation()
                            setDraggedDrill(drill)
                            setDraggedFrom('library')
                          }}
                          className="flex items-center justify-center gap-1 py-2 px-2 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-md text-xs font-semibold text-blue-900 transition-colors touch-manipulation active:scale-95 min-h-[44px]"
                          title="Add to Main"
                        >
                          <span className="text-sm">⚡</span>
                          <span className="hidden sm:inline">Main</span>
                        </button>
                        <button
                          onClick={() => handleDropOnSection('cool_down')}
                          onClickCapture={(e) => {
                            e.stopPropagation()
                            setDraggedDrill(drill)
                            setDraggedFrom('library')
                          }}
                          className="flex items-center justify-center gap-1 py-2 px-2 bg-green-50 hover:bg-green-100 border border-green-300 rounded-md text-xs font-semibold text-green-900 transition-colors touch-manipulation active:scale-95 min-h-[44px]"
                          title="Add to Cool-down"
                        >
                          <span className="text-sm">❄️</span>
                          <span className="hidden sm:inline">Cool-down</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Practice Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Warm-up Section */}
            <PracticeSection
              title="Warm-up"
              section="warm_up"
              drills={getDrillsBySection('warm_up')}
              totalTime={getSectionTime('warm_up')}
              onDragOver={handleDragOver}
              onDrop={() => handleDropOnSection('warm_up')}
              onRemoveDrill={removeDrill}
              onUpdateDuration={updateDrillDuration}
              onUpdateNotes={updateDrillNotes}
              onDragStart={handleDragStart}
            />

            {/* Main Section */}
            <PracticeSection
              title="Main Practice"
              section="main"
              drills={getDrillsBySection('main')}
              totalTime={getSectionTime('main')}
              onDragOver={handleDragOver}
              onDrop={() => handleDropOnSection('main')}
              onRemoveDrill={removeDrill}
              onUpdateDuration={updateDrillDuration}
              onUpdateNotes={updateDrillNotes}
              onDragStart={handleDragStart}
            />

            {/* Cool-down Section */}
            <PracticeSection
              title="Cool-down"
              section="cool_down"
              drills={getDrillsBySection('cool_down')}
              totalTime={getSectionTime('cool_down')}
              onDragOver={handleDragOver}
              onDrop={() => handleDropOnSection('cool_down')}
              onRemoveDrill={removeDrill}
              onUpdateDuration={updateDrillDuration}
              onUpdateNotes={updateDrillNotes}
              onDragStart={handleDragStart}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">
                Total: {totalAllocatedTime} min allocated of {practiceMetadata.duration_minutes} min
                {practiceDrills.length > 0 && (
                  <span className="ml-2 text-gray-900 font-semibold">
                    • {practiceDrills.length} drill{practiceDrills.length !== 1 ? 's' : ''} selected
                  </span>
                )}
              </p>
              {saveSuccess && (
                <p className="text-sm text-green-600 font-semibold mt-1">
                  ✅ Practice plan saved! Redirecting...
                </p>
              )}
            </div>

            <button
              onClick={savePracticePlan}
              disabled={saving || practiceDrills.length === 0 || !practiceMetadata.practice_date}
              className={`w-full md:w-auto px-6 py-3 rounded-md font-semibold transition-colors touch-manipulation min-h-[56px] ${
                saving || practiceDrills.length === 0 || !practiceMetadata.practice_date
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {saving ? 'Saving...' : 'Save Practice Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Practice Section Component
interface PracticeSectionProps {
  title: string
  section: 'warm_up' | 'main' | 'cool_down'
  drills: PracticeDrill[]
  totalTime: number
  onDragOver: (e: React.DragEvent) => void
  onDrop: () => void
  onRemoveDrill: (drillId: string, section: string) => void
  onUpdateDuration: (drillId: string, section: string, duration: number) => void
  onUpdateNotes: (drillId: string, section: string, notes: string) => void
  onDragStart: (drill: PracticeDrill, from: 'practice') => void
}

function PracticeSection({
  title,
  section,
  drills,
  totalTime,
  onDragOver,
  onDrop,
  onRemoveDrill,
  onUpdateDuration,
  onUpdateNotes,
  onDragStart,
}: PracticeSectionProps) {
  const sectionEmoji = section === 'warm_up' ? '🔥' : section === 'main' ? '⚡' : '❄️'
  const sectionColor = section === 'warm_up' ? 'amber' : section === 'main' ? 'blue' : 'green'

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
          <span>{sectionEmoji}</span>
          <span>{title}</span>
          <span className="text-sm md:text-base font-semibold text-gray-600">
            ({drills.length})
          </span>
        </h2>
        <span className="text-xs md:text-sm font-semibold text-gray-600 bg-gray-100 px-2 md:px-3 py-1 rounded-full">
          {totalTime} min
        </span>
      </div>

      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`min-h-[150px] md:min-h-[200px] border-2 border-dashed rounded-lg p-3 md:p-4 ${
          drills.length === 0
            ? 'border-gray-300 bg-gray-50'
            : `border-${sectionColor}-300 bg-${sectionColor}-50`
        }`}
      >
        {drills.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-sm md:text-base text-gray-500">
              <span className="hidden md:inline">Drag drills here or use the buttons above to add to {title.toLowerCase()}</span>
              <span className="md:hidden">Tap buttons on drill cards to add to {title.toLowerCase()}</span>
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {drills.map((pd, idx) => (
              <div
                key={`${pd.drillId}-${section}`}
                draggable
                onDragStart={() => onDragStart(pd, 'practice')}
                className="bg-white border border-gray-300 rounded-md p-3 md:p-4 cursor-move hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-500">#{idx + 1}</span>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{pd.drill.title}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-2">{pd.drill.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                        {pd.drill.category}
                      </span>
                      <span className="text-xs text-gray-600 font-semibold">
                        {pd.duration_minutes} min
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveDrill(pd.drillId, section)}
                    className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Remove drill"
                    aria-label="Remove drill"
                  >
                    <span className="text-xl font-bold">×</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Duration (min)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={pd.duration_minutes}
                      onChange={(e) => onUpdateDuration(pd.drillId, section, parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <input
                      type="text"
                      value={pd.notes}
                      onChange={(e) => onUpdateNotes(pd.drillId, section, e.target.value)}
                      placeholder="Modifications, focus..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
