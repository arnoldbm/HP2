(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/code/hp2/packages/shared/src/types/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared TypeScript types for HockeyPilot
 */ // Re-export common types
__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/api/game-events.interface.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Game Events API Interface
 *
 * Platform-agnostic interface for game event CRUD operations.
 * - Web: Implements with direct Supabase calls
 * - Mobile: Implements with REST API calls to backend
 */ __turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/validation/event-schemas.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
;
const shotEventDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    shot_type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'wrist',
        'slap',
        'snap',
        'backhand',
        'deflection',
        'one_timer'
    ]),
    result: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'goal',
        'save',
        'miss_high',
        'miss_wide',
        'blocked',
        'post'
    ]),
    shot_quality: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'high',
        'medium',
        'low'
    ]),
    rebound: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const breakoutEventDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    success: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'up_boards',
        'center_ice',
        'cross_ice',
        'carry'
    ]),
    exit_zone: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'left',
        'center',
        'right'
    ]).optional()
});
const turnoverEventDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'bad_pass',
        'lost_puck',
        'forced'
    ]),
    recovery: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const zoneEntryEventDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    entry_type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'dump',
        'carry',
        'pass'
    ]),
    controlled: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean()
});
const faceoffEventDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    won: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    location: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
const gameEventCreateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    // Required fields
    game_id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    event_type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'shot',
        'goal',
        'breakout',
        'turnover',
        'zone_entry',
        'faceoff',
        'penalty',
        'defensive_breakdown'
    ]),
    period: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1).max(5),
    situation: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'even_strength',
        'power_play',
        'penalty_kill',
        'empty_net'
    ]).default('even_strength'),
    details: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any(),
    // Optional spatial data
    x_coord: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(200).optional(),
    y_coord: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(100).optional(),
    // Optional temporal data
    game_time_seconds: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(1200).optional(),
    // Optional player/situation context
    player_id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    zone: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'defensive',
        'neutral',
        'offensive'
    ]).optional(),
    // Optional metadata
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/validation/player-schemas.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
;
const playerPositionEnum = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'forward',
    'defense',
    'goalie'
]);
const playerCreateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    team_id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Invalid team ID'),
    jersey_number: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number({
        required_error: 'Jersey number is required',
        invalid_type_error: 'Jersey number is required'
    }).int('Jersey number must be an integer').min(1, 'Jersey number must be at least 1').max(99, 'Jersey number must be at most 99'),
    first_name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string({
        required_error: 'First name is required'
    }).min(1, 'First name is required').max(50, 'First name must be at most 50 characters').trim(),
    last_name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string({
        required_error: 'Last name is required'
    }).min(1, 'Last name is required').max(50, 'Last name must be at most 50 characters').trim(),
    position: playerPositionEnum,
    birthdate: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].null()
    ]).optional().transform((val)=>val === '' || val === null ? undefined : val).pipe(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().date().optional())
});
const playerUpdateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    jersey_number: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int('Jersey number must be an integer').min(1, 'Jersey number must be at least 1').max(99, 'Jersey number must be at most 99').optional(),
    first_name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'First name is required').max(50, 'First name must be at most 50 characters').trim().optional(),
    last_name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Last name is required').max(50, 'Last name must be at most 50 characters').trim().optional(),
    position: playerPositionEnum.optional(),
    birthdate: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].null()
    ]).optional().transform((val)=>val === '' || val === null ? undefined : val).pipe(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().date().optional())
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/validation/team-schemas.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
;
const teamCreateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    organization_id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Invalid organization ID'),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Team name is required').max(100, 'Team name must be less than 100 characters'),
    age_years: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int('Age must be a whole number').min(6, 'Age must be at least 6').max(21, 'Age must be 21 or less'),
    level: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
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
    season: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}$/, 'Season must be in format YYYY-YY (e.g., 2024-25)').refine((season)=>{
        const [startYear, endYear] = season.split('-').map(Number);
        return endYear === (startYear + 1) % 100;
    }, {
        message: 'Invalid season format (e.g., 2024-25)'
    }),
    region: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'usa',
        'canada'
    ], {
        errorMap: ()=>({
                message: 'Please select a region'
            })
    }).default('usa')
});
const teamUpdateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Team name is required').max(100, 'Team name must be less than 100 characters').optional(),
    level: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'house',
        'travel',
        'aaa',
        'aa',
        'a'
    ]).optional(),
    season: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}$/, 'Season must be in format YYYY-YY').optional()
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
    return "".concat(startYear, "-").concat(String(endYear).slice(2)) // "2024-25"
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/validation/user-schemas.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateUserProfileSchema",
    ()=>updateUserProfileSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
