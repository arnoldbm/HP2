module.exports = [
"[project]/code/hp2/packages/web/lib/db/supabase-admin.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabaseAdmin",
    ()=>supabaseAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/@supabase/supabase-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
;
const supabaseAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "http://localhost:54321"), process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
}),
"[project]/code/hp2/packages/web/lib/validation/team-schemas.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
;
const teamCreateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    organization_id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Invalid organization ID'),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Team name is required').max(100, 'Team name must be less than 100 characters'),
    age_years: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int('Age must be a whole number').min(6, 'Age must be at least 6').max(21, 'Age must be 21 or less'),
    level: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
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
    season: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}$/, 'Season must be in format YYYY-YY (e.g., 2024-25)').refine((season)=>{
        const [startYear, endYear] = season.split('-').map(Number);
        return endYear === (startYear + 1) % 100;
    }, {
        message: 'Invalid season format (e.g., 2024-25)'
    }),
    region: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'usa',
        'canada'
    ], {
        errorMap: ()=>({
                message: 'Please select a region'
            })
    }).default('usa')
});
const teamUpdateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Team name is required').max(100, 'Team name must be less than 100 characters').optional(),
    level: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'house',
        'travel',
        'aaa',
        'aa',
        'a'
    ]).optional(),
    season: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}$/, 'Season must be in format YYYY-YY').optional()
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
"[project]/code/hp2/packages/web/app/actions/teams.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4003eda13ef42f5897b694e47f1359be71c71c53c0":"deleteTeam","40288fda725bdb5c12167bb174a10aad442824f4ce":"getTeamMembers","405c45025e9a13f66027d9ac2cda37fb543cc9d0bb":"getTeamStats","40fe3ebce1844a9e7c8ef610443e73434ff6a5555b":"getUserTeams","601da4d6b5d31fdb0843f5d4275195c384d8572524":"createTeam","601efbf980325c3a956d1ee5f8b6f36d119dbb2b5f":"updateTeam","6020c8c1d6aac2360b336816e6cc70e60eeafa0756":"removeTeamMember","607dbe2769166efb05495079da32a7519fce996813":"getTeamById","70b7fdece0e7f883f29ca818f09a82ab6f9aedec99":"addTeamMember","70d6763b16b7efa0e9396d793bdf5d05f1fe5a1ab5":"updateTeamMemberRole"},"",""] */ __turbopack_context__.s([
    "addTeamMember",
    ()=>addTeamMember,
    "createTeam",
    ()=>createTeam,
    "deleteTeam",
    ()=>deleteTeam,
    "getTeamById",
    ()=>getTeamById,
    "getTeamMembers",
    ()=>getTeamMembers,
    "getTeamStats",
    ()=>getTeamStats,
    "getUserTeams",
    ()=>getUserTeams,
    "removeTeamMember",
    ()=>removeTeamMember,
    "updateTeam",
    ()=>updateTeam,
    "updateTeamMemberRole",
    ()=>updateTeamMemberRole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/db/supabase-admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$validation$2f$team$2d$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/validation/team-schemas.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getTeamStats(teamId) {
    try {
        // Get player count
        const { count: playerCount, error: playersError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('players').select('*', {
            count: 'exact',
            head: true
        }).eq('team_id', teamId);
        if (playersError) {
            console.error('Error counting players:', playersError);
            return {
                playerCount: 0,
                gameCount: 0,
                error: playersError.message
            };
        }
        // Get game count
        const { count: gameCount, error: gamesError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('games').select('*', {
            count: 'exact',
            head: true
        }).eq('team_id', teamId);
        if (gamesError) {
            console.error('Error counting games:', gamesError);
            return {
                playerCount: playerCount || 0,
                gameCount: 0,
                error: gamesError.message
            };
        }
        return {
            playerCount: playerCount || 0,
            gameCount: gameCount || 0,
            error: null
        };
    } catch (error) {
        console.error('Error getting team stats:', error);
        return {
            playerCount: 0,
            gameCount: 0,
            error: 'Failed to get team stats'
        };
    }
}
async function createTeam(input, userId) {
    try {
        // Check if user's email is verified (using our custom field)
        const { data: profile, error: profileError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('user_profiles').select('email_verified').eq('id', userId).single();
        if (profileError || !profile) {
            return {
                success: false,
                error: 'User profile not found'
            };
        }
        if (!profile.email_verified) {
            return {
                success: false,
                error: 'Please verify your email address before creating a team',
                requiresVerification: true
            };
        }
        // Validate input
        const validatedData = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$validation$2f$team$2d$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["teamCreateSchema"].parse(input);
        // 1. Create team
        const { data: team, error: teamError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('teams').insert({
            organization_id: validatedData.organization_id,
            name: validatedData.name,
            age_years: validatedData.age_years,
            level: validatedData.level,
            season: validatedData.season,
            region: validatedData.region
        }).select().single();
        if (teamError) {
            console.error('Failed to create team:', teamError);
            return {
                success: false,
                error: 'Failed to create team'
            };
        }
        // 2. Add user as head coach
        const { data: membership, error: membershipError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('team_members').insert({
            team_id: team.id,
            user_id: userId,
            role: 'head_coach'
        }).select('id, role').single();
        if (membershipError) {
            console.error('Failed to add user as head coach:', membershipError);
            // Rollback: delete the team
            await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('teams').delete().eq('id', team.id);
            return {
                success: false,
                error: 'Failed to add user as head coach'
            };
        }
        return {
            success: true,
            team,
            membership
        };
    } catch (error) {
        console.error('Unexpected error in createTeam:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function getUserTeams(userId) {
    try {
        const { data: memberships, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('team_members').select(`
        role,
        teams:team_id (
          id,
          name,
          age_years,
          level,
          season,
          region,
          organization_id
        )
      `).eq('user_id', userId);
        if (error) {
            console.error('Failed to fetch user teams:', error);
            return {
                success: false,
                error: 'Failed to fetch teams'
            };
        }
        // Use the teams_with_age_display view for formatted age groups
        const teamIds = memberships?.map((m)=>m.teams.id) || [];
        if (teamIds.length === 0) {
            return {
                success: true,
                teams: []
            };
        }
        const { data: teamsWithDisplay, error: displayError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('teams_with_age_display').select('*').in('id', teamIds);
        if (displayError) {
            console.error('Failed to fetch teams with display:', displayError);
            // Fallback to basic data
            const teams = memberships?.map((m)=>({
                    ...m.teams,
                    age_group_display: `${m.teams.age_years}`,
                    role: m.role
                })) || [];
            return {
                success: true,
                teams
            };
        }
        // Merge role information
        const teams = teamsWithDisplay.map((team)=>{
            const membership = memberships?.find((m)=>m.teams.id === team.id);
            return {
                ...team,
                role: membership?.role || 'member'
            };
        });
        return {
            success: true,
            teams
        };
    } catch (error) {
        console.error('Unexpected error in getUserTeams:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function getTeamById(teamId, userId) {
    try {
        // First verify the user has access to this team
        const { data: membership, error: membershipError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('team_members').select('role').eq('team_id', teamId).eq('user_id', userId).single();
        if (membershipError || !membership) {
            return {
                success: false,
                error: 'Team not found or you do not have access'
            };
        }
        // Fetch team with formatted age group
        const { data: team, error: teamError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('teams_with_age_display').select('*').eq('id', teamId).single();
        if (teamError || !team) {
            console.error('Failed to fetch team:', teamError);
            return {
                success: false,
                error: 'Failed to fetch team details'
            };
        }
        return {
            success: true,
            team: {
                ...team,
                role: membership.role
            }
        };
    } catch (error) {
        console.error('Unexpected error in getTeamById:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function updateTeam(teamId, input) {
    try {
        // Validate input
        const validatedData = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$validation$2f$team$2d$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["teamUpdateSchema"].parse(input);
        const { data: team, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('teams').update(validatedData).eq('id', teamId).select().single();
        if (error) {
            console.error('Failed to update team:', error);
            return {
                success: false,
                error: 'Failed to update team'
            };
        }
        return {
            success: true,
            team
        };
    } catch (error) {
        console.error('Unexpected error in updateTeam:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function deleteTeam(teamId) {
    try {
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('teams').delete().eq('id', teamId);
        if (error) {
            console.error('Failed to delete team:', error);
            return {
                success: false,
                error: 'Failed to delete team'
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('Unexpected error in deleteTeam:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function getTeamMembers(teamId) {
    try {
        // Get team members
        const { data: members, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('team_members').select('id, user_id, role, created_at').eq('team_id', teamId).order('created_at', {
            ascending: true
        });
        if (error) {
            console.error('Failed to fetch team members:', error);
            return {
                success: false,
                error: 'Failed to fetch team members'
            };
        }
        if (!members || members.length === 0) {
            return {
                success: true,
                members: []
            };
        }
        // Get user profiles for all members
        const userIds = members.map((m)=>m.user_id);
        const { data: profiles, error: profilesError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('user_profiles').select('id, email, full_name').in('id', userIds);
        if (profilesError) {
            console.error('Failed to fetch user profiles:', profilesError);
        // Continue with members data but without profile info
        }
        // Merge member data with profile data
        const formattedMembers = members.map((member)=>{
            const profile = profiles?.find((p)=>p.id === member.user_id);
            return {
                id: member.id,
                user_id: member.user_id,
                role: member.role,
                created_at: member.created_at,
                email: profile?.email || '',
                full_name: profile?.full_name || null
            };
        });
        return {
            success: true,
            members: formattedMembers
        };
    } catch (error) {
        console.error('Unexpected error in getTeamMembers:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function addTeamMember(teamId, email, role) {
    try {
        // 1. Find user by email
        const { data: profile, error: profileError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('user_profiles').select('id, email').eq('email', email).maybeSingle();
        if (profileError) {
            console.error('Error finding user:', profileError);
            return {
                success: false,
                error: 'Error finding user'
            };
        }
        if (!profile) {
            return {
                success: false,
                error: 'No user found with this email address'
            };
        }
        // 2. Check if already a member
        const { data: existingMember } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('team_members').select('id').eq('team_id', teamId).eq('user_id', profile.id).maybeSingle();
        if (existingMember) {
            return {
                success: false,
                error: 'User is already a member of this team'
            };
        }
        // 3. Add as team member
        const { data: member, error: memberError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('team_members').insert({
            team_id: teamId,
            user_id: profile.id,
            role: role
        }).select().single();
        if (memberError) {
            console.error('Failed to add team member:', memberError);
            return {
                success: false,
                error: 'Failed to add team member'
            };
        }
        return {
            success: true,
            member
        };
    } catch (error) {
        console.error('Unexpected error in addTeamMember:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function removeTeamMember(teamId, userId) {
    try {
        // Check if this is the last head_coach
        const { data: headCoaches } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('team_members').select('id, user_id').eq('team_id', teamId).eq('role', 'head_coach');
        if (headCoaches && headCoaches.length === 1 && headCoaches[0].user_id === userId) {
            return {
                success: false,
                error: 'Cannot remove the last head coach. Assign another head coach first.'
            };
        }
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('team_members').delete().eq('team_id', teamId).eq('user_id', userId);
        if (error) {
            console.error('Failed to remove team member:', error);
            return {
                success: false,
                error: 'Failed to remove team member'
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('Unexpected error in removeTeamMember:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function updateTeamMemberRole(teamId, userId, newRole) {
    try {
        // If changing FROM head_coach, check if there's another head_coach
        const { data: currentMember } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('team_members').select('role').eq('team_id', teamId).eq('user_id', userId).single();
        if (currentMember?.role === 'head_coach' && newRole !== 'head_coach') {
            // Check if there are other head coaches
            const { data: headCoaches } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('team_members').select('id').eq('team_id', teamId).eq('role', 'head_coach');
            if (headCoaches && headCoaches.length === 1) {
                return {
                    success: false,
                    error: 'Cannot change role. Team must have at least one head coach.'
                };
            }
        }
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('team_members').update({
            role: newRole
        }).eq('team_id', teamId).eq('user_id', userId);
        if (error) {
            console.error('Failed to update team member role:', error);
            return {
                success: false,
                error: 'Failed to update role'
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('Unexpected error in updateTeamMemberRole:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getTeamStats,
    createTeam,
    getUserTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
    getTeamMembers,
    addTeamMember,
    removeTeamMember,
    updateTeamMemberRole
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTeamStats, "405c45025e9a13f66027d9ac2cda37fb543cc9d0bb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTeam, "601da4d6b5d31fdb0843f5d4275195c384d8572524", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserTeams, "40fe3ebce1844a9e7c8ef610443e73434ff6a5555b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTeamById, "607dbe2769166efb05495079da32a7519fce996813", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTeam, "601efbf980325c3a956d1ee5f8b6f36d119dbb2b5f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTeam, "4003eda13ef42f5897b694e47f1359be71c71c53c0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTeamMembers, "40288fda725bdb5c12167bb174a10aad442824f4ce", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addTeamMember, "70b7fdece0e7f883f29ca818f09a82ab6f9aedec99", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeTeamMember, "6020c8c1d6aac2360b336816e6cc70e60eeafa0756", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTeamMemberRole, "70d6763b16b7efa0e9396d793bdf5d05f1fe5a1ab5", null);
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/code/hp2/packages/web/lib/email/resend.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendEmailVerification",
    ()=>sendEmailVerification,
    "sendTeamInvitationEmail",
    ()=>sendTeamInvitationEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/resend/dist/index.mjs [app-rsc] (ecmascript)");
;
// Initialize Resend with API key
// Get your API key from: https://resend.com/api-keys
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
async function sendEmailVerification(to, props) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY not configured - skipping email send');
            return {
                success: false,
                error: 'Email service not configured'
            };
        }
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'HP2 <noreply@yourdomain.com>',
            to: [
                to
            ],
            subject: 'Verify your email address',
            html: generateVerificationEmailHTML(props)
        });
        if (error) {
            console.error('Failed to send verification email:', error);
            return {
                success: false,
                error: 'Failed to send email'
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('Error sending verification email:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function sendTeamInvitationEmail(to, props) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY not configured - skipping email send');
            return {
                success: false,
                error: 'Email service not configured'
            };
        }
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'HP2 <noreply@yourdomain.com>',
            to: [
                to
            ],
            subject: `You've been invited to join ${props.teamName}`,
            html: generateInvitationEmailHTML(props)
        });
        if (error) {
            console.error('Failed to send invitation email:', error);
            return {
                success: false,
                error: 'Failed to send email'
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('Error sending invitation email:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
/**
 * Generate HTML for invitation email
 */ function generateInvitationEmailHTML(props) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Team Invitation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🏒 Team Invitation
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 16px; color: #111827; font-size: 16px; line-height: 24px;">
                Hi there,
              </p>
              <p style="margin: 0 0 24px; color: #111827; font-size: 16px; line-height: 24px;">
                <strong>${props.inviterName}</strong> has invited you to join <strong>${props.teamName}</strong> as a <strong>${props.role.replace('_', ' ')}</strong> on HP2 Hockey Practice Planner.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${props.inviteLink}" style="display: inline-block; padding: 16px 32px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Accept Invitation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px; line-height: 20px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin: 8px 0 0; color: #2563eb; font-size: 14px; line-height: 20px; word-break: break-all;">
                ${props.inviteLink}
              </p>

              <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">

              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 20px;">
                This invitation will expire in 7 days. If you didn't expect this invitation, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 18px;">
                HP2 Hockey Practice Planner<br>
                Track games • Generate AI practice plans • Manage teams
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
/**
 * Generate HTML for email verification email
 */ function generateVerificationEmailHTML(props) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🏒 Verify Your Email
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 16px; color: #111827; font-size: 16px; line-height: 24px;">
                Hi there,
              </p>
              <p style="margin: 0 0 24px; color: #111827; font-size: 16px; line-height: 24px;">
                Thanks for signing up for HP2 Hockey Practice Planner! Please verify your email address to unlock all features:
              </p>

              <ul style="margin: 0 0 24px; padding-left: 24px; color: #111827; font-size: 16px; line-height: 24px;">
                <li style="margin-bottom: 8px;">Create and manage teams</li>
                <li style="margin-bottom: 8px;">Track live games</li>
                <li style="margin-bottom: 8px;">Invite team members</li>
                <li style="margin-bottom: 8px;">Manage player rosters</li>
              </ul>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${props.verificationLink}" style="display: inline-block; padding: 16px 32px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px; line-height: 20px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin: 8px 0 0; color: #2563eb; font-size: 14px; line-height: 20px; word-break: break-all;">
                ${props.verificationLink}
              </p>

              <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">

              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 20px;">
                This verification link will expire in 24 hours. If you didn't sign up for HP2, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 18px;">
                HP2 Hockey Practice Planner<br>
                Track games • Generate AI practice plans • Manage teams
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/code/hp2/packages/web/app/actions/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40bb72b659ca51e64bfacd5ce0d2512d5750b1cb37":"verifyEmailToken","40c52ff0a08abb5ca278b4e1ffa60a8e290de064ef":"resendVerificationEmail","60cc30a6a551da8e346b806a4cc1a1ecb83c8cc675":"sendInitialVerificationEmail","70d06c71c32b616a10f8e76cbf730c497780920197":"createUserProfileAndOrg"},"",""] */ __turbopack_context__.s([
    "createUserProfileAndOrg",
    ()=>createUserProfileAndOrg,
    "resendVerificationEmail",
    ()=>resendVerificationEmail,
    "sendInitialVerificationEmail",
    ()=>sendInitialVerificationEmail,
    "verifyEmailToken",
    ()=>verifyEmailToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/db/supabase-admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$email$2f$resend$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/lib/email/resend.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function createUserProfileAndOrg(userId, email, fullName) {
    try {
        // 1. Create user profile (email_verified defaults to false)
        const { error: profileError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('user_profiles').insert({
            id: userId,
            email: email.toLowerCase(),
            full_name: fullName || null,
            email_verified: false
        });
        if (profileError) {
            console.error('Failed to create user profile:', profileError);
            return {
                success: false,
                error: 'Failed to create user profile'
            };
        }
        // 2. Create default organization
        const orgName = fullName ? `${fullName}'s Organization` : `${email.split('@')[0]}'s Organization`;
        const { error: orgError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('organizations').insert({
            name: orgName,
            owner_id: userId
        });
        if (orgError) {
            console.error('Failed to create organization:', orgError);
        // Don't fail - profile was created successfully
        // User can create organization later
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('Unexpected error in createUserProfileAndOrg:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function sendInitialVerificationEmail(userId, email) {
    try {
        // 1. Generate secure token
        const token = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        ;
        // 2. Delete any existing tokens for this user
        await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('email_verification_tokens').delete().eq('user_id', userId);
        // 3. Create new verification token
        const { error: tokenError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('email_verification_tokens').insert({
            user_id: userId,
            token,
            expires_at: expiresAt.toISOString()
        });
        if (tokenError) {
            console.error('Failed to create verification token:', tokenError);
            return {
                success: false,
                error: 'Failed to generate verification link'
            };
        }
        // 4. Send email via Resend
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000';
        const verificationLink = `${baseUrl}/auth/verify-email?token=${token}`;
        const emailResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$email$2f$resend$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendEmailVerification"])(email, {
            email,
            verificationLink
        });
        if (!emailResult.success) {
            return {
                success: false,
                error: emailResult.error || 'Failed to send verification email'
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('Unexpected error sending verification email:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function resendVerificationEmail(email) {
    try {
        // 1. Find user by email
        const { data: profile, error: profileError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('user_profiles').select('id, email_verified').eq('email', email.toLowerCase()).single();
        if (profileError || !profile) {
            return {
                success: false,
                error: 'User not found'
            };
        }
        if (profile.email_verified) {
            return {
                success: false,
                error: 'Email is already verified'
            };
        }
        // 2. Generate secure token
        const token = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        ;
        // 3. Delete any existing tokens for this user
        await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('email_verification_tokens').delete().eq('user_id', profile.id);
        // 4. Create new verification token
        const { error: tokenError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('email_verification_tokens').insert({
            user_id: profile.id,
            token,
            expires_at: expiresAt.toISOString()
        });
        if (tokenError) {
            console.error('Failed to create verification token:', tokenError);
            return {
                success: false,
                error: 'Failed to generate verification link'
            };
        }
        // 5. Send email via Resend
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000';
        const verificationLink = `${baseUrl}/auth/verify-email?token=${token}`;
        const emailResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$email$2f$resend$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendEmailVerification"])(email, {
            email,
            verificationLink
        });
        if (!emailResult.success) {
            return {
                success: false,
                error: emailResult.error || 'Failed to send verification email'
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('Unexpected error resending verification email:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
async function verifyEmailToken(token) {
    try {
        // 1. Find token in database
        const { data: tokenData, error: tokenError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('email_verification_tokens').select('user_id, expires_at, verified_at').eq('token', token).single();
        if (tokenError || !tokenData) {
            return {
                success: false,
                error: 'Invalid verification link'
            };
        }
        // 2. Check if already verified
        if (tokenData.verified_at) {
            return {
                success: false,
                error: 'Email already verified'
            };
        }
        // 3. Check if expired
        if (new Date(tokenData.expires_at) < new Date()) {
            return {
                success: false,
                error: 'Verification link has expired. Please request a new one.'
            };
        }
        // 4. Mark token as verified
        await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('email_verification_tokens').update({
            verified_at: new Date().toISOString()
        }).eq('token', token);
        // 5. Update user profile to mark email as verified
        const { error: profileError } = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$lib$2f$db$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('user_profiles').update({
            email_verified: true
        }).eq('id', tokenData.user_id);
        if (profileError) {
            console.error('Failed to update profile:', profileError);
            return {
                success: false,
                error: 'Failed to verify email'
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('Unexpected error verifying email:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createUserProfileAndOrg,
    sendInitialVerificationEmail,
    resendVerificationEmail,
    verifyEmailToken
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createUserProfileAndOrg, "70d06c71c32b616a10f8e76cbf730c497780920197", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendInitialVerificationEmail, "60cc30a6a551da8e346b806a4cc1a1ecb83c8cc675", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resendVerificationEmail, "40c52ff0a08abb5ca278b4e1ffa60a8e290de064ef", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verifyEmailToken, "40bb72b659ca51e64bfacd5ce0d2512d5750b1cb37", null);
}),
"[project]/code/hp2/packages/web/.next-internal/server/app/demo/teams/[teamId]/settings/page/actions.js { ACTIONS_MODULE0 => \"[project]/code/hp2/packages/web/app/actions/teams.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/code/hp2/packages/web/app/actions/auth.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$teams$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/app/actions/teams.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/app/actions/auth.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/code/hp2/packages/web/.next-internal/server/app/demo/teams/[teamId]/settings/page/actions.js { ACTIONS_MODULE0 => \"[project]/code/hp2/packages/web/app/actions/teams.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/code/hp2/packages/web/app/actions/auth.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "4003eda13ef42f5897b694e47f1359be71c71c53c0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$teams$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTeam"],
    "40c52ff0a08abb5ca278b4e1ffa60a8e290de064ef",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resendVerificationEmail"],
    "40fe3ebce1844a9e7c8ef610443e73434ff6a5555b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$teams$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserTeams"],
    "601efbf980325c3a956d1ee5f8b6f36d119dbb2b5f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$teams$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTeam"],
    "607dbe2769166efb05495079da32a7519fce996813",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$teams$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTeamById"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f2e$next$2d$internal$2f$server$2f$app$2f$demo$2f$teams$2f5b$teamId$5d2f$settings$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$teams$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/code/hp2/packages/web/.next-internal/server/app/demo/teams/[teamId]/settings/page/actions.js { ACTIONS_MODULE0 => "[project]/code/hp2/packages/web/app/actions/teams.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/code/hp2/packages/web/app/actions/auth.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$teams$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/app/actions/teams.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/app/actions/auth.ts [app-rsc] (ecmascript)");
}),
"[project]/code/hp2/packages/web/app/favicon.ico.mjs { IMAGE => \"[project]/code/hp2/packages/web/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/code/hp2/packages/web/app/favicon.ico.mjs { IMAGE => \"[project]/code/hp2/packages/web/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/code/hp2/packages/web/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/code/hp2/packages/web/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/code/hp2/packages/web/app/demo/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/code/hp2/packages/web/app/demo/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/code/hp2/packages/web/app/demo/teams/[teamId]/settings/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/code/hp2/packages/web/app/demo/teams/[teamId]/settings/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/code/hp2/packages/web/app/demo/teams/[teamId]/settings/page.tsx <module evaluation>", "default");
}),
"[project]/code/hp2/packages/web/app/demo/teams/[teamId]/settings/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/hp2/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/code/hp2/packages/web/app/demo/teams/[teamId]/settings/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/code/hp2/packages/web/app/demo/teams/[teamId]/settings/page.tsx", "default");
}),
"[project]/code/hp2/packages/web/app/demo/teams/[teamId]/settings/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$demo$2f$teams$2f5b$teamId$5d2f$settings$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/app/demo/teams/[teamId]/settings/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$demo$2f$teams$2f5b$teamId$5d2f$settings$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/code/hp2/packages/web/app/demo/teams/[teamId]/settings/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$hp2$2f$packages$2f$web$2f$app$2f$demo$2f$teams$2f5b$teamId$5d2f$settings$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/code/hp2/packages/web/app/demo/teams/[teamId]/settings/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/code/hp2/packages/web/app/demo/teams/[teamId]/settings/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7a41e127._.js.map