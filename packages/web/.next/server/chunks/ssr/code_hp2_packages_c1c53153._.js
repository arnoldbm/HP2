module.exports = [
"[project]/code/hp2/packages/shared/src/types/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared TypeScript types for HockeyPilot
 */ // Re-export common types
__turbopack_context__.s([]);
;
}),
"[project]/code/hp2/packages/shared/src/api/game-events.interface.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Game Events API Interface
 *
 * Platform-agnostic interface for game event CRUD operations.
 * - Web: Implements with direct Supabase calls
 * - Mobile: Implements with REST API calls to backend
 */ __turbopack_context__.s([]);
;
}),
"[project]/code/hp2/packages/shared/src/validation/event-schemas.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Event Validation Schemas using Zod
 *
 * These schemas validate game event data before database insertion.
 * Ensures type safety and data integrity for all tracked events.
 */ __turbopack_context__.s([
    "breakoutEventDetailsSchema",
    ()=>breakoutEventDetailsSchema,
    "faceoffEventDetailsSchema",
    ()=>faceoffEventDetailsSchema,
    "gameEventCreateSchema",
    ()=>gameEventCreateSchema,
    "safeParseGameEvent",
    ()=>safeParseGameEvent,
    "shotEventDetailsSchema",
    ()=>shotEventDetailsSchema,
    "turnoverEventDetailsSchema",
    ()=>turnoverEventDetailsSchema,
    "validateEventDetails",
    ()=>validateEventDetails,
    "validateGameEvent",
    ()=>validateGameEvent,
    "zoneEntryEventDetailsSchema",
    ()=>zoneEntryEventDetailsSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/node_modules/zod/v3/external.js [app-ssr] (ecmascript) <export * as z>");
;
const shotEventDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    shot_type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'wrist',
        'slap',
        'snap',
        'backhand',
        'deflection',
        'one_timer'
    ]),
    result: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'goal',
        'save',
        'miss_high',
        'miss_wide',
        'blocked',
        'post'
    ]),
    shot_quality: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'high',
        'medium',
        'low'
    ]),
    rebound: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const breakoutEventDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    success: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'up_boards',
        'center_ice',
        'cross_ice',
        'carry'
    ]),
    exit_zone: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'left',
        'center',
        'right'
    ]).optional()
});
const turnoverEventDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'bad_pass',
        'lost_puck',
        'forced'
    ]),
    recovery: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const zoneEntryEventDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    entry_type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'dump',
        'carry',
        'pass'
    ]),
    controlled: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean()
});
const faceoffEventDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    won: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    location: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
const gameEventCreateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    // Required fields
    game_id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    event_type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'shot',
        'goal',
        'breakout',
        'turnover',
        'zone_entry',
        'faceoff',
        'penalty',
        'defensive_breakdown'
    ]),
    period: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1).max(5),
    situation: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'even_strength',
        'power_play',
        'penalty_kill',
        'empty_net'
    ]).default('even_strength'),
    details: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any(),
    // Optional spatial data
    x_coord: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(200).optional(),
    y_coord: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(100).optional(),
    // Optional temporal data
    game_time_seconds: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(1200).optional(),
    // Optional player/situation context
    player_id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    zone: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'defensive',
        'neutral',
        'offensive'
    ]).optional(),
    // Optional metadata
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
function validateEventDetails(eventType, details) {
    switch(eventType){
        case 'shot':
        case 'goal':
            return shotEventDetailsSchema.parse(details);
        case 'breakout':
            return breakoutEventDetailsSchema.parse(details);
        case 'turnover':
            return turnoverEventDetailsSchema.parse(details);
        case 'zone_entry':
            return zoneEntryEventDetailsSchema.parse(details);
        case 'faceoff':
            return faceoffEventDetailsSchema.parse(details);
        default:
            // For other event types, allow any details (validated later)
            return details;
    }
}
function safeParseGameEvent(data) {
    return gameEventCreateSchema.safeParse(data);
}
function validateGameEvent(data) {
    const event = gameEventCreateSchema.parse(data);
    // Validate event-specific details
    validateEventDetails(event.event_type, event.details);
    return event;
}
}),
"[project]/code/hp2/packages/shared/src/validation/player-schemas.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatPosition",
    ()=>formatPosition,
    "getPositionAbbreviation",
    ()=>getPositionAbbreviation,
    "playerCreateSchema",
    ()=>playerCreateSchema,
    "playerPositionEnum",
    ()=>playerPositionEnum,
    "playerUpdateSchema",
    ()=>playerUpdateSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/node_modules/zod/v3/external.js [app-ssr] (ecmascript) <export * as z>");
;
const playerPositionEnum = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'forward',
    'defense',
    'goalie'
]);
const playerCreateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    team_id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Invalid team ID'),
    jersey_number: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number({
        required_error: 'Jersey number is required',
        invalid_type_error: 'Jersey number is required'
    }).int('Jersey number must be an integer').min(1, 'Jersey number must be at least 1').max(99, 'Jersey number must be at most 99'),
    first_name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string({
        required_error: 'First name is required'
    }).min(1, 'First name is required').max(50, 'First name must be at most 50 characters').trim(),
    last_name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string({
        required_error: 'Last name is required'
    }).min(1, 'Last name is required').max(50, 'Last name must be at most 50 characters').trim(),
    position: playerPositionEnum,
    birthdate: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].null()
    ]).optional().transform((val)=>val === '' || val === null ? undefined : val).pipe(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().date().optional())
});
const playerUpdateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    jersey_number: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int('Jersey number must be an integer').min(1, 'Jersey number must be at least 1').max(99, 'Jersey number must be at most 99').optional(),
    first_name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'First name is required').max(50, 'First name must be at most 50 characters').trim().optional(),
    last_name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Last name is required').max(50, 'Last name must be at most 50 characters').trim().optional(),
    position: playerPositionEnum.optional(),
    birthdate: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].null()
    ]).optional().transform((val)=>val === '' || val === null ? undefined : val).pipe(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().date().optional())
});
function formatPosition(position) {
    const map = {
        forward: 'Forward',
        defense: 'Defense',
        goalie: 'Goalie'
    };
    return map[position];
}
function getPositionAbbreviation(position) {
    const map = {
        forward: 'F',
        defense: 'D',
        goalie: 'G'
    };
    return map[position];
}
}),
"[project]/code/hp2/packages/shared/src/validation/team-schemas.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentSeason",
    ()=>getCurrentSeason,
    "parseSeason",
    ()=>parseSeason,
    "teamCreateSchema",
    ()=>teamCreateSchema,
    "teamUpdateSchema",
    ()=>teamUpdateSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/node_modules/zod/v3/external.js [app-ssr] (ecmascript) <export * as z>");
;
const teamCreateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    organization_id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Invalid organization ID'),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Team name is required').max(100, 'Team name must be less than 100 characters'),
    age_years: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int('Age must be a whole number').min(6, 'Age must be at least 6').max(21, 'Age must be 21 or less'),
    level: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'house',
        'travel',
        'aaa',
        'aa',
        'a'
    ], {
        errorMap: ()=>({
                message: 'Please select a skill level'
            })
    }),
    season: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}$/, 'Season must be in format YYYY-YY (e.g., 2024-25)').refine((season)=>{
        const [startYear, endYear] = season.split('-').map(Number);
        return endYear === (startYear + 1) % 100;
    }, {
        message: 'Invalid season format (e.g., 2024-25)'
    }),
    region: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'usa',
        'canada'
    ], {
        errorMap: ()=>({
                message: 'Please select a region'
            })
    }).default('usa')
});
const teamUpdateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Team name is required').max(100, 'Team name must be less than 100 characters').optional(),
    level: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'house',
        'travel',
        'aaa',
        'aa',
        'a'
    ]).optional(),
    season: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}$/, 'Season must be in format YYYY-YY').optional()
});
function getCurrentSeason() {
    const now = new Date();
    const month = now.getMonth() + 1 // 0-indexed
    ;
    // Hockey season starts in September (month 9)
    // If before September, we're in the season that started last year
    // If September or after, we're in the season starting this year
    const startYear = month < 9 ? now.getFullYear() - 1 : now.getFullYear();
    const endYear = startYear + 1;
    return `${startYear}-${String(endYear).slice(2)}` // "2024-25"
    ;
}
function parseSeason(season) {
    const match = season.match(/^(\d{4})-(\d{2})$/);
    if (!match) return null;
    const startYear = parseInt(match[1]);
    const endYear = 2000 + parseInt(match[2]);
    return {
        startYear,
        endYear
    };
}
}),
"[project]/code/hp2/packages/shared/src/validation/user-schemas.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateUserProfileSchema",
    ()=>updateUserProfileSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/node_modules/zod/v3/external.js [app-ssr] (ecmascript) <export * as z>");