;
const updateUserProfileSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    full_name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Name must be at least 1 character').max(100, 'Name must be less than 100 characters').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('')),
    avatar_url: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url('Must be a valid URL').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal(''))
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/utils/age-groups.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
function formatAgeGroup(ageYears) {
    let region = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'usa';
    if (region === 'usa') {
        // USA format: 8U (even numbers)
        // age_years=9 -> 8U, age_years=11 -> 10U
        return "".concat(ageYears - 1, "U");
    } else {
        // Canada format: U9, U10, U11, etc.
        return "U".concat(ageYears);
    }
}
function parseAgeGroup(ageGroup) {
    // Handle both formats: "8U" and "U9"
    const match = ageGroup.match(/(\d+)U|U(\d+)/);
    if (!match) throw new Error("Invalid age group format: ".concat(ageGroup));
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
function getAgeGroupOptions() {
    let region = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'usa';
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/utils/ice-surface-coordinates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    return "".concat(zone, "_").concat(side);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/utils/organization-setup.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    return "".concat(trimmed, "'s Teams");
}
function generateUniqueSlug(baseSlug, existingSlugs) {
    // If base slug doesn't exist, use it
    if (!existingSlugs.includes(baseSlug)) {
        return baseSlug;
    }
    // Find the next available number
    let counter = 2;
    let candidateSlug = "".concat(baseSlug, "-").concat(counter);
    while(existingSlugs.includes(candidateSlug)){
        counter++;
        candidateSlug = "".concat(baseSlug, "-").concat(counter);
    }
    return candidateSlug;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/utils/event-mappers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/analytics/shot-quality.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
function calculateShotQuality(param) {
    let { x, y } = param;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/analytics/breakout-analytics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    zones.forEach((param)=>{
        let { name, stats } = param;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/analytics/game-analytics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
function getPeriodStats(events) {
    let maxPeriod = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
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
            playerName: "".concat(player.firstName[0], ". ").concat(player.lastName),
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/stores/game-tracking-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/node_modules/zustand/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$event$2d$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/utils/event-mappers.ts [app-client] (ecmascript)");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])((set, get)=>({
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
                    id: "temp_".concat(Date.now()),
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
                    const savedEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$event$2d$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRowToGameEvent"])(savedEventRow);
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
                    const events = rows.map(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$event$2d$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRowToGameEvent"]);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/shared/src/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/types/index.ts [app-client] (ecmascript)");
// Export API interfaces
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$api$2f$game$2d$events$2e$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/api/game-events.interface.ts [app-client] (ecmascript)");
// Export validation schemas
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$validation$2f$event$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/validation/event-schemas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$validation$2f$player$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/validation/player-schemas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$validation$2f$team$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/validation/team-schemas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$validation$2f$user$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/validation/user-schemas.ts [app-client] (ecmascript)");
// Export utils
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$age$2d$groups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/utils/age-groups.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/utils/ice-surface-coordinates.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$organization$2d$setup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/utils/organization-setup.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$utils$2f$event$2d$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/utils/event-mappers.ts [app-client] (ecmascript)");
// Export analytics
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$analytics$2f$shot$2d$quality$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/analytics/shot-quality.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$analytics$2f$breakout$2d$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/analytics/breakout-analytics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$analytics$2f$game$2d$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/analytics/game-analytics.ts [app-client] (ecmascript)");
// Export stores
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$stores$2f$game$2d$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/stores/game-tracking-store.ts [app-client] (ecmascript)");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/lib/api/game-events.supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/db/supabase.ts [app-client] (ecmascript)");
;
;
class SupabaseGameEventsAPI {
    /**
   * Save a new game event
   */ async saveGameEvent(event) {
        var _event_coordinates, _event_coordinates1;
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
            x_coord: ((_event_coordinates = event.coordinates) === null || _event_coordinates === void 0 ? void 0 : _event_coordinates.x) || null,
            y_coord: ((_event_coordinates1 = event.coordinates) === null || _event_coordinates1 === void 0 ? void 0 : _event_coordinates1.y) || null,
            period: event.period,
            game_time_seconds: event.gameTimeSeconds,
            player_id: event.playerId || null,
            situation: event.situation,
            details: event.details
        };
        const { data, error } = await this.client.from('game_events').insert(eventData).select().single();
        if (error) {
            var _error_message;
            console.error('Error saving game event:', error);
            // If it's a 403 (Forbidden) error, sign out the user
            // This typically means the session expired or RLS policy denied access
            if (error.code === '42501' || ((_error_message = error.message) === null || _error_message === void 0 ? void 0 : _error_message.includes('row-level security'))) {
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
            var _error_message;
            console.error('Error updating game event:', error);
            // If it's a 403 (Forbidden) error, sign out the user
            if (error.code === '42501' || ((_error_message = error.message) === null || _error_message === void 0 ? void 0 : _error_message.includes('row-level security'))) {
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
            var _error_message;
            console.error('Error deleting game event:', error);
            // If it's a 403 (Forbidden) error, sign out the user
            if (error.code === '42501' || ((_error_message = error.message) === null || _error_message === void 0 ? void 0 : _error_message.includes('row-level security'))) {
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
            var _error_message;
            console.error('Error fetching game events:', error);
            // If it's a 403 (Forbidden) error, sign out the user
            if (error.code === '42501' || ((_error_message = error.message) === null || _error_message === void 0 ? void 0 : _error_message.includes('row-level security'))) {
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
    constructor(client = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "client", void 0);
        this.client = client;
    }
}
const gameEventsAPI = new SupabaseGameEventsAPI();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/lib/stores/game-tracking-store-configured.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Configured Game Tracking Store for Web App
 *
 * Exports a game tracking store configured with the Supabase API implementation.
 */ __turbopack_context__.s([
    "useGameTrackingStore",
    ()=>useGameTrackingStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$stores$2f$game$2d$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/shared/src/stores/game-tracking-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$api$2f$game$2d$events$2e$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/api/game-events.supabase.ts [app-client] (ecmascript)");
;
;
const useGameTrackingStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$shared$2f$src$2f$stores$2f$game$2d$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createGameTrackingStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$api$2f$game$2d$events$2e$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gameEventsAPI"]);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/lib/analytics/game-analytics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
function getPeriodStats(events) {
    let maxPeriod = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
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
            playerName: "".concat(player.firstName[0], ". ").concat(player.lastName),
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/lib/utils/ice-surface-coordinates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    return "".concat(zone, "_").concat(side);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IceSurface",
    ()=>IceSurface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/utils/ice-surface-coordinates.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function IceSurface(param) {
    let { width, height, onClick, showZones = false, showSlot = false, events = [], className = '', responsive = true, endsSwapped = false } = param;
    _s();
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
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
        const iceCoords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["screenToIce"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ref: svgRef,
        width: svgWidth,
        height: svgHeight,
        viewBox: "0 0 ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].WIDTH, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT),
        preserveAspectRatio: "xMidYMid meet",
        role: "img",
        "aria-label": "Hockey ice surface",
        onClick: handleClick,
        className: "cursor-pointer ".concat(responsive ? 'max-w-full' : '', " ").concat(className),
        style: {
            border: '2px solid #666',
            display: 'block',
            borderRadius: '8px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: 0,
                y: 0,
                width: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].WIDTH,
                height: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                fill: "#ffffff",
                rx: 4
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: 1,
                y: 1,
                width: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].WIDTH - 2,
                height: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT - 2,
                fill: "none",
                stroke: "#333",
                strokeWidth: 2,
                rx: 4
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: 11,
                y1: 0,
                x2: 11,
                y2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                stroke: "#cc0000",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: 189,
                y1: 0,
                x2: 189,
                y2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                stroke: "#cc0000",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: 64,
                y1: 0,
                x2: 64,
                y2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                stroke: "#0066cc",
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: 136,
                y1: 0,
                x2: 136,
                y2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                stroke: "#0066cc",
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].CENTER.x,
                y1: 0,
                x2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].CENTER.x,
                y2: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                stroke: "#cc0000",
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 100,
                cy: 50,
                r: 1,
                fill: "#0066cc"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 31,
                cy: 26,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 31,
                cy: 74,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 169,
                cy: 26,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 169,
                cy: 74,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 69,
                cy: 26,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 69,
                cy: 74,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 131,
                cy: 26,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: 131,
                cy: 74,
                r: 1.5,
                fill: "#cc0000"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 7 45 A 6 6 0 0 1 7 55 L 11 55 L 11 45 Z",
                fill: "rgba(173, 216, 230, 0.4)",
                stroke: "#0066cc",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 193 45 A 6 6 0 0 0 193 55 L 189 55 L 189 45 Z",
                fill: "rgba(173, 216, 230, 0.4)",
                stroke: "#0066cc",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            showZones && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: 0,
                        y: 0,
                        width: 64,
                        height: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
                        fill: "rgba(200, 220, 255, 0.15)",
                        "data-zone": "defensive"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx",
                        lineNumber: 255,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: 136,
                        y: 0,
                        width: 64,
                        height: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT,
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
                const slotMinX = endsSwapped ? 200 - __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MAX_X : __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MIN_X;
                const slotMaxX = endsSwapped ? 200 - __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MIN_X : __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MAX_X;
                const slotWidth = slotMaxX - slotMinX;
                const slotCenterX = slotMinX + slotWidth / 2;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: slotMinX,
                            y: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MIN_Y,
                            width: slotWidth,
                            height: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MAX_Y - __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MIN_Y,
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: slotCenterX,
                            y: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].SLOT.MIN_Y - 2,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
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
                const screenPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iceToScreen"])({
                    x: event.x,
                    y: event.y
                }, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].WIDTH, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$utils$2f$ice$2d$surface$2d$coordinates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICE_SURFACE"].HEIGHT);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
_s(IceSurface, "hBmswj7ndKUg9xiEeqZsAgaPoNM=");
_c = IceSurface;
var _c;
__turbopack_context__.k.register(_c, "IceSurface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShotChart",
    ()=>ShotChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$ice$2d$surface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/game-tracking/ice-surface.tsx [app-client] (ecmascript)");
'use client';
;
;
const RESULT_COLORS = {
    goal: '#10b981',
    save: '#3b82f6',
    miss_high: '#ef4444',
    miss_wide: '#f59e0b',
    blocked: '#6b7280',
    post: '#8b5cf6'
};
const QUALITY_SIZES = {
    high: 12,
    medium: 8,
    low: 6,
    default: 7
};
function ShotChart(param) {
    let { shots, players = [], width = 600, height = 300, showZones = true, showSlot = true } = param;
    // Helper to get player name
    const getPlayerName = (playerId)=>{
        if (!playerId) return 'Unknown';
        const player = players.find((p)=>p.id === playerId);
        return player ? "".concat(player.firstName[0], ". ").concat(player.lastName) : 'Unknown';
    };
    // Group shots by result for legend
    const shotsByResult = shots.reduce((acc, shot)=>{
        const result = shot.result || 'miss_high';
        acc[result] = (acc[result] || 0) + 1;
        return acc;
    }, {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative bg-white rounded-lg shadow p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: width,
                        height: height,
                        className: "mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$game$2d$tracking$2f$ice$2d$surface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IceSurface"], {
                                width: width,
                                height: height,
                                showZones: showZones,
                                showSlot: showSlot
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            shots.map((shot, index)=>{
                                const color = RESULT_COLORS[shot.result] || RESULT_COLORS.miss_high;
                                const size = shot.shotQuality ? QUALITY_SIZES[shot.shotQuality] : QUALITY_SIZES.default;
                                // Calculate position (ice surface is 200x100, svg might be different)
                                const scaleX = width / 200;
                                const scaleY = height / 100;
                                const x = shot.x * scaleX;
                                const y = shot.y * scaleY;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: x,
                                    cy: y,
                                    r: size,
                                    fill: color,
                                    fillOpacity: 0.7,
                                    stroke: "white",
                                    strokeWidth: 1,
                                    className: "transition-all hover:fill-opacity-100 cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                                        children: [
                                            shot.playerId && "".concat(getPlayerName(shot.playerId), " - "),
                                            shot.result.replace('_', ' '),
                                            " - Period ",
                                            shot.period,
                                            shot.shotQuality && " - ".concat(shot.shotQuality, " danger")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                        lineNumber: 93,
                                        columnNumber: 17
                                    }, this)
                                }, "shot-".concat(index), false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 right-4 bg-white/90 rounded p-3 shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-medium mb-1",
                                children: "Total Shots"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold",
                                children: shots.length
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600 mt-1",
                                children: [
                                    shots.filter((s)=>s.result === 'goal').length,
                                    " Goals"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-4 justify-center",
                children: Object.entries(shotsByResult).map((param)=>{
                    let [result, count] = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-4 h-4 rounded-full border border-white",
                                style: {
                                    backgroundColor: RESULT_COLORS[result]
                                }
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-700",
                                children: [
                                    result.replace('_', ' '),
                                    ": ",
                                    count
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        ]
                    }, result, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-6 justify-center text-sm text-gray-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-full bg-gray-400",
                                style: {
                                    width: QUALITY_SIZES.high * 2,
                                    height: QUALITY_SIZES.high * 2
                                }
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "High Danger"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-full bg-gray-400",
                                style: {
                                    width: QUALITY_SIZES.medium * 2,
                                    height: QUALITY_SIZES.medium * 2
                                }
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Medium Danger"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-full bg-gray-400",
                                style: {
                                    width: QUALITY_SIZES.low * 2,
                                    height: QUALITY_SIZES.low * 2
                                }
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Low Danger"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c = ShotChart;
var _c;
__turbopack_context__.k.register(_c, "ShotChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShotQualityChart",
    ()=>ShotQualityChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
'use client';
;
;
const QUALITY_COLORS = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#3b82f6'
};
function ShotQualityChart(param) {
    let { stats, height = 300 } = param;
    // Prepare data for the chart
    const chartData = [
        {
            quality: 'High Danger',
            shots: stats.high.count,
            goals: stats.high.goals,
            percentage: stats.high.percentage,
            color: QUALITY_COLORS.high
        },
        {
            quality: 'Medium Danger',
            shots: stats.medium.count,
            goals: stats.medium.goals,
            percentage: stats.medium.percentage,
            color: QUALITY_COLORS.medium
        },
        {
            quality: 'Low Danger',
            shots: stats.low.count,
            goals: stats.low.goals,
            percentage: stats.low.percentage,
            color: QUALITY_COLORS.low
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Total Shots"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold",
                                children: stats.total.count
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Goals"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-green-600",
                                children: stats.total.goals
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Shooting %"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold",
                                children: [
                                    stats.total.percentage.toFixed(1),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "High Danger %"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-red-600",
                                children: [
                                    stats.high.percentage.toFixed(1),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-4",
                        children: "Shot Quality Distribution"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: height,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                            data: chartData,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "quality"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    content: (param)=>{
                                        let { active, payload } = param;
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white border border-gray-200 rounded p-3 shadow-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: data.quality
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600",
                                                        children: [
                                                            "Shots: ",
                                                            data.shots
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600",
                                                        children: [
                                                            "Goals: ",
                                                            data.goals
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium text-green-600",
                                                        children: [
                                                            "Conversion: ",
                                                            data.percentage.toFixed(1),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 23
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                lineNumber: 91,
                                                columnNumber: 21
                                            }, void 0);
                                        }
                                        return null;
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: "shots",
                                    name: "Shots",
                                    radius: [
                                        8,
                                        8,
                                        0,
                                        0
                                    ],
                                    children: chartData.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                            fill: entry.color
                                        }, "cell-".concat(index), false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full divide-y divide-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Shot Quality"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Shots"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Goals"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Conversion %"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "bg-white divide-y divide-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-3 h-3 rounded-full mr-2",
                                                        style: {
                                                            backgroundColor: QUALITY_COLORS.high
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: "High Danger"
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                lineNumber: 140,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: stats.high.count
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: stats.high.goals
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap font-medium",
                                            children: [
                                                stats.high.percentage.toFixed(1),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-3 h-3 rounded-full mr-2",
                                                        style: {
                                                            backgroundColor: QUALITY_COLORS.medium
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: "Medium Danger"
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                lineNumber: 156,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: stats.medium.count
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: stats.medium.goals
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap font-medium",
                                            children: [
                                                stats.medium.percentage.toFixed(1),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 166,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-3 h-3 rounded-full mr-2",
                                                        style: {
                                                            backgroundColor: QUALITY_COLORS.low
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: "Low Danger"
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                                lineNumber: 172,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: stats.low.count
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 180,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: stats.low.goals
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 181,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap font-medium",
                                            children: [
                                                stats.low.percentage.toFixed(1),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 182,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "bg-gray-50 font-semibold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: "Total"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: stats.total.count
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: stats.total.goals
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 189,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: [
                                                stats.total.percentage.toFixed(1),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c = ShotQualityChart;
var _c;
__turbopack_context__.k.register(_c, "ShotQualityChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BreakoutAnalysis",
    ()=>BreakoutAnalysis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
'use client';
;
;
const SUCCESS_COLOR = '#10b981' // green
;
const FAILED_COLOR = '#ef4444' // red
;
const TYPE_COLORS = [
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981'
];
function BreakoutAnalysis(param) {
    let { analytics, height = 300 } = param;
    // Prepare data for success/fail pie chart
    const pieData = [
        {
            name: 'Successful',
            value: analytics.successful,
            color: SUCCESS_COLOR
        },
        {
            name: 'Failed',
            value: analytics.failed,
            color: FAILED_COLOR
        }
    ];
    // Prepare data for breakout types bar chart
    const typeData = Object.entries(analytics.byType).map((param)=>{
        let [type, stats] = param;
        return {
            type: type.replace('_', ' '),
            total: stats.total,
            successful: stats.successful,
            successRate: stats.successRate
        };
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Total Breakouts"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold",
                                children: analytics.total
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Successful"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-green-600",
                                children: analytics.successful
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Failed"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-red-600",
                                children: analytics.failed
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Success Rate"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold",
                                children: [
                                    analytics.successRate.toFixed(1),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold mb-4",
                                children: "Overall Success Rate"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            analytics.total > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                width: "100%",
                                height: height,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                            data: pieData,
                                            cx: "50%",
                                            cy: "50%",
                                            labelLine: false,
                                            label: (param)=>{
                                                let { name, value, percent } = param;
                                                return "".concat(name, ": ").concat(value, " (").concat((percent * 100).toFixed(0), "%)");
                                            },
                                            outerRadius: 80,
                                            fill: "#8884d8",
                                            dataKey: "value",
                                            children: pieData.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                    fill: entry.color
                                                }, "cell-".concat(index), false, {
                                                    fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 90,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center h-64 text-gray-400",
                                children: "No breakout data available"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold mb-4",
                                children: "Success by Breakout Type"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            typeData.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                width: "100%",
                                height: height,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                    data: typeData,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                            strokeDasharray: "3 3"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                            dataKey: "type",
                                            angle: -45,
                                            textAnchor: "end",
                                            height: 80,
                                            tick: {
                                                fontSize: 12
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 107,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                            yAxisId: "left",
                                            orientation: "left",
                                            stroke: "#8884d8"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                            yAxisId: "right",
                                            orientation: "right",
                                            stroke: "#82ca9d"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            content: (param)=>{
                                                let { active, payload } = param;
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white border border-gray-200 rounded p-3 shadow-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold capitalize",
                                                                children: data.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 27
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600",
                                                                children: [
                                                                    "Total: ",
                                                                    data.total
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                                                lineNumber: 123,
                                                                columnNumber: 27
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-green-600",
                                                                children: [
                                                                    "Successful: ",
                                                                    data.successful
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                                                lineNumber: 124,
                                                                columnNumber: 27
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium",
                                                                children: [
                                                                    "Success Rate: ",
                                                                    data.successRate.toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                                                lineNumber: 127,
                                                                columnNumber: 27
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 25
                                                    }, void 0);
                                                }
                                                return null;
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 136,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                            yAxisId: "left",
                                            dataKey: "total",
                                            name: "Total Attempts",
                                            fill: "#3b82f6"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                            yAxisId: "left",
                                            dataKey: "successful",
                                            name: "Successful",
                                            fill: "#10b981"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 138,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center h-64 text-gray-400",
                                children: "No breakout type data available"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            typeData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full divide-y divide-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Breakout Type"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Total Attempts"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Successful"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Failed"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Success Rate"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                        lineNumber: 172,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 159,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                            lineNumber: 158,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "bg-white divide-y divide-gray-200",
                            children: typeData.sort((a, b)=>b.total - a.total).map((row)=>{
                                const failed = row.total - row.successful;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap capitalize font-medium",
                                            children: row.type
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 184,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: row.total
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 187,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap text-green-600",
                                            children: row.successful
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 188,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap text-red-600",
                                            children: failed
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 191,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: [
                                                            row.successRate.toFixed(1),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "ml-3 w-24 bg-gray-200 rounded-full h-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-green-500 h-2 rounded-full",
                                                            style: {
                                                                width: "".concat(row.successRate, "%")
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                                lineNumber: 195,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                            lineNumber: 194,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, row.type, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                    lineNumber: 183,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                    lineNumber: 157,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                lineNumber: 156,
                columnNumber: 9
            }, this),
            analytics.total > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-50 border border-blue-200 rounded-lg p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-semibold text-blue-900 mb-2",
                        children: "Insights"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-1 text-sm text-blue-800",
                        children: [
                            analytics.successRate >= 70 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "✓ Excellent breakout execution - success rate above 70%"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 219,
                                columnNumber: 15
                            }, this),
                            analytics.successRate < 50 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "⚠ Breakout struggles - consider practicing zone exits"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 222,
                                columnNumber: 15
                            }, this),
                            typeData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "Most used:",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium capitalize",
                                        children: typeData.sort((a, b)=>b.total - a.total)[0].type
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                        lineNumber: 227,
                                        columnNumber: 17
                                    }, this),
                                    ' ',
                                    "(",
                                    typeData.sort((a, b)=>b.total - a.total)[0].total,
                                    " attempts)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 225,
                                columnNumber: 15
                            }, this),
                            typeData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "Most effective:",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium capitalize",
                                        children: typeData.sort((a, b)=>b.successRate - a.successRate)[0].type
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                        lineNumber: 236,
                                        columnNumber: 17
                                    }, this),
                                    ' ',
                                    "(",
                                    typeData.sort((a, b)=>b.successRate - a.successRate)[0].successRate.toFixed(1),
                                    "% success rate)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                                lineNumber: 234,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
                lineNumber: 215,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = BreakoutAnalysis;
var _c;
__turbopack_context__.k.register(_c, "BreakoutAnalysis");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/components/analytics/period-trends.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PeriodTrends",
    ()=>PeriodTrends
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
'use client';
;
;
function PeriodTrends(param) {
    let { periodStats, height = 300 } = param;
    // Prepare data with period labels
    const chartData = periodStats.map((stat)=>({
            period: "Period ".concat(stat.period),
            periodNum: stat.period,
            shots: stat.shots,
            goals: stat.goals,
            turnovers: stat.turnovers,
            breakouts: stat.breakouts,
            zoneEntries: stat.zoneEntries,
            shootingPct: stat.shots > 0 ? (stat.goals / stat.shots * 100).toFixed(1) : 0
        }));
    // Calculate totals
    const totals = periodStats.reduce((acc, stat)=>({
            shots: acc.shots + stat.shots,
            goals: acc.goals + stat.goals,
            turnovers: acc.turnovers + stat.turnovers,
            breakouts: acc.breakouts + stat.breakouts,
            zoneEntries: acc.zoneEntries + stat.zoneEntries
        }), {
        shots: 0,
        goals: 0,
        turnovers: 0,
        breakouts: 0,
        zoneEntries: 0
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-5 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Total Shots"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold",
                                children: totals.shots
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mt-1",
                                children: [
                                    "Avg: ",
                                    (totals.shots / periodStats.length).toFixed(1),
                                    "/period"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Total Goals"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-green-600",
                                children: totals.goals
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mt-1",
                                children: [
                                    "Avg: ",
                                    (totals.goals / periodStats.length).toFixed(1),
                                    "/period"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Turnovers"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-red-600",
                                children: totals.turnovers
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mt-1",
                                children: [
                                    "Avg: ",
                                    (totals.turnovers / periodStats.length).toFixed(1),
                                    "/period"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Breakouts"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold",
                                children: totals.breakouts
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mt-1",
                                children: [
                                    "Avg: ",
                                    (totals.breakouts / periodStats.length).toFixed(1),
                                    "/period"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: "Zone Entries"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold",
                                children: totals.zoneEntries
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mt-1",
                                children: [
                                    "Avg: ",
                                    (totals.zoneEntries / periodStats.length).toFixed(1),
                                    "/period"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-4",
                        children: "Shots and Goals by Period"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: height,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                            data: chartData,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "period"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: "shots",
                                    name: "Shots",
                                    fill: "#3b82f6"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: "goals",
                                    name: "Goals",
                                    fill: "#10b981"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-4",
                        children: "Event Activity by Period"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: height,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                            data: chartData,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "period"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                    type: "monotone",
                                    dataKey: "shots",
                                    name: "Shots",
                                    stroke: "#3b82f6",
                                    strokeWidth: 2,
                                    dot: {
                                        r: 4
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                    type: "monotone",
                                    dataKey: "turnovers",
                                    name: "Turnovers",
                                    stroke: "#ef4444",
                                    strokeWidth: 2,
                                    dot: {
                                        r: 4
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                    type: "monotone",
                                    dataKey: "breakouts",
                                    name: "Breakouts",
                                    stroke: "#8b5cf6",
                                    strokeWidth: 2,
                                    dot: {
                                        r: 4
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                    type: "monotone",
                                    dataKey: "zoneEntries",
                                    name: "Zone Entries",
                                    stroke: "#f59e0b",
                                    strokeWidth: 2,
                                    dot: {
                                        r: 4
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full divide-y divide-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Period"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Shots"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Goals"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 162,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Shooting %"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Turnovers"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Breakouts"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Zone Entries"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "bg-white divide-y divide-gray-200",
                            children: [
                                chartData.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 whitespace-nowrap font-medium",
                                                children: row.period
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                                lineNumber: 182,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 whitespace-nowrap",
                                                children: row.shots
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 whitespace-nowrap text-green-600 font-medium",
                                                children: row.goals
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 whitespace-nowrap",
                                                children: [
                                                    row.shootingPct,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 whitespace-nowrap text-red-600",
                                                children: row.turnovers
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                                lineNumber: 188,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 whitespace-nowrap",
                                                children: row.breakouts
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 whitespace-nowrap",
                                                children: row.zoneEntries
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                                lineNumber: 190,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, row.periodNum, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "bg-gray-50 font-semibold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: "Total"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                            lineNumber: 194,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: totals.shots
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                            lineNumber: 195,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap text-green-600",
                                            children: totals.goals
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: [
                                                totals.shots > 0 ? (totals.goals / totals.shots * 100).toFixed(1) : 0,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                            lineNumber: 197,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap text-red-600",
                                            children: totals.turnovers
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: totals.breakouts
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                            lineNumber: 201,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap",
                                            children: totals.zoneEntries
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-50 border border-blue-200 rounded-lg p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-semibold text-blue-900 mb-2",
                        children: "Period Analysis"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-1 text-sm text-blue-800",
                        children: (()=>{
                            const maxShotsPeriod = chartData.reduce((max, p)=>p.shots > max.shots ? p : max);
                            const minShotsPeriod = chartData.reduce((min, p)=>p.shots < min.shots ? p : min);
                            const maxTurnoversPeriod = chartData.reduce((max, p)=>p.turnovers > max.turnovers ? p : max);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "Most offensive pressure in",
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: maxShotsPeriod.period
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                                lineNumber: 227,
                                                columnNumber: 19
                                            }, this),
                                            " (",
                                            maxShotsPeriod.shots,
                                            " shots)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 225,
                                        columnNumber: 17
                                    }, this),
                                    maxShotsPeriod.periodNum !== minShotsPeriod.periodNum && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "Least offensive pressure in",
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: minShotsPeriod.period
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                                lineNumber: 233,
                                                columnNumber: 21
                                            }, this),
                                            " (",
                                            minShotsPeriod.shots,
                                            " shots)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 231,
                                        columnNumber: 19
                                    }, this),
                                    maxTurnoversPeriod.turnovers > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "Most turnovers in",
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: maxTurnoversPeriod.period
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                                lineNumber: 240,
                                                columnNumber: 21
                                            }, this),
                                            " (",
                                            maxTurnoversPeriod.turnovers,
                                            " turnovers)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 238,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "Average of ",
                                            (totals.shots / periodStats.length).toFixed(1),
                                            " shots per period"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                                        lineNumber: 244,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true);
                        })()
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/analytics/period-trends.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_c = PeriodTrends;
var _c;
__turbopack_context__.k.register(_c, "PeriodTrends");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerStatsTable",
    ()=>PlayerStatsTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function PlayerStatsTable(param) {
    let { stats } = param;
    _s();
    const [sortField, setSortField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('totalEvents');
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('desc');
    if (stats.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold mb-4",
                    children: "Player Statistics"
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-500 py-8",
                    children: "No player stats available"
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    const handleSort = (field)=>{
        if (sortField === field) {
            // Toggle direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // New field, default to descending
            setSortField(field);
            setSortDirection('desc');
        }
    };
    const sortedStats = [
        ...stats
    ].sort((a, b)=>{
        let aVal = a[sortField];
        let bVal = b[sortField];
        // Handle string comparison for playerName
        if (sortField === 'playerName') {
            aVal = a.playerName.toLowerCase();
            bVal = b.playerName.toLowerCase();
        }
        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    const SortIcon = (param)=>{
        let { field } = param;
        if (sortField !== field) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gray-400",
                children: "↕"
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                lineNumber: 56,
                columnNumber: 14
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: sortDirection === 'asc' ? '↑' : '↓'
        }, void 0, false, {
            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
            lineNumber: 58,
            columnNumber: 12
        }, this);
    };
    const getPositionBadge = (position)=>{
        const colors = {
            forward: 'bg-blue-100 text-blue-800',
            defense: 'bg-green-100 text-green-800',
            goalie: 'bg-purple-100 text-purple-800'
        };
        const color = colors[position] || 'bg-gray-100 text-gray-800';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "px-2 py-1 rounded text-xs font-medium ".concat(color),
            children: position[0].toUpperCase()
        }, void 0, false, {
            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-b border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold",
                        children: "Player Statistics"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600 mt-1",
                        children: "Click column headers to sort"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden",
                children: sortedStats.map((player, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-gray-200 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-bold text-gray-900",
                                                children: [
                                                    "#",
                                                    player.jerseyNumber
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 89,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold",
                                                        children: player.playerName
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 19
                                                    }, this),
                                                    getPositionBadge(player.position)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 90,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500",
                                                children: "Total Events"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 96,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold",
                                                children: player.totalEvents
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 97,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-3 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-600",
                                                children: "Shots"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 103,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: player.shots
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 104,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-600",
                                                children: "Goals"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 107,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-green-600",
                                                children: player.goals
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-600",
                                                children: "SH%"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 111,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: player.shots > 0 ? "".concat(player.shootingPct.toFixed(1), "%") : '-'
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 112,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-600",
                                                children: "Turnovers"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 117,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-red-600",
                                                children: player.turnovers
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-600",
                                                children: "Breakouts"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: player.breakouts
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 122,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-600",
                                                children: "Zone Entries"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 125,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: player.zoneEntries
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this),
                                    player.faceoffs > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-600",
                                                        children: "Faceoffs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold",
                                                        children: player.faceoffs
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                        lineNumber: 132,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 130,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-600",
                                                        children: "FO Wins"
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold",
                                                        children: player.faceoffWins
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 134,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-600",
                                                        children: "FO%"
                                                    }, void 0, false, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold",
                                                        children: [
                                                            player.faceoffWinPct.toFixed(1),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 138,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        ]
                    }, player.playerId, true, {
                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:block overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "#"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                                        onClick: ()=>handleSort('playerName'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                "Player ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {
                                                    field: "playerName"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 26
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 161,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Pos"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                                        onClick: ()=>handleSort('shots'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center gap-1",
                                            children: [
                                                "Shots ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {
                                                    field: "shots"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                                        onClick: ()=>handleSort('goals'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center gap-1",
                                            children: [
                                                "Goals ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {
                                                    field: "goals"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 180,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                                        onClick: ()=>handleSort('shootingPct'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center gap-1",
                                            children: [
                                                "SH% ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {
                                                    field: "shootingPct"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 188,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                                        onClick: ()=>handleSort('turnovers'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center gap-1",
                                            children: [
                                                "TO ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {
                                                    field: "turnovers"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 22
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 192,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                                        onClick: ()=>handleSort('breakouts'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center gap-1",
                                            children: [
                                                "BO ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {
                                                    field: "breakouts"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 22
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 200,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "ZE"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                                        onClick: ()=>handleSort('faceoffWinPct'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center gap-1",
                                            children: [
                                                "FO% ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {
                                                    field: "faceoffWinPct"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                                        onClick: ()=>handleSort('totalEvents'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center gap-1",
                                            children: [
                                                "Events ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortIcon, {
                                                    field: "totalEvents"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 26
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 223,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                        lineNumber: 219,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "bg-white divide-y divide-gray-200",
                            children: sortedStats.map((player, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "hover:bg-gray-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900",
                                            children: player.jerseyNumber
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900",
                                            children: player.playerName
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 235,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm",
                                            children: getPositionBadge(player.position)
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 238,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-center",
                                            children: player.shots
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 241,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-center font-semibold text-green-600",
                                            children: player.goals
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 244,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-center",
                                            children: player.shots > 0 ? "".concat(player.shootingPct.toFixed(1), "%") : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 247,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-center text-red-600",
                                            children: player.turnovers
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 250,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-center",
                                            children: [
                                                player.breakouts,
                                                player.breakouts > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-500 ml-1",
                                                    children: [
                                                        "(",
                                                        player.breakoutSuccessPct.toFixed(0),
                                                        "%)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 253,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-center",
                                            children: player.zoneEntries
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 261,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-center",
                                            children: player.faceoffs > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    player.faceoffWins,
                                                    "/",
                                                    player.faceoffs,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-500 ml-1",
                                                        children: [
                                                            "(",
                                                            player.faceoffWinPct.toFixed(0),
                                                            "%)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                                lineNumber: 266,
                                                columnNumber: 21
                                            }, this) : '-'
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 264,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 whitespace-nowrap text-sm text-center font-semibold",
                                            children: player.totalEvents
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                            lineNumber: 274,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, player.playerId, true, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "SH%:"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                    lineNumber: 286,
                                    columnNumber: 17
                                }, this),
                                " Shooting Percentage"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                            lineNumber: 286,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "TO:"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                    lineNumber: 287,
                                    columnNumber: 17
                                }, this),
                                " Turnovers"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                            lineNumber: 287,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "BO:"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                    lineNumber: 288,
                                    columnNumber: 17
                                }, this),
                                " Breakouts"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "ZE:"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                    lineNumber: 289,
                                    columnNumber: 17
                                }, this),
                                " Zone Entries"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                            lineNumber: 289,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "FO%:"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                                    lineNumber: 290,
                                    columnNumber: 17
                                }, this),
                                " Faceoff Win %"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                    lineNumber: 285,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(PlayerStatsTable, "1ICChFPg8dWjkzLHQI1TSn4yjN8=");
_c = PlayerStatsTable;
var _c;
__turbopack_context__.k.register(_c, "PlayerStatsTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/hp2/packages/web/app/demo/analytics/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalyticsDemoPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/stores/game-tracking-store-configured.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/db/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$contexts$2f$team$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/contexts/team-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$analytics$2f$game$2d$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/analytics/game-analytics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$analytics$2f$shot$2d$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/analytics/shot-chart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$analytics$2f$shot$2d$quality$2d$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/analytics/shot-quality-chart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$analytics$2f$breakout$2d$analysis$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/analytics/breakout-analysis.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$analytics$2f$period$2d$trends$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/analytics/period-trends.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$analytics$2f$player$2d$stats$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/components/analytics/player-stats-table.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
;
function AnalyticsDemoPage() {
    _s();
    const { events, players, gameState, loadEvents, setGameState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameTrackingStore"])();
    const { selectedTeamId, selectTeam } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$contexts$2f$team$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTeam"])();
    const [selectedPeriod, setSelectedPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedSituation, setSelectedSituation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [generatingPlan, setGeneratingPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [generatedPlan, setGeneratedPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [planError, setPlanError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [availableGames, setAvailableGames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedGameId, setSelectedGameId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Save practice plan state
    const [showSaveModal, setShowSaveModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savingPractice, setSavingPractice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [practiceDate, setPracticeDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [practiceNotes, setPracticeNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [saveError, setSaveError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saveSuccess, setSaveSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load available games on mount and when team changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalyticsDemoPage.useEffect": ()=>{
            async function loadAvailableGames() {
                try {
                    setLoading(true); // Reset loading state when team changes
                    const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                    if (!user) {
                        console.log('❌ No user authenticated');
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
                        const { data: teamMembers } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('team_members').select('team_id').eq('user_id', user.id).limit(1);
                        if (!teamMembers || teamMembers.length === 0) {
                            console.log('❌ No team found for user');
                            return;
                        }
                        teamId = teamMembers[0].team_id;
                        // Auto-select this team in context
                        selectTeam(teamId);
                    }
                    // Load players from roster for this team
                    const { data: dbPlayers } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('players').select('id, jersey_number, first_name, last_name, position').eq('team_id', teamId).order('jersey_number');
                    if (dbPlayers && dbPlayers.length > 0) {
                        const mappedPlayers = dbPlayers.map({
                            "AnalyticsDemoPage.useEffect.loadAvailableGames.mappedPlayers": (p)=>({
                                    id: p.id,
                                    jerseyNumber: p.jersey_number,
                                    firstName: p.first_name,
                                    lastName: p.last_name,
                                    position: p.position
                                })
                        }["AnalyticsDemoPage.useEffect.loadAvailableGames.mappedPlayers"]);
                        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameTrackingStore"].getState().setPlayers(mappedPlayers);
                        console.log('✅ Loaded', mappedPlayers.length, 'players from roster for team', teamId);
                    } else {
                        // Clear players if team has no roster
                        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameTrackingStore"].getState().setPlayers([]);
                        console.log('⚠️ No players found for team', teamId);
                    }
                    // Get all games for this team
                    const { data: games } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('games').select('id, opponent_name, game_date, location').eq('team_id', teamId).order('game_date', {
                        ascending: false
                    });
                    if (games && games.length > 0) {
                        console.log('✅ Found', games.length, 'games for team', teamId);
                        setAvailableGames(games);
                        // Always select the most recent game for the newly selected team
                        const gameIdToLoad = games[0].id;
                        setSelectedGameId(gameIdToLoad);
                        setGameState({
                            gameId: gameIdToLoad
                        });
                        // Load events for the selected game
                        console.log('📊 Loading events for game:', gameIdToLoad);
                        await loadEvents(gameIdToLoad);
                        console.log('✅ Loaded events for game');
                    } else {
                        console.log('❌ No games found for team', teamId);
                        setAvailableGames([]);
                        setSelectedGameId(null);
                    }
                } catch (error) {
                    console.error('❌ Error loading games:', error);
                } finally{
                    setLoading(false);
                }
            }
            loadAvailableGames();
        }
    }["AnalyticsDemoPage.useEffect"], [
        selectedTeamId,
        selectTeam
    ]);
    // Handle game selection change
    const handleGameChange = async (newGameId)=>{
        setSelectedGameId(newGameId);
        setGameState({
            gameId: newGameId
        });
        setLoading(true);
        try {
            await loadEvents(newGameId);
            console.log('✅ Switched to game:', newGameId);
        } catch (error) {
            console.error('❌ Error loading game events:', error);
        } finally{
            setLoading(false);
        }
    };
    // Filter events based on selected period and situation
    const filteredEvents = events.filter((event)=>{
        const periodMatch = selectedPeriod === 'all' || event.period === selectedPeriod;
        const situationMatch = selectedSituation === 'all' || event.situation === selectedSituation;
        return periodMatch && situationMatch;
    });
    // Calculate analytics from filtered events
    const shotData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$analytics$2f$game$2d$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractShotData"])(filteredEvents);
    const shotQualityStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$analytics$2f$game$2d$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateShotQualityStats"])(filteredEvents);
    const breakoutAnalytics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$analytics$2f$game$2d$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeBreakouts"])(filteredEvents);
    const periodStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$analytics$2f$game$2d$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPeriodStats"])(filteredEvents, 3);
    const situationStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$analytics$2f$game$2d$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getShootingPercentageBySituation"])(filteredEvents);
    const playerStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$analytics$2f$game$2d$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePlayerStats"])(filteredEvents, players);
    // Count turnovers
    const turnoverCount = filteredEvents.filter((e)=>e.eventType === 'turnover').length;
    // Get unique periods from events
    const periods = Array.from(new Set(events.map((e)=>e.period))).sort();
    // Generate AI practice plan
    async function generatePracticePlan() {
        setGeneratingPlan(true);
        setPlanError(null);
        setGeneratedPlan(null);
        try {
            console.log('🤖 Requesting AI practice plan generation...');
            // Build analytics payload
            const analyticsPayload = {
                shotQualityStats: {
                    totalShots: shotQualityStats.totalShots,
                    totalGoals: shotQualityStats.totalGoals,
                    shootingPercentage: shotQualityStats.shootingPercentage,
                    highDangerShots: shotQualityStats.highDangerShots,
                    highDangerGoals: shotQualityStats.highDangerGoals,
                    highDangerPercentage: shotQualityStats.highDangerPercentage,
                    mediumDangerShots: shotQualityStats.mediumDangerShots,
                    lowDangerShots: shotQualityStats.lowDangerShots
                },
                breakoutAnalytics: {
                    totalBreakouts: breakoutAnalytics.total,
                    successfulBreakouts: breakoutAnalytics.successful,
                    failedBreakouts: breakoutAnalytics.failed,
                    successRate: breakoutAnalytics.successRate,
                    byType: breakoutAnalytics.byType
                },
                turnoverCount,
                periodStats: periodStats.map((p)=>({
                        period: p.period,
                        shots: p.shots,
                        goals: p.goals,
                        events: p.events
                    })),
                situationStats: {
                    evenStrength: situationStats.find((s)=>s.situation === 'even_strength') || {
                        shots: 0,
                        goals: 0,
                        percentage: 0
                    },
                    powerPlay: situationStats.find((s)=>s.situation === 'power_play') || {
                        shots: 0,
                        goals: 0,
                        percentage: 0
                    },
                    penaltyKill: situationStats.find((s)=>s.situation === 'penalty_kill') || {
                        shots: 0,
                        goals: 0,
                        percentage: 0
                    }
                }
            };
            const response = await fetch('/api/generate-practice-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    teamId: 'demo-team',
                    analytics: analyticsPayload,
                    practiceDuration: 60,
                    teamAge: 13
                })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to generate practice plan');
            }
            const result = await response.json();
            console.log('✅ Practice plan generated:', result);
            setGeneratedPlan(result.practicePlan);
        } catch (error) {
            console.error('❌ Error generating practice plan:', error);
            setPlanError(error instanceof Error ? error.message : 'Unknown error occurred');
        } finally{
            setGeneratingPlan(false);
        }
    }
    // Save practice plan to database
    async function savePracticePlan() {
        if (!generatedPlan || !practiceDate) {
            setSaveError('Please provide a practice date');
            return;
        }
        setSavingPractice(true);
        setSaveError(null);
        setSaveSuccess(false);
        try {
            console.log('💾 Saving practice plan to database...');
            // Get current user and team
            const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
            if (!user) {
                throw new Error('No authenticated user');
            }
            const { data: teamMember } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('team_members').select('team_id').eq('user_id', user.id).single();
            if (!teamMember) {
                throw new Error('No team found for user');
            }
            // Fetch all available drills to match titles
            const { data: allDrills, error: drillsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('drills').select('id, title').eq('is_global', true);
            if (drillsError) {
                throw new Error('Failed to fetch drills');
            }
            // Create a map of drill titles to IDs (case-insensitive)
            const drillTitleMap = new Map(allDrills.map((d)=>[
                    d.title.toLowerCase(),
                    d.id
                ]));
            // Create the practice record
            const { data: practice, error: practiceError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('practices').insert({
                team_id: teamMember.team_id,
                practice_date: new Date(practiceDate).toISOString(),
                duration_minutes: generatedPlan.practice_plan.total_duration_minutes,
                objectives: generatedPlan.reasoning.practice_goals.join('\n'),
                notes: practiceNotes,
                generated_by_ai: true,
                based_on_game_id: selectedGameId,
                ai_reasoning: {
                    top_focus_areas: generatedPlan.reasoning.top_focus_areas,
                    overall_assessment: generatedPlan.reasoning.overall_assessment,
                    practice_goals: generatedPlan.reasoning.practice_goals
                },
                status: 'planned',
                created_by: user.id
            }).select().single();
            if (practiceError) {
                console.error('Error creating practice:', practiceError);
                throw new Error('Failed to create practice record');
            }
            console.log('✅ Practice created:', practice.id);
            // Now create practice_drill records for each drill
            const practiceDrills = [];
            let sequenceOrder = 1;
            for (const section of generatedPlan.practice_plan.sections){
                for (const drill of section.drills){
                    // Find drill ID by title (case-insensitive match)
                    const drillId = drillTitleMap.get(drill.drill_title.toLowerCase());
                    if (!drillId) {
                        console.warn('⚠️ Could not find drill ID for: "'.concat(drill.drill_title, '"'));
                        continue; // Skip drills we can't match
                    }
                    practiceDrills.push({
                        practice_id: practice.id,
                        drill_id: drillId,
                        section: section.section,
                        sequence_order: sequenceOrder++,
                        duration_minutes: drill.duration_minutes,
                        notes: "".concat(drill.reason, "\n\nExpected: ").concat(drill.expected_improvement)
                    });
                }
            }
            // Insert all practice drills
            const { error: drillsInsertError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('practice_drills').insert(practiceDrills);
            if (drillsInsertError) {
                console.error('Error inserting practice drills:', drillsInsertError);
                throw new Error('Failed to save practice drills');
            }
            console.log('✅ Saved', practiceDrills.length, 'practice drills');
            setSaveSuccess(true);
            setTimeout(()=>{
                setShowSaveModal(false);
                setSaveSuccess(false);
                setPracticeDate('');
                setPracticeNotes('');
            }, 2000);
        } catch (error) {
            console.error('❌ Error saving practice plan:', error);
            setSaveError(error instanceof Error ? error.message : 'Failed to save practice plan');
        } finally{
            setSavingPractice(false);
        }
    }
    // Open save modal and set default date (tomorrow)
    function openSaveModal() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setPracticeDate(tomorrow.toISOString().split('T')[0]);
        setPracticeNotes('');
        setSaveError(null);
        setSaveSuccess(false);
        setShowSaveModal(true);
    }
    // Show loading state
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 p-6 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                        lineNumber: 434,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Loading game events..."
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                        lineNumber: 435,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                lineNumber: 433,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
            lineNumber: 432,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-bold text-gray-900",
                                    children: "Game Analytics Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 447,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/demo/practice-history",
                                    className: "px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline",
                                    children: "View Practice History →"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 448,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 446,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "Post-game analytics and insights based on tracked events"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 455,
                            columnNumber: 11
                        }, this),
                        availableGames.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                    children: "Select Game"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 462,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: selectedGameId || '',
                                    onChange: (e)=>handleGameChange(e.target.value),
                                    className: "w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",
                                    children: availableGames.map((game)=>{
                                        const date = new Date(game.game_date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        });
                                        const location = game.location ? " @ ".concat(game.location) : '';
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: game.id,
                                            children: [
                                                "vs ",
                                                game.opponent_name,
                                                " - ",
                                                date,
                                                location
                                            ]
                                        }, game.id, true, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 478,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 465,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 461,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex items-center gap-4 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-600",
                                    children: [
                                        "Total Events: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold",
                                            children: events.length
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 490,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 489,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-600",
                                    children: [
                                        "Filtered Events: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold",
                                            children: filteredEvents.length
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 493,
                                            columnNumber: 32
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 492,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 488,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                    lineNumber: 445,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold mb-4",
                            children: "Filters"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 500,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-[200px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-gray-700 mb-2",
                                            children: "Period"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 504,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedPeriod,
                                            onChange: (e)=>setSelectedPeriod(e.target.value === 'all' ? 'all' : Number(e.target.value)),
                                            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "all",
                                                    children: "All Periods"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                    lineNumber: 514,
                                                    columnNumber: 17
                                                }, this),
                                                periods.map((period)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: period,
                                                        children: [
                                                            "Period ",
                                                            period
                                                        ]
                                                    }, period, true, {
                                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 507,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 503,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-[200px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-gray-700 mb-2",
                                            children: "Situation"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 525,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedSituation,
                                            onChange: (e)=>setSelectedSituation(e.target.value),
                                            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "all",
                                                    children: "All Situations"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                    lineNumber: 533,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "even_strength",
                                                    children: "Even Strength"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                    lineNumber: 534,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "power_play",
                                                    children: "Power Play"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                    lineNumber: 535,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "penalty_kill",
                                                    children: "Penalty Kill"
                                                }, void 0, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                    lineNumber: 536,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 528,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 524,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-end",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setSelectedPeriod('all');
                                            setSelectedSituation('all');
                                        },
                                        className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors",
                                        children: "Reset Filters"
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                        lineNumber: 542,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 541,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 501,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 grid grid-cols-1 md:grid-cols-3 gap-4",
                            children: situationStats.map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 rounded p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-600 uppercase",
                                            children: stat.situation.replace('_', ' ')
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 558,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-1 flex items-baseline gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl font-bold",
                                                    children: [
                                                        stat.percentage.toFixed(1),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                    lineNumber: 562,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-gray-600",
                                                    children: [
                                                        "(",
                                                        stat.goals,
                                                        "/",
                                                        stat.shots,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 561,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, stat.situation, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 557,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 555,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                    lineNumber: 499,
                    columnNumber: 9
                }, this),
                events.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-yellow-800 mb-4",
                        children: [
                            "No game events found. Track some events in the",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/demo/game-tracking",
                                className: "font-semibold underline",
                                children: "game tracking demo"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                lineNumber: 577,
                                columnNumber: 15
                            }, this),
                            ' ',
                            "first."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                        lineNumber: 575,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                    lineNumber: 574,
                    columnNumber: 11
                }, this),
                shotData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-gray-900",
                            children: "Shot Analysis"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 588,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$analytics$2f$shot$2d$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShotChart"], {
                                shots: shotData,
                                players: players,
                                width: 800,
                                height: 400
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                lineNumber: 592,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 591,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$analytics$2f$shot$2d$quality$2d$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShotQualityChart"], {
                                stats: shotQualityStats
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                lineNumber: 597,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 596,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                    lineNumber: 587,
                    columnNumber: 11
                }, this),
                breakoutAnalytics.total > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-gray-900",
                            children: "Breakout Performance"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 605,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$analytics$2f$breakout$2d$analysis$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BreakoutAnalysis"], {
                            analytics: breakoutAnalytics
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 606,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                    lineNumber: 604,
                    columnNumber: 11
                }, this),
                periodStats.length > 0 && periodStats.some((p)=>p.shots > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-gray-900",
                            children: "Period-by-Period Trends"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 613,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$analytics$2f$period$2d$trends$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PeriodTrends"], {
                            periodStats: periodStats
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 614,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                    lineNumber: 612,
                    columnNumber: 11
                }, this),
                playerStats.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$components$2f$analytics$2f$player$2d$stats$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerStatsTable"], {
                        stats: playerStats
                    }, void 0, false, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                        lineNumber: 621,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                    lineNumber: 620,
                    columnNumber: 11
                }, this),
                events.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg shadow-lg p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold mb-2 text-purple-900",
                            children: "🤖 AI-Powered Practice Planning"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 628,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-purple-700 mb-4",
                            children: "Let AI analyze this game data and generate a targeted practice plan to address your team's weaknesses."
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 631,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: generatePracticePlan,
                            disabled: generatingPlan,
                            className: "px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
                            children: generatingPlan ? '🤖 Generating Practice Plan...' : '✨ Generate AI Practice Plan'
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 636,
                            columnNumber: 13
                        }, this),
                        planError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 bg-red-50 border border-red-200 rounded-md p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-800 font-semibold",
                                    children: "Error generating practice plan"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 646,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-600 text-sm mt-1",
                                    children: planError
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 647,
                                    columnNumber: 17
                                }, this),
                                planError.includes('API key not configured') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-600 text-sm mt-2",
                                    children: [
                                        "💡 Add your OpenAI API key to ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            className: "bg-red-100 px-1",
                                            children: ".env.local"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 650,
                                            columnNumber: 51
                                        }, this),
                                        ":",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 651,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            className: "bg-red-100 px-2 py-1 rounded text-xs block mt-1",
                                            children: "OPENAI_API_KEY=your-key-here"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 652,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 649,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 645,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                    lineNumber: 627,
                    columnNumber: 11
                }, this),
                generatedPlan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-2 border-green-200 rounded-lg shadow-xl p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-gray-900 mb-4",
                            children: "✅ AI-Generated Practice Plan"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 665,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-blue-900 mb-2",
                                    children: "Analysis & Focus Areas"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 671,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-blue-800 mb-3",
                                    children: generatedPlan.reasoning.overall_assessment
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 672,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-sm font-semibold text-blue-900 mb-1",
                                            children: "Top Focus Areas:"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 675,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "list-disc list-inside text-blue-800 space-y-1",
                                            children: generatedPlan.reasoning.top_focus_areas.map((area, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: area
                                                }, idx, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                    lineNumber: 678,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 676,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 674,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-sm font-semibold text-blue-900 mb-1",
                                            children: "Practice Goals:"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 684,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "list-disc list-inside text-blue-800 space-y-1",
                                            children: generatedPlan.reasoning.practice_goals.map((goal, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: goal
                                                }, idx, false, {
                                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                    lineNumber: 687,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 685,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 683,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 670,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: [
                                            "Practice Plan (",
                                            generatedPlan.practice_plan.total_duration_minutes,
                                            " minutes)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                        lineNumber: 696,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 695,
                                    columnNumber: 15
                                }, this),
                                generatedPlan.practice_plan.sections.map((section, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border border-gray-200 rounded-lg p-4 bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-md font-semibold text-gray-900 mb-3 uppercase tracking-wide",
                                                children: [
                                                    section.section.replace('_', ' '),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-gray-600 font-normal ml-2",
                                                        children: [
                                                            "(",
                                                            section.drills.reduce((sum, d)=>sum + d.duration_minutes, 0),
                                                            " min)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                        lineNumber: 705,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                lineNumber: 703,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: section.drills.map((drill, drillIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white border border-gray-200 rounded-md p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start justify-between mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                        className: "font-semibold text-gray-900",
                                                                        children: drill.drill_title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                        lineNumber: 717,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-gray-600 font-semibold ml-2 whitespace-nowrap",
                                                                        children: [
                                                                            drill.duration_minutes,
                                                                            " min"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                        lineNumber: 718,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                lineNumber: 716,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2 text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-semibold text-purple-700",
                                                                                children: "Addresses: "
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                                lineNumber: 725,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-gray-700",
                                                                                children: drill.addresses
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                                lineNumber: 726,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                        lineNumber: 724,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-semibold text-blue-700",
                                                                                children: "Why: "
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                                lineNumber: 729,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-gray-700",
                                                                                children: drill.reason
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                                lineNumber: 730,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                        lineNumber: 728,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-semibold text-green-700",
                                                                                children: "Expected: "
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                                lineNumber: 733,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-gray-700",
                                                                                children: drill.expected_improvement
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                                lineNumber: 734,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                        lineNumber: 732,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, drillIdx, true, {
                                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                        lineNumber: 712,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                lineNumber: 710,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                        lineNumber: 702,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 694,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: openSaveModal,
                                    className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold",
                                    children: "💾 Save Practice Plan"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 746,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setGeneratedPlan(null),
                                    className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors",
                                    children: "✕ Close"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 752,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 745,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                    lineNumber: 664,
                    columnNumber: 11
                }, this),
                showSaveModal && generatedPlan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold text-gray-900 mb-4",
                                children: "Save Practice Plan"
                            }, void 0, false, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                lineNumber: 766,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "Practice Date *"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                lineNumber: 773,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: practiceDate,
                                                onChange: (e)=>setPracticeDate(e.target.value),
                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",
                                                required: true,
                                                disabled: savingPractice
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                lineNumber: 776,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                        lineNumber: 772,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "Duration"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                lineNumber: 788,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: "".concat(generatedPlan.practice_plan.total_duration_minutes, " minutes"),
                                                className: "w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600",
                                                disabled: true
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                lineNumber: 791,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                        lineNumber: 787,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "Notes (optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                lineNumber: 801,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: practiceNotes,
                                                onChange: (e)=>setPracticeNotes(e.target.value),
                                                placeholder: "Add any additional notes about this practice...",
                                                rows: 3,
                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",
                                                disabled: savingPractice
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                lineNumber: 804,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                        lineNumber: 800,
                                        columnNumber: 17
                                    }, this),
                                    saveError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-red-50 border border-red-200 rounded-md p-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-800 text-sm",
                                            children: saveError
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 817,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                        lineNumber: 816,
                                        columnNumber: 19
                                    }, this),
                                    saveSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-green-50 border border-green-200 rounded-md p-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-green-800 text-sm font-semibold",
                                            children: "✅ Practice plan saved successfully!"
                                        }, void 0, false, {
                                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                            lineNumber: 824,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                        lineNumber: 823,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 pt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: savePracticePlan,
                                                disabled: savingPractice || !practiceDate,
                                                className: "flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed",
                                                children: savingPractice ? 'Saving...' : 'Save Practice Plan'
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                lineNumber: 832,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowSaveModal(false),
                                                disabled: savingPractice,
                                                className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                                lineNumber: 839,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                        lineNumber: 831,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                lineNumber: 770,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                        lineNumber: 765,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                    lineNumber: 764,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-4",
                            children: "Actions"
                        }, void 0, false, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 854,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        // TODO: Implement PDF export
                                        alert('PDF export coming soon!');
                                    },
                                    className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors",
                                    children: "Export as PDF"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 856,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        // TODO: Implement sharing
                                        alert('Share functionality coming soon!');
                                    },
                                    className: "px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors",
                                    children: "Share Analytics"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 865,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/demo/game-tracking",
                                    className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors",
                                    children: "Back to Game Tracking"
                                }, void 0, false, {
                                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                                    lineNumber: 874,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                            lineNumber: 855,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
                    lineNumber: 853,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
            lineNumber: 443,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/hp2/packages/web/app/demo/analytics/page.tsx",
        lineNumber: 442,
        columnNumber: 5
    }, this);
}
_s(AnalyticsDemoPage, "EFME0+v1MiW+IsQBFa8V1vFB6RU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$stores$2f$game$2d$tracking$2d$store$2d$configured$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameTrackingStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$contexts$2f$team$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTeam"]
    ];
});
_c = AnalyticsDemoPage;
var _c;
__turbopack_context__.k.register(_c, "AnalyticsDemoPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=code_hp2_packages_70ba2183._.js.map