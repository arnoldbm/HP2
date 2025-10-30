-- Seed sample drills for the drill library
-- This migration adds a variety of hockey drills across different categories

INSERT INTO drills (
  title,
  description,
  category,
  duration_minutes,
  players_min,
  players_max,
  age_min,
  age_max,
  skill_level,
  addresses_situations
) VALUES
-- Skating Drills
(
  'Figure 8 Skating',
  'Players skate in a figure-8 pattern around cones, focusing on edge work and tight turns. Emphasize proper knee bend and weight transfer.',
  'skating',
  10,
  5,
  20,
  8,
  18,
  'all',
  '{}'
),
(
  'Crossover Circuit',
  'Set up stations in corners with pylons. Players practice forward and backward crossovers, focusing on proper technique and speed.',
  'skating',
  12,
  8,
  20,
  10,
  18,
  'intermediate',
  '{}'
),
(
  'Stops and Starts',
  'Players sprint from blue line to blue line, focusing on explosive starts and controlled stops. Emphasize low stance and powerful strides.',
  'skating',
  8,
  6,
  20,
  9,
  18,
  'all',
  '{}'
),

-- Passing Drills
(
  'Triangle Passing',
  'Three players form a triangle and pass while moving up ice. Focus on head-up passing, quick hands, and skating with the puck.',
  'passing',
  10,
  9,
  18,
  10,
  18,
  'intermediate',
  '{"passing_accuracy": true, "puck_control": true}'
),
(
  'Stationary Passing Grid',
  'Players stand 10-15 feet apart in a grid formation. Practice forehand and backhand passes, one-timers, and saucer passes.',
  'passing',
  8,
  8,
  20,
  8,
  16,
  'beginner',
  '{"passing_accuracy": true}'
),
(
  'Give and Go',
  'Players work in pairs practicing give-and-go passes while skating up ice. Emphasize timing, calling for the puck, and leading the pass.',
  'passing',
  12,
  6,
  20,
  11,
  18,
  'intermediate',
  '{"passing_accuracy": true, "timing": true}'
),

-- Shooting Drills
(
  'Wrist Shot Progression',
  'Players progress from stationary wrist shots to shooting while skating. Focus on weight transfer, follow-through, and accuracy.',
  'shooting',
  15,
  6,
  15,
  9,
  18,
  'all',
  '{"shot_quality": true, "shooting_accuracy": true}'
),
(
  'One-Timer Practice',
  'Players practice one-timers from various positions. Partner passes from different angles. Emphasize quick release and blade contact.',
  'shooting',
  12,
  8,
  20,
  12,
  18,
  'intermediate',
  '{"shot_quality": true, "one_timer_success": true}'
),
(
  'Shooting Off the Rush',
  'Players carry puck from blue line, make a move, and shoot on net. Focus on quick release and shooting in stride.',
  'shooting',
  10,
  6,
  15,
  11,
  18,
  'intermediate',
  '{"shot_quality": true, "shooting_in_stride": true}'
),

-- Breakout Drills
(
  'D-to-D Breakout',
  'Practice defenseman-to-defenseman breakouts with forwards supporting. Focus on communication, timing, and first pass accuracy.',
  'breakouts',
  15,
  9,
  18,
  12,
  18,
  'intermediate',
  '{"breakout_success": true, "passing_accuracy": true}'
),
(
  'Reverse Breakout',
  'Practice reversal breakouts when first option is covered. Emphasize reading pressure and making smart decisions under forechecking pressure.',
  'breakouts',
  12,
  9,
  18,
  13,
  18,
  'advanced',
  '{"breakout_success": true, "decision_making": true}'
),
(
  'Breakout Under Pressure',
  'Full ice breakout drill with forechecking pressure. Rotate through all positions. Focus on support, communication, and puck protection.',
  'breakouts',
  15,
  12,
  20,
  12,
  18,
  'intermediate',
  '{"breakout_success": true, "puck_protection": true, "pressure_handling": true}'
),

-- Transition Drills
(
  'Tight Turns and Puck Protection',
  'Players skate through cone course while protecting puck on inside. Practice tight turns, head-up skating, and puck control.',
  'transition',
  10,
  6,
  18,
  9,
  18,
  'all',
  '{"puck_control": true, "puck_protection": true}'
),
(
  'Stickhandling Circuit',
  'Set up stations with different stickhandling challenges: figure-8 through cones, toe drags, inside-outside moves.',
  'transition',
  12,
  8,
  20,
  10,
  18,
  'intermediate',
  '{"puck_control": true, "stickhandling": true}'
),

-- Small Area Games
(
  '2 on 2 Cross-Ice',
  'Small area game focusing on puck support, quick transitions, and creating scoring chances in tight spaces.',
  'small_area_games',
  15,
  8,
  16,
  10,
  18,
  'all',
  '{"offensive_zone_time": true, "scoring_chances": true, "support": true}'
),
(
  '3 on 3 in Zone',
  'Play 3-on-3 in offensive zone. Emphasize cycling, quick passes, getting to net, and creating space.',
  'small_area_games',
  12,
  12,
  18,
  11,
  18,
  'intermediate',
  '{"offensive_zone_time": true, "passing_accuracy": true, "net_presence": true}'
),

-- Transition - Neutral Zone
(
  'Neutral Zone Regroup',
  'Practice regrouping through neutral zone. Focus on speed through neutral zone, supporting the puck carrier, and timing.',
  'transition',
  12,
  9,
  18,
  12,
  18,
  'intermediate',
  '{"neutral_zone_success": true, "speed_through_neutral": true}'
),

-- Defensive Drills
(
  '1 on 1 Defensive',
  'Defensive players practice gap control, angling, and body positioning against attacking forwards. Focus on skating backward and staying between attacker and net.',
  'defensive_zone',
  12,
  6,
  18,
  11,
  18,
  'intermediate',
  '{"defensive_zone_coverage": true, "gap_control": true}'
),
(
  '2 on 2 Battle in Corners',
  'Practice battling for pucks in corners both offensively and defensively. Emphasize body positioning, stick work, and puck battles.',
  'defensive_zone',
  10,
  8,
  16,
  12,
  18,
  'intermediate',
  '{"puck_battles": true, "defensive_zone_coverage": true}'
),

-- Forechecking Drills
(
  'Cycle Drill',
  'Practice cycling the puck in offensive zone. Players rotate through positions, emphasize wall play and getting open.',
  'forechecking',
  15,
  9,
  18,
  12,
  18,
  'intermediate',
  '{"offensive_zone_time": true, "cycling": true, "support": true}'
),
(
  'Net Front Presence',
  'Practice getting to net front for tips, deflections, and rebounds. Emphasize fighting for position and hand-eye coordination.',
  'forechecking',
  10,
  8,
  18,
  11,
  18,
  'intermediate',
  '{"net_presence": true, "scoring_chances": true, "tips_deflections": true}'
),

-- Special Teams
(
  'Power Play Breakout and Entry',
  'Practice power play breakouts and controlled zone entries. Emphasize patience, puck movement, and creating lanes.',
  'power_play',
  15,
  10,
  18,
  13,
  18,
  'advanced',
  '{"power_play_success": true, "zone_entry_success": true}'
),
(
  'Penalty Kill Box Formation',
  'Practice 4-player box formation for penalty kill. Emphasize communication, gap control, and clearing pucks.',
  'penalty_kill',
  12,
  8,
  16,
  13,
  18,
  'advanced',
  '{"penalty_kill_success": true, "clearing": true}'
),

-- Conditioning
(
  'Suicide Skates',
  'Sprint skating from goal line to nearest blue, back, far blue, back, far goal line, back. Focus on explosive starts and conditioning.',
  'conditioning',
  8,
  6,
  20,
  10,
  18,
  'all',
  '{}'
),
(
  'Continuous 1 on 1',
  'Continuous 1-on-1 drill with quick transitions. Great for conditioning and battle situations. Players rotate quickly.',
  'conditioning',
  10,
  8,
  20,
  12,
  18,
  'intermediate',
  '{"conditioning": true, "battle_intensity": true}'
),

-- Warm-up Drills
(
  'Dynamic Skating Warm-up',
  'Light skating with dynamic stretching movements. Include crossovers, backward skating, and edge work at 50% pace.',
  'warm_up',
  10,
  6,
  20,
  8,
  18,
  'all',
  '{}'
),

-- Cool-down Drills
(
  'Easy Skate and Stretch',
  'Light skating followed by static stretching. Focus on cooling down gradually and maintaining flexibility.',
  'cool_down',
  10,
  6,
  20,
  8,
  18,
  'all',
  '{}'
);

-- Add a comment to track when drills were seeded
COMMENT ON TABLE drills IS 'Sample drills seeded on 2024-10-31';
