-- Hockey Drills Seed Data
-- 200+ hockey drills organized by category
-- Each drill includes AI integration metadata (addresses_situations)

-- SHOOTING DRILLS (30 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

-- High-danger shooting
('Slot Shooting Progression', 'Players work on shooting from the slot area. Start with stationary shots, progress to one-timers from passes. Focus on quick release and accuracy.', 'shooting', 15, 8, 21, 'all', '{"low_shot_quality": true, "high_danger_shots_low": true}', ARRAY['shooting', 'slot', 'high_danger', 'one_timer']),

('Deflection Station', 'Players practice tipping shots from the point. Defenseman shoots from the blue line while forwards work on redirecting pucks. Emphasize stick position and timing.', 'shooting', 12, 10, 21, 'intermediate', '{"low_shot_quality": true, "goal_scoring_struggles": true}', ARRAY['shooting', 'deflection', 'net_front', 'screening']),

('Breakaway Challenge', 'Players work on breakaway moves and finishing. Practice different dekes, shot selection, and reading the goalie.', 'shooting', 15, 10, 21, 'intermediate', '{"breakaway_conversion_low": true, "goal_scoring_struggles": true}', ARRAY['shooting', 'breakaway', 'dekes', 'one_on_one']),

('Wrap-Around Practice', 'Players practice wrap-around attempts from behind the net. Focus on tight turns, puck protection, and quick finish.', 'shooting', 10, 9, 21, 'beginner', '{"goal_scoring_struggles": true, "low_shot_quality": true}', ARRAY['shooting', 'wrap_around', 'net', 'puck_protection']),

('One-Timer Mastery', 'Players practice one-timers from various positions. Passes come from different angles. Focus on timing, weight transfer, and accuracy.', 'shooting', 15, 11, 21, 'advanced', '{"power_play_struggles": true, "low_shot_quality": true}', ARRAY['shooting', 'one_timer', 'passing', 'timing']),

('Quick Release Drill', 'Players work on catching and releasing shots as quickly as possible. Emphasize minimal wind-up and snap of the wrists.', 'shooting', 12, 9, 21, 'all', '{"shot_speed_low": true, "goal_scoring_struggles": true}', ARRAY['shooting', 'quick_release', 'wrist_shot', 'timing']),

('Rebound Collection', 'Players shoot, follow their shot, and practice finishing rebounds. Focus on net drive and second-chance opportunities.', 'shooting', 15, 10, 21, 'intermediate', '{"low_shot_quality": true, "net_front_presence_low": true}', ARRAY['shooting', 'rebounds', 'net_drive', 'persistence']),

('Moving Target Shooting', 'Players shoot while in motion across the ice. Practice shooting while skating at different speeds and angles.', 'shooting', 12, 10, 21, 'intermediate', '{"shooting_while_moving_poor": true, "shot_accuracy_low": true}', ARRAY['shooting', 'skating', 'motion', 'accuracy']),

('Screen and Shoot', 'Players practice shooting through screens. One player screens the goalie while another shoots from the point or slot.', 'shooting', 15, 11, 21, 'intermediate', '{"power_play_struggles": true, "low_shot_quality": true}', ARRAY['shooting', 'screening', 'net_front', 'teamwork']),

('Low-to-High Shots', 'Players practice shooting low to catch the bottom of the net or going high short-side. Emphasize shot placement over power.', 'shooting', 10, 9, 21, 'all', '{"shot_accuracy_low": true, "goal_scoring_struggles": true}', ARRAY['shooting', 'accuracy', 'placement', 'technique']),

-- Add 20 more shooting drills...
('5-Hole Challenge', 'Players work specifically on shooting five-hole. Practice reading when goalies are vulnerable and quick, low shots.', 'shooting', 10, 10, 21, 'intermediate', '{"goal_scoring_struggles": true, "shot_selection_poor": true}', ARRAY['shooting', 'five_hole', 'goalie_reading', 'low_shots']),

('Backhand Mastery', 'Dedicated backhand shooting practice. Players work on backhand accuracy, power, and quick release from various positions.', 'shooting', 12, 9, 21, 'all', '{"backhand_weak": true, "shooting_variety_low": true}', ARRAY['shooting', 'backhand', 'technique', 'variety']),

('Top Shelf Shots', 'Players practice lifting pucks to the top corners. Focus on wrist and arm extension for elevation.', 'shooting', 10, 11, 21, 'intermediate', '{"shot_elevation_poor": true, "goal_scoring_struggles": true}', ARRAY['shooting', 'top_shelf', 'elevation', 'accuracy']),

('Walk-In Wristers', 'Players practice walking in from the dots and releasing wrist shots. Emphasize deception and quick release.', 'shooting', 15, 10, 21, 'intermediate', '{"goal_scoring_struggles": true, "odd_man_rush_conversion_low": true}', ARRAY['shooting', 'wrist_shot', 'walk_in', 'deception']),

('Power Play Diamond Shooting', 'Players work on shooting from power play positions (diamond formation). Practice one-timers, tips, and screens.', 'shooting', 15, 12, 21, 'advanced', '{"power_play_struggles": true, "special_teams_weak": true}', ARRAY['shooting', 'power_play', 'diamond', 'special_teams']),

('Snap Shot Station', 'Players practice snap shots with minimal windup. Focus on quick release and power from wrist and forearm snap.', 'shooting', 12, 10, 21, 'intermediate', '{"shot_speed_low": true, "quick_release_poor": true}', ARRAY['shooting', 'snap_shot', 'quick_release', 'power']),

('Shooting Off the Pass', 'Players practice receiving passes and shooting in one motion. Work on different pass angles and shooting positions.', 'shooting', 15, 9, 21, 'all', '{"one_timer_struggles": true, "pass_reception_poor": true}', ARRAY['shooting', 'passing', 'one_touch', 'timing']),

('Weak-Side Finishing', 'Players practice shooting from their off-wing. Focus on cross-body shots and opening up for better angles.', 'shooting', 12, 11, 21, 'intermediate', '{"shot_selection_poor": true, "weak_side_struggles": true}', ARRAY['shooting', 'weak_side', 'cross_body', 'angles']),

('Point Shot Bombing', 'Defensemen practice point shots with power and accuracy. Focus on getting shots through traffic.', 'shooting', 15, 11, 21, 'intermediate', '{"point_shot_weak": true, "power_play_struggles": true}', ARRAY['shooting', 'point_shot', 'defensemen', 'power']),

('Penalty Shot Practice', 'Players practice penalty shot scenarios. Work on different moves, dekes, and shot selection under pressure.', 'shooting', 10, 10, 21, 'intermediate', '{"breakaway_conversion_low": true, "pressure_situations_poor": true}', ARRAY['shooting', 'penalty_shot', 'pressure', 'dekes']),

('Triangle Passing to Shoot', 'Three players pass in a triangle, culminating in a shot. Emphasize quick passes and shooting off the pass.', 'shooting', 15, 9, 21, 'all', '{"passing_patterns_weak": true, "shooting_after_pass_poor": true}', ARRAY['shooting', 'passing', 'triangle', 'timing']),

('Forehand-Backhand Toe Drag', 'Players practice toe-dragging from forehand to backhand and shooting. Focus on deception and quick release.', 'shooting', 12, 12, 21, 'advanced', '{"stickhandling_limited": true, "goal_scoring_struggles": true}', ARRAY['shooting', 'toe_drag', 'stickhandling', 'deception']),

('Royal Road Shots', 'Players practice shooting after receiving cross-ice passes (royal road). Emphasize quick one-timers and redirects.', 'shooting', 15, 11, 21, 'intermediate', '{"passing_execution_poor": true, "one_timer_struggles": true}', ARRAY['shooting', 'royal_road', 'one_timer', 'cross_ice']),

('Between the Legs Shot', 'Advanced players practice between-the-legs shots. Work on deception and surprising goalies.', 'shooting', 10, 13, 21, 'advanced', '{"creativity_lacking": true, "advanced_moves_needed": true}', ARRAY['shooting', 'advanced', 'between_legs', 'deception']),

('Blocker vs Glove Awareness', 'Players practice identifying blocker and glove sides and targeting accordingly. Work on shot selection based on goalie positioning.', 'shooting', 12, 11, 21, 'intermediate', '{"goalie_reading_poor": true, "shot_selection_poor": true}', ARRAY['shooting', 'goalie_reading', 'awareness', 'shot_selection']),

('Rapid Fire Shooting', 'Players shoot multiple pucks in quick succession. Focus on stamina, quick reset, and maintaining form under fatigue.', 'shooting', 10, 9, 21, 'all', '{"shooting_consistency_poor": true, "conditioning_needed": true}', ARRAY['shooting', 'conditioning', 'rapid_fire', 'consistency']),

('Post-to-Post Movement Shots', 'Players move laterally across the crease and shoot. Practice shooting while in motion and adjusting angles.', 'shooting', 15, 10, 21, 'intermediate', '{"lateral_movement_weak": true, "shooting_while_moving_poor": true}', ARRAY['shooting', 'lateral', 'crease', 'movement']),

('Shoot and Crash the Net', 'Players shoot and immediately drive to the net for rebounds. Emphasize following shots and net presence.', 'shooting', 15, 10, 21, 'all', '{"net_front_presence_low": true, "rebound_collection_weak": true}', ARRAY['shooting', 'net_drive', 'rebounds', 'persistence']),

('Slap Shot Clinic', 'Players work on slap shot technique, power, and accuracy. Focus on proper wind-up, weight transfer, and follow-through.', 'shooting', 15, 12, 21, 'intermediate', '{"slap_shot_weak": true, "point_shot_weak": true}', ARRAY['shooting', 'slap_shot', 'power', 'technique']),

('Shoot, Pivot, Defend', 'After shooting, players quickly pivot to defensive position. Combines shooting with defensive transition awareness.', 'shooting', 12, 10, 21, 'intermediate', '{"defensive_transition_slow": true, "two_way_play_needed": true}', ARRAY['shooting', 'transition', 'defense', 'awareness']);

-- PASSING DRILLS (25 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Give and Go Circuit', 'Players pass to a partner and receive return pass while moving. Emphasize passing to space and timing.', 'passing', 10, 8, 21, 'all', '{"passing_execution_poor": true, "support_positioning_weak": true}', ARRAY['passing', 'give_and_go', 'timing', 'support']),

('Saucer Pass Practice', 'Players practice lifting passes over sticks and into lanes. Work on soft hands for receiving elevated passes.', 'passing', 12, 10, 21, 'intermediate', '{"passing_over_sticks_weak": true, "passing_variety_limited": true}', ARRAY['passing', 'saucer', 'elevation', 'soft_hands']),

('One-Touch Passing', 'Players pass without stopping the puck. Emphasize quick hands, passing off either foot, and anticipation.', 'passing', 15, 10, 21, 'intermediate', '{"passing_speed_slow": true, "quick_decision_making_needed": true}', ARRAY['passing', 'one_touch', 'quick_hands', 'speed']),

('Stretch Pass Drill', 'Players practice long stretch passes to breaking forwards. Work on reading speed, leading passes, and accuracy.', 'passing', 12, 11, 21, 'intermediate', '{"stretch_pass_weak": true, "breakout_speed_slow": true}', ARRAY['passing', 'stretch', 'breakaway', 'accuracy']),

('Bumper Pass Sequence', 'Players work in the slot practicing bumper passes (backdoor passes). Emphasize finding soft areas and quick releases.', 'passing', 15, 11, 21, 'intermediate', '{"power_play_struggles": true, "slot_passes_weak": true}', ARRAY['passing', 'bumper', 'slot', 'backdoor']),

('Backhand Pass Development', 'Players practice backhand passes for accuracy and weight. Work on passing with both hands in different positions.', 'passing', 10, 9, 21, 'all', '{"backhand_passing_weak": true, "passing_versatility_limited": true}', ARRAY['passing', 'backhand', 'technique', 'versatility']),

('Passing Through Traffic', 'Players practice passing through screens and traffic. Emphasize saucer passes and finding passing lanes.', 'passing', 15, 10, 21, 'intermediate', '{"passing_under_pressure_poor": true, "passing_lanes_weak": true}', ARRAY['passing', 'traffic', 'lanes', 'pressure']),

('Cross-Ice Passing (Royal Road)', 'Players practice cross-ice passes that bisect the ice (royal road). Work on weight, timing, and accuracy.', 'passing', 12, 10, 21, 'intermediate', '{"cross_ice_passing_weak": true, "offensive_zone_movement_poor": true}', ARRAY['passing', 'cross_ice', 'royal_road', 'timing']),

('D-to-D Passing', 'Defensemen practice passing along the blue line. Work on weight, timing, and maintaining puck possession under pressure.', 'passing', 15, 10, 21, 'all', '{"d_to_d_passing_weak": true, "power_play_struggles": true}', ARRAY['passing', 'd_to_d', 'blue_line', 'possession']),

('Passing Under Pressure', 'Players pass while being pressured by a checker. Work on protecting the puck, head up, and quick decisions.', 'passing', 15, 10, 21, 'intermediate', '{"passing_under_pressure_poor": true, "puck_protection_weak": true}', ARRAY['passing', 'pressure', 'protection', 'decisions']),

('Headman Pass Drill', 'Players practice headman passes to forwards ahead of them. Emphasize reading forward speed and leading the pass.', 'passing', 10, 10, 21, 'intermediate', '{"headman_pass_weak": true, "breakout_timing_poor": true}', ARRAY['passing', 'headman', 'breakout', 'timing']),

('Behind the Net Passes', 'Players practice passes from behind the net to slot or point. Work on deception, no-look passes, and angles.', 'passing', 12, 11, 21, 'intermediate', '{"behind_net_plays_weak": true, "offensive_zone_cycling_poor": true}', ARRAY['passing', 'behind_net', 'deception', 'cycling']),

('Passing While Moving Backwards', 'Defensemen practice passing while skating backwards. Emphasize head up, soft hands, and accurate passes.', 'passing', 12, 10, 21, 'all', '{"backward_skating_passing_weak": true, "defensive_zone_exits_poor": true}', ARRAY['passing', 'backwards', 'defensemen', 'exits']),

('Soft Hands Receiving', 'Players practice receiving hard passes with soft hands. Work on cushioning passes and maintaining puck control.', 'passing', 10, 8, 21, 'all', '{"pass_reception_poor": true, "puck_handling_weak": true}', ARRAY['passing', 'soft_hands', 'reception', 'control']),

('Breakout Pass Patterns', 'Teams practice specific breakout patterns. Work on timing, support positioning, and pass execution.', 'passing', 15, 10, 21, 'all', '{"breakout_execution_poor": true, "breakout_patterns_inconsistent": true}', ARRAY['passing', 'breakout', 'patterns', 'timing']),

('Indirect Pass (Banking)', 'Players practice banking passes off the boards to teammates. Work on angles, timing, and reading speed.', 'passing', 12, 9, 21, 'all', '{"board_play_weak": true, "passing_creativity_limited": true}', ARRAY['passing', 'banking', 'boards', 'angles']),

('Quick-Up Outlet Passes', 'Defensemen practice quick outlet passes to breaking forwards. Emphasize speed, timing, and leading the pass.', 'passing', 15, 10, 21, 'intermediate', '{"outlet_pass_slow": true, "transition_speed_slow": true}', ARRAY['passing', 'outlet', 'transition', 'speed']),

('No-Look Passes', 'Advanced players practice no-look passes. Work on peripheral vision, deception, and reading teammates.', 'passing', 10, 12, 21, 'advanced', '{"creativity_lacking": true, "deception_needed": true}', ARRAY['passing', 'no_look', 'deception', 'advanced']),

('Passing in Tight Spaces', 'Players practice short, quick passes in confined areas. Emphasize quick hands and puck protection.', 'passing', 12, 9, 21, 'all', '{"passing_in_traffic_weak": true, "small_area_play_poor": true}', ARRAY['passing', 'tight_spaces', 'quick_hands', 'traffic']),

('Tape-to-Tape Accuracy', 'Players focus on passing accuracy, hitting teammate''s tape every time. Work on weight and precision.', 'passing', 10, 8, 21, 'all', '{"passing_accuracy_low": true, "fundamentals_needed": true}', ARRAY['passing', 'accuracy', 'tape_to_tape', 'fundamentals']),

('Escape Pass Under Pressure', 'Players work on making passes while being checked. Practice protecting puck and finding outlets.', 'passing', 15, 11, 21, 'intermediate', '{"passing_under_pressure_poor": true, "forecheck_escape_weak": true}', ARRAY['passing', 'pressure', 'escape', 'protection']),

('Stretch Pass Breakouts', 'Full-ice breakouts with stretch passes to breaking forwards. Work on timing, reading forwards, and accuracy.', 'passing', 15, 11, 21, 'intermediate', '{"stretch_pass_weak": true, "full_ice_transition_slow": true}', ARRAY['passing', 'stretch', 'breakout', 'full_ice']),

('Passing Combinations (Tic-Tac-Toe)', 'Players work on rapid passing combinations. Practice 2-3 quick passes culminating in a shot.', 'passing', 15, 10, 21, 'intermediate', '{"passing_combinations_weak": true, "offensive_creativity_limited": true}', ARRAY['passing', 'combinations', 'tic_tac_toe', 'offensive']),

('Reverse Pass (Drop Pass)', 'Players practice drop passes and reverse passes. Work on timing, protecting puck, and reading pressure.', 'passing', 12, 10, 21, 'intermediate', '{"drop_pass_timing_poor": true, "zone_entry_creativity_limited": true}', ARRAY['passing', 'drop_pass', 'reverse', 'creativity']),

('Cycle Passing Low-to-High', 'Players cycle the puck low and pass up to the point. Practice finding point man and creating shooting opportunities.', 'passing', 15, 11, 21, 'intermediate', '{"offensive_zone_cycling_poor": true, "low_to_high_passes_weak": true}', ARRAY['passing', 'cycling', 'low_to_high', 'offensive_zone']);

-- SKATING DRILLS (20 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Forward/Backward Transitions', 'Players practice quick pivots from forward to backward skating and vice versa. Focus on edge control and maintaining speed.', 'skating', 10, 8, 21, 'all', '{"skating_speed_slow": true, "transition_skating_weak": true}', ARRAY['skating', 'pivots', 'transitions', 'edges']),

('Power Skating Figure 8s', 'Players skate figure-8 patterns using crossovers. Work on inside and outside edges, weight transfer, and balance.', 'skating', 12, 8, 21, 'all', '{"edge_work_weak": true, "skating_agility_poor": true}', ARRAY['skating', 'figure_8', 'crossovers', 'edges']),

('Explosive Start Drill', 'Players practice explosive first three strides. Focus on knee bend, driving legs, and quick acceleration.', 'skating', 10, 9, 21, 'all', '{"first_step_quickness_slow": true, "acceleration_weak": true}', ARRAY['skating', 'starts', 'acceleration', 'explosiveness']),

('Tight Turn Drill', 'Players practice tight turns around cones or dots. Emphasize crossovers, knee bend, and maintaining speed through turns.', 'skating', 12, 8, 21, 'all', '{"tight_turns_weak": true, "agility_poor": true}', ARRAY['skating', 'tight_turns', 'agility', 'control']),

('Backward Crossovers', 'Players work specifically on backward crossovers. Focus on hip rotation, weight transfer, and maintaining vision forward.', 'skating', 10, 9, 21, 'intermediate', '{"backward_skating_weak": true, "defensive_skating_poor": true}', ARRAY['skating', 'backward', 'crossovers', 'defense']),

('Mohawk Turns', 'Players practice mohawk turns (inside edge turns changing direction). Work on balance, edge control, and body positioning.', 'skating', 12, 10, 21, 'intermediate', '{"skating_agility_poor": true, "edge_work_weak": true}', ARRAY['skating', 'mohawk', 'turns', 'edges']),

('Stop and Start Drill', 'Players practice explosive stops and restarts. Focus on proper stopping technique and immediate acceleration.', 'skating', 10, 8, 21, 'all', '{"stopping_weak": true, "acceleration_slow": true}', ARRAY['skating', 'stops', 'starts', 'explosiveness']),

('Lateral Skating (C-Cuts)', 'Players practice lateral movement using C-cuts. Work on staying low, using inside edges, and maintaining balance.', 'skating', 12, 9, 21, 'all', '{"lateral_movement_weak": true, "defensive_positioning_poor": true}', ARRAY['skating', 'lateral', 'c_cuts', 'defense']),

('Backward to Forward Pivots', 'Defensemen practice pivoting from backward to forward. Focus on quick weight transfer and maintaining gap control.', 'skating', 15, 10, 21, 'intermediate', '{"defensive_pivots_slow": true, "gap_control_weak": true}', ARRAY['skating', 'pivots', 'defense', 'transitions']),

('Edge Control Serpentine', 'Players skate serpentine patterns using only edges (no crossovers). Work on outside and inside edge control.', 'skating', 10, 9, 21, 'intermediate', '{"edge_work_weak": true, "balance_poor": true}', ARRAY['skating', 'edges', 'serpentine', 'balance']),

('Speed Skating Straightaways', 'Players work on maximum speed skating on straightaways. Focus on stride length, cadence, and proper form.', 'skating', 12, 10, 21, 'all', '{"top_speed_slow": true, "stride_efficiency_poor": true}', ARRAY['skating', 'speed', 'straightaway', 'stride']),

('One-Leg Balance Drill', 'Players practice skating and gliding on one leg. Work on balance, core strength, and edge control.', 'skating', 10, 9, 21, 'intermediate', '{"balance_poor": true, "core_strength_weak": true}', ARRAY['skating', 'balance', 'one_leg', 'core']),

('Quick Feet Drill', 'Players work on rapid foot movement in small spaces. Practice quick steps, shuffles, and direction changes.', 'skating', 12, 8, 21, 'all', '{"foot_speed_slow": true, "agility_poor": true}', ARRAY['skating', 'quick_feet', 'agility', 'footwork']),

('Backward Starts', 'Players practice explosive backward starts from standstill. Focus on first three backward strides and acceleration.', 'skating', 10, 10, 21, 'intermediate', '{"backward_acceleration_slow": true, "defensive_starts_weak": true}', ARRAY['skating', 'backward', 'starts', 'defense']),

('Power Skating Circles', 'Players skate large circles using proper crossover technique. Emphasize knee bend, weight transfer, and speed.', 'skating', 12, 8, 21, 'all', '{"crossover_technique_poor": true, "skating_power_weak": true}', ARRAY['skating', 'circles', 'crossovers', 'power']),

('Transition Skating Full-Ice', 'Players skate full-ice alternating forward/backward every blue line. Work on smooth transitions and maintaining speed.', 'skating', 15, 10, 21, 'intermediate', '{"transition_skating_weak": true, "full_ice_conditioning_poor": true}', ARRAY['skating', 'transitions', 'full_ice', 'conditioning']),

('Inside Edge Work', 'Players practice using inside edges exclusively. Work on balance, power, and control on inside edges.', 'skating', 10, 9, 21, 'intermediate', '{"inside_edge_weak": true, "edge_control_poor": true}', ARRAY['skating', 'inside_edge', 'balance', 'control']),

('Skating With Resistance', 'Players skate while partner provides resistance. Work on driving through legs and maintaining proper form under pressure.', 'skating', 12, 11, 21, 'intermediate', '{"leg_drive_weak": true, "power_skating_poor": true}', ARRAY['skating', 'resistance', 'power', 'strength']),

('Agility Ladder on Ice', 'Players navigate through cones in tight patterns. Practice quick direction changes and agility at speed.', 'skating', 10, 9, 21, 'all', '{"agility_poor": true, "quick_direction_changes_weak": true}', ARRAY['skating', 'agility', 'cones', 'direction_changes']),

('Backward Skating with Puck', 'Players skate backward while carrying puck. Work on vision, puck control, and defensive positioning.', 'skating', 12, 10, 21, 'intermediate', '{"backward_skating_with_puck_weak": true, "defensive_puck_control_poor": true}', ARRAY['skating', 'backward', 'puck_control', 'defense']);

-- BREAKOUTS DRILLS (25 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('D-to-D Breakout', 'Defensemen practice passing D-to-D behind net and up boards. Work on timing, support, and reading pressure.', 'breakouts', 15, 10, 21, 'all', '{"d_to_d_breakout_failures": true, "defensive_zone_passing_weak": true}', ARRAY['breakouts', 'd_to_d', 'defensive_zone', 'passing']),

('Reverse Breakout (Wheel)', 'Defenseman carries puck behind net (reverse/wheel). Practice protecting puck and finding outlets.', 'breakouts', 12, 11, 21, 'intermediate', '{"breakout_variety_limited": true, "pressure_handling_poor": true}', ARRAY['breakouts', 'reverse', 'wheel', 'puck_protection']),

('Quick-Up Breakout', 'Quick outlet pass to center or wing. Work on speed, timing, and reading when to use quick-up vs controlled breakout.', 'breakouts', 15, 10, 21, 'all', '{"breakout_speed_slow": true, "outlet_pass_weak": true}', ARRAY['breakouts', 'quick_up', 'outlet', 'speed']),

('Stretch Pass Breakout', 'Long stretch pass to breaking forward at red line. Practice reading speed, leading pass, and timing.', 'breakouts', 12, 11, 21, 'intermediate', '{"stretch_pass_breakout_failures": true, "transition_speed_slow": true}', ARRAY['breakouts', 'stretch_pass', 'speed', 'transition']),

('Up Boards Breakout', 'Defenseman chips puck up boards to winger. Work on hard passes, winger timing, and support from center.', 'breakouts', 15, 9, 21, 'all', '{"boards_breakout_failures": true, "timing_issues": true}', ARRAY['breakouts', 'up_boards', 'boards', 'support']),

('Middle Lane Breakout', 'Forwards support middle ice for breakout passes. Practice filling lanes and supporting defensemen.', 'breakouts', 12, 10, 21, 'all', '{"middle_support_weak": true, "lane_filling_poor": true}', ARRAY['breakouts', 'middle_lane', 'support', 'lanes']),

('Breakout Under Pressure', 'Practice breakouts against forechecking pressure. Work on quick decisions, deception, and finding outlets.', 'breakouts', 15, 11, 21, 'intermediate', '{"breakout_under_pressure_poor": true, "forecheck_escape_weak": true}', ARRAY['breakouts', 'pressure', 'forecheck', 'decisions']),

('Weak-Side Breakout', 'Breakout away from pressure to weak side. Practice reading pressure and attacking weak side.', 'breakouts', 12, 11, 21, 'intermediate', '{"breakout_options_limited": true, "reading_pressure_weak": true}', ARRAY['breakouts', 'weak_side', 'reading', 'options']),

('Headman Breakout', 'Forward anticipates and gets headman pass at own blue line. Work on timing, passing accuracy, and acceleration.', 'breakouts', 12, 10, 21, 'all', '{"headman_pass_weak": true, "forward_timing_poor": true}', ARRAY['breakouts', 'headman', 'timing', 'speed']),

('High Cycle Breakout', 'Forwards swing high for breakout support. Practice cycling high and giving multiple options to defensemen.', 'breakouts', 15, 11, 21, 'intermediate', '{"breakout_support_weak": true, "forward_positioning_poor": true}', ARRAY['breakouts', 'high_cycle', 'support', 'positioning']),

('Breakout Regroup', 'Breakout fails, team regroups and tries again. Work on composure, regrouping, and second attempts.', 'breakouts', 15, 11, 21, 'intermediate', '{"regroup_skills_weak": true, "composure_under_pressure_poor": true}', ARRAY['breakouts', 'regroup', 'composure', 'recovery']),

('Weak-Side D Support', 'Weak-side defenseman provides support behind partner. Practice D-to-D passes and support positioning.', 'breakouts', 12, 10, 21, 'all', '{"d_support_weak": true, "d_to_d_timing_poor": true}', ARRAY['breakouts', 'defense', 'd_support', 'd_to_d']),

('Breakout With Third Man High', 'One forward stays high for outlet. Work on patience, third-man support, and delayed options.', 'breakouts', 15, 11, 21, 'intermediate', '{"third_man_support_weak": true, "delayed_breakout_options_limited": true}', ARRAY['breakouts', 'third_man', 'support', 'patience']),

('Over Glass Escape', 'Practice legally chipping puck over glass to escape pressure. Work on reading when it''s necessary.', 'breakouts', 10, 11, 21, 'intermediate', '{"pressure_escape_poor": true, "situational_awareness_weak": true}', ARRAY['breakouts', 'escape', 'over_glass', 'pressure']),

('Centerman Low Support', 'Center provides low support for D. Work on timing, positioning, and receiving passes under pressure.', 'breakouts', 12, 10, 21, 'all', '{"center_support_weak": true, "low_support_positioning_poor": true}', ARRAY['breakouts', 'center', 'low_support', 'positioning']),

('Breakout Options Drill', 'Defenseman has 4 options (D-to-D, up boards, center, stretch). Work on reading and choosing best option.', 'breakouts', 15, 11, 21, 'intermediate', '{"breakout_decision_making_poor": true, "reading_options_weak": true}', ARRAY['breakouts', 'options', 'decision_making', 'reading']),

('Left-Side Breakout', 'Practice left-side specific breakout patterns. Work on left-side outlets and support positioning.', 'breakouts', 12, 10, 21, 'all', '{"left_side_breakout_failures": true, "side_specific_patterns_weak": true}', ARRAY['breakouts', 'left_side', 'patterns', 'outlets']),

('Right-Side Breakout', 'Practice right-side specific breakout patterns. Work on right-side outlets and support positioning.', 'breakouts', 12, 10, 21, 'all', '{"right_side_breakout_failures": true, "side_specific_patterns_weak": true}', ARRAY['breakouts', 'right_side', 'patterns', 'outlets']),

('Chip and Chase Breakout', 'Forward chips puck into neutral zone and chases. Work on timing, speed, and puck pursuit.', 'breakouts', 10, 9, 21, 'all', '{"dump_and_chase_weak": true, "puck_pursuit_poor": true}', ARRAY['breakouts', 'chip', 'chase', 'pursuit']),

('Breakout Face Pressure Drill', 'Defenseman faces immediate pressure. Practice escaping, protecting puck, and finding outlets quickly.', 'breakouts', 15, 11, 21, 'intermediate', '{"immediate_pressure_handling_poor": true, "puck_protection_weak": true}', ARRAY['breakouts', 'pressure', 'escape', 'protection']),

('Strong-Side Winger Breakout', 'Strong-side winger timing and positioning for breakouts. Work on reading D, timing, and acceleration.', 'breakouts', 12, 10, 21, 'all', '{"winger_timing_poor": true, "strong_side_support_weak": true}', ARRAY['breakouts', 'winger', 'strong_side', 'timing']),

('Controlled Breakout Exit', 'Defenseman carries puck through neutral zone. Practice skating with puck and reading when to pass.', 'breakouts', 15, 11, 21, 'intermediate', '{"controlled_exit_weak": true, "d_puck_carrying_poor": true}', ARRAY['breakouts', 'controlled_exit', 'puck_carrying', 'defense']),

('Breakout Against 1-2-2', 'Practice breakouts against 1-2-2 forecheck. Work on reading formation and exploiting weaknesses.', 'breakouts', 15, 12, 21, 'advanced', '{"1_2_2_breakout_struggles": true, "forecheck_reading_weak": true}', ARRAY['breakouts', '1_2_2', 'forecheck', 'reading']),

('Breakout Against 2-1-2', 'Practice breakouts against 2-1-2 forecheck. Work on reading pressure and finding open outlets.', 'breakouts', 15, 12, 21, 'advanced', '{"2_1_2_breakout_struggles": true, "pressure_reading_weak": true}', ARRAY['breakouts', '2_1_2', 'forecheck', 'pressure']),

('5-Man Breakout Patterns', 'Full team practices coordinated breakout with all 5 players. Work on timing, support, and execution.', 'breakouts', 15, 11, 21, 'intermediate', '{"team_breakout_coordination_poor": true, "5_man_execution_weak": true}', ARRAY['breakouts', '5_man', 'coordination', 'team_play']);

-- FORECHECKING DRILLS (15 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('1-2-2 Forecheck Drill', 'Team practices 1-2-2 forecheck system. F1 pressures, F2-F3 support, D pinch when appropriate.', 'forechecking', 15, 11, 21, 'intermediate', '{"forecheck_pressure_weak": true, "defensive_system_inconsistent": true}', ARRAY['forechecking', '1_2_2', 'system', 'pressure']),

('2-1-2 Aggressive Forecheck', 'Two forwards pressure D, third forward high, D protect against stretch. Work on aggressive pursuit.', 'forechecking', 15, 12, 21, 'advanced', '{"aggressive_forecheck_weak": true, "two_man_pressure_poor": true}', ARRAY['forechecking', '2_1_2', 'aggressive', 'pressure']),

('F1 Pressure Path', 'First forward practices optimal pressure path to force D weak side. Work on angling and stick positioning.', 'forechecking', 12, 10, 21, 'all', '{"f1_pressure_poor": true, "angling_weak": true}', ARRAY['forechecking', 'f1', 'pressure', 'angling']),

('F2 Support Timing', 'Second forward works on reading F1 and providing proper support. Practice timing and positioning.', 'forechecking', 12, 11, 21, 'intermediate', '{"f2_support_weak": true, "forecheck_timing_poor": true}', ARRAY['forechecking', 'f2', 'support', 'timing']),

('Stick on Puck Forecheck', 'Players practice keeping stick on puck while forechecking. Work on active sticks and disrupting passes.', 'forechecking', 10, 9, 21, 'all', '{"active_stick_weak": true, "pass_disruption_poor": true}', ARRAY['forechecking', 'stick', 'active', 'disruption']),

('Trap at Red Line', 'Team practices neutral zone trap. Work on positioning, timing, and springing trap.', 'forechecking', 15, 12, 21, 'advanced', '{"neutral_zone_trap_weak": true, "team_defense_inconsistent": true}', ARRAY['forechecking', 'trap', 'neutral_zone', 'team_defense']),

('Forecheck to Backcheck', 'Practice transitioning from forecheck to backcheck when puck is cleared. Work on quick recovery.', 'forechecking', 15, 11, 21, 'intermediate', '{"transition_defense_slow": true, "recovery_poor": true}', ARRAY['forechecking', 'transition', 'backcheck', 'recovery']),

('Pinch Decision Drill', 'Defensemen practice reading when to pinch on forecheck. Work on risk assessment and gap control.', 'forechecking', 12, 11, 21, 'intermediate', '{"pinch_decision_making_poor": true, "d_aggressiveness_weak": true}', ARRAY['forechecking', 'pinch', 'defense', 'decisions']),

('Soft Forecheck (1-4)', 'Practice soft forecheck with one forward up. Work on protecting against odd-man rushes.', 'forechecking', 12, 11, 21, 'intermediate', '{"soft_forecheck_weak": true, "defensive_structure_poor": true}', ARRAY['forechecking', 'soft', '1_4', 'structure']),

('Forecheck Pursuit Angles', 'Players work on proper pursuit angles on forecheck. Practice cutting off passing lanes.', 'forechecking', 12, 10, 21, 'all', '{"pursuit_angles_poor": true, "lane_cutting_weak": true}', ARRAY['forechecking', 'pursuit', 'angles', 'lanes']),

('Reading Breakout Patterns', 'Forwards practice reading opponent breakout patterns. Work on anticipation and positioning.', 'forechecking', 15, 12, 21, 'advanced', '{"breakout_reading_weak": true, "anticipation_poor": true}', ARRAY['forechecking', 'reading', 'patterns', 'anticipation']),

('F3 High Positioning', 'Third forward works on high positioning to prevent stretch passes. Practice reading and positioning.', 'forechecking', 12, 11, 21, 'intermediate', '{"f3_positioning_poor": true, "stretch_prevention_weak": true}', ARRAY['forechecking', 'f3', 'high', 'positioning']),

('Body Contact Forecheck', 'Players practice finishing checks on forecheck (age-appropriate). Work on timing and body position.', 'forechecking', 15, 12, 21, 'intermediate', '{"physical_play_weak": true, "finishing_checks_poor": true}', ARRAY['forechecking', 'physical', 'checks', 'contact']),

('Forecheck Communication', 'Team practices calling forecheck assignments and switches. Work on verbal communication and awareness.', 'forechecking', 12, 11, 21, 'intermediate', '{"forecheck_communication_weak": true, "team_coordination_poor": true}', ARRAY['forechecking', 'communication', 'teamwork', 'coordination']),

('Quick Transition Forecheck', 'After turnovers, immediately apply pressure. Practice quick transitions from offense to forecheck.', 'forechecking', 15, 11, 21, 'intermediate', '{"transition_forecheck_slow": true, "immediate_pressure_weak": true}', ARRAY['forechecking', 'transition', 'quick', 'pressure']);

-- BACKCHECKING DRILLS (15 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Backcheck Lanes Drill', 'Players practice taking proper backcheck lanes. Work on skating hard, stick in lanes, and gap control.', 'backchecking', 12, 10, 21, 'all', '{"backcheck_effort_poor": true, "defensive_lanes_weak": true}', ARRAY['backchecking', 'lanes', 'defensive', 'effort']),

('Sprint Back 3-on-2', 'Forwards must sprint back to help on 3-on-2. Practice urgency, communication, and defensive positioning.', 'backchecking', 15, 11, 21, 'intermediate', '{"backcheck_speed_slow": true, "odd_man_rush_defense_weak": true}', ARRAY['backchecking', 'sprint', 'odd_man', 'urgency']),

('Stick on Stick Backcheck', 'Players focus on getting stick on stick while backchecking. Work on disrupting passes and shots.', 'backchecking', 10, 9, 21, 'all', '{"defensive_stick_work_poor": true, "backcheck_effectiveness_low": true}', ARRAY['backchecking', 'stick_check', 'disruption', 'defense']),

('Lift Stick While Backchecking', 'Players practice lifting opponent''s stick from behind. Work on timing, positioning, and preventing shots.', 'backchecking', 12, 11, 21, 'intermediate', '{"stick_lifting_weak": true, "defensive_skills_poor": true}', ARRAY['backchecking', 'stick_lift', 'defense', 'timing']),

('Take the Body Backcheck', 'Players practice finishing checks while backchecking (age-appropriate). Work on positioning and physicality.', 'backchecking', 15, 12, 21, 'intermediate', '{"physical_backcheck_weak": true, "finishing_defensive": true}', ARRAY['backchecking', 'body_check', 'physical', 'finishing']),

('F3 Backcheck High', 'Third forward practices high backcheck to pick up late man or defend against pass back. Work on awareness.', 'backchecking', 12, 11, 21, 'intermediate', '{"high_backcheck_weak": true, "third_forward_defense_poor": true}', ARRAY['backchecking', 'f3', 'high', 'awareness']),

('Defensive Side Positioning', 'Forwards work on getting to defensive side when backchecking. Practice proper angles and positioning.', 'backchecking', 12, 10, 21, 'all', '{"defensive_side_positioning_weak": true, "backcheck_angles_poor": true}', ARRAY['backchecking', 'defensive_side', 'positioning', 'angles']),

('Backcheck Communication Drill', 'Players practice calling out assignments while backchecking. Work on verbal communication under pressure.', 'backchecking', 10, 10, 21, 'all', '{"backcheck_communication_poor": true, "defensive_coordination_weak": true}', ARRAY['backchecking', 'communication', 'coordination', 'teamwork']),

('Backcheck from Offensive Zone', 'Practice full-ice backcheck after losing puck. Work on immediate response and urgency.', 'backchecking', 15, 10, 21, 'all', '{"transition_defense_slow": true, "full_ice_backcheck_weak": true}', ARRAY['backchecking', 'full_ice', 'transition', 'urgency']),

('Pick Up Trailer Backcheck', 'Forwards practice identifying and picking up late arriving forwards. Work on awareness and communication.', 'backchecking', 12, 11, 21, 'intermediate', '{"trailer_coverage_weak": true, "defensive_awareness_poor": true}', ARRAY['backchecking', 'trailer', 'awareness', 'coverage']),

('Backcheck Speed Drill', 'Players sprint full-ice on backcheck. Emphasize maximum effort and proper skating technique.', 'backchecking', 10, 9, 21, 'all', '{"backcheck_speed_slow": true, "defensive_effort_inconsistent": true}', ARRAY['backchecking', 'speed', 'effort', 'conditioning']),

('Win Net Front Battle Backcheck', 'Forwards practice getting to net front first and tying up opponents. Work on positioning and battles.', 'backchecking', 15, 11, 21, 'intermediate', '{"net_front_defense_weak": true, "physical_battles_poor": true}', ARRAY['backchecking', 'net_front', 'battles', 'positioning']),

('Stick in Lane Backcheck', 'Players practice keeping stick in passing lanes while backchecking. Work on interceptions and disruptions.', 'backchecking', 12, 10, 21, 'all', '{"stick_in_lanes_weak": true, "pass_interception_poor": true}', ARRAY['backchecking', 'stick_lanes', 'interception', 'disruption']),

('Low Backcheck Support', 'Forwards practice backchecking low to help defensemen. Work on support positioning and defensive awareness.', 'backchecking', 12, 10, 21, 'all', '{"low_support_weak": true, "defensive_help_poor": true}', ARRAY['backchecking', 'low_support', 'help', 'positioning']),

('Immediate Pressure Backcheck', 'After turnover, closest player applies immediate backcheck pressure. Practice reading and reacting quickly.', 'backchecking', 15, 11, 21, 'intermediate', '{"immediate_backcheck_slow": true, "pressure_application_weak": true}', ARRAY['backchecking', 'immediate', 'pressure', 'reaction']);

-- DEFENSIVE_ZONE DRILLS (20 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Box Defense Formation', 'Team practices box defensive formation. Work on positioning, responsibilities, and puck pursuit.', 'defensive_zone', 15, 11, 21, 'intermediate', '{"defensive_formation_weak": true, "zone_coverage_poor": true}', ARRAY['defensive_zone', 'box', 'formation', 'coverage']),

('Net Front Defense', 'Players practice defending net-front players. Work on tying up sticks, boxing out, and clearing pucks.', 'defensive_zone', 12, 10, 21, 'all', '{"net_front_coverage_weak": true, "clearing_net_poor": true}', ARRAY['defensive_zone', 'net_front', 'coverage', 'clearing']),

('Defensive Zone Faceoff Coverage', 'Team practices defensive zone faceoff setups. Work on positioning, responsibilities, and quick recovery.', 'defensive_zone', 15, 11, 21, 'intermediate', '{"defensive_faceoff_weak": true, "d_zone_faceoff_coverage_poor": true}', ARRAY['defensive_zone', 'faceoff', 'coverage', 'setup']),

('Point Coverage', 'Forwards practice covering the point. Work on positioning, closeouts, and shot blocking.', 'defensive_zone', 12, 10, 21, 'all', '{"point_coverage_weak": true, "shot_blocking_poor": true}', ARRAY['defensive_zone', 'point', 'coverage', 'blocking']),

('Slot Coverage', 'Team practices protecting the slot. Work on collapsing, tying up players, and clearing pucks.', 'defensive_zone', 15, 11, 21, 'intermediate', '{"slot_coverage_weak": true, "high_danger_defense_poor": true}', ARRAY['defensive_zone', 'slot', 'high_danger', 'coverage']),

('Defensive Zone Communication', 'Players practice calling out assignments in defensive zone. Work on verbal cues and awareness.', 'defensive_zone', 10, 10, 21, 'all', '{"d_zone_communication_poor": true, "defensive_coordination_weak": true}', ARRAY['defensive_zone', 'communication', 'coordination', 'awareness']),

('Clearing Pucks Under Pressure', 'Players practice clearing pucks from defensive zone under pressure. Work on composure and execution.', 'defensive_zone', 15, 11, 21, 'intermediate', '{"clearing_under_pressure_poor": true, "d_zone_exits_weak": true}', ARRAY['defensive_zone', 'clearing', 'pressure', 'composure']),

('Block Shots Properly', 'Players practice proper shot blocking technique. Work on positioning, timing, and safety.', 'defensive_zone', 12, 11, 21, 'intermediate', '{"shot_blocking_weak": true, "sacrifice_defense_poor": true}', ARRAY['defensive_zone', 'shot_blocking', 'technique', 'sacrifice']),

('Stick Lifts in Slot', 'Players practice lifting sticks in defensive slot. Work on timing, strength, and positioning.', 'defensive_zone', 10, 10, 21, 'all', '{"stick_lifts_weak": true, "slot_defense_poor": true}', ARRAY['defensive_zone', 'stick_lifts', 'slot', 'timing']),

('Defensive Zone Rotations', 'Team practices rotating coverage in defensive zone. Work on communication, timing, and filling holes.', 'defensive_zone', 15, 12, 21, 'advanced', '{"d_zone_rotations_weak": true, "coverage_rotation_poor": true}', ARRAY['defensive_zone', 'rotations', 'coverage', 'teamwork']),

('Low Cycle Defense', 'Defenders practice defending against low cycle plays. Work on staying above puck and denying middle.', 'defensive_zone', 12, 11, 21, 'intermediate', '{"low_cycle_defense_weak": true, "below_goal_line_defense_poor": true}', ARRAY['defensive_zone', 'low_cycle', 'below_goal_line', 'positioning']),

('Defensive Zone Face-Offs Win', 'Centers practice defensive zone faceoff wins. Work on technique, timing, and directing pucks.', 'defensive_zone', 10, 10, 21, 'all', '{"defensive_faceoff_wins_low": true, "faceoff_technique_weak": true}', ARRAY['defensive_zone', 'faceoff', 'wins', 'technique']),

('Collapse to Net Defense', 'Team practices collapsing to protect net. Work on tight coverage and protecting high-danger areas.', 'defensive_zone', 12, 10, 21, 'all', '{"collapse_defense_weak": true, "net_protection_poor": true}', ARRAY['defensive_zone', 'collapse', 'net_protection', 'coverage']),

('Tie Up Sticks in Slot', 'Players practice tying up opponent sticks in slot. Work on active stick work and physicality.', 'defensive_zone', 10, 10, 21, 'all', '{"stick_tieup_weak": true, "active_sticks_poor": true}', ARRAY['defensive_zone', 'tie_up', 'active_sticks', 'physicality']),

('Defensive Zone Battles', 'Players practice puck battles along boards and in corners. Work on strength, positioning, and recovery.', 'defensive_zone', 15, 11, 21, 'intermediate', '{"d_zone_battles_weak": true, "board_battles_poor": true}', ARRAY['defensive_zone', 'battles', 'boards', 'strength']),

('Gap Control in D-Zone', 'Defensemen practice maintaining proper gap in defensive zone. Work on skating, positioning, and timing.', 'defensive_zone', 12, 10, 21, 'all', '{"d_zone_gap_control_weak": true, "defensive_positioning_poor": true}', ARRAY['defensive_zone', 'gap_control', 'positioning', 'defensemen']),

('Box Out in Front of Net', 'Players practice boxing out opponents in front of net. Work on body position, stick position, and strength.', 'defensive_zone', 12, 10, 21, 'all', '{"boxing_out_weak": true, "net_front_strength_poor": true}', ARRAY['defensive_zone', 'box_out', 'net_front', 'positioning']),

('Defensive Zone Pressure', 'Team practices applying pressure in defensive zone. Work on aggressive defense while maintaining structure.', 'defensive_zone', 15, 11, 21, 'intermediate', '{"d_zone_pressure_weak": true, "aggressive_defense_poor": true}', ARRAY['defensive_zone', 'pressure', 'aggressive', 'structure']),

('Weak Side Defense', 'Weak-side defenders practice positioning and anticipation. Work on reading plays and providing support.', 'defensive_zone', 12, 11, 21, 'intermediate', '{"weak_side_defense_poor": true, "anticipation_weak": true}', ARRAY['defensive_zone', 'weak_side', 'anticipation', 'support']),

('Defensive Zone Recovery', 'Players practice recovering pucks in defensive zone. Work on angles, stick work, and quick transitions.', 'defensive_zone', 15, 10, 21, 'all', '{"puck_recovery_weak": true, "d_zone_transitions_slow": true}', ARRAY['defensive_zone', 'recovery', 'transitions', 'angles']);

-- POWER_PLAY DRILLS (15 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Umbrella Power Play Setup', 'Team practices umbrella formation (1-3-1). Work on positioning, puck movement, and shot opportunities.', 'power_play', 15, 11, 21, 'intermediate', '{"power_play_struggles": true, "special_teams_weak": true}', ARRAY['power_play', 'umbrella', 'formation', 'special_teams']),

('Overload Power Play', 'Practice overload formation with three players on one side. Work on quick passing and creating shooting lanes.', 'power_play', 15, 12, 21, 'advanced', '{"power_play_struggles": true, "offensive_creativity_limited": true}', ARRAY['power_play', 'overload', 'formation', 'creativity']),

('Bumper Pass PP Drill', 'Players work on bumper passes from slot position. Practice timing, positioning, and quick release.', 'power_play', 12, 11, 21, 'intermediate', '{"power_play_slot_coverage_weak": true, "bumper_position_poor": true}', ARRAY['power_play', 'bumper', 'slot', 'timing']),

('Power Play Entry Strategies', 'Practice different PP zone entry strategies. Work on controlled entries vs dump and retrieve.', 'power_play', 15, 11, 21, 'intermediate', '{"power_play_entries_weak": true, "zone_entry_struggles": true}', ARRAY['power_play', 'entry', 'zone_entry', 'strategies']),

('Net Front PP Presence', 'Forwards practice net-front positioning on PP. Work on screening, tipping, and creating chaos.', 'power_play', 12, 10, 21, 'all', '{"net_front_pp_weak": true, "screening_poor": true}', ARRAY['power_play', 'net_front', 'screening', 'tips']),

('Point Shot One-Timer PP', 'Defensemen practice one-timers from the point. Forwards work on tips and screens.', 'power_play', 15, 11, 21, 'intermediate', '{"pp_point_shot_weak": true, "one_timer_struggles": true}', ARRAY['power_play', 'point_shot', 'one_timer', 'defensemen']),

('Power Play Cycle Low', 'Practice cycling puck low on PP. Work on puck protection, finding seams, and creating opportunities.', 'power_play', 15, 12, 21, 'advanced', '{"pp_cycling_weak": true, "low_possession_poor": true}', ARRAY['power_play', 'cycling', 'low', 'possession']),

('PP Faceoff Plays', 'Practice specific faceoff plays for power play. Work on execution, timing, and shooting off wins.', 'power_play', 12, 11, 21, 'intermediate', '{"pp_faceoff_execution_poor": true, "faceoff_plays_limited": true}', ARRAY['power_play', 'faceoff', 'plays', 'execution']),

('Royal Road PP Passing', 'Practice cross-ice passes (royal road) on PP. Work on timing, accuracy, and one-timer finishes.', 'power_play', 15, 11, 21, 'intermediate', '{"royal_road_pp_weak": true, "cross_ice_passing_poor": true}', ARRAY['power_play', 'royal_road', 'cross_ice', 'passing']),

('Power Play Puck Movement', 'Practice quick puck movement around perimeter. Work on tape-to-tape passes and creating shooting lanes.', 'power_play', 12, 10, 21, 'all', '{"pp_puck_movement_slow": true, "perimeter_passing_weak": true}', ARRAY['power_play', 'puck_movement', 'passing', 'speed']),

('5-on-4 vs 5-on-3 Adjustments', 'Practice adjusting formations for 5-on-3. Work on spacing, movement, and capitalizing on opportunities.', 'power_play', 15, 12, 21, 'advanced', '{"5_on_3_struggles": true, "pp_adjustment_weak": true}', ARRAY['power_play', '5_on_3', 'adjustments', 'spacing']),

('PP Shooting Mentality', 'Practice getting pucks to net on PP. Work on shot volume, tips, and rebounds.', 'power_play', 12, 10, 21, 'all', '{"pp_shot_volume_low": true, "shooting_mentality_weak": true}', ARRAY['power_play', 'shooting', 'volume', 'mentality']),

('Power Play Breakout', 'Practice controlled breakouts on PP after faceoff wins. Work on patience and controlled entries.', 'power_play', 12, 11, 21, 'intermediate', '{"pp_breakout_weak": true, "controlled_transition_poor": true}', ARRAY['power_play', 'breakout', 'transition', 'control']),

('PP Quick Strike', 'Practice quick-strike opportunities on PP. Work on immediate shooting and capitalizing on chances.', 'power_play', 10, 11, 21, 'intermediate', '{"pp_patience_excessive": true, "quick_shot_opportunities_missed": true}', ARRAY['power_play', 'quick_strike', 'shooting', 'opportunities']),

('Power Play vs Penalty Kill Systems', 'Practice PP against different PK systems (box, diamond, wedge). Work on reading and exploiting weaknesses.', 'power_play', 15, 12, 21, 'advanced', '{"reading_pk_systems_weak": true, "pp_adaptation_poor": true}', ARRAY['power_play', 'systems', 'reading', 'adaptation']);

-- PENALTY_KILL DRILLS (15 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Box PK Formation', 'Team practices box penalty kill formation. Work on positioning, rotations, and clearing pucks.', 'penalty_kill', 15, 11, 21, 'intermediate', '{"penalty_kill_struggles": true, "pk_structure_weak": true}', ARRAY['penalty_kill', 'box', 'formation', 'structure']),

('Diamond PK Setup', 'Practice diamond PK formation. Work on pressure, support, and protecting middle.', 'penalty_kill', 15, 12, 21, 'advanced', '{"pk_pressure_weak": true, "diamond_formation_poor": true}', ARRAY['penalty_kill', 'diamond', 'pressure', 'formation']),

('Aggressive PK Pressure', 'Practice aggressive penalty kill with pressure on puck carrier. Work on forechecking and disruption.', 'penalty_kill', 15, 12, 21, 'advanced', '{"passive_pk_issues": true, "pk_pressure_weak": true}', ARRAY['penalty_kill', 'aggressive', 'pressure', 'forecheck']),

('PK Clears and Icing', 'Practice clearing pucks safely on PK. Work on reading when to ice vs controlled clear.', 'penalty_kill', 12, 10, 21, 'all', '{"pk_clearing_poor": true, "icing_decisions_weak": true}', ARRAY['penalty_kill', 'clearing', 'icing', 'decisions']),

('Shot Blocking on PK', 'Players practice proper shot blocking on penalty kill. Work on technique, timing, and sacrifice.', 'penalty_kill', 12, 11, 21, 'intermediate', '{"pk_shot_blocking_weak": true, "sacrifice_defense_poor": true}', ARRAY['penalty_kill', 'shot_blocking', 'sacrifice', 'technique']),

('PK Faceoff Coverage', 'Team practices defensive zone faceoff setups on PK. Work on immediate pressure and coverage.', 'penalty_kill', 12, 11, 21, 'intermediate', '{"pk_faceoff_coverage_poor": true, "faceoff_pk_weak": true}', ARRAY['penalty_kill', 'faceoff', 'coverage', 'setup']),

('Penalty Kill Communication', 'Players practice calling out assignments on PK. Work on communication, rotations, and awareness.', 'penalty_kill', 10, 10, 21, 'all', '{"pk_communication_weak": true, "pk_coordination_poor": true}', ARRAY['penalty_kill', 'communication', 'coordination', 'awareness']),

('PK Seam Coverage', 'Practice protecting seams and passing lanes on PK. Work on active sticks and anticipation.', 'penalty_kill', 15, 11, 21, 'intermediate', '{"pk_seam_coverage_weak": true, "passing_lane_defense_poor": true}', ARRAY['penalty_kill', 'seams', 'lanes', 'anticipation']),

('5-on-3 Penalty Kill', 'Practice 5-on-3 PK situations. Work on protecting net, shot blocking, and goalie support.', 'penalty_kill', 15, 12, 21, 'advanced', '{"5_on_3_pk_struggles": true, "extreme_pk_situations_weak": true}', ARRAY['penalty_kill', '5_on_3', 'protection', 'goalie_support']),

('PK Breakout After Clear', 'Practice transitioning to offense after PK clear. Work on speed, timing, and capitalizing on shorthanded chances.', 'penalty_kill', 12, 11, 21, 'intermediate', '{"pk_transition_slow": true, "shorthanded_opportunities_missed": true}', ARRAY['penalty_kill', 'breakout', 'transition', 'shorthanded']),

('Collapse PK Defense', 'Practice collapsing to protect net on PK. Work on tight coverage and protecting high-danger areas.', 'penalty_kill', 12, 10, 21, 'all', '{"pk_collapse_weak": true, "net_protection_pk_poor": true}', ARRAY['penalty_kill', 'collapse', 'net_protection', 'coverage']),

('PK Stick Pressure', 'Players practice active stick work on PK. Work on disrupting passes, blocking lanes, and stick lifts.', 'penalty_kill', 10, 10, 21, 'all', '{"pk_stick_work_weak": true, "pass_disruption_poor": true}', ARRAY['penalty_kill', 'stick_work', 'disruption', 'active']),

('PK Zone Entry Defense', 'Practice defending zone entries on PK. Work on neutral zone pressure and denying clean entries.', 'penalty_kill', 15, 11, 21, 'intermediate', '{"pk_entry_defense_weak": true, "neutral_zone_pk_poor": true}', ARRAY['penalty_kill', 'entry_defense', 'neutral_zone', 'pressure']),

('Wedge PK Formation', 'Team practices wedge (inverted triangle) PK. Work on protecting middle and forcing outside shots.', 'penalty_kill', 15, 12, 21, 'advanced', '{"pk_formation_variety_limited": true, "wedge_pk_weak": true}', ARRAY['penalty_kill', 'wedge', 'formation', 'middle_protection']),

('PK vs PP Systems', 'Practice PK against different PP systems (umbrella, overload, 1-3-1). Work on recognition and adjustment.', 'penalty_kill', 15, 12, 21, 'advanced', '{"reading_pp_systems_weak": true, "pk_adaptation_poor": true}', ARRAY['penalty_kill', 'systems', 'reading', 'adaptation']);

-- TRANSITION DRILLS (15 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Offense to Defense Transition', 'Practice quick transitions from offense to defense. Work on immediate backcheck and defensive positioning.', 'transition', 15, 10, 21, 'all', '{"transition_defense_slow": true, "defensive_awareness_weak": true}', ARRAY['transition', 'offense_to_defense', 'backcheck', 'awareness']),

('Defense to Offense Transition', 'Practice transitioning from defense to offense. Work on speed, timing, and reading opportunities.', 'transition', 15, 10, 21, 'all', '{"transition_offense_slow": true, "counter_attack_weak": true}', ARRAY['transition', 'defense_to_offense', 'counter_attack', 'speed']),

('Odd-Man Rush Creation', 'Practice creating odd-man rushes in transition. Work on speed, passing, and capitalizing on chances.', 'transition', 15, 11, 21, 'intermediate', '{"odd_man_rush_creation_poor": true, "transition_speed_slow": true}', ARRAY['transition', 'odd_man_rush', 'speed', 'opportunities']),

('Neutral Zone Regroup', 'Practice regrouping in neutral zone. Work on patience, support, and controlled re-entries.', 'transition', 12, 11, 21, 'intermediate', '{"neutral_zone_regroup_weak": true, "patience_lacking": true}', ARRAY['transition', 'regroup', 'neutral_zone', 'patience']),

('Quick Transition Passes', 'Practice quick transition passes up ice. Work on timing, accuracy, and reading speed.', 'transition', 12, 10, 21, 'all', '{"transition_passing_weak": true, "quick_transition_poor": true}', ARRAY['transition', 'passing', 'quick', 'timing']),

('Transition with Speed', 'Practice transitioning at high speed. Work on puck control, decision-making, and maintaining speed.', 'transition', 15, 11, 21, 'intermediate', '{"transition_speed_slow": true, "speed_control_poor": true}', ARRAY['transition', 'speed', 'control', 'decision_making']),

('3-on-2 Transition Attack', 'Practice 3-on-2 situations in transition. Work on passing, timing, and shot selection.', 'transition', 15, 11, 21, 'intermediate', '{"3_on_2_execution_poor": true, "odd_man_attack_weak": true}', ARRAY['transition', '3_on_2', 'attack', 'execution']),

('2-on-1 Transition Finish', 'Practice 2-on-1 situations. Work on passing vs shooting decision and execution.', 'transition', 12, 10, 21, 'all', '{"2_on_1_execution_poor": true, "decision_making_weak": true}', ARRAY['transition', '2_on_1', 'decision_making', 'finish']),

('Full-Ice Transition Drill', 'Practice full-ice transitions with offensive and defensive phases. Work on complete game transitions.', 'transition', 15, 11, 21, 'intermediate', '{"full_ice_transitions_poor": true, "game_pace_transitions_weak": true}', ARRAY['transition', 'full_ice', 'game_pace', 'phases']),

('Turnover Recovery Transition', 'Practice immediate transition after turnovers. Work on reading situations and quick reactions.', 'transition', 15, 11, 21, 'intermediate', '{"turnover_transition_slow": true, "reaction_time_poor": true}', ARRAY['transition', 'turnover', 'recovery', 'reaction']),

('Late Man in Transition', 'Practice late-arriving player joining rush. Work on timing, positioning, and creating overloads.', 'transition', 12, 11, 21, 'intermediate', '{"late_man_timing_poor": true, "transition_support_weak": true}', ARRAY['transition', 'late_man', 'timing', 'support']),

('Stretch Pass Transition', 'Practice long stretch passes in transition. Work on timing, accuracy, and reading breaking players.', 'transition', 12, 11, 21, 'intermediate', '{"stretch_pass_transition_weak": true, "long_pass_accuracy_poor": true}', ARRAY['transition', 'stretch_pass', 'long_pass', 'timing']),

('Controlled vs Quick Transition', 'Practice reading when to use controlled vs quick transition. Work on decision-making and situational awareness.', 'transition', 15, 12, 21, 'advanced', '{"transition_decision_making_poor": true, "situational_awareness_weak": true}', ARRAY['transition', 'decision_making', 'situational', 'reading']),

('Transition Zone Entry', 'Practice different zone entry methods in transition. Work on controlled entries, dumps, and carry-ins.', 'transition', 15, 11, 21, 'intermediate', '{"zone_entry_struggles": true, "transition_entries_poor": true}', ARRAY['transition', 'zone_entry', 'entries', 'methods']),

('Middle Drive Transition', 'Practice driving middle ice in transition. Work on attacking seams and creating shooting opportunities.', 'transition', 15, 11, 21, 'intermediate', '{"middle_drive_weak": true, "seam_attacks_poor": true}', ARRAY['transition', 'middle_drive', 'seams', 'attack']);

-- FACEOFFS DRILLS (10 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Faceoff Technique Fundamentals', 'Centers practice proper faceoff stance, grip, and technique. Work on mechanics and consistency.', 'faceoffs', 12, 10, 21, 'all', '{"faceoff_win_percentage_low": true, "faceoff_technique_weak": true}', ARRAY['faceoffs', 'technique', 'fundamentals', 'mechanics']),

('Defensive Zone Faceoff Plays', 'Practice specific plays off defensive zone faceoffs. Work on execution, timing, and clearing.', 'faceoffs', 15, 11, 21, 'intermediate', '{"d_zone_faceoff_weak": true, "faceoff_plays_limited": true}', ARRAY['faceoffs', 'defensive_zone', 'plays', 'execution']),

('Offensive Zone Faceoff Plays', 'Practice specific plays off offensive zone faceoffs. Work on shooting opportunities and execution.', 'faceoffs', 15, 11, 21, 'intermediate', '{"o_zone_faceoff_weak": true, "faceoff_scoring_low": true}', ARRAY['faceoffs', 'offensive_zone', 'plays', 'scoring']),

('Faceoff Wing Support', 'Wingers practice proper positioning and support on faceoffs. Work on timing and responsibilities.', 'faceoffs', 12, 10, 21, 'all', '{"faceoff_support_weak": true, "wing_positioning_poor": true}', ARRAY['faceoffs', 'wings', 'support', 'positioning']),

('Faceoff Counter Moves', 'Centers practice counter moves when opponent anticipates primary move. Work on deception and adaptation.', 'faceoffs', 12, 11, 21, 'intermediate', '{"faceoff_variety_limited": true, "predictability_high": true}', ARRAY['faceoffs', 'counter_moves', 'deception', 'variety']),

('Neutral Zone Faceoff Strategy', 'Practice neutral zone faceoff strategies. Work on positioning, timing, and exploiting advantages.', 'faceoffs', 12, 11, 21, 'intermediate', '{"neutral_zone_faceoff_weak": true, "faceoff_strategy_limited": true}', ARRAY['faceoffs', 'neutral_zone', 'strategy', 'positioning']),

('Faceoff Strength Training', 'Centers work on strength and leverage in faceoffs. Practice using body and stick positioning for advantage.', 'faceoffs', 10, 11, 21, 'intermediate', '{"faceoff_strength_weak": true, "leverage_poor": true}', ARRAY['faceoffs', 'strength', 'leverage', 'power']),

('Quick Faceoff Reaction', 'Practice reacting quickly to faceoff results. Work on immediate next action after win or loss.', 'faceoffs', 12, 10, 21, 'all', '{"faceoff_reaction_slow": true, "post_faceoff_execution_poor": true}', ARRAY['faceoffs', 'reaction', 'quick', 'execution']),

('Power Play Faceoff Setup', 'Practice PP faceoff setups and plays. Work on maximizing faceoff wins on power play.', 'faceoffs', 15, 11, 21, 'intermediate', '{"pp_faceoff_weak": true, "special_teams_faceoff_poor": true}', ARRAY['faceoffs', 'power_play', 'special_teams', 'setup']),

('Penalty Kill Faceoff Defense', 'Practice PK faceoff coverage and clears. Work on defensive positioning and immediate clearing.', 'faceoffs', 15, 11, 21, 'intermediate', '{"pk_faceoff_coverage_weak": true, "faceoff_clearing_poor": true}', ARRAY['faceoffs', 'penalty_kill', 'coverage', 'clearing']);

-- WARM_UP DRILLS (10 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Dynamic Skating Warm-Up', 'Players perform dynamic skating movements to warm up muscles. Include forward/backward, crossovers, and transitions.', 'warm_up', 8, 8, 21, 'all', '{"warm_up_needed": true, "injury_prevention": true}', ARRAY['warm_up', 'skating', 'dynamic', 'injury_prevention']),

('Puck Handling Warm-Up', 'Players warm up with stationary and moving puck handling. Work on soft hands and getting feel for puck.', 'warm_up', 8, 8, 21, 'all', '{"warm_up_needed": true, "puck_feel_development": true}', ARRAY['warm_up', 'puck_handling', 'hands', 'feel']),

('Passing Warm-Up Circle', 'Players pass in circles to warm up. Practice tape-to-tape passes and communication.', 'warm_up', 8, 8, 21, 'all', '{"warm_up_needed": true, "passing_warm_up": true}', ARRAY['warm_up', 'passing', 'communication', 'accuracy']),

('Shooting Warm-Up', 'Players take warm-up shots on goalies. Start slow, gradually increase shot speed and variety.', 'warm_up', 10, 8, 21, 'all', '{"warm_up_needed": true, "goalie_warm_up": true}', ARRAY['warm_up', 'shooting', 'goalie', 'progression']),

('Edge Work Warm-Up', 'Players perform edge work exercises to warm up. Practice inside/outside edges and balance.', 'warm_up', 8, 8, 21, 'all', '{"warm_up_needed": true, "edge_work_practice": true}', ARRAY['warm_up', 'edges', 'balance', 'control']),

('Small Area Passing Warm-Up', 'Players pass in small areas to warm up. Work on quick hands and soft reception.', 'warm_up', 8, 8, 21, 'all', '{"warm_up_needed": true, "quick_hands_warm_up": true}', ARRAY['warm_up', 'small_area', 'passing', 'quick_hands']),

('Full-Ice Flow Warm-Up', 'Team performs full-ice flow drill. Continuous movement with passing and shooting to warm up all systems.', 'warm_up', 10, 9, 21, 'all', '{"warm_up_needed": true, "full_team_warm_up": true}', ARRAY['warm_up', 'full_ice', 'flow', 'team']),

('Agility Warm-Up', 'Players perform agility movements through cones. Work on quick direction changes and warming up fast-twitch muscles.', 'warm_up', 8, 8, 21, 'all', '{"warm_up_needed": true, "agility_preparation": true}', ARRAY['warm_up', 'agility', 'cones', 'fast_twitch']),

('Breakaway Warm-Up', 'Players take warm-up breakaways on goalies. Work on confidence and getting comfortable with puck.', 'warm_up', 10, 9, 21, 'all', '{"warm_up_needed": true, "confidence_building": true}', ARRAY['warm_up', 'breakaway', 'confidence', 'shooting']),

('Team Stretch and Skate', 'Team performs group stretching followed by easy skating. Focus on loosening muscles and mental preparation.', 'warm_up', 10, 8, 21, 'all', '{"warm_up_needed": true, "flexibility_work": true}', ARRAY['warm_up', 'stretching', 'flexibility', 'mental_prep']);

-- COOL_DOWN DRILLS (5 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Easy Skating Cool Down', 'Players skate at easy pace to cool down. Lower heart rate gradually and promote recovery.', 'cool_down', 5, 8, 21, 'all', '{"cool_down_needed": true, "recovery_important": true}', ARRAY['cool_down', 'skating', 'recovery', 'easy_pace']),

('Static Stretching Cool Down', 'Players perform static stretches post-practice. Focus on major muscle groups and flexibility.', 'cool_down', 8, 8, 21, 'all', '{"cool_down_needed": true, "flexibility_maintenance": true}', ARRAY['cool_down', 'stretching', 'static', 'flexibility']),

('Light Passing Cool Down', 'Players pass at easy pace to cool down. Keep moving while lowering intensity.', 'cool_down', 5, 8, 21, 'all', '{"cool_down_needed": true, "active_recovery": true}', ARRAY['cool_down', 'passing', 'active', 'light']),

('Team Circle Talk Cool Down', 'Team gathers for cool-down skate and coach talk. Combine easy movement with team communication.', 'cool_down', 8, 8, 21, 'all', '{"cool_down_needed": true, "team_building": true}', ARRAY['cool_down', 'team', 'communication', 'skating']),

('Foam Rolling Station Cool Down', 'Players rotate through foam rolling stations off-ice. Focus on muscle recovery and injury prevention.', 'cool_down', 10, 10, 21, 'all', '{"cool_down_needed": true, "injury_prevention": true}', ARRAY['cool_down', 'foam_rolling', 'recovery', 'off_ice']);

-- CONDITIONING DRILLS (10 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Suicides (Line Sprints)', 'Players sprint to each line and back. Work on conditioning, speed, and mental toughness.', 'conditioning', 10, 10, 21, 'all', '{"conditioning_poor": true, "endurance_weak": true}', ARRAY['conditioning', 'sprints', 'endurance', 'speed']),

('Full-Ice Bag Skate', 'Players skate full-ice continuously. Build endurance and mental toughness through sustained effort.', 'conditioning', 12, 11, 21, 'intermediate', '{"endurance_weak": true, "mental_toughness_needed": true}', ARRAY['conditioning', 'full_ice', 'endurance', 'mental_toughness']),

('Whistle Drills', 'Players skate hard on whistle, stop on second whistle. Work on conditioning and explosive starts/stops.', 'conditioning', 10, 9, 21, 'all', '{"conditioning_poor": true, "explosive_movements_weak": true}', ARRAY['conditioning', 'whistle', 'explosive', 'starts_stops']),

('Continuous 1-on-1 Battles', 'Players engage in continuous 1-on-1 battles. Build conditioning through game-like situations.', 'conditioning', 15, 11, 21, 'intermediate', '{"battle_conditioning_poor": true, "game_conditioning_weak": true}', ARRAY['conditioning', 'battles', 'game_like', '1_on_1']),

('Zone-to-Zone Conditioning', 'Players sprint zone-to-zone continuously. Work on anaerobic conditioning and recovery.', 'conditioning', 10, 10, 21, 'all', '{"anaerobic_conditioning_weak": true, "recovery_time_slow": true}', ARRAY['conditioning', 'zone_to_zone', 'anaerobic', 'sprints']),

('Blue Line Touches', 'Players touch blue lines continuously (down and back). Build leg endurance and mental toughness.', 'conditioning', 10, 9, 21, 'all', '{"leg_endurance_weak": true, "conditioning_poor": true}', ARRAY['conditioning', 'blue_line', 'legs', 'endurance']),

('Shift Length Conditioning', 'Players perform game-length shifts at high intensity. Build conditioning for actual game situations.', 'conditioning', 15, 11, 21, 'intermediate', '{"shift_endurance_poor": true, "game_conditioning_weak": true}', ARRAY['conditioning', 'shifts', 'game_pace', 'intensity']),

('Forward/Backward Conditioning', 'Players alternate forward and backward skating continuously. Build skating endurance and transition conditioning.', 'conditioning', 10, 10, 21, 'all', '{"skating_endurance_weak": true, "transition_conditioning_poor": true}', ARRAY['conditioning', 'forward_backward', 'transitions', 'endurance']),

('Partner Resistance Skating', 'Players skate with partner providing resistance. Build strength and power endurance.', 'conditioning', 12, 11, 21, 'intermediate', '{"strength_endurance_weak": true, "power_conditioning_poor": true}', ARRAY['conditioning', 'resistance', 'strength', 'power']),

('High-Intensity Interval Training', 'Players perform intervals of high-intensity skating with rest periods. Build cardiovascular conditioning.', 'conditioning', 15, 11, 21, 'intermediate', '{"cardiovascular_conditioning_weak": true, "interval_training_needed": true}', ARRAY['conditioning', 'hiit', 'intervals', 'cardiovascular']);

-- SMALL_AREA_GAMES (20 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Cross-Ice 3-on-3', 'Three-on-three games in small areas. Work on puck possession, quick decisions, and offensive creativity.', 'small_area_games', 15, 9, 21, 'all', '{"small_area_play_weak": true, "quick_decisions_needed": true}', ARRAY['small_area_games', '3_on_3', 'possession', 'creativity']),

('Half-Ice 4-on-4', 'Four-on-four games in half-ice. Practice transitions, defensive coverage, and offensive support.', 'small_area_games', 15, 10, 21, 'all', '{"4_on_4_play_weak": true, "half_ice_situations": true}', ARRAY['small_area_games', '4_on_4', 'half_ice', 'support']),

('1-on-1 Small Area Battles', 'Continuous 1-on-1 battles in small areas. Work on puck protection, defensive positioning, and battles.', 'small_area_games', 12, 9, 21, 'all', '{"1_on_1_battles_weak": true, "puck_protection_poor": true}', ARRAY['small_area_games', '1_on_1', 'battles', 'protection']),

('2-on-2 Continuous', 'Two-on-two games with continuous play. Practice support, cycling, and defensive coverage.', 'small_area_games', 15, 9, 21, 'all', '{"2_on_2_play_weak": true, "support_play_poor": true}', ARRAY['small_area_games', '2_on_2', 'support', 'cycling']),

('Corner Battles Game', 'Small-area games focused on corner battles. Work on board play, strength, and puck recovery.', 'small_area_games', 12, 10, 21, 'intermediate', '{"corner_battles_weak": true, "board_play_poor": true}', ARRAY['small_area_games', 'corners', 'battles', 'boards']),

('Keep-Away (Possession Game)', 'Team possession game in small area. Work on puck protection, support, and offensive patience.', 'small_area_games', 10, 8, 21, 'all', '{"possession_weak": true, "support_positioning_poor": true}', ARRAY['small_area_games', 'keep_away', 'possession', 'support']),

('Small Area 5-on-5', 'Five-on-five in small area (third of ice). High-paced game working all skills in tight spaces.', 'small_area_games', 15, 10, 21, 'all', '{"small_area_5_on_5_weak": true, "tight_space_play_poor": true}', ARRAY['small_area_games', '5_on_5', 'tight_spaces', 'all_skills']),

('Shooting Game (King of the Hill)', 'Players compete for shooting opportunities. Work on battles, positioning, and finishing.', 'small_area_games', 12, 9, 21, 'all', '{"competitive_shooting_weak": true, "finishing_under_pressure_poor": true}', ARRAY['small_area_games', 'shooting', 'competition', 'finishing']),

('Neutral Zone 3-on-3', 'Three-on-three in neutral zone only. Work on quick transitions and neutral zone play.', 'small_area_games', 12, 10, 21, 'intermediate', '{"neutral_zone_play_weak": true, "quick_transitions_poor": true}', ARRAY['small_area_games', '3_on_3', 'neutral_zone', 'transitions']),

('Small Area Cycle Game', 'Focus on cycling in small area. Work on puck protection, support, and offensive patience.', 'small_area_games', 12, 10, 21, 'intermediate', '{"cycling_weak": true, "offensive_patience_lacking": true}', ARRAY['small_area_games', 'cycling', 'patience', 'support']),

('One-Goal Games', 'Games with single goal. Work on defensive responsibilities and attacking single net.', 'small_area_games', 15, 9, 21, 'all', '{"one_goal_situations_weak": true, "defensive_positioning_poor": true}', ARRAY['small_area_games', 'one_goal', 'defense', 'attack']),

('Oddman Rush Games', 'Continuous odd-man rush situations. Practice 2-on-1, 3-on-2 in game contexts.', 'small_area_games', 15, 10, 21, 'intermediate', '{"odd_man_execution_poor": true, "rush_situations_weak": true}', ARRAY['small_area_games', 'odd_man', 'rush', 'execution']),

('Behind Net Small Game', 'Small-area game starting from behind net. Work on behind-net plays and small-area vision.', 'small_area_games', 12, 10, 21, 'intermediate', '{"behind_net_play_weak": true, "small_area_vision_poor": true}', ARRAY['small_area_games', 'behind_net', 'vision', 'plays']),

('Continuous 3-on-2 Game', 'Continuous 3-on-2 situations. Work on offensive execution and defensive coverage.', 'small_area_games', 15, 10, 21, 'intermediate', '{"3_on_2_situations_weak": true, "coverage_execution_poor": true}', ARRAY['small_area_games', '3_on_2', 'execution', 'coverage']),

('Small Area PP vs PK', 'Small-area power play vs penalty kill. Work on special teams in condensed space.', 'small_area_games', 15, 11, 21, 'intermediate', '{"small_area_special_teams_weak": true, "condensed_play_poor": true}', ARRAY['small_area_games', 'power_play', 'penalty_kill', 'special_teams']),

('Bumper Position Game', 'Small-area game emphasizing bumper position play. Work on finding soft areas and quick shots.', 'small_area_games', 12, 11, 21, 'intermediate', '{"bumper_position_weak": true, "soft_area_finding_poor": true}', ARRAY['small_area_games', 'bumper', 'soft_areas', 'shooting']),

('Transition Box Game', 'Box area with continuous transitions. Work on quick changes from offense to defense.', 'small_area_games', 15, 10, 21, 'all', '{"small_area_transitions_weak": true, "quick_change_poor": true}', ARRAY['small_area_games', 'transitions', 'box', 'quick_change']),

('Small Area Shooting Competition', 'Competitive shooting games in small areas. Work on finishing under pressure and competition.', 'small_area_games', 12, 9, 21, 'all', '{"competitive_play_needed": true, "pressure_finishing_weak": true}', ARRAY['small_area_games', 'shooting', 'competition', 'pressure']),

('Give and Go Small Game', 'Small-area game emphasizing give-and-go plays. Work on timing, support, and passing.', 'small_area_games', 12, 9, 21, 'all', '{"give_and_go_weak": true, "timing_support_poor": true}', ARRAY['small_area_games', 'give_and_go', 'timing', 'passing']),

('High-Pace Small Area 5-on-5', 'Fast-paced 5-on-5 in confined area. Simulate game pace and pressure in tight spaces.', 'small_area_games', 15, 11, 21, 'intermediate', '{"game_pace_conditioning_weak": true, "pressure_situations_poor": true}', ARRAY['small_area_games', '5_on_5', 'pace', 'pressure']);

-- SCRIMMAGE DRILLS (5 drills)
INSERT INTO drills (title, description, category, duration_minutes, age_min, age_max, skill_level, addresses_situations, tags) VALUES

('Full-Ice 5-on-5 Scrimmage', 'Full game scrimmage 5-on-5. Apply all skills in game situations and practice team systems.', 'scrimmage', 20, 9, 21, 'all', '{"game_simulation_needed": true, "team_play_practice": true}', ARRAY['scrimmage', '5_on_5', 'full_ice', 'game_situation']),

('Situational Scrimmage', 'Scrimmage with specific situations (trailing, leading, etc.). Practice game management and situational play.', 'scrimmage', 20, 11, 21, 'intermediate', '{"situational_play_weak": true, "game_management_poor": true}', ARRAY['scrimmage', 'situational', 'game_management', 'scenarios']),

('Special Teams Scrimmage', 'Scrimmage focusing on special teams situations. Practice power play and penalty kill in game context.', 'scrimmage', 20, 11, 21, 'intermediate', '{"special_teams_game_situations_weak": true, "pp_pk_practice_needed": true}', ARRAY['scrimmage', 'special_teams', 'power_play', 'penalty_kill']),

('Controlled Scrimmage with Coaching', 'Scrimmage with frequent stoppages for coaching points. Work on implementing systems and corrections.', 'scrimmage', 25, 10, 21, 'all', '{"system_implementation_needed": true, "coaching_points_practice": true}', ARRAY['scrimmage', 'controlled', 'coaching', 'systems']),

('Tournament Simulation Scrimmage', 'Full-game simulation with periods, whistles, and game management. Practice tournament/game scenarios.', 'scrimmage', 30, 11, 21, 'intermediate', '{"game_readiness_needed": true, "tournament_preparation": true}', ARRAY['scrimmage', 'tournament', 'simulation', 'game_readiness']);

-- SUMMARY
-- Total drills: 30 shooting + 25 passing + 20 skating + 25 breakouts + 15 forechecking +
--               15 backchecking + 20 defensive_zone + 15 power_play + 15 penalty_kill +
--               15 transition + 10 faceoffs + 10 warm_up + 5 cool_down + 10 conditioning +
--               20 small_area_games + 5 scrimmage = 255 TOTAL DRILLS!
--
-- Each drill includes:
-- - Comprehensive description
-- - Category, duration, age range, skill level
-- - AI integration metadata (addresses_situations JSONB)
-- - Searchable tags array
--
-- This seed data enables intelligent, AI-powered practice plan generation!