;
const updateUserProfileSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    full_name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Name must be at least 1 character').max(100, 'Name must be less than 100 characters').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('')),
    avatar_url: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url('Must be a valid URL').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal(''))
});
}),
"[project]/code/hp2/packages/shared/src/utils/age-groups.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Age group utilities to handle USA and Canada conventions
 *
 * USA: 8U, 10U, 12U, 14U, 16U, 18U (2-year bands, even numbers)
 * Canada: U9, U10, U11, U12, U13, U14, U15, U16, U17, U18 (single-year)
 *
 * Mapping:
 * - U9 (Canada) = 8U (USA) - both are age 8 and under
 * - U11 (Canada) = 10U (USA) - both are age 10 and under
 * - U13 (Canada) = 12U (USA) - both are age 12 and under
 */ __turbopack_context__.s([
    "formatAgeGroup",
    ()=>formatAgeGroup,
    "getAgeGroupOptions",
    ()=>getAgeGroupOptions,
    "parseAgeGroup",
    ()=>parseAgeGroup
]);
function formatAgeGroup(ageYears, region = 'usa') {
    if (region === 'usa') {
        // USA format: 8U (even numbers)
        // age_years=9 -> 8U, age_years=11 -> 10U
        return `${ageYears - 1}U`;
    } else {
        // Canada format: U9, U10, U11, etc.
        return `U${ageYears}`;
    }
}
function parseAgeGroup(ageGroup) {
    // Handle both formats: "8U" and "U9"
    const match = ageGroup.match(/(\d+)U|U(\d+)/);
    if (!match) throw new Error(`Invalid age group format: ${ageGroup}`);
    const usaFormat = match[1] // "8U" -> "8"
    ;
    const canadaFormat = match[2] // "U9" -> "9"
    ;
    if (usaFormat) {
        // USA format: 8U means 9 years (8 and under)
        return parseInt(usaFormat) + 1;
    } else {
        // Canada format: U9 means 9 years
        return parseInt(canadaFormat);
    }
}
function getAgeGroupOptions(region = 'usa') {
    const ages = region === 'usa' ? [
        8,
        10,
        12,
        14,
        16,
        18
    ] // USA: even numbers only
     : [
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18
    ] // Canada: every year
    ;
    return ages.map((age)=>{
        const ageYears = region === 'usa' ? age + 1 : age;
        return {
            value: ageYears,
            label: formatAgeGroup(ageYears, region)
        };
    });
} // Examples:
 // formatAgeGroup(9, 'usa') => "8U"
 // formatAgeGroup(9, 'canada') => "U9"
 // parseAgeGroup("8U") => 9
 // parseAgeGroup("U9") => 9
 // getAgeGroupOptions('usa') => [{value: 9, label: "8U"}, {value: 11, label: "10U"}, ...]
 // getAgeGroupOptions('canada') => [{value: 9, label: "U9"}, {value: 10, label: "U10"}, ...]
}),
"[project]/code/hp2/packages/shared/src/utils/ice-surface-coordinates.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Ice Surface Coordinate Helpers
 *
 * Utilities for working with ice surface coordinates in the game tracking system.
 *
 * Coordinate System:
 * - x: 0-200 (left to right, defensive zone → offensive zone)
 * - y: 0-100 (bottom to top)
 * - Based on NHL standard rink dimensions (200 feet x 85 feet)
 *
 * Key Locations:
 * - (0, 0) = Defensive zone, bottom-left corner
 * - (100, 50) = Center ice
 * - (200, 100) = Offensive zone, top-right corner
 *
 * Standard Rink Markings:
 * - Goal lines: x = 11, x = 189 (11 feet from boards)
 * - Blue lines: x = 64, x = 136 (64 and 136 feet from end boards)
 * - Center red line: x = 100
 *
 * Zones:
 * - Defensive: x < 64 (0-63)
 * - Neutral: x 64-136
 * - Offensive: x > 136 (137-200)
 *
 * High Danger Area (Slot):
 * - x: 145-175, y: 35-65
 * - Very close to net: x: 175-189, y: 40-60
 */ __turbopack_context__.s([
    "ICE_SURFACE",
    ()=>ICE_SURFACE,
    "getDistance",
    ()=>getDistance,
    "getQuadrant",
    ()=>getQuadrant,
    "getZone",
    ()=>getZone,
    "iceToScreen",
    ()=>iceToScreen,
    "isInHighDangerArea",
    ()=>isInHighDangerArea,
    "isInSlot",
    ()=>isInSlot,
    "isValidCoordinate",
    ()=>isValidCoordinate,
    "normalizeCoordinates",
    ()=>normalizeCoordinates,
    "screenToIce",
    ()=>screenToIce
]);
function isValidCoordinate(coords) {
    return coords.x >= 0 && coords.x <= 200 && coords.y >= 0 && coords.y <= 100;
}
function normalizeCoordinates(coords) {
    return {
        x: Math.max(0, Math.min(200, coords.x)),
        y: Math.max(0, Math.min(100, coords.y))
    };
}
function getZone(coords) {
    if (coords.x < 64) return 'defensive';
    if (coords.x <= 136) return 'neutral';
    return 'offensive';
}
function getQuadrant(coords) {
    const zone = getZone(coords);
    const side = coords.y <= 50 ? 'left' : 'right';
    return `${zone}_${side}`;
}
function isInSlot(coords) {
    return coords.x >= 145 && coords.x <= 175 && coords.y >= 35 && coords.y <= 65;
}
function isInHighDangerArea(coords) {
    // Slot area
    if (isInSlot(coords)) return true;
    // Very close to net (right in front of crease)
    if (coords.x >= 175 && coords.x <= 189 && coords.y >= 40 && coords.y <= 60) {
        return true;
    }
    return false;
}
function getDistance(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return Math.sqrt(dx * dx + dy * dy);
}
function screenToIce(screenCoords, screenWidth, screenHeight) {
    const x = Math.round(screenCoords.x / screenWidth * ICE_SURFACE.WIDTH);
    const y = Math.round(screenCoords.y / screenHeight * ICE_SURFACE.HEIGHT);
    return normalizeCoordinates({
        x,
        y
    });
}
function iceToScreen(iceCoords, screenWidth, screenHeight) {
    const x = iceCoords.x / ICE_SURFACE.WIDTH * screenWidth;
    const y = iceCoords.y / ICE_SURFACE.HEIGHT * screenHeight;
    return {
        x,
        y
    };
}
const ICE_SURFACE = {
    WIDTH: 200,
    HEIGHT: 100,
    CENTER: {
        x: 100,
        y: 50
    },
    ZONES: {
        DEFENSIVE_END: 64,
        NEUTRAL_END: 136
    },
    SLOT: {
        MIN_X: 145,
        MAX_X: 175,
        MIN_Y: 35,
        MAX_Y: 65
    }
};
}),
"[project]/code/hp2/packages/shared/src/utils/organization-setup.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Organization Setup Utilities
 *
 * Helper functions for creating and managing organizations
 * during user signup and onboarding flow.
 */ /**
 * Generate a URL-safe slug from an organization or user name
 *
 * @param name - The name to convert to a slug
 * @returns URL-safe slug (lowercase, alphanumeric + hyphens)
 *
 * @example
 * generateOrgSlug('John Smith') => 'john-smith'
 * generateOrgSlug("O'Connor's Team") => 'oconnors-team'
 */ __turbopack_context__.s([
    "generateOrgName",
    ()=>generateOrgName,
    "generateOrgSlug",
    ()=>generateOrgSlug,
    "generateUniqueSlug",
    ()=>generateUniqueSlug
]);
function generateOrgSlug(name) {
    return name.trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    ;
}
function generateOrgName(fullName) {
    const trimmed = fullName.trim();
    if (!trimmed) {
        return 'My Teams';
    }
    // Add possessive apostrophe + "Teams"
    return `${trimmed}'s Teams`;
}
function generateUniqueSlug(baseSlug, existingSlugs) {
    // If base slug doesn't exist, use it
    if (!existingSlugs.includes(baseSlug)) {
        return baseSlug;
    }
    // Find the next available number
    let counter = 2;
    let candidateSlug = `${baseSlug}-${counter}`;
    while(existingSlugs.includes(candidateSlug)){
        counter++;
        candidateSlug = `${baseSlug}-${counter}`;
    }
    return candidateSlug;
}
}),
"[project]/code/hp2/packages/shared/src/utils/event-mappers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Event Mappers
 *
 * Utility functions to convert between database row format (snake_case)
 * and client format (camelCase)
 */ __turbopack_context__.s([
    "mapRowToGameEvent",
    ()=>mapRowToGameEvent
]);
function mapRowToGameEvent(row) {
    return {
        id: row.id,
        gameId: row.game_id,
        eventType: row.event_type,
        coordinates: row.x_coord !== null && row.y_coord !== null ? {
            x: row.x_coord,
            y: row.y_coord
        } : undefined,
        playerId: row.player_id || undefined,
        period: row.period,
        gameTimeSeconds: row.game_time_seconds || 0,
        situation: row.situation || 'even_strength',
        details: row.details || {},
        timestamp: row.event_timestamp || new Date().toISOString(),
        trackedBy: row.tracked_by || undefined
    };
}
}),
"[project]/code/hp2/packages/shared/src/analytics/shot-quality.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shot Quality Calculator
 *
 * Classifies shots as high/medium/low danger based on location on ice surface.
 * Used for game analytics and expected goals (xG) calculations.
 *
 * Ice Surface Coordinates:
 * - x: 0-200 (left to right, defensive to offensive)
 * - y: 0-100 (bottom to top)
 *
 * High danger area: "Home plate" in front of net (slot)
 * - x: 80-110, y: 35-65
 * - Very close to net: x: 60-80, y: 40-60
 *
 * Low danger areas:
 * - Point shots: x >= 140
 * - Behind goal line: x < 60
 * - Extreme angles: y < 20 or y > 80
 *
 * Medium danger: Everything else (faceoff circles, mid-slot)
 */ __turbopack_context__.s([
    "calculateShotQuality",
    ()=>calculateShotQuality
]);
function calculateShotQuality({ x, y }) {
    // High danger: slot area (home plate)
    if (x >= 80 && x <= 110 && y >= 35 && y <= 65) {
        return 'high';
    }
    // High danger: very close to net
    if (x >= 60 && x <= 80 && y >= 40 && y <= 60) {
        return 'high';
    }
    // Low danger: point shots (from blue line or beyond)
    if (x >= 140) {
        return 'low';
    }
    // Low danger: behind goal line or extreme angles
    if (x < 60 || y < 20 || y > 80) {
        return 'low';
    }
    // Medium danger: everything else (faceoff dots, mid-slot)
    return 'medium';
}
}),
"[project]/code/hp2/packages/shared/src/analytics/breakout-analytics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Breakout Analytics Calculator
 *
 * Calculates statistics and insights from breakout events.
 * Used for post-game analytics and practice plan recommendations.
 *
 * Key Metrics:
 * - Overall breakout success rate
 * - Success rate by exit zone (left, center, right)
 * - Success rate by breakout type (up_boards, center_ice, cross_ice, carry)
 * - Identification of weakest areas for targeted practice
 */ __turbopack_context__.s([
    "calculateBreakoutStats",
    ()=>calculateBreakoutStats,
    "calculateBreakoutSuccessRate",
    ()=>calculateBreakoutSuccessRate,
    "getBreakoutStatsByType",
    ()=>getBreakoutStatsByType,
    "getBreakoutStatsByZone",
    ()=>getBreakoutStatsByZone,
    "identifyWeakestBreakoutArea",
    ()=>identifyWeakestBreakoutArea
]);
function calculateBreakoutSuccessRate(breakouts) {
    if (breakouts.length === 0) return 0;
    const successful = breakouts.filter((b)=>b.success).length;
    return successful / breakouts.length * 100;
}
function calculateBreakoutStats(breakouts) {
    const total = breakouts.length;
    const successful = breakouts.filter((b)=>b.success).length;
    const failed = total - successful;
    const successRate = total > 0 ? successful / total * 100 : 0;
    return {
        total,
        successful,
        failed,
        successRate
    };
}
function getBreakoutStatsByZone(breakouts) {
    const zones = {
        left: [],
        center: [],
        right: [],
        unknown: []
    };
    // Group breakouts by zone
    breakouts.forEach((breakout)=>{
        const zone = breakout.exit_zone || 'unknown';
        zones[zone].push(breakout);
    });
    // Calculate stats for each zone
    return {
        left: calculateBreakoutStats(zones.left),
        center: calculateBreakoutStats(zones.center),
        right: calculateBreakoutStats(zones.right),
        unknown: calculateBreakoutStats(zones.unknown)
    };
}
function getBreakoutStatsByType(breakouts) {
    const types = {
        up_boards: [],
        center_ice: [],
        cross_ice: [],
        carry: []
    };
    // Group breakouts by type
    breakouts.forEach((breakout)=>{
        types[breakout.type].push(breakout);
    });
    // Calculate stats for each type
    return {
        up_boards: calculateBreakoutStats(types.up_boards),
        center_ice: calculateBreakoutStats(types.center_ice),
        cross_ice: calculateBreakoutStats(types.cross_ice),
        carry: calculateBreakoutStats(types.carry)
    };
}
function identifyWeakestBreakoutArea(breakouts) {
    if (breakouts.length === 0) return null;
    const statsByZone = getBreakoutStatsByZone(breakouts);
    // Find zone with lowest success rate (excluding zones with no attempts)
    let weakest = null;
    const zones = [
        {
            name: 'left',
            stats: statsByZone.left
        },
        {
            name: 'center',
            stats: statsByZone.center
        },
        {
            name: 'right',
            stats: statsByZone.right
        }
    ];
    zones.forEach(({ name, stats })=>{
        if (stats.total > 0) {
            if (!weakest || stats.successRate < weakest.successRate) {
                weakest = {
                    zone: name,
                    successRate: stats.successRate,
                    total: stats.total,
                    failed: stats.failed
                };
            }
        }
    });
    return weakest;
}
}),
"[project]/code/hp2/packages/shared/src/analytics/game-analytics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeBreakouts",
    ()=>analyzeBreakouts,
    "calculatePlayerStats",
    ()=>calculatePlayerStats,
    "calculateShotQualityStats",
    ()=>calculateShotQualityStats,
    "extractShotData",
    ()=>extractShotData,
    "extractTurnoverData",
    ()=>extractTurnoverData,
    "getPeriodStats",
    ()=>getPeriodStats,
    "getShootingPercentageBySituation",
    ()=>getShootingPercentageBySituation
]);
function extractShotData(events) {
    return events.filter((e)=>e.eventType === 'shot' && e.coordinates).map((event)=>({
            x: event.coordinates.x,
            y: event.coordinates.y,
            result: event.details.result || 'miss_high',
            shotQuality: event.details.shot_quality,
            period: event.period,
            situation: event.situation,
            playerId: event.playerId
        }));
}
function calculateShotQualityStats(events) {
    const shots = events.filter((e)=>e.eventType === 'shot');
    const stats = {
        high: {
            count: 0,
            goals: 0,
            percentage: 0
        },
        medium: {
            count: 0,
            goals: 0,
            percentage: 0
        },
        low: {
            count: 0,
            goals: 0,
            percentage: 0
        },
        total: {
            count: shots.length,
            goals: 0,
            percentage: 0
        }
    };
    shots.forEach((shot)=>{
        const quality = shot.details.shot_quality;
        const isGoal = shot.details.result === 'goal';
        if (isGoal) {
            stats.total.goals++;
        }
        if (quality) {
            stats[quality].count++;
            if (isGoal) {
                stats[quality].goals++;
            }
        }
    });
    // Calculate percentages
    if (stats.high.count > 0) {
        stats.high.percentage = stats.high.goals / stats.high.count * 100;
    }
    if (stats.medium.count > 0) {
        stats.medium.percentage = stats.medium.goals / stats.medium.count * 100;
    }
    if (stats.low.count > 0) {
        stats.low.percentage = stats.low.goals / stats.low.count * 100;
    }
    if (stats.total.count > 0) {
        stats.total.percentage = stats.total.goals / stats.total.count * 100;
    }
    return stats;
}
function analyzeBreakouts(events) {
    const breakouts = events.filter((e)=>e.eventType === 'breakout');
    const analytics = {
        total: breakouts.length,
        successful: 0,
        failed: 0,
        successRate: 0,
        byType: {}
    };
    breakouts.forEach((breakout)=>{
        const success = breakout.details.success === true;
        const type = breakout.details.type || 'unknown';
        if (success) {
            analytics.successful++;
        } else {
            analytics.failed++;
        }
        // Track by type
        if (!analytics.byType[type]) {
            analytics.byType[type] = {
                total: 0,
                successful: 0,
                successRate: 0
            };
        }
        analytics.byType[type].total++;
        if (success) {
            analytics.byType[type].successful++;
        }
    });
    // Calculate success rates
    if (analytics.total > 0) {
        analytics.successRate = analytics.successful / analytics.total * 100;
    }
    Object.keys(analytics.byType).forEach((type)=>{
        const typeStats = analytics.byType[type];
        if (typeStats.total > 0) {
            typeStats.successRate = typeStats.successful / typeStats.total * 100;
        }
    });
    return analytics;
}
function getPeriodStats(events, maxPeriod = 3) {
    const periodStats = [];
    for(let period = 1; period <= maxPeriod; period++){
        const periodEvents = events.filter((e)=>e.period === period);
        periodStats.push({
            period,
            shots: periodEvents.filter((e)=>e.eventType === 'shot').length,
            goals: periodEvents.filter((e)=>e.eventType === 'shot' && e.details.result === 'goal').length,
            turnovers: periodEvents.filter((e)=>e.eventType === 'turnover').length,
            breakouts: periodEvents.filter((e)=>e.eventType === 'breakout').length,
            zoneEntries: periodEvents.filter((e)=>e.eventType === 'zone_entry').length
        });
    }
    return periodStats;
}
function extractTurnoverData(events) {
    return events.filter((e)=>e.eventType === 'turnover' && e.coordinates).map((event)=>({
            x: event.coordinates.x,
            y: event.coordinates.y,
            period: event.period,
            situation: event.situation
        }));
}
function getShootingPercentageBySituation(events) {
    const situations = [
        'even_strength',
        'power_play',
        'penalty_kill'
    ];
    return situations.map((situation)=>{
        const shots = events.filter((e)=>e.eventType === 'shot' && e.situation === situation);
        const goals = shots.filter((s)=>s.details.result === 'goal').length;
        return {
            situation,
            shots: shots.length,
            goals,
            percentage: shots.length > 0 ? goals / shots.length * 100 : 0
        };
    });
}
function calculatePlayerStats(events, players) {
    return players.map((player)=>{
        // Filter events for this player
        const playerEvents = events.filter((e)=>e.playerId === player.id);
        // Shots and goals
        const shots = playerEvents.filter((e)=>e.eventType === 'shot');
        const goals = shots.filter((s)=>s.details.result === 'goal');
        const shootingPct = shots.length > 0 ? goals.length / shots.length * 100 : 0;
        // Turnovers
        const turnovers = playerEvents.filter((e)=>e.eventType === 'turnover');
        // Breakouts
        const breakouts = playerEvents.filter((e)=>e.eventType === 'breakout');
        const successfulBreakouts = breakouts.filter((b)=>b.details.success === true);
        const breakoutSuccessPct = breakouts.length > 0 ? successfulBreakouts.length / breakouts.length * 100 : 0;
        // Zone entries
        const zoneEntries = playerEvents.filter((e)=>e.eventType === 'zone_entry');
        // Faceoffs
        const faceoffs = playerEvents.filter((e)=>e.eventType === 'faceoff');
        const faceoffWins = faceoffs.filter((f)=>f.details.won === true);
        const faceoffWinPct = faceoffs.length > 0 ? faceoffWins.length / faceoffs.length * 100 : 0;
        return {
            playerId: player.id,
            playerName: `${player.firstName[0]}. ${player.lastName}`,
            jerseyNumber: player.jerseyNumber,
            position: player.position,
            shots: shots.length,
            goals: goals.length,
            shootingPct,
            turnovers: turnovers.length,
            breakouts: breakouts.length,
            breakoutSuccessPct,
            zoneEntries: zoneEntries.length,
            faceoffs: faceoffs.length,
            faceoffWins: faceoffWins.length,
            faceoffWinPct,
            totalEvents: playerEvents.length
        };
    }).filter((stats)=>stats.totalEvents > 0) // Only show players with events
    .sort((a, b)=>b.totalEvents - a.totalEvents) // Sort by most active players
    ;
}
}),
"[project]/code/hp2/packages/shared/src/stores/game-tracking-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Game Tracking Store
 *
 * Platform-agnostic Zustand store for live game event tracking.
 * Uses dependency injection for API calls to support both web (Supabase) and mobile (REST API).
 */ __turbopack_context__.s([
    "createGameTrackingStore",
    ()=>createGameTrackingStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/node_modules/zustand/esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$event$2d$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/utils/event-mappers.ts [app-ssr] (ecmascript)");
;
;
const initialLoggingFlow = {
    step: 'idle',
    eventType: null,
    coordinates: null,
    playerId: null,
    details: {}
};
function createGameTrackingStore(api) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])((set, get)=>({
            // Initial state
            gameState: {
                gameId: null,
                period: 1,
                gameTimeSeconds: 1200,
                score: {
                    us: 0,
                    them: 0
                },
                situation: 'even_strength',
                status: 'in_progress'
            },
            players: [],
            events: [],
            loggingFlow: initialLoggingFlow,
            // Game state actions
            setGameState: (state)=>set((prev)=>({
                        gameState: {
                            ...prev.gameState,
                            ...state
                        }
                    })),
            setPlayers: (players)=>set({
                    players
                }),
            // Event logging flow
            startEventLogging: (eventType, coordinates, prefilledDetails)=>set({
                    loggingFlow: {
                        step: coordinates ? 'select_player' : 'select_location',
                        eventType,
                        coordinates: coordinates || null,
                        playerId: null,
                        details: prefilledDetails || {}
                    }
                }),
            // Start flow by allowing user to click ice first
            startLocationFirst: ()=>set({
                    loggingFlow: {
                        step: 'select_location',
                        eventType: null,
                        coordinates: null,
                        playerId: null,
                        details: {}
                    }
                }),
            setCoordinates: (coordinates)=>set((prev)=>({
                        loggingFlow: {
                            ...prev.loggingFlow,
                            coordinates,
                            // If event type is already set, go to player; otherwise, select event type
                            step: prev.loggingFlow.eventType ? 'select_player' : 'select_event_type'
                        }
                    })),
            // Set event type after location has been selected
            setEventType: (eventType, prefilledDetails)=>set((prev)=>({
                        loggingFlow: {
                            ...prev.loggingFlow,
                            eventType,
                            details: prefilledDetails || {},
                            step: 'select_player'
                        }
                    })),
            setPlayer: (playerId)=>set((prev)=>({
                        loggingFlow: {
                            ...prev.loggingFlow,
                            playerId,
                            step: prev.loggingFlow.eventType === 'shot' ? 'select_details' : 'complete'
                        }
                    })),
            setEventDetails: (details)=>set((prev)=>({
                        loggingFlow: {
                            ...prev.loggingFlow,
                            details: {
                                ...prev.loggingFlow.details,
                                ...details
                            },
                            step: 'complete'
                        }
                    })),
            completeEvent: async ()=>{
                const { loggingFlow, gameState, events } = get();
                if (!loggingFlow.eventType || !gameState.gameId) {
                    return;
                }
                const tempEvent = {
                    id: `temp_${Date.now()}`,
                    gameId: gameState.gameId,
                    eventType: loggingFlow.eventType,
                    coordinates: loggingFlow.coordinates || undefined,
                    playerId: loggingFlow.playerId || undefined,
                    period: gameState.period,
                    gameTimeSeconds: gameState.gameTimeSeconds,
                    situation: gameState.situation,
                    details: loggingFlow.details,
                    timestamp: new Date().toISOString()
                };
                // Optimistic update - add to local state immediately
                set({
                    events: [
                        ...events,
                        tempEvent
                    ],
                    loggingFlow: initialLoggingFlow
                });
                // Save to database in background
                try {
                    const savedEventRow = await api.saveGameEvent(tempEvent);
                    const savedEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$event$2d$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapRowToGameEvent"])(savedEventRow);
                    // Update local event with real ID from database
                    set((state)=>({
                            events: state.events.map((e)=>e.id === tempEvent.id ? savedEvent : e)
                        }));
                } catch (error) {
                    console.error('Failed to save event to database:', error);
                // TODO: Add to sync queue for offline support
                }
            },
            cancelEventLogging: ()=>set({
                    loggingFlow: initialLoggingFlow
                }),
            // Event management
            addEvent: (event)=>set((prev)=>({
                        events: [
                            ...prev.events,
                            event
                        ]
                    })),
            updateEvent: async (eventId, updates)=>{
                // Optimistic update
                set((prev)=>({
                        events: prev.events.map((e)=>e.id === eventId ? {
                                ...e,
                                ...updates
                            } : e)
                    }));
                // Persist to database
                try {
                    await api.updateGameEvent(eventId, updates);
                } catch (error) {
                    console.error('Failed to update event in database:', error);
                // TODO: Add to sync queue for offline support
                }
            },
            deleteEvent: async (eventId)=>{
                // Optimistic update
                set((prev)=>({
                        events: prev.events.filter((e)=>e.id !== eventId)
                    }));
                // Persist to database (skip temp events)
                if (!eventId.startsWith('temp_')) {
                    try {
                        await api.deleteGameEvent(eventId);
                    } catch (error) {
                        console.error('Failed to delete event from database:', error);
                    // TODO: Add to sync queue for offline support
                    }
                }
            },
            undoLastEvent: async ()=>{
                const { events } = get();
                if (events.length === 0) return;
                const lastEvent = events[events.length - 1];
                // Optimistic update
                set((prev)=>({
                        events: prev.events.slice(0, -1)
                    }));
                // Delete from database (skip temp events)
                if (!lastEvent.id.startsWith('temp_')) {
                    try {
                        await api.deleteGameEvent(lastEvent.id);
                    } catch (error) {
                        console.error('Failed to undo event in database:', error);
                    // TODO: Add to sync queue for offline support
                    }
                }
            },
            loadEvents: async (gameId)=>{
                try {
                    const rows = await api.getGameEvents(gameId);
                    const events = rows.map(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$event$2d$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapRowToGameEvent"]);
                    set({
                        events
                    });
                } catch (error) {
                    console.error('Failed to load events from database:', error);
                }
            },
            // Computed stats
            getEventsByType: (type)=>{
                return get().events.filter((e)=>e.eventType === type);
            },
            getShotStats: ()=>{
                const { events } = get();
                const shotEvents = events.filter((e)=>e.eventType === 'shot');
                const stats = {
                    total: shotEvents.length,
                    onGoal: 0,
                    goals: 0,
                    saves: 0,
                    misses: 0,
                    blocked: 0
                };
                shotEvents.forEach((event)=>{
                    const result = event.details.result;
                    if (result === 'goal') {
                        stats.goals++;
                        stats.onGoal++;
                    } else if (result === 'save') {
                        stats.saves++;
                        stats.onGoal++;
                    } else if (result === 'blocked') {
                        stats.blocked++;
                    } else {
                        // miss_high, miss_wide, post, or undefined
                        stats.misses++;
                    }
                });
                return stats;
            },
            getBreakoutStats: ()=>{
                const { events } = get();
                const breakouts = events.filter((e)=>e.eventType === 'breakout');
                const successful = breakouts.filter((e)=>e.details.success === true).length;
                const failed = breakouts.filter((e)=>e.details.success === false).length;
                return {
                    total: breakouts.length,
                    successful,
                    failed,
                    successRate: breakouts.length > 0 ? successful / breakouts.length * 100 : 0
                };
            }
        }));
}
}),
"[project]/code/hp2/packages/shared/src/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * @hockeypilot/shared
 *
 * Shared code between web and mobile apps
 * - Types
 * - API clients
 * - Business logic
 * - Zustand stores
 * - Validation schemas
 */ // Export types
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/types/index.ts [app-ssr] (ecmascript)");
// Export API interfaces
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$api$2f$game$2d$events$2e$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/api/game-events.interface.ts [app-ssr] (ecmascript)");
// Export validation schemas
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$validation$2f$event$2d$schemas$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/validation/event-schemas.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$validation$2f$player$2d$schemas$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/validation/player-schemas.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$validation$2f$team$2d$schemas$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/validation/team-schemas.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$validation$2f$user$2d$schemas$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/validation/user-schemas.ts [app-ssr] (ecmascript)");
// Export utils
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$age$2d$groups$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/utils/age-groups.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/utils/ice-surface-coordinates.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$organization$2d$setup$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/utils/organization-setup.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$event$2d$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/utils/event-mappers.ts [app-ssr] (ecmascript)");
// Export analytics
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$analytics$2f$shot$2d$quality$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/analytics/shot-quality.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$analytics$2f$breakout$2d$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/analytics/breakout-analytics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$analytics$2f$game$2d$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/analytics/game-analytics.ts [app-ssr] (ecmascript)");
// Export stores
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$stores$2f$game$2d$tracking$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/stores/game-tracking-store.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/code/hp2/packages/web/lib/api/game-events.supabase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Supabase Implementation of Game Events API
 *
 * Wraps direct Supabase calls to implement the IGameEventsAPI interface.
 * This allows the web app to use the platform-agnostic store with Supabase as the backend.
 */ __turbopack_context__.s([
    "SupabaseGameEventsAPI",
    ()=>SupabaseGameEventsAPI,
    "gameEventsAPI",
    ()=>gameEventsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/db/supabase.ts [app-ssr] (ecmascript)");
;
class SupabaseGameEventsAPI {
    client;
    constructor(client = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"]){
        this.client = client;
    }
    /**
   * Save a new game event
   */ async saveGameEvent(event) {
        // Debug: Check if we have a valid session
        const { data: { session } } = await this.client.auth.getSession();
        console.log('📊 Saving event with session:', session ? 'AUTHENTICATED' : 'NOT AUTHENTICATED');
        if (session) {
            console.log('User ID:', session.user.id);
        } else {
            console.error('❌ No session found! User is not authenticated.');
        }
        const eventData = {
            game_id: event.gameId,
            event_type: event.eventType,
            x_coord: event.coordinates?.x || null,
            y_coord: event.coordinates?.y || null,
            period: event.period,
            game_time_seconds: event.gameTimeSeconds,
            player_id: event.playerId || null,
            situation: event.situation,
            details: event.details
        };
        const { data, error } = await this.client.from('game_events').insert(eventData).select().single();
        if (error) {
            console.error('Error saving game event:', error);
            // If it's a 403 (Forbidden) error, sign out the user
            // This typically means the session expired or RLS policy denied access
            if (error.code === '42501' || error.message?.includes('row-level security')) {
                console.error('🔒 RLS policy denied access - signing out user');
                await this.client.auth.signOut();
            }
            throw error;
        }
        return this.mapDbRowToGameEventRow(data);
    }
    /**
   * Update an existing game event
   */ async updateGameEvent(eventId, updates) {
        const updateData = {};
        if (updates.coordinates) {
            updateData.x_coord = updates.coordinates.x;
            updateData.y_coord = updates.coordinates.y;
        }
        if (updates.playerId !== undefined) {
            updateData.player_id = updates.playerId || null;
        }
        if (updates.details) {
            updateData.details = updates.details;
        }
        if (updates.period) {
            updateData.period = updates.period;
        }
        if (updates.gameTimeSeconds !== undefined) {
            updateData.game_time_seconds = updates.gameTimeSeconds;
        }
        if (updates.situation) {
            updateData.situation = updates.situation;
        }
        const { data, error } = await this.client.from('game_events').update(updateData).eq('id', eventId).select().single();
        if (error) {
            console.error('Error updating game event:', error);
            // If it's a 403 (Forbidden) error, sign out the user
            if (error.code === '42501' || error.message?.includes('row-level security')) {
                console.error('🔒 RLS policy denied access - signing out user');
                await this.client.auth.signOut();
            }
            throw error;
        }
        return this.mapDbRowToGameEventRow(data);
    }
    /**
   * Delete a game event
   */ async deleteGameEvent(eventId) {
        const { error } = await this.client.from('game_events').delete().eq('id', eventId);
        if (error) {
            console.error('Error deleting game event:', error);
            // If it's a 403 (Forbidden) error, sign out the user
            if (error.code === '42501' || error.message?.includes('row-level security')) {
                console.error('🔒 RLS policy denied access - signing out user');
                await this.client.auth.signOut();
            }
            throw error;
        }
    }
    /**
   * Get all events for a game
   */ async getGameEvents(gameId) {
        const { data, error } = await this.client.from('game_events').select('*').eq('game_id', gameId).order('event_timestamp', {
            ascending: true
        });
        if (error) {
            console.error('Error fetching game events:', error);
            // If it's a 403 (Forbidden) error, sign out the user
            if (error.code === '42501' || error.message?.includes('row-level security')) {
                console.error('🔒 RLS policy denied access - signing out user');
                await this.client.auth.signOut();
            }
            throw error;
        }
        return data.map((row)=>this.mapDbRowToGameEventRow(row));
    }
    /**
   * Convert Supabase database row to GameEventRow type
   */ mapDbRowToGameEventRow(row) {
        return {
            id: row.id,
            game_id: row.game_id,
            event_type: row.event_type,
            x_coord: row.x_coord,
            y_coord: row.y_coord,
            period: row.period,
            game_time_seconds: row.game_time_seconds,
            player_id: row.player_id,
            situation: row.situation,
            details: row.details || {},
            event_timestamp: row.event_timestamp,
            tracked_by: row.tracked_by,
            created_at: row.created_at,
            updated_at: row.updated_at,
            notes: row.notes,
            zone: row.zone
        };
    }
}
const gameEventsAPI = new SupabaseGameEventsAPI();
}),
"[project]/code/hp2/packages/web/lib/stores/game-tracking-store-configured.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Configured Game Tracking Store for Web App
 *
 * Exports a game tracking store configured with the Supabase API implementation.
 */ __turbopack_context__.s([
    "useGameTrackingStore",
    ()=>useGameTrackingStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$stores$2f$game$2d$tracking$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/stores/game-tracking-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$api$2f$game$2d$events$2e$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/api/game-events.supabase.ts [app-ssr] (ecmascript)");
;
;
const useGameTrackingStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$stores$2f$game$2d$tracking$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGameTrackingStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$api$2f$game$2d$events$2e$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gameEventsAPI"]);
}),
"[project]/code/hp2/packages/web/lib/utils/ice-surface-coordinates.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Ice Surface Coordinate Helpers
 *
 * Utilities for working with ice surface coordinates in the game tracking system.
 *
 * Coordinate System:
 * - x: 0-200 (left to right, defensive zone → offensive zone)
 * - y: 0-100 (bottom to top)
 * - Based on NHL standard rink dimensions (200 feet x 85 feet)
 *
 * Key Locations:
 * - (0, 0) = Defensive zone, bottom-left corner
 * - (100, 50) = Center ice
 * - (200, 100) = Offensive zone, top-right corner
 *
 * Standard Rink Markings:
 * - Goal lines: x = 11, x = 189 (11 feet from boards)
 * - Blue lines: x = 64, x = 136 (64 and 136 feet from end boards)
 * - Center red line: x = 100
 *
 * Zones:
 * - Defensive: x < 64 (0-63)
 * - Neutral: x 64-136
 * - Offensive: x > 136 (137-200)
 *
 * High Danger Area (Slot):
 * - x: 145-175, y: 35-65
 * - Very close to net: x: 175-189, y: 40-60
 */ __turbopack_context__.s([
    "ICE_SURFACE",
    ()=>ICE_SURFACE,
    "getDistance",
    ()=>getDistance,
    "getQuadrant",
    ()=>getQuadrant,
    "getZone",
    ()=>getZone,
    "iceToScreen",
    ()=>iceToScreen,
    "isInHighDangerArea",
    ()=>isInHighDangerArea,
    "isInSlot",
    ()=>isInSlot,
    "isValidCoordinate",
    ()=>isValidCoordinate,
    "normalizeCoordinates",
    ()=>normalizeCoordinates,
    "screenToIce",
    ()=>screenToIce
]);
function isValidCoordinate(coords) {
    return coords.x >= 0 && coords.x <= 200 && coords.y >= 0 && coords.y <= 100;
}
function normalizeCoordinates(coords) {
    return {
        x: Math.max(0, Math.min(200, coords.x)),
        y: Math.max(0, Math.min(100, coords.y))
    };
}
function getZone(coords) {
    if (coords.x < 64) return 'defensive';
    if (coords.x <= 136) return 'neutral';
    return 'offensive';
}
function getQuadrant(coords) {
    const zone = getZone(coords);
    const side = coords.y <= 50 ? 'left' : 'right';
    return `${zone}_${side}`;
}
function isInSlot(coords) {
    return coords.x >= 145 && coords.x <= 175 && coords.y >= 35 && coords.y <= 65;
}
function isInHighDangerArea(coords) {
    // Slot area
    if (isInSlot(coords)) return true;
    // Very close to net (right in front of crease)
    if (coords.x >= 175 && coords.x <= 189 && coords.y >= 40 && coords.y <= 60) {
        return true;
    }
    return false;
}
function getDistance(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return Math.sqrt(dx * dx + dy * dy);
}
function screenToIce(screenCoords, screenWidth, screenHeight) {
    const x = Math.round(screenCoords.x / screenWidth * ICE_SURFACE.WIDTH);
    const y = Math.round(screenCoords.y / screenHeight * ICE_SURFACE.HEIGHT);
    return normalizeCoordinates({
        x,
        y
    });
}
function iceToScreen(iceCoords, screenWidth, screenHeight) {
    const x = iceCoords.x / ICE_SURFACE.WIDTH * screenWidth;
    const y = iceCoords.y / ICE_SURFACE.HEIGHT * screenHeight;
    return {
        x,
        y
    };
}
const ICE_SURFACE = {
    WIDTH: 200,
    HEIGHT: 100,
    CENTER: {
        x: 100,
        y: 50
    },
    ZONES: {
        DEFENSIVE_END: 64,
        NEUTRAL_END: 136
    },
    SLOT: {
        MIN_X: 145,
        MAX_X: 175,
        MIN_Y: 35,
        MAX_Y: 65
    }
};
}),
"[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IceSurface",
    ()=>IceSurface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/utils/ice-surface-coordinates.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function IceSurface({ width, height, onClick, showZones = false, showSlot = false, events = [], className = '', responsive = true, endsSwapped = false }) {
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // For responsive mode, use 100% width and auto height
    const svgWidth = responsive ? '100%' : width || 400;
    const svgHeight = responsive ? 'auto' : height || 200;
    const handleClick = (e)=>{
        if (!onClick) return;
        const svg = svgRef.current;
        if (!svg) return;
        // Get click position relative to SVG
        const rect = svg.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        // Convert to ice coordinates
        const iceCoords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["screenToIce"])({
            x: screenX,
            y: screenY
        }, rect.width, rect.height);
        onClick(iceCoords);
    };
    // Convert event type to color
    const getEventColor = (type)=>{
        switch(type){
            case 'shot':
            case 'goal':
                return '#3b82f6' // blue
                ;
            case 'turnover':
                return '#ef4444' // red
                ;
            case 'breakout':
                return '#10b981' // green
                ;
            case 'zone_entry':
            case 'zone_exit':
                return '#f59e0b' // amber
                ;
            default:
                return '#6b7280' // gray
                ;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ref: svgRef,
        width: svgWidth,
        height: svgHeight,
        viewBox: `0 0 ${__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].WIDTH} ${__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT}`,
        preserveAspectRatio: "xMidYMid meet",
        role: "img",
        "aria-label": "Hockey ice surface",
        onClick: handleClick,
        className: `cursor-pointer ${responsive ? 'max-w-full' : ''} ${className}`,
        style: {
            border: '2px solid #666',
            display: 'block',
            borderRadius: '8px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: 0,
                y: 0,
                width: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].WIDTH,
                height: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                fill: "#ffffff",
                rx: 4
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: 1,
                y: 1,
                width: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].WIDTH - 2,
                height: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT - 2,
                fill: "none",
                stroke: "#333",
                strokeWidth: 2,
                rx: 4
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: 11,
                y1: 0,
                x2: 11,
                y2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                stroke: "#cc0000",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: 189,
                y1: 0,
                x2: 189,
                y2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                stroke: "#cc0000",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: 64,
                y1: 0,
                x2: 64,
                y2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                stroke: "#0066cc",
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: 136,
                y1: 0,
                x2: 136,
                y2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                stroke: "#0066cc",
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].CENTER.x,
                y1: 0,
                x2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].CENTER.x,
                y2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                stroke: "#cc0000",
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 100,
                cy: 50,
                r: 15,
                fill: "none",
                stroke: "#0066cc",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 100,
                cy: 50,
                r: 1,
                fill: "#0066cc"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 31,
                cy: 26,
                r: 15,
                fill: "none",
                stroke: "#cc0000",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 31,
                cy: 74,
                r: 15,
                fill: "none",
                stroke: "#cc0000",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 169,
                cy: 26,
                r: 15,
                fill: "none",
                stroke: "#cc0000",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 169,
                cy: 74,
                r: 15,
                fill: "none",
                stroke: "#cc0000",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 31,
                cy: 26,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 31,
                cy: 74,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 169,
                cy: 26,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 169,
                cy: 74,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 69,
                cy: 26,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 69,
                cy: 74,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 131,
                cy: 26,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 131,
                cy: 74,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 7 45 A 6 6 0 0 1 7 55 L 11 55 L 11 45 Z",
                fill: "rgba(173, 216, 230, 0.4)",
                stroke: "#0066cc",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 193 45 A 6 6 0 0 0 193 55 L 189 55 L 189 45 Z",
                fill: "rgba(173, 216, 230, 0.4)",
                stroke: "#0066cc",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            showZones && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: 0,
                        y: 0,
                        width: 64,
                        height: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                        fill: "rgba(200, 220, 255, 0.15)",
                        "data-zone": "defensive"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                        lineNumber: 255,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: 136,
                        y: 0,
                        width: 64,
                        height: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                        fill: "rgba(255, 220, 220, 0.15)",
                        "data-zone": "offensive"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                        lineNumber: 265,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            showSlot && (()=>{
                // Calculate slot position based on whether ends are swapped
                const slotMinX = endsSwapped ? 200 - __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MAX_X : __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MIN_X;
                const slotMaxX = endsSwapped ? 200 - __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MIN_X : __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MAX_X;
                const slotWidth = slotMaxX - slotMinX;
                const slotCenterX = slotMinX + slotWidth / 2;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: slotMinX,
                            y: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MIN_Y,
                            width: slotWidth,
                            height: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MAX_Y - __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MIN_Y,
                            fill: "rgba(255, 100, 100, 0.2)",
                            stroke: "#cc0000",
                            strokeWidth: 1,
                            strokeDasharray: "2,2",
                            "data-slot": "true"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: slotCenterX,
                            y: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MIN_Y - 2,
                            fontSize: "4",
                            fill: "#cc0000",
                            textAnchor: "middle",
                            fontWeight: "bold",
                            children: "HIGH DANGER"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                            lineNumber: 297,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
            })(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: 32,
                y: 8,
                fontSize: "6",
                fill: "#666",
                textAnchor: "middle",
                fontWeight: "bold",
                opacity: 0.7,
                children: endsSwapped ? 'OFFENSIVE ZONE' : 'DEFENSIVE ZONE'
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: 100,
                y: 8,
                fontSize: "6",
                fill: "#666",
                textAnchor: "middle",
                fontWeight: "bold",
                opacity: 0.7,
                children: "NEUTRAL ZONE"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: 168,
                y: 8,
                fontSize: "6",
                fill: "#666",
                textAnchor: "middle",
                fontWeight: "bold",
                opacity: 0.7,
                children: endsSwapped ? 'DEFENSIVE ZONE' : 'OFFENSIVE ZONE'
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 334,
                columnNumber: 7
            }, this),
            events.map((event)=>{
                const screenPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["iceToScreen"])({
                    x: event.x,
                    y: event.y
                }, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].WIDTH, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: event.x,
                    cy: event.y,
                    r: 3,
                    fill: getEventColor(event.type),
                    stroke: "#fff",
                    strokeWidth: 1,
                    opacity: 0.8,
                    "data-event-marker": "true",
                    "data-event-type": event.type
                }, event.id, false, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                    lineNumber: 355,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
}),
"[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerSelector",
    ()=>PlayerSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function PlayerSelector({ players, onSelect, onCancel, title = 'Select Player', filterPosition, quickSelect = false }) {
    // Filter players by position if specified
    const filteredPlayers = filterPosition ? players.filter((p)=>p.position === filterPosition) : players;
    // Sort by jersey number
    const sortedPlayers = [
        ...filteredPlayers
    ].sort((a, b)=>a.jerseyNumber - b.jerseyNumber);
    if (players.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500",
                    children: "No players available"
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onCancel,
                    className: "mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800",
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            !quickSelect && title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-semibold text-gray-900",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3 p-4",
                children: sortedPlayers.map((player)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSelect(player.id),
                        className: `
              flex flex-col items-center justify-center
              p-3 md:p-4 rounded-lg border-2 border-gray-300
              hover:border-blue-500 hover:bg-blue-50
              active:bg-blue-100 active:border-blue-600
              transition-all duration-150
              touch-manipulation
              ${quickSelect ? 'min-h-[88px]' : 'min-h-[80px]'}
            `,
                        "aria-label": `Player ${player.jerseyNumber} ${player.lastName}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `
                font-bold text-gray-900
                ${quickSelect ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}
              `,
                                children: player.jerseyNumber
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs md:text-sm text-gray-600 mt-1 text-center truncate w-full px-1",
                                children: [
                                    player.firstName[0],
                                    ". ",
                                    player.lastName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `
                text-[10px] md:text-xs uppercase font-medium mt-1
                ${player.position === 'forward' ? 'text-blue-600' : player.position === 'defense' ? 'text-green-600' : 'text-purple-600'}
              `,
                                children: player.position[0]
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this)
                        ]
                    }, player.id, true, {
                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            onCancel && !quickSelect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 mb-4 flex justify-center px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onCancel,
                    className: "w-full md:w-auto px-6 py-3 md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
"[project]/code/hp2/packages/web/components/game-tracking/quick-event-buttons.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuickEventButtons",
    ()=>QuickEventButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const defaultEventButtons = [
    {
        type: 'shot',
        label: 'Shot',
        color: 'bg-blue-500 hover:bg-blue-600 text-white',
        bgHover: 'hover:bg-blue-50',
        icon: '🏒'
    },
    {
        type: 'shot',
        label: 'Goal',
        color: 'bg-green-500 hover:bg-green-600 text-white',
        bgHover: 'hover:bg-green-50',
        icon: '🎯',
        prefilledDetails: {
            result: 'goal'
        }
    },
    {
        type: 'turnover',
        label: 'Turnover',
        color: 'bg-red-500 hover:bg-red-600 text-white',
        bgHover: 'hover:bg-red-50',
        icon: '❌'
    },
    {
        type: 'breakout',
        label: 'Breakout',
        color: 'bg-green-600 hover:bg-green-700 text-white',
        bgHover: 'hover:bg-green-50',
        icon: '⬆️'
    },
    {
        type: 'zone_entry',
        label: 'Zone Entry',
        color: 'bg-amber-500 hover:bg-amber-600 text-white',
        bgHover: 'hover:bg-amber-50',
        icon: '➡️'
    },
    {
        type: 'faceoff',
        label: 'Faceoff',
        color: 'bg-purple-500 hover:bg-purple-600 text-white',
        bgHover: 'hover:bg-purple-50',
        icon: '⚫'
    }
];
function QuickEventButtons({ onEventSelect, disabled = false, compact = false, eventTypes, showIcons = false, selectedEventType = null, sidebarMode = false }) {
    // Filter event buttons if specific types are provided
    let buttons = eventTypes ? defaultEventButtons.filter((btn)=>eventTypes.includes(btn.type)) : defaultEventButtons;
    // In sidebar mode, remove Goal and Faceoff buttons
    if (sidebarMode) {
        buttons = buttons.filter((btn)=>!(btn.label === 'Goal' || btn.label === 'Faceoff'));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid ${compact ? 'grid-cols-2 gap-2' : sidebarMode ? 'grid-cols-1 gap-2' : 'grid-cols-2 sm:grid-cols-3 gap-3'} w-full`,
        children: buttons.map((button, index)=>{
            // Check if this button is selected (handle both direct match and Goal button which is shot with result='goal')
            const isSelected = selectedEventType === button.type && (!button.prefilledDetails || selectedEventType === 'shot');
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onEventSelect(button.type, button.prefilledDetails),
                disabled: disabled,
                className: `
              ${button.color}
              ${sidebarMode ? 'py-2.5 px-2 text-xs' : compact ? 'py-3 px-3 text-sm' : 'py-5 md:py-4 px-4 md:px-6 text-base'}
              font-semibold rounded-lg
              shadow-md
              transition-all duration-150
              active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
              ${!disabled ? 'hover:shadow-lg' : ''}
              touch-manipulation
              ${sidebarMode ? 'min-h-[48px]' : 'min-h-[56px]'}
              ${isSelected ? 'ring-[6px] ring-yellow-300 scale-110 shadow-2xl brightness-110' : ''}
            `,
                "aria-label": button.label,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center gap-1.5",
                    children: [
                        showIcons && button.icon && !sidebarMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xl md:text-2xl",
                            children: button.icon
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/quick-event-buttons.tsx",
                            lineNumber: 125,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: sidebarMode ? 'text-xs' : 'text-sm md:text-base',
                            children: button.label
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/quick-event-buttons.tsx",
                            lineNumber: 127,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/quick-event-buttons.tsx",
                    lineNumber: 123,
                    columnNumber: 13
                }, this)
            }, `${button.type}-${index}`, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/quick-event-buttons.tsx",
                lineNumber: 104,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/code/hp2/packages/web/components/game-tracking/quick-event-buttons.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
}),
"[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BottomSheet",
    ()=>BottomSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function BottomSheet({ isOpen, onClose, children, title, snapPoint = 75, showHandle = true, closeOnBackdropClick = true, className = '' }) {
    const sheetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [startY, setStartY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentY, setCurrentY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Lock body scroll when sheet is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return ()=>{
            document.body.style.overflow = '';
        };
    }, [
        isOpen
    ]);
    // Handle touch start
    const handleTouchStart = (e)=>{
        setStartY(e.touches[0].clientY);
        setIsDragging(true);
    };
    // Handle touch move
    const handleTouchMove = (e)=>{
        if (startY === null) return;
        const currentTouch = e.touches[0].clientY;
        setCurrentY(currentTouch);
        // Only allow dragging down
        if (currentTouch > startY) {
            const sheet = sheetRef.current;
            if (sheet) {
                const delta = currentTouch - startY;
                sheet.style.transform = `translateY(${delta}px)`;
            }
        }
    };
    // Handle touch end
    const handleTouchEnd = ()=>{
        if (startY !== null && currentY !== null) {
            const delta = currentY - startY;
            // If dragged down more than 100px, close the sheet
            if (delta > 100) {
                onClose();
            } else {
                // Snap back to original position
                const sheet = sheetRef.current;
                if (sheet) {
                    sheet.style.transform = 'translateY(0)';
                }
            }
        }
        setStartY(null);
        setCurrentY(null);
        setIsDragging(false);
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
                onClick: closeOnBackdropClick ? onClose : undefined,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: sheetRef,
                className: `
          fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-2xl shadow-2xl
          transition-transform duration-300 ease-out
          ${isDragging ? '' : 'transform-gpu'}
          ${className}
        `,
                style: {
                    maxHeight: `${snapPoint}vh`,
                    transform: isOpen ? 'translateY(0)' : 'translateY(100%)'
                },
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": title ? 'bottom-sheet-title' : undefined,
                children: [
                    showHandle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing",
                        onTouchStart: handleTouchStart,
                        onTouchMove: handleTouchMove,
                        onTouchEnd: handleTouchEnd,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-1.5 bg-gray-300 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-4 py-3 border-b border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "bottom-sheet-title",
                                className: "text-lg font-semibold text-gray-900",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100",
                                "aria-label": "Close",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-6 w-6",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M6 18L18 6M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-y-auto pb-6",
                        style: {
                            maxHeight: title ? `calc(${snapPoint}vh - 60px)` // Account for header
                             : `calc(${snapPoint}vh - 30px)`
                        },
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventLogger",
    ()=>EventLogger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/stores/game-tracking-store-configured.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$ice$2d$surface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$player$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/game-tracking/player-selector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$quick$2d$event$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/game-tracking/quick-event-buttons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$ui$2f$bottom$2d$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/ui/bottom-sheet.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function EventLogger({ showZones = true, showSlot = true, endsSwapped = false }) {
    const { gameState, loggingFlow, players, events, startEventLogging, startLocationFirst, setCoordinates, setEventType, setPlayer, setEventDetails, completeEvent, cancelEventLogging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGameTrackingStore"])();
    // Filter events to only show current period
    const currentPeriodEvents = events.filter((e)=>e.period === gameState.period);
    // Coordinate transformation for swapped ends
    const transformCoords = (coords)=>{
        if (!endsSwapped) return coords;
        return {
            x: 200 - coords.x,
            y: coords.y
        };
    };
    // Inverse transformation (when user clicks to log event)
    const inverseTransformCoords = (coords)=>{
        if (!endsSwapped) return coords;
        return {
            x: 200 - coords.x,
            y: coords.y
        };
    };
    // Control bottom sheet for player selection
    const [showPlayerSheet, setShowPlayerSheet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Open player selection bottom sheet when step changes to select_player
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (loggingFlow.step === 'select_player') {
            setShowPlayerSheet(true);
        } else {
            setShowPlayerSheet(false);
        }
    }, [
        loggingFlow.step
    ]);
    // Handle ice surface click
    const handleIceClick = (coords)=>{
        if (loggingFlow.step === 'idle' || loggingFlow.step === 'select_location') {
            // Transform coordinates if ends are swapped (convert back to canonical form)
            const canonicalCoords = inverseTransformCoords(coords);
            // If in idle state, start the location-first flow
            if (loggingFlow.step === 'idle') {
                startLocationFirst();
            }
            // Set the coordinates
            setCoordinates(canonicalCoords);
        }
    };
    // Handle event type selection
    const handleEventTypeSelect = (eventType, prefilledDetails)=>{
        // If we're in the select_event_type step (after clicking ice), use setEventType
        if (loggingFlow.step === 'select_event_type') {
            setEventType(eventType, prefilledDetails);
        } else {
            // Old flow: start with event type first
            startEventLogging(eventType, undefined, prefilledDetails);
        }
    };
    // Handle player selection
    const handlePlayerSelect = (playerId)=>{
        setPlayer(playerId);
        setShowPlayerSheet(false); // Close the bottom sheet
        // If this is not a shot, complete immediately
        // For shots with pre-filled result (like goal), also complete immediately
        if (loggingFlow.eventType !== 'shot' || loggingFlow.details.result) {
            // Auto-complete for non-shot events or shots with result already set
            setTimeout(()=>{
                completeEvent();
            }, 100);
        }
    };
    // Handle bottom sheet close
    const handlePlayerSheetClose = ()=>{
        setShowPlayerSheet(false);
        cancelEventLogging();
    };
    // Handle shot result selection
    const handleShotResultSelect = (result)=>{
        setEventDetails({
            result
        });
        completeEvent();
    };
    // Check if game is completed
    const isGameCompleted = gameState.status === 'completed';
    // Render based on current step
    const renderContent = ()=>{
        switch(loggingFlow.step){
            case 'idle':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full flex flex-col",
                    children: [
                        isGameCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3 md:p-4 mb-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl",
                                        children: "🏁"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                        lineNumber: 133,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-yellow-900 text-sm md:text-base mb-1",
                                                children: "Game Ended"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                                lineNumber: 135,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs md:text-sm text-yellow-800",
                                                children: 'This game has been ended. You cannot add new events to a completed game. Use the "New Game" button to start tracking a new game.'
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                                lineNumber: 138,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                        lineNumber: 134,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                lineNumber: 132,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                            lineNumber: 131,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${isGameCompleted ? 'flex-1' : 'h-full'} bg-white rounded-lg shadow p-2 md:p-3 min-h-0`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-full flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$ice$2d$surface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IceSurface"], {
                                    onClick: !isGameCompleted ? handleIceClick : undefined,
                                    showZones: showZones,
                                    showSlot: showSlot,
                                    responsive: true,
                                    endsSwapped: endsSwapped,
                                    events: currentPeriodEvents.map((e)=>{
                                        const coords = e.coordinates ? transformCoords(e.coordinates) : {
                                            x: 0,
                                            y: 0
                                        };
                                        return {
                                            id: e.id,
                                            x: coords.x,
                                            y: coords.y,
                                            type: e.eventType
                                        };
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                    lineNumber: 150,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                            lineNumber: 148,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, this);
            case 'select_location':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2 md:space-y-3 landscape:h-full landscape:flex landscape:flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3 landscape:hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-blue-900 font-medium text-xs md:text-sm",
                                children: [
                                    "Tap the ice surface where the ",
                                    loggingFlow.eventType,
                                    " occurred"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                lineNumber: 176,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow p-2 md:p-3 landscape:p-1.5 landscape:flex-1 landscape:min-h-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full landscape:h-full landscape:flex landscape:items-center landscape:justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$ice$2d$surface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IceSurface"], {
                                    onClick: handleIceClick,
                                    showZones: showZones,
                                    showSlot: showSlot,
                                    responsive: true,
                                    endsSwapped: endsSwapped,
                                    events: currentPeriodEvents.map((e)=>{
                                        const coords = e.coordinates ? transformCoords(e.coordinates) : {
                                            x: 0,
                                            y: 0
                                        };
                                        return {
                                            id: e.id,
                                            x: coords.x,
                                            y: coords.y,
                                            type: e.eventType
                                        };
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                    lineNumber: 183,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                lineNumber: 182,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: cancelEventLogging,
                            className: "w-full py-2 text-xs md:text-sm text-gray-600 hover:text-gray-800 font-medium landscape:hidden",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                    lineNumber: 173,
                    columnNumber: 11
                }, this);
            case 'select_event_type':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3 mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-blue-900 font-medium text-xs md:text-sm text-center",
                                    children: "What type of event occurred?"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, this),
                                loggingFlow.coordinates && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-blue-700 mt-1 text-center",
                                    children: [
                                        "Location: (",
                                        loggingFlow.coordinates.x.toFixed(0),
                                        ", ",
                                        loggingFlow.coordinates.y.toFixed(0),
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                    lineNumber: 220,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                            lineNumber: 215,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow p-3 md:p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$quick$2d$event$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuickEventButtons"], {
                                onEventSelect: handleEventTypeSelect,
                                showIcons: true
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                lineNumber: 228,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: cancelEventLogging,
                            className: "mt-2 w-full py-2 text-xs md:text-sm text-gray-600 hover:text-gray-800 font-medium",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                            lineNumber: 232,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 mt-2 bg-white rounded-lg shadow p-2 opacity-50 min-h-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-full flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$ice$2d$surface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IceSurface"], {
                                    showZones: showZones,
                                    showSlot: showSlot,
                                    responsive: true,
                                    endsSwapped: endsSwapped,
                                    events: currentPeriodEvents.map((e)=>{
                                        const coords = e.coordinates ? transformCoords(e.coordinates) : {
                                            x: 0,
                                            y: 0
                                        };
                                        return {
                                            id: e.id,
                                            x: coords.x,
                                            y: coords.y,
                                            type: e.eventType
                                        };
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                    lineNumber: 242,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                            lineNumber: 240,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                    lineNumber: 213,
                    columnNumber: 11
                }, this);
            case 'select_player':
                // Player selection now happens in bottom sheet
                // Show the ice surface with a prompt
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2 md:space-y-3 landscape:h-full landscape:flex landscape:flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3 landscape:hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-blue-900 font-medium text-xs md:text-sm",
                                    children: [
                                        "Selecting player for ",
                                        loggingFlow.eventType,
                                        "..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this),
                                loggingFlow.coordinates && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-blue-700 mt-1",
                                    children: [
                                        "Location: (",
                                        loggingFlow.coordinates.x.toFixed(0),
                                        ", ",
                                        loggingFlow.coordinates.y.toFixed(0),
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                    lineNumber: 273,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                            lineNumber: 268,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow p-2 md:p-3 opacity-50 landscape:opacity-100 landscape:p-1.5 landscape:flex-1 landscape:min-h-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full landscape:h-full landscape:flex landscape:items-center landscape:justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$ice$2d$surface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IceSurface"], {
                                    showZones: showZones,
                                    showSlot: showSlot,
                                    responsive: true,
                                    endsSwapped: endsSwapped,
                                    events: currentPeriodEvents.map((e)=>{
                                        const coords = e.coordinates ? transformCoords(e.coordinates) : {
                                            x: 0,
                                            y: 0
                                        };
                                        return {
                                            id: e.id,
                                            x: coords.x,
                                            y: coords.y,
                                            type: e.eventType
                                        };
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                    lineNumber: 282,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                lineNumber: 281,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                    lineNumber: 266,
                    columnNumber: 11
                }, this);
            case 'select_details':
                // Shot result selection
                if (loggingFlow.eventType === 'shot' || loggingFlow.eventType === 'goal') {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 md:space-y-3 landscape:h-full landscape:flex landscape:flex-col landscape:justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3 landscape:hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-blue-900 font-medium text-xs md:text-sm",
                                    children: "Select shot result"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                    lineNumber: 309,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                lineNumber: 308,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg shadow p-2 md:p-3 landscape:p-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleShotResultSelect('goal'),
                                                className: "py-4 md:py-5 px-3 md:px-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base",
                                                children: "Goal"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                                lineNumber: 314,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleShotResultSelect('save'),
                                                className: "py-4 md:py-5 px-3 md:px-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base",
                                                children: "Save"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                                lineNumber: 320,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleShotResultSelect('miss_wide'),
                                                className: "py-4 md:py-5 px-3 md:px-4 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base",
                                                children: "Miss Wide"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                                lineNumber: 326,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleShotResultSelect('miss_high'),
                                                className: "py-4 md:py-5 px-3 md:px-4 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base",
                                                children: "Miss High"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                                lineNumber: 332,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleShotResultSelect('blocked'),
                                                className: "py-4 md:py-5 px-3 md:px-4 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base",
                                                children: "Blocked"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                                lineNumber: 338,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleShotResultSelect('post'),
                                                className: "py-4 md:py-5 px-3 md:px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base",
                                                children: "Post"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                                lineNumber: 344,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                        lineNumber: 313,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: cancelEventLogging,
                                        className: "w-full mt-2 py-2 text-xs md:text-sm text-gray-600 hover:text-gray-800 font-medium landscape:hidden",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                        lineNumber: 352,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                                lineNumber: 312,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                        lineNumber: 306,
                        columnNumber: 13
                    }, this);
                }
                return null;
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full",
                children: renderContent()
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                lineNumber: 371,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$ui$2f$bottom$2d$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BottomSheet"], {
                isOpen: showPlayerSheet,
                onClose: handlePlayerSheetClose,
                title: "Select Player",
                snapPoint: 70,
                showHandle: true,
                closeOnBackdropClick: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$player$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerSelector"], {
                    players: players,
                    onSelect: handlePlayerSelect,
                    quickSelect: true
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                    lineNumber: 382,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwipeableItem",
    ()=>SwipeableItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function SwipeableItem({ children, onSwipeLeft, onSwipeRight, leftAction, rightAction, threshold = 80, className = '' }) {
    const itemRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [touchStart, setTouchStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [touchCurrent, setTouchCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSwiping, setIsSwiping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [swipeDistance, setSwipeDistance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const handleTouchStart = (e)=>{
        setTouchStart(e.touches[0].clientX);
        setIsSwiping(true);
    };
    const handleTouchMove = (e)=>{
        if (touchStart === null) return;
        const currentTouch = e.touches[0].clientX;
        const distance = currentTouch - touchStart;
        // Only allow swipe in enabled directions
        if (distance < 0 && onSwipeLeft) {
            // Swiping left (negative distance)
            setSwipeDistance(Math.max(distance, -threshold * 1.5)); // Max 1.5x threshold
        } else if (distance > 0 && onSwipeRight) {
            // Swiping right (positive distance)
            setSwipeDistance(Math.min(distance, threshold * 1.5));
        }
        setTouchCurrent(currentTouch);
    };
    const handleTouchEnd = ()=>{
        if (touchStart === null || touchCurrent === null) {
            resetSwipe();
            return;
        }
        const distance = touchCurrent - touchStart;
        // Check if swipe threshold was exceeded
        if (distance < -threshold && onSwipeLeft) {
            // Swiped left past threshold
            onSwipeLeft();
        } else if (distance > threshold && onSwipeRight) {
            // Swiped right past threshold
            onSwipeRight();
        }
        // Reset state
        resetSwipe();
    };
    const resetSwipe = ()=>{
        setTouchStart(null);
        setTouchCurrent(null);
        setIsSwiping(false);
        setSwipeDistance(0);
    };
    // Calculate action reveal percentage
    const revealPercentage = Math.abs(swipeDistance) / threshold;
    const isActionRevealed = revealPercentage >= 1;
    // Determine which action is being revealed
    const revealingLeft = swipeDistance < 0;
    const revealingRight = swipeDistance > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden ${className}`,
        children: [
            leftAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute inset-y-0 right-0 flex items-center justify-end px-6 ${leftAction.color} transition-opacity duration-150`,
                style: {
                    width: revealingLeft ? `${Math.abs(swipeDistance)}px` : '0px',
                    opacity: revealingLeft ? Math.min(revealPercentage, 1) : 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center text-white",
                    children: [
                        leftAction.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-2xl mb-1",
                            children: leftAction.icon
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx",
                            lineNumber: 109,
                            columnNumber: 33
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-semibold",
                            children: leftAction.label
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx",
                    lineNumber: 108,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx",
                lineNumber: 101,
                columnNumber: 9
            }, this),
            rightAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute inset-y-0 left-0 flex items-center justify-start px-6 ${rightAction.color} transition-opacity duration-150`,
                style: {
                    width: revealingRight ? `${swipeDistance}px` : '0px',
                    opacity: revealingRight ? Math.min(revealPercentage, 1) : 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center text-white",
                    children: [
                        rightAction.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-2xl mb-1",
                            children: rightAction.icon
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx",
                            lineNumber: 124,
                            columnNumber: 34
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-semibold",
                            children: rightAction.label
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx",
                    lineNumber: 123,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx",
                lineNumber: 116,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: itemRef,
                onTouchStart: handleTouchStart,
                onTouchMove: handleTouchMove,
                onTouchEnd: handleTouchEnd,
                style: {
                    transform: `translateX(${swipeDistance}px)`,
                    transition: isSwiping ? 'none' : 'transform 0.3s ease-out'
                },
                className: "relative bg-white touch-pan-y",
                children: children
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            isActionRevealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none bg-white/10 animate-pulse"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
}),
"[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RecentEventsList",
    ()=>RecentEventsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/stores/game-tracking-store-configured.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$ui$2f$swipeable$2d$item$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/ui/swipeable-item.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function RecentEventsList() {
    const { events, players, undoLastEvent, deleteEvent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGameTrackingStore"])();
    // Get last 10 events in reverse chronological order
    const recentEvents = [
        ...events
    ].reverse().slice(0, 10);
    const getPlayerName = (playerId)=>{
        if (!playerId) return 'Unknown';
        const player = players.find((p)=>p.id === playerId);
        return player ? `${player.firstName[0]}. ${player.lastName} (#${player.jerseyNumber})` : 'Unknown';
    };
    const getEventColor = (type)=>{
        switch(type){
            case 'shot':
            case 'goal':
                return 'bg-blue-100 text-blue-800';
            case 'turnover':
                return 'bg-red-100 text-red-800';
            case 'breakout':
                return 'bg-green-100 text-green-800';
            case 'zone_entry':
                return 'bg-amber-100 text-amber-800';
            case 'faceoff':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const formatEventDetails = (event)=>{
        const parts = [];
        if (event.playerId) {
            parts.push(getPlayerName(event.playerId));
        }
        if (event.coordinates) {
            parts.push(`(${event.coordinates.x}, ${event.coordinates.y})`);
        }
        if (event.details.result) {
            parts.push(event.details.result);
        }
        if (event.details.success !== undefined) {
            parts.push(event.details.success ? '✓ Success' : '✗ Failed');
        }
        return parts.join(' • ');
    };
    if (events.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-lg p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold mb-4",
                    children: "Recent Events"
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-500 py-8",
                    children: "No events logged yet"
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-lg p-4 md:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg md:text-xl font-bold",
                        children: "Recent Events"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: undoLastEvent,
                        className: "px-3 py-2 md:py-1 text-xs md:text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors touch-manipulation",
                        children: "Undo Last"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden text-xs text-gray-500 mb-3 text-center",
                children: "👈 Swipe left on any event to delete"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: recentEvents.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$ui$2f$swipeable$2d$item$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SwipeableItem"], {
                        onSwipeLeft: ()=>deleteEvent(event.id),
                        leftAction: {
                            label: 'Delete',
                            icon: '🗑️',
                            color: 'bg-red-500'
                        },
                        threshold: 80,
                        className: "rounded-lg overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between p-3 border border-gray-200 bg-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-1 flex-wrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `px-2 py-1 text-xs font-medium rounded ${getEventColor(event.eventType)}`,
                                                    children: event.eventType.replace('_', ' ').toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs md:text-sm text-gray-600 whitespace-nowrap",
                                                    children: [
                                                        "P",
                                                        event.period,
                                                        " • ",
                                                        Math.floor(event.gameTimeSeconds / 60),
                                                        ":",
                                                        (event.gameTimeSeconds % 60).toString().padStart(2, '0')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                                            lineNumber: 100,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs md:text-sm text-gray-700 truncate",
                                            children: formatEventDetails(event)
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>deleteEvent(event.id),
                                    className: "hidden md:block ml-4 p-2 text-red-600 hover:bg-red-50 rounded transition-colors",
                                    "aria-label": "Delete event",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                                            lineNumber: 128,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this)
                    }, event.id, false, {
                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            events.length > 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-sm text-gray-500 mt-4",
                children: [
                    "Showing last 10 of ",
                    events.length,
                    " events"
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
}),
"[project]/code/hp2/packages/web/components/auth/auth-form.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthForm",
    ()=>AuthForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/db/supabase.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function AuthForm({ mode, onSuccess, onToggleMode }) {
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);
        try {
            if (mode === 'signup') {
                // Sign up new user
                const { data, error: signUpError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name
                        }
                    }
                });
                if (signUpError) throw signUpError;
                if (data.user) {
                    // Check if email confirmation is required
                    if (data.user.confirmed_at) {
                        setMessage('Account created! You can now start tracking games.');
                        setTimeout(()=>{
                            onSuccess?.();
                        }, 1500);
                    } else {
                        setMessage('Account created! Please check your email to confirm your account before signing in.');
                    // Don't call onSuccess - user needs to confirm email first
                    }
                }
            } else {
                // Sign in existing user
                const { data, error: signInError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
                    email,
                    password
                });
                if (signInError) throw signInError;
                if (data.user) {
                    setMessage('Welcome back!');
                    setTimeout(()=>{
                        onSuccess?.();
                    }, 500);
                }
            }
        } catch (err) {
            console.error('Auth error:', err);
            // Handle specific error cases
            if (err.message?.includes('User already registered')) {
                setError('This email is already registered. Please sign in instead or use the "Forgot password?" link if you need to reset your password.');
            } else if (err.message?.includes('Email not confirmed')) {
                setError('Please confirm your email address first. Check your inbox or click "Resend confirmation email" below.');
            } else if (err.message?.includes('Invalid login credentials')) {
                setError('Invalid email or password. If you just reset the database, you\'ll need to create a new account. Click "Sign up" below to create an account.');
            } else {
                setError(err.message || 'An error occurred during authentication');
            }
        } finally{
            setLoading(false);
        }
    };
    const handlePasswordReset = async ()=>{
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        setError(null);
        setMessage(null);
        setLoading(true);
        try {
            const { error: resetError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`
            });
            if (resetError) throw resetError;
            setMessage('Password reset email sent! Check your inbox.');
        } catch (err) {
            console.error('Password reset error:', err);
            setError(err.message || 'Failed to send password reset email');
        } finally{
            setLoading(false);
        }
    };
    const handleResendConfirmation = async ()=>{
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        setError(null);
        setMessage(null);
        setLoading(true);
        try {
            const { error: resendError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.resend({
                type: 'signup',
                email: email
            });
            if (resendError) throw resendError;
            setMessage('Confirmation email resent! Check your inbox.');
        } catch (err) {
            console.error('Resend confirmation error:', err);
            setError(err.message || 'Failed to resend confirmation email');
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-4",
                children: [
                    mode === 'signup' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "name",
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Full Name"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "name",
                                type: "text",
                                value: name,
                                onChange: (e)=>setName(e.target.value),
                                required: true,
                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                placeholder: "John Smith",
                                disabled: loading
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "email",
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "email",
                                type: "email",
                                value: email,
                                onChange: (e)=>setEmail(e.target.value),
                                required: true,
                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                placeholder: "coach@example.com",
                                disabled: loading
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "password",
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Password"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "password",
                                type: "password",
                                value: password,
                                onChange: (e)=>setPassword(e.target.value),
                                required: true,
                                minLength: 6,
                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                placeholder: "••••••••",
                                disabled: loading
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            mode === 'signup' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-gray-500",
                                children: "Must be at least 6 characters"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 bg-red-50 border border-red-200 rounded-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-red-600",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                            lineNumber: 211,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this),
                    message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 bg-green-50 border border-green-200 rounded-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-green-600",
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                            lineNumber: 218,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        className: "w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors",
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            className: "opacity-25",
                                            cx: "12",
                                            cy: "12",
                                            r: "10",
                                            stroke: "currentColor",
                                            strokeWidth: "4"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                            lineNumber: 236,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            className: "opacity-75",
                                            fill: "currentColor",
                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                            lineNumber: 244,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, this),
                                mode === 'signup' ? 'Creating Account...' : 'Signing In...'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, this) : mode === 'signup' ? 'Create Account' : 'Sign In'
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this),
                    mode === 'signin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handlePasswordReset,
                                disabled: loading,
                                className: "text-blue-600 hover:text-blue-700 disabled:text-gray-400",
                                children: "Forgot password?"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleResendConfirmation,
                                disabled: loading,
                                className: "text-blue-600 hover:text-blue-700 disabled:text-gray-400",
                                children: "Resend confirmation"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                        lineNumber: 261,
                        columnNumber: 11
                    }, this),
                    onToggleMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center pt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onToggleMode,
                            disabled: loading,
                            className: "text-sm text-gray-600 hover:text-gray-700 disabled:text-gray-400",
                            children: mode === 'signup' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    "Already have an account?",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-blue-600",
                                        children: "Sign in"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                        lineNumber: 293,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    "Don't have an account?",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-blue-600",
                                        children: "Sign up"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                        lineNumber: 298,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                            lineNumber: 284,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                        lineNumber: 283,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            mode === 'signup' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 bg-blue-50 border border-blue-200 rounded-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-blue-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Free tier includes:"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                    lineNumber: 311,
                                    columnNumber: 15
                                }, this),
                                " Track up to 3 games per season with full analytics and AI practice plans. No credit card required."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                            lineNumber: 310,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                        lineNumber: 309,
                        columnNumber: 11
                    }, this),
                    window.location.hostname === 'localhost' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 bg-amber-50 border border-amber-200 rounded-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-amber-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "📧 Local Development:"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                    lineNumber: 319,
                                    columnNumber: 17
                                }, this),
                                " View confirmation emails at",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "http://localhost:54324",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "underline font-semibold hover:text-amber-950",
                                    children: "localhost:54324"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                                    lineNumber: 320,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                            lineNumber: 318,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                        lineNumber: 317,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
                lineNumber: 308,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/auth/auth-form.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
}),
"[project]/code/hp2/packages/web/components/auth/auth-modal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthModal",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$auth$2f$auth$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/auth/auth-form.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function AuthModal({ initialMode = 'signup', onSuccess, onClose }) {
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialMode);
    const toggleMode = ()=>{
        setMode(mode === 'signin' ? 'signup' : 'signin');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative",
            children: [
                onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600",
                    "aria-label": "Close",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-6 h-6",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M6 18L18 6M6 6l12 12"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/auth/auth-modal.tsx",
                            lineNumber: 35,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/auth/auth-modal.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/auth/auth-modal.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-gray-900 mb-2",
                            children: mode === 'signup' ? 'Create Your Account' : 'Welcome Back'
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/auth/auth-modal.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600",
                            children: mode === 'signup' ? 'Start tracking games and planning practices' : 'Sign in to continue tracking'
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/auth/auth-modal.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/auth/auth-modal.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$auth$2f$auth$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthForm"], {
                    mode: mode,
                    onSuccess: onSuccess,
                    onToggleMode: toggleMode
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/auth/auth-modal.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/code/hp2/packages/web/components/auth/auth-modal.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/hp2/packages/web/components/auth/auth-modal.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameTrackingDemoPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/stores/game-tracking-store-configured.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$event$2d$logger$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/game-tracking/event-logger.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$recent$2d$events$2d$list$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/game-tracking/recent-events-list.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$quick$2d$event$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/game-tracking/quick-event-buttons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$auth$2f$auth$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/auth/auth-modal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/db/supabase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$contexts$2f$team$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/contexts/team-context.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function GameTrackingDemoPage() {
    const { gameState, setGameState, setPlayers, loadEvents, loggingFlow } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGameTrackingStore"])();
    const { selectedTeamId, selectTeam } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$contexts$2f$team$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTeam"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [checkingAuth, setCheckingAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [emailVerified, setEmailVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [gameInfo, setGameInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isEditingGameInfo, setIsEditingGameInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editOpponentName, setEditOpponentName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [editLocation, setEditLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [savingGameInfo, setSavingGameInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [creatingGame, setCreatingGame] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showNewGameForm, setShowNewGameForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newGameOpponent, setNewGameOpponent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [newGameLocation, setNewGameLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [endsSwapped, setEndsSwapped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileView, setMobileView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('ice');
    const [showPeriodEndConfirm, setShowPeriodEndConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPeriod3EndDialog, setShowPeriod3EndDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [supportsFullscreen, setSupportsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Check if game is completed
    const isGameCompleted = gameState.status === 'completed';
    // Check if fullscreen is supported
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const doc = document;
        const docEl = document.documentElement;
        const isSupported = !!(docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen);
        setSupportsFullscreen(isSupported);
    }, []);
    // Handle fullscreen changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleFullscreenChange = ()=>{
            const doc = document;
            setIsFullscreen(!!(document.fullscreenElement || doc.webkitFullscreenElement));
        };
        // Listen to both standard and webkit fullscreen events (for Safari)
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        return ()=>{
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, []);
    // Toggle fullscreen mode
    const toggleFullscreen = async ()=>{
        try {
            const doc = document;
            const docEl = document.documentElement;
            if (!document.fullscreenElement && !doc.webkitFullscreenElement) {
                // Enter fullscreen
                if (docEl.requestFullscreen) {
                    await docEl.requestFullscreen();
                } else if (docEl.webkitRequestFullscreen) {
                    // Safari iOS
                    await docEl.webkitRequestFullscreen();
                }
            } else {
                // Exit fullscreen
                if (doc.exitFullscreen) {
                    await doc.exitFullscreen();
                } else if (doc.webkitExitFullscreen) {
                    // Safari iOS
                    await doc.webkitExitFullscreen();
                }
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    };
    // Check authentication status
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function checkAuth() {
            try {
                const { data: { user }, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                // If there's an error (like 403), clear the session
                if (error) {
                    console.log('Auth error, clearing session:', error);
                    await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
                    setIsAuthenticated(false);
                    setCheckingAuth(false);
                    return;
                }
                setIsAuthenticated(!!user);
                setCheckingAuth(false);
            } catch (err) {
                console.error('Auth check failed:', err);
                // Clear any invalid session
                await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
                setIsAuthenticated(false);
                setCheckingAuth(false);
            }
            // Listen for auth changes
            const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange((_event, session)=>{
                setIsAuthenticated(!!session?.user);
            });
            return ()=>{
                subscription.unsubscribe();
            };
        }
        checkAuth();
    }, []);
    // Initialize demo once authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthenticated) return;
        async function initializeDemo() {
            try {
                // Get the current user
                const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                if (!user) {
                    throw new Error('User not found');
                }
                // Check if email is verified (using our custom field)
                const { data: profile } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('user_profiles').select('email_verified').eq('id', user.id).single();
                if (!profile?.email_verified) {
                    setEmailVerified(false);
                    setError('email_not_verified');
                    setLoading(false);
                    return;
                }
                // Determine which team to use
                let teamId;
                if (selectedTeamId) {
                    // Use the selected team from context
                    teamId = selectedTeamId;
                } else {
                    // No team selected - get user's first team and auto-select it
                    const { data: teamMembers, error: teamError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('team_members').select('team_id').eq('user_id', user.id).limit(1);
                    if (teamError) {
                        console.error('Error fetching team membership:', teamError);
                        throw new Error(`Failed to fetch team membership: ${teamError.message}`);
                    }
                    if (!teamMembers || teamMembers.length === 0) {
                        throw new Error('No team found for user. Please create a team first.');
                    }
                    teamId = teamMembers[0].team_id;
                    // Auto-select this team in context
                    selectTeam(teamId);
                }
                // Load players from roster for this team
                const { data: dbPlayers, error: playersError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('players').select('id, jersey_number, first_name, last_name, position').eq('team_id', teamId).order('jersey_number');
                if (playersError) {
                    console.error('Error loading roster:', playersError);
                    throw new Error(`Failed to load roster: ${playersError.message}`);
                }
                // Check if roster is empty
                if (!dbPlayers || dbPlayers.length === 0) {
                    throw new Error('no_players');
                }
                // Map database players to store format
                const players = dbPlayers.map((p)=>({
                        id: p.id,
                        jerseyNumber: p.jersey_number,
                        firstName: p.first_name,
                        lastName: p.last_name,
                        position: p.position
                    }));
                let gameId = null;
                // 1. Try to load the current game from localStorage (team-specific)
                const storageKey = `current_game_${teamId}`;
                const storedGameId = localStorage.getItem(storageKey);
                if (storedGameId) {
                    // Verify the stored game still exists and belongs to this team
                    const { data: storedGame } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('games').select('id').eq('id', storedGameId).eq('team_id', teamId).maybeSingle();
                    if (storedGame) {
                        gameId = storedGame.id;
                        console.log('✅ Loaded game from localStorage:', gameId);
                    } else {
                        // Stored game doesn't exist anymore, clear localStorage
                        localStorage.removeItem(storageKey);
                        console.log('⚠️ Stored game not found, cleared localStorage');
                    }
                }
                // 2. If no stored game, load the most recent game for this team
                if (!gameId) {
                    const { data: recentGame } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('games').select('id').eq('team_id', teamId).order('created_at', {
                        ascending: false
                    }).limit(1).maybeSingle();
                    if (recentGame) {
                        gameId = recentGame.id;
                        // Store it in localStorage for next time
                        localStorage.setItem(storageKey, gameId);
                        console.log('✅ Loaded most recent game:', gameId);
                    }
                }
                // 3. If still no game, create a default one
                if (!gameId) {
                    const { data: newGame, error: gameError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('games').insert({
                        team_id: teamId,
                        opponent_name: 'Rival Team',
                        game_date: new Date().toISOString(),
                        is_home: true,
                        status: 'in_progress'
                    }).select().single();
                    if (gameError) throw gameError;
                    gameId = newGame.id;
                    // Store it in localStorage
                    localStorage.setItem(storageKey, gameId);
                    console.log('✅ Created new default game:', gameId);
                }
                // Fetch game status from database
                const { data: gameData } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('games').select('status').eq('id', gameId).single();
                // Initialize game state
                setGameState({
                    gameId,
                    period: 1,
                    gameTimeSeconds: 1200,
                    score: {
                        us: 0,
                        them: 0
                    },
                    situation: 'even_strength',
                    status: gameData?.status || 'in_progress'
                });
                // Load players
                setPlayers(players);
                // Load existing events from database
                await loadEvents(gameId);
                setLoading(false);
            } catch (err) {
                console.error('Failed to initialize game tracking:', err);
                // Handle no team error - redirect to teams page for onboarding
                if (err instanceof Error && err.message.includes('No team found')) {
                    // Redirect new users to create their first team
                    window.location.href = '/demo/teams';
                    return;
                }
                // Handle empty roster error specially
                if (err instanceof Error && err.message === 'no_players') {
                    setError('empty_roster');
                } else {
                    setError(err instanceof Error ? err.message : 'Failed to load game tracking. Please refresh the page.');
                }
                setLoading(false);
            }
        }
        initializeDemo();
    }, [
        isAuthenticated,
        selectedTeamId,
        setGameState,
        setPlayers,
        loadEvents,
        selectTeam
    ]);
    // Fetch game info when gameId is available
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!gameState.gameId) return;
        async function fetchGameInfo() {
            try {
                const { data: game, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('games').select('opponent_name, game_date, location').eq('id', gameState.gameId).single();
                if (error) throw error;
                if (game) {
                    setGameInfo(game);
                }
            } catch (err) {
                console.error('Failed to fetch game info:', err);
            }
        }
        fetchGameInfo();
    }, [
        gameState.gameId
    ]);
    // Show auth modal if not authenticated
    if (checkingAuth) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 371,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Checking authentication..."
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 372,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                lineNumber: 370,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
            lineNumber: 369,
            columnNumber: 7
        }, this);
    }
    if (!isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center max-w-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-gray-900 mb-4",
                        children: "🏒 Hockey Practice Planner"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 382,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-gray-600 mb-8",
                        children: "Track games in real-time and get AI-powered practice plans"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$auth$2f$auth$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthModal"], {
                        initialMode: "signup",
                        onSuccess: ()=>{
                            // Auth state will be updated by the listener
                            setIsAuthenticated(true);
                        }
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 386,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                lineNumber: 381,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
            lineNumber: 380,
            columnNumber: 7
        }, this);
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 402,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Loading demo data from database..."
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 403,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                lineNumber: 401,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
            lineNumber: 400,
            columnNumber: 7
        }, this);
    }
    if (error) {
        // Special handling for email not verified
        if (error === 'email_not_verified') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gray-50 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-amber-900 font-bold text-lg mb-2",
                            children: "📧 Email Verification Required"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 415,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-amber-700 mb-4",
                            children: "You need to verify your email address before you can track games."
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 416,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-amber-700 mb-4",
                            children: "Check your inbox for a verification link. Once verified, you'll have full access to game tracking."
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 419,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/demo/teams",
                                    className: "px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors",
                                    children: "Go to Teams"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 423,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>window.location.reload(),
                                    className: "px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors",
                                    children: "I've Verified"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 429,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 422,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                    lineNumber: 414,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                lineNumber: 413,
                columnNumber: 9
            }, this);
        }
        // Special handling for empty roster
        if (error === 'empty_roster') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gray-50 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-yellow-900 font-bold text-lg mb-2",
                            children: "⚠️ No Players in Roster"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 446,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-yellow-700 mb-4",
                            children: "You need to add players to your roster before you can track a game."
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 447,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-yellow-700 mb-4",
                            children: "Game tracking requires players to log events like shots, goals, and turnovers."
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 450,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: selectedTeamId ? `/demo/teams/${selectedTeamId}/roster` : '/demo/teams',
                                    className: "px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors",
                                    children: selectedTeamId ? 'Add Players to Roster' : 'Go to Teams'
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 454,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>window.location.reload(),
                                    className: "px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors",
                                    children: "Retry"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 460,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 453,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                    lineNumber: 445,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                lineNumber: 444,
                columnNumber: 9
            }, this);
        }
        // Regular error display
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-50 border border-red-200 rounded-lg p-6 max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-red-900 font-bold text-lg mb-2",
                        children: "Error"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 476,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-700",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 477,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        className: "mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700",
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 478,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                lineNumber: 475,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
            lineNumber: 474,
            columnNumber: 7
        }, this);
    }
    const handleSignOut = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        setIsAuthenticated(false);
    };
    const handleEndPeriodClick = ()=>{
        // Show confirmation dialog
        setShowPeriodEndConfirm(true);
    };
    const handleConfirmEndPeriod = ()=>{
        setShowPeriodEndConfirm(false);
        // If ending period 3, show overtime/end game dialog
        if (gameState.period === 3) {
            setShowPeriod3EndDialog(true);
        } else if (gameState.period === 4) {
            // Ending overtime ends the game
            handleEndGame();
        } else if (gameState.period < 4) {
            // Normal period end (periods 1, 2)
            setGameState({
                period: gameState.period + 1
            });
        }
    };
    const handlePeriod3Choice = (choice)=>{
        setShowPeriod3EndDialog(false);
        if (choice === 'overtime') {
            // Go to overtime (period 4)
            setGameState({
                period: 4
            });
        } else {
            // End game
            handleEndGame();
        }
    };
    const handleEndGame = async ()=>{
        if (!gameState.gameId) return;
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('games').update({
                status: 'completed'
            }).eq('id', gameState.gameId);
            if (error) throw error;
            setGameState({
                status: 'completed'
            });
        } catch (error) {
            console.error('❌ Error ending game:', error);
            alert('Failed to end game. Please try again.');
        }
    };
    const handleNewGameClick = ()=>{
        const { events } = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGameTrackingStore"].getState();
        if (events.length > 0) {
            const confirmed = confirm('Starting a new game will save the current game and start fresh. Continue?');
            if (!confirmed) return;
        }
        setNewGameOpponent('');
        setNewGameLocation('');
        setShowNewGameForm(true);
    };
    const handleCreateGame = async (e)=>{
        e.preventDefault();
        if (!newGameOpponent.trim()) {
            alert('Please enter an opponent name');
            return;
        }
        try {
            setCreatingGame(true);
            const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
            if (!user) {
                alert('Please sign in to create a new game');
                return;
            }
            // Use the selected team from context
            let teamId = selectedTeamId;
            // If no team selected, get user's first team
            if (!teamId) {
                const { data: teamMembers } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('team_members').select('team_id').eq('user_id', user.id).limit(1);
                if (!teamMembers || teamMembers.length === 0) {
                    alert('No team found. Please create a team first.');
                    return;
                }
                teamId = teamMembers[0].team_id;
                selectTeam(teamId); // Auto-select this team
            }
            const { data: newGame, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('games').insert({
                team_id: teamId,
                opponent_name: newGameOpponent.trim(),
                game_date: new Date().toISOString(),
                location: newGameLocation.trim() !== '' ? newGameLocation.trim() : null,
                status: 'in_progress'
            }).select().single();
            if (error) throw error;
            console.log('✅ New game created:', newGame.id, 'vs', newGameOpponent);
            const storageKey = `current_game_${teamId}`;
            localStorage.setItem(storageKey, newGame.id);
            setGameState({
                gameId: newGame.id,
                period: 1,
                gameTimeSeconds: 1200,
                score: {
                    us: 0,
                    them: 0
                },
                situation: 'even_strength',
                status: 'in_progress'
            });
            await loadEvents(newGame.id);
            // Update game info state
            setGameInfo({
                opponent_name: newGameOpponent.trim(),
                game_date: newGame.game_date,
                location: newGameLocation.trim() !== '' ? newGameLocation.trim() : null
            });
            setShowNewGameForm(false);
            setNewGameOpponent('');
            setNewGameLocation('');
            alert(`New game created vs ${newGameOpponent.trim()}! Ready to track events.`);
        } catch (error) {
            console.error('❌ Error creating new game:', error);
            alert('Failed to create new game. Please try again.');
        } finally{
            setCreatingGame(false);
        }
    };
    const handleEditGameInfo = ()=>{
        if (gameInfo) {
            setEditOpponentName(gameInfo.opponent_name);
            setEditLocation(gameInfo.location || '');
            setIsEditingGameInfo(true);
        }
    };
    const handleCancelEdit = ()=>{
        setIsEditingGameInfo(false);
        setEditOpponentName('');
        setEditLocation('');
    };
    const handleSaveGameInfo = async ()=>{
        if (!gameState.gameId || !editOpponentName.trim()) {
            alert('Opponent name is required');
            return;
        }
        try {
            setSavingGameInfo(true);
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('games').update({
                opponent_name: editOpponentName.trim(),
                location: editLocation.trim() !== '' ? editLocation.trim() : null
            }).eq('id', gameState.gameId);
            if (error) throw error;
            // Update local state
            setGameInfo({
                ...gameInfo,
                opponent_name: editOpponentName.trim(),
                location: editLocation.trim() !== '' ? editLocation.trim() : null
            });
            setIsEditingGameInfo(false);
            console.log('✅ Game info updated successfully');
        } catch (error) {
            console.error('❌ Error updating game info:', error);
            alert('Failed to update game info. Please try again.');
        } finally{
            setSavingGameInfo(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 z-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 md:p-4 shadow-lg landscape:py-1.5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-2 md:gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: gameInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 landscape:gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg md:text-2xl landscape:text-base",
                                            children: "🏒"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 701,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-sm md:text-xl font-bold truncate landscape:text-xs",
                                                    children: [
                                                        "vs ",
                                                        gameInfo.opponent_name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 703,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "hidden md:flex items-center gap-2 text-xs text-blue-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: new Date(gameInfo.game_date).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                            lineNumber: 707,
                                                            columnNumber: 23
                                                        }, this),
                                                        gameInfo.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "@ ",
                                                                gameInfo.location
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                            lineNumber: 713,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 706,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 702,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 700,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 698,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMobileView(mobileView === 'ice' ? 'events' : 'ice'),
                                className: `px-2 py-1 rounded text-[10px] md:text-xs font-medium transition-colors whitespace-nowrap ${mobileView === 'events' ? 'bg-white text-blue-600' : 'bg-white/20 hover:bg-white/30 text-white'}`,
                                children: "📋 Events"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 721,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 md:gap-2",
                                children: [
                                    supportsFullscreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: toggleFullscreen,
                                        className: "md:hidden px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-[10px] font-medium transition-colors whitespace-nowrap",
                                        title: isFullscreen ? "Exit fullscreen" : "Enter fullscreen",
                                        children: isFullscreen ? '⬇️' : '⬆️'
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 736,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setEndsSwapped(!endsSwapped),
                                        className: "px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-[10px] md:text-xs font-medium transition-colors whitespace-nowrap",
                                        title: "Change which end is offensive/defensive",
                                        children: "🔄 Change Ends"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 744,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleEndPeriodClick,
                                        disabled: gameState.period > 4 || isGameCompleted,
                                        className: "px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-[10px] md:text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
                                        children: isGameCompleted ? 'Ended ✓' : gameState.period === 4 ? 'End OT' : `End P${gameState.period}`
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 751,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleNewGameClick,
                                        disabled: creatingGame,
                                        className: "px-2 py-1 bg-purple-500/80 hover:bg-purple-600 rounded text-[10px] md:text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
                                        children: "🆕 New"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 758,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 733,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 landscape:gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-blue-100 font-semibold",
                                                children: gameState.period === 4 ? 'Overtime' : `Period ${gameState.period}`
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 769,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xl md:text-2xl font-bold landscape:text-base",
                                                children: [
                                                    gameState.score.us,
                                                    "-",
                                                    gameState.score.them
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 772,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 768,
                                        columnNumber: 15
                                    }, this),
                                    gameInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleEditGameInfo,
                                        className: "px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs landscape:px-1 landscape:text-[10px]",
                                        title: "Edit",
                                        children: "✏️"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 777,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSignOut,
                                        className: "px-2 py-1 text-xs bg-white/20 hover:bg-white/30 rounded landscape:px-1 landscape:text-[10px]",
                                        children: "Sign Out"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 785,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 767,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 697,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                    lineNumber: 696,
                    columnNumber: 9
                }, this),
                isEditingGameInfo && gameInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold mb-4",
                                children: "Edit Game Information"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 799,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "Opponent Name *"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 802,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: editOpponentName,
                                                onChange: (e)=>setEditOpponentName(e.target.value),
                                                placeholder: "e.g., Hawks, Red Wings",
                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                disabled: savingGameInfo,
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 805,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 801,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "Location (optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 816,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: editLocation,
                                                onChange: (e)=>setEditLocation(e.target.value),
                                                placeholder: "e.g., Home Arena, Away Rink",
                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                disabled: savingGameInfo
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 819,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 815,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 800,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSaveGameInfo,
                                        disabled: savingGameInfo || !editOpponentName.trim(),
                                        className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: savingGameInfo ? 'Saving...' : '💾 Save'
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 830,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCancelEdit,
                                        disabled: savingGameInfo,
                                        className: "px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors font-medium disabled:opacity-50",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 837,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 829,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 798,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                    lineNumber: 797,
                    columnNumber: 11
                }, this),
                showNewGameForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold mb-4",
                                children: "Create New Game"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 853,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleCreateGame,
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "Opponent Name *"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 856,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: newGameOpponent,
                                                onChange: (e)=>setNewGameOpponent(e.target.value),
                                                placeholder: "e.g., Hawks, Red Wings",
                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
                                                disabled: creatingGame,
                                                autoFocus: true,
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 859,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 855,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "Location (optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 871,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: newGameLocation,
                                                onChange: (e)=>setNewGameLocation(e.target.value),
                                                placeholder: "e.g., Home Arena, Away Rink",
                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
                                                disabled: creatingGame
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 874,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 870,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: creatingGame || !newGameOpponent.trim(),
                                                className: "px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                                                children: creatingGame ? 'Creating...' : 'Create Game'
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 884,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setShowNewGameForm(false),
                                                disabled: creatingGame,
                                                className: "px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors font-medium disabled:opacity-50",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 891,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 883,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 854,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 852,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                    lineNumber: 851,
                    columnNumber: 11
                }, this),
                showPeriodEndConfirm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold mb-4",
                                children: [
                                    "End ",
                                    gameState.period === 4 ? 'Overtime' : `Period ${gameState.period}`,
                                    "?"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 909,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mb-6",
                                children: gameState.period === 4 ? 'End overtime and complete the game?' : `End period ${gameState.period} and continue to ${gameState.period === 1 ? 'period 2' : gameState.period === 2 ? 'period 3' : 'the next period'}?`
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 912,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleConfirmEndPeriod,
                                        className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium",
                                        children: "Yes, End Period"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 922,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowPeriodEndConfirm(false),
                                        className: "px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors font-medium",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 928,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 921,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 908,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                    lineNumber: 907,
                    columnNumber: 11
                }, this),
                showPeriod3EndDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold mb-4",
                                children: "Period 3 Complete"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 943,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mb-6",
                                children: "Is this the end of the game, or will there be overtime?"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 944,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handlePeriod3Choice('end'),
                                        className: "w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: "End Game"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 952,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-green-100",
                                                children: "Game is complete"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 953,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 948,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handlePeriod3Choice('overtime'),
                                        className: "w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: "Overtime"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 959,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-blue-100",
                                                children: "Continue to overtime period"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 960,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 955,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 947,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                        lineNumber: 942,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                    lineNumber: 941,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-[calc(100vh-48px)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `h-full overflow-auto p-3 ${mobileView === 'ice' ? 'block' : 'hidden'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$event$2d$logger$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EventLogger"], {
                                endsSwapped: endsSwapped
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 973,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 970,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `h-full overflow-auto p-3 ${mobileView === 'events' ? 'block' : 'hidden'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$recent$2d$events$2d$list$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RecentEventsList"], {}, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 980,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 977,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden",
                            children: [
                                isGameCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-yellow-50 border-2 border-yellow-400 rounded-lg p-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg",
                                                children: "🏁"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 989,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-yellow-900 text-xs mb-0.5",
                                                        children: "Game Ended"
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                        lineNumber: 991,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-yellow-800 leading-tight",
                                                        children: "Start a new game to add events"
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                        lineNumber: 994,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 990,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 988,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 987,
                                    columnNumber: 15
                                }, this),
                                !isGameCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-lg shadow p-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xs font-medium text-gray-700 mb-2",
                                            children: "Log Event"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1005,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$quick$2d$event$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuickEventButtons"], {
                                            onEventSelect: (eventType, prefilledDetails)=>{
                                                __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGameTrackingStore"].getState().startEventLogging(eventType, undefined, prefilledDetails);
                                            },
                                            showIcons: true,
                                            sidebarMode: true,
                                            selectedEventType: loggingFlow.step !== 'idle' ? loggingFlow.eventType : null
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1006,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1004,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$recent$2d$events$2d$list$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RecentEventsList"], {}, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1018,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 984,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                    lineNumber: 968,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden lg:block mt-8 bg-white rounded-lg shadow-lg p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold mb-4",
                            children: "Features Demonstrated"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1024,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-blue-50 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-blue-900 mb-2",
                                            children: "✅ Quick Event Logging"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1028,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-blue-700",
                                            children: "6 event types with color-coded buttons for fast logging during live games"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1029,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1027,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-green-50 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-green-900 mb-2",
                                            children: "✅ Interactive Ice Surface"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1035,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-green-700",
                                            children: "Tap anywhere to log exact location - coordinates mapped to database schema"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1036,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1034,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-purple-50 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-purple-900 mb-2",
                                            children: "✅ Player Quick Select"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1042,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-purple-700",
                                            children: "Jersey number grid with position indicators for fast player selection"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1043,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1041,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-amber-50 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-amber-900 mb-2",
                                            children: "✅ Live Stats Calculation"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1049,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-amber-700",
                                            children: "Real-time shot stats, breakout success rates, and turnover tracking"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1050,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1048,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-red-50 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-red-900 mb-2",
                                            children: "✅ Event Management"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1056,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-red-700",
                                            children: "Undo last event, delete specific events, view recent history"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1057,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1055,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-gray-50 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-gray-900 mb-2",
                                            children: "✅ State Management"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1063,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-700",
                                            children: "Zustand store for predictable state transitions and event flow"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1064,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1062,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1026,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                    lineNumber: 1023,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden lg:block mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-blue-900 mb-4",
                            children: "Event Logging Workflow"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1073,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold",
                                            children: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1079,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-blue-900",
                                                    children: "Select Event Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 1083,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-blue-700",
                                                    children: "Click a quick event button (Shot, Goal, Turnover, etc.)"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 1084,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1082,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1078,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold",
                                            children: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1091,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-blue-900",
                                                    children: "Tap Ice Location"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 1095,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-blue-700",
                                                    children: "Tap the ice surface where the event occurred (coordinates auto-captured)"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 1096,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1094,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1090,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold",
                                            children: "3"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1103,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-blue-900",
                                                    children: "Select Player"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 1107,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-blue-700",
                                                    children: "Choose player from quick-select grid (sorted by jersey number)"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 1108,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1106,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold",
                                            children: "4"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1115,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-blue-900",
                                                    children: "Shot Result (if applicable)"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 1119,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-blue-700",
                                                    children: "For shots/goals: select result (Goal, Save, Miss, Blocked, Post)"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 1120,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1118,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1127,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-green-900",
                                                    children: "Event Logged!"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 1131,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-green-700",
                                                    children: "Event appears in recent list, stats update immediately, ice surface shows marker"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                    lineNumber: 1132,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1130,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1126,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1077,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 p-4 bg-white rounded border border-blue-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-blue-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "⏱️ Target Time:"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 1141,
                                        columnNumber: 15
                                    }, this),
                                    " 5 seconds per event (as specified in product docs)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 1140,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1139,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                    lineNumber: 1072,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden lg:block mt-8 bg-white rounded-lg shadow-lg p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold mb-4",
                            children: "What's Working Now?"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1148,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-2 text-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-600",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1152,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Event logger with multi-step flow"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1153,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-600",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1156,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Live stats calculation and display"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1157,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1155,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-600",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1160,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Recent events list with undo/delete"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1161,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-600",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1164,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Database persistence (events save to Supabase!)"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                                lineNumber: 1165,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1165,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-600",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1168,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Optimistic updates (instant UI, background sync)"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1169,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1167,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-600",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1172,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Load events from database on page load"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1173,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1171,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mt-6 mb-3",
                            children: "View Analytics"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1177,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/demo/analytics",
                                    className: "inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold",
                                    children: "📊 View Post-Game Analytics Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mt-2",
                                    children: "See shot charts, breakout analysis, and period-by-period trends from your tracked events"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1185,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1178,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mt-6 mb-3",
                            children: "What's Next?"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1190,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-2 text-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-400",
                                            children: "○"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1193,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Offline support (IndexedDB + background sync)"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1194,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1192,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-400",
                                            children: "○"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1197,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Period clock and game situation tracking"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1198,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1196,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-400",
                                            children: "○"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1201,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Event editing UI (post-game corrections)"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                            lineNumber: 1202,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                    lineNumber: 1200,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1191,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 p-4 bg-blue-50 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-blue-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Try it:"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 1208,
                                        columnNumber: 15
                                    }, this),
                                    " Log some events, refresh the page - your events persist! Check Supabase Studio at ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "bg-white px-1 rounded",
                                        children: "localhost:54323"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                        lineNumber: 1208,
                                        columnNumber: 122
                                    }, this),
                                    " to see the data."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                                lineNumber: 1207,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                            lineNumber: 1206,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
                    lineNumber: 1147,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
            lineNumber: 694,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/hp2/packages/web/app/demo/game-tracking/page.tsx",
        lineNumber: 693,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=code_hp2_packages_c1c53153._.js.map