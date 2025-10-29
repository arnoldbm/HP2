import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

// Initialize Supabase client with service role key for server-side operations
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

// Types for request body
interface GameAnalytics {
  shotQualityStats: {
    totalShots: number
    totalGoals: number
    shootingPercentage: number
    highDangerShots: number
    highDangerGoals: number
    highDangerPercentage: number
    mediumDangerShots: number
    lowDangerShots: number
  }
  breakoutAnalytics: {
    totalBreakouts: number
    successfulBreakouts: number
    failedBreakouts: number
    successRate: number
    byType: Array<{
      type: string
      total: number
      successful: number
      successRate: number
    }>
  }
  turnoverCount: number
  periodStats: Array<{
    period: number
    shots: number
    goals: number
    events: number
  }>
  situationStats: {
    evenStrength: { shots: number; goals: number; percentage: number }
    powerPlay: { shots: number; goals: number; percentage: number }
    penaltyKill: { shots: number; goals: number; percentage: number }
  }
}

interface GeneratePracticePlanRequest {
  teamId: string
  gameId?: string
  analytics: GameAnalytics
  practiceDuration?: number // in minutes, default 60
  teamAge?: number // age of team for appropriate drills
}

// AI prompt template for practice plan generation
function buildPracticePlanPrompt(analytics: GameAnalytics, drills: any[], teamAge?: number): string {
  const { shotQualityStats, breakoutAnalytics, turnoverCount, periodStats, situationStats } = analytics

  // Provide defaults for missing stats
  const totalShots = shotQualityStats?.totalShots || 0
  const totalGoals = shotQualityStats?.totalGoals || 0
  const shootingPercentage = shotQualityStats?.shootingPercentage || 0
  const highDangerShots = shotQualityStats?.highDangerShots || 0
  const highDangerGoals = shotQualityStats?.highDangerGoals || 0
  const highDangerPercentage = shotQualityStats?.highDangerPercentage || 0
  const mediumDangerShots = shotQualityStats?.mediumDangerShots || 0
  const lowDangerShots = shotQualityStats?.lowDangerShots || 0

  return `You are a professional hockey coach analyzing game performance data to create a targeted practice plan.

## GAME PERFORMANCE ANALYSIS

### Shot Quality & Scoring
- Total Shots: ${totalShots} (${totalGoals} goals, ${shootingPercentage.toFixed(1)}% shooting)
- High Danger Shots: ${highDangerShots} (${highDangerGoals} goals, ${highDangerPercentage.toFixed(1)}% of total shots)
- Medium Danger: ${mediumDangerShots} shots
- Low Danger: ${lowDangerShots} shots

${highDangerPercentage < 30 ? '⚠️ LOW HIGH-DANGER SHOTS - Need to work on getting to the net' : ''}
${shootingPercentage < 10 ? '⚠️ LOW SHOOTING PERCENTAGE - Need to work on shot accuracy and quality' : ''}

### Breakout Performance
- Success Rate: ${(breakoutAnalytics?.successRate || 0).toFixed(1)}% (${breakoutAnalytics?.successfulBreakouts || 0}/${breakoutAnalytics?.totalBreakouts || 0})
${(breakoutAnalytics?.successRate || 0) < 60 ? '⚠️ POOR BREAKOUT EXECUTION - High priority for practice' : ''}

Breakout Types:
${Array.isArray(breakoutAnalytics?.byType) ? breakoutAnalytics.byType.map(bt => `- ${bt.type}: ${bt.successRate.toFixed(1)}% success (${bt.successful}/${bt.total})`).join('\n') : 'No breakout data available'}

### Turnovers
- Total Turnovers: ${turnoverCount}
${turnoverCount > 15 ? '⚠️ HIGH TURNOVER COUNT - Need puck protection drills' : ''}

### Period-by-Period Trends
${periodStats.map(ps => `Period ${ps.period}: ${ps.shots} shots, ${ps.goals} goals, ${ps.events} total events`).join('\n')}

### Special Teams
- Power Play: ${situationStats?.powerPlay?.shots || 0} shots, ${situationStats?.powerPlay?.goals || 0} goals (${(situationStats?.powerPlay?.percentage || 0).toFixed(1)}%)
- Penalty Kill: ${situationStats?.penaltyKill?.shots || 0} shots allowed, ${situationStats?.penaltyKill?.goals || 0} goals allowed

## AVAILABLE DRILLS

You have access to ${drills.length} drills. Each drill has metadata about what game situations it addresses.

Key drills available:
${drills.slice(0, 20).map(d => `- ${d.title} (${d.category}, ${d.duration_minutes}min) - ${d.skill_level} level`).join('\n')}

... and ${drills.length - 20} more drills

## YOUR TASK

Based on the game performance data above, create a practice plan that addresses the team's weaknesses.

1. IDENTIFY TOP 3 FOCUS AREAS from the analytics (e.g., "Low high-danger shots", "Poor breakout execution", "High turnovers")

2. SELECT 6-8 DRILLS that address these focus areas:
   - Start with warm-up (5-10 min)
   - Main skills/drills section (35-40 min) - focus on weaknesses
   - Small area game or scrimmage (10-15 min)
   - Cool down (5 min)

3. For EACH drill selection, explain:
   - Which specific weakness it addresses
   - What improvement you expect to see
   - Reference specific stats from the game

4. IMPORTANT: Return ONLY valid JSON in this exact format:

{
  "reasoning": {
    "top_focus_areas": ["focus area 1", "focus area 2", "focus area 3"],
    "overall_assessment": "2-3 sentence summary of team performance",
    "practice_goals": ["goal 1", "goal 2", "goal 3"]
  },
  "practice_plan": {
    "total_duration_minutes": 60,
    "sections": [
      {
        "section": "warm_up",
        "drills": [
          {
            "drill_title": "exact drill title from available drills",
            "duration_minutes": 10,
            "reason": "Why this drill was chosen based on game data",
            "addresses": "specific weakness from analytics",
            "expected_improvement": "what we expect to improve"
          }
        ]
      },
      {
        "section": "skills",
        "drills": [...]
      },
      {
        "section": "scrimmage",
        "drills": [...]
      },
      {
        "section": "cool_down",
        "drills": [...]
      }
    ]
  }
}

CRITICAL: Only use drill titles that EXACTLY match the available drills list. Be specific about which stats led to each drill selection.`
}

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI is configured
    if (!openai) {
      return NextResponse.json(
        {
          error: 'OpenAI API key not configured',
          message: 'Please add OPENAI_API_KEY to your .env.local file',
        },
        { status: 500 }
      )
    }

    // Parse request body
    const body: GeneratePracticePlanRequest = await request.json()
    const { teamId, gameId, analytics, practiceDuration = 60, teamAge } = body

    console.log('🤖 Generating AI practice plan for team:', teamId)
    console.log('📊 Game analytics:', JSON.stringify(analytics, null, 2))

    // Fetch all available drills from database
    const { data: drills, error: drillsError } = await supabase
      .from('drills')
      .select('*')
      .eq('is_global', true)
      .order('category')
      .order('title')

    if (drillsError) {
      console.error('❌ Error fetching drills:', drillsError)
      return NextResponse.json(
        { error: 'Failed to fetch drills from database' },
        { status: 500 }
      )
    }

    console.log(`✅ Loaded ${drills.length} drills for AI analysis`)

    // Filter drills by age appropriateness if teamAge provided
    const appropriateDrills = teamAge
      ? drills.filter(
          (d) =>
            (d.age_min === null || d.age_min <= teamAge) &&
            (d.age_max === null || d.age_max >= teamAge)
        )
      : drills

    console.log(`🎯 ${appropriateDrills.length} age-appropriate drills available`)

    // Build AI prompt
    const prompt = buildPracticePlanPrompt(analytics, appropriateDrills, teamAge)

    console.log('🤖 Sending prompt to OpenAI GPT-4...')

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert hockey coach who creates data-driven practice plans. Always return valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
      response_format: { type: 'json_object' },
    })

    const aiResponse = completion.choices[0].message.content
    console.log('✅ Received AI response')

    if (!aiResponse) {
      throw new Error('Empty response from OpenAI')
    }

    // Parse AI response
    const practicePlan = JSON.parse(aiResponse)

    console.log('📋 Practice plan generated successfully')

    // Return practice plan
    return NextResponse.json({
      success: true,
      practicePlan,
      metadata: {
        model: completion.model,
        tokensUsed: completion.usage?.total_tokens || 0,
        drillsAnalyzed: appropriateDrills.length,
        teamAge,
        gameId,
      },
    })
  } catch (error) {
    console.error('❌ Error generating practice plan:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate practice plan',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
