/**
 * Mock data factories for tests
 * These create realistic test data that matches the database schema
 */

export const createMockUser = (overrides = {}) => ({
  id: 'test-user-123',
  email: 'test@example.com',
  created_at: '2024-01-01T00:00:00Z',
  ...overrides,
})

export const createMockTeam = (overrides = {}) => ({
  id: 'test-team-123',
  name: 'Test Team',
  age_group: 'U12',
  level: 'A',
  season: '2024-2025',
  organization_id: 'test-org-123',
  created_at: '2024-01-01T00:00:00Z',
  ...overrides,
})

export const createMockPlayer = (overrides = {}) => ({
  id: 'test-player-123',
  team_id: 'test-team-123',
  jersey_number: 7,
  first_name: 'John',
  last_name: 'Doe',
  position: 'forward' as const,
  created_at: '2024-01-01T00:00:00Z',
  ...overrides,
})

export const createMockGame = (overrides = {}) => ({
  id: 'test-game-123',
  team_id: 'test-team-123',
  opponent_name: 'Opponent Team',
  game_date: '2024-01-15',
  location: 'Ice Arena',
  period: 1,
  our_score: 2,
  opponent_score: 1,
  status: 'in_progress' as const,
  created_at: '2024-01-15T10:00:00Z',
  ...overrides,
})

export const createMockGameEvent = (overrides = {}) => ({
  id: 'test-event-123',
  game_id: 'test-game-123',
  player_id: 'test-player-123',
  event_type: 'shot' as const,
  period: 1,
  x: 95,
  y: 50,
  timestamp: '2024-01-15T10:15:00Z',
  created_at: '2024-01-15T10:15:00Z',
  ...overrides,
})

export const createMockShotEvent = (overrides = {}) =>
  createMockGameEvent({
    event_type: 'shot',
    x: 95,
    y: 50,
    result: 'miss',
    ...overrides,
  })

export const createMockGoalEvent = (overrides = {}) =>
  createMockGameEvent({
    event_type: 'shot',
    x: 95,
    y: 50,
    result: 'goal',
    ...overrides,
  })

export const createMockTurnoverEvent = (overrides = {}) =>
  createMockGameEvent({
    event_type: 'turnover',
    x: 50,
    y: 50,
    zone: 'neutral',
    ...overrides,
  })

/**
 * Create multiple players with sequential jersey numbers
 */
export const createMockRoster = (count: number, teamId = 'test-team-123') => {
  return Array.from({ length: count }, (_, i) =>
    createMockPlayer({
      id: `test-player-${i + 1}`,
      team_id: teamId,
      jersey_number: i + 1,
      first_name: `Player${i + 1}`,
      last_name: `Test`,
      position: i % 3 === 0 ? 'forward' : i % 3 === 1 ? 'defense' : 'goalie',
    })
  )
}

/**
 * Create a complete game with events
 */
export const createMockGameWithEvents = () => {
  const game = createMockGame()
  const players = createMockRoster(15, game.team_id)

  const events = [
    createMockShotEvent({ id: 'event-1', player_id: players[0].id }),
    createMockGoalEvent({ id: 'event-2', player_id: players[1].id }),
    createMockTurnoverEvent({ id: 'event-3', player_id: players[2].id }),
  ]

  return { game, players, events }
}
