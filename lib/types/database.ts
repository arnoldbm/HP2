export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      event_edit_history: {
        Row: {
          action: string
          changes: Json
          edited_at: string | null
          edited_by: string | null
          event_id: string | null
          id: string
          previous_data: Json
        }
        Insert: {
          action: string
          changes: Json
          edited_at?: string | null
          edited_by?: string | null
          event_id?: string | null
          id?: string
          previous_data: Json
        }
        Update: {
          action?: string
          changes?: Json
          edited_at?: string | null
          edited_by?: string | null
          event_id?: string | null
          id?: string
          previous_data?: Json
        }
        Relationships: [
          {
            foreignKeyName: "event_edit_history_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "game_events"
            referencedColumns: ["id"]
          },
        ]
      }
      game_analytics: {
        Row: {
          breakout_success_rate: number | null
          computed_at: string | null
          faceoff_win_percentage: number | null
          faceoffs_taken: number | null
          faceoffs_won: number | null
          game_id: string
          goals: number | null
          id: string
          insights: string[] | null
          power_play_goals: number | null
          power_plays: number | null
          recommended_drill_categories: string[] | null
          shooting_percentage: number | null
          shot_locations: Json | null
          shot_quality_high: number | null
          shot_quality_low: number | null
          shot_quality_medium: number | null
          shots_on_goal: number | null
          successful_breakouts: number | null
          total_breakouts: number | null
          total_shots: number | null
          turnover_locations: Json | null
          turnovers: number | null
          turnovers_defensive: number | null
          turnovers_neutral: number | null
          turnovers_offensive: number | null
          updated_at: string | null
        }
        Insert: {
          breakout_success_rate?: number | null
          computed_at?: string | null
          faceoff_win_percentage?: number | null
          faceoffs_taken?: number | null
          faceoffs_won?: number | null
          game_id: string
          goals?: number | null
          id?: string
          insights?: string[] | null
          power_play_goals?: number | null
          power_plays?: number | null
          recommended_drill_categories?: string[] | null
          shooting_percentage?: number | null
          shot_locations?: Json | null
          shot_quality_high?: number | null
          shot_quality_low?: number | null
          shot_quality_medium?: number | null
          shots_on_goal?: number | null
          successful_breakouts?: number | null
          total_breakouts?: number | null
          total_shots?: number | null
          turnover_locations?: Json | null
          turnovers?: number | null
          turnovers_defensive?: number | null
          turnovers_neutral?: number | null
          turnovers_offensive?: number | null
          updated_at?: string | null
        }
        Update: {
          breakout_success_rate?: number | null
          computed_at?: string | null
          faceoff_win_percentage?: number | null
          faceoffs_taken?: number | null
          faceoffs_won?: number | null
          game_id?: string
          goals?: number | null
          id?: string
          insights?: string[] | null
          power_play_goals?: number | null
          power_plays?: number | null
          recommended_drill_categories?: string[] | null
          shooting_percentage?: number | null
          shot_locations?: Json | null
          shot_quality_high?: number | null
          shot_quality_low?: number | null
          shot_quality_medium?: number | null
          shots_on_goal?: number | null
          successful_breakouts?: number | null
          total_breakouts?: number | null
          total_shots?: number | null
          turnover_locations?: Json | null
          turnovers?: number | null
          turnovers_defensive?: number | null
          turnovers_neutral?: number | null
          turnovers_offensive?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_analytics_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: true
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      game_events: {
        Row: {
          created_at: string | null
          details: Json
          event_timestamp: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          game_id: string
          game_time_seconds: number | null
          id: string
          notes: string | null
          period: number
          player_id: string | null
          situation: Database["public"]["Enums"]["game_situation"] | null
          tracked_by: string | null
          updated_at: string | null
          x_coord: number | null
          y_coord: number | null
          zone: Database["public"]["Enums"]["ice_zone"] | null
        }
        Insert: {
          created_at?: string | null
          details?: Json
          event_timestamp?: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          game_id: string
          game_time_seconds?: number | null
          id?: string
          notes?: string | null
          period: number
          player_id?: string | null
          situation?: Database["public"]["Enums"]["game_situation"] | null
          tracked_by?: string | null
          updated_at?: string | null
          x_coord?: number | null
          y_coord?: number | null
          zone?: Database["public"]["Enums"]["ice_zone"] | null
        }
        Update: {
          created_at?: string | null
          details?: Json
          event_timestamp?: string | null
          event_type?: Database["public"]["Enums"]["event_type"]
          game_id?: string
          game_time_seconds?: number | null
          id?: string
          notes?: string | null
          period?: number
          player_id?: string | null
          situation?: Database["public"]["Enums"]["game_situation"] | null
          tracked_by?: string | null
          updated_at?: string | null
          x_coord?: number | null
          y_coord?: number | null
          zone?: Database["public"]["Enums"]["ice_zone"] | null
        }
        Relationships: [
          {
            foreignKeyName: "game_events_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_events_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string | null
          final_score_them: number | null
          final_score_us: number | null
          game_date: string
          id: string
          is_home: boolean | null
          location: string | null
          locked: boolean | null
          locked_at: string | null
          locked_by: string | null
          notes: string | null
          opponent_name: string
          status: Database["public"]["Enums"]["game_status"] | null
          team_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          final_score_them?: number | null
          final_score_us?: number | null
          game_date: string
          id?: string
          is_home?: boolean | null
          location?: string | null
          locked?: boolean | null
          locked_at?: string | null
          locked_by?: string | null
          notes?: string | null
          opponent_name: string
          status?: Database["public"]["Enums"]["game_status"] | null
          team_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          final_score_them?: number | null
          final_score_us?: number | null
          game_date?: string
          id?: string
          is_home?: boolean | null
          location?: string | null
          locked?: boolean | null
          locked_at?: string | null
          locked_by?: string | null
          notes?: string | null
          opponent_name?: string
          status?: Database["public"]["Enums"]["game_status"] | null
          team_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams_with_age_display"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["org_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id: string
          role?: Database["public"]["Enums"]["org_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["org_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          settings: Json | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          settings?: Json | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          settings?: Json | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      players: {
        Row: {
          birthdate: string | null
          created_at: string | null
          first_name: string
          id: string
          jersey_number: number
          last_name: string
          metadata: Json | null
          position: Database["public"]["Enums"]["player_position"]
          team_id: string
          updated_at: string | null
        }
        Insert: {
          birthdate?: string | null
          created_at?: string | null
          first_name: string
          id?: string
          jersey_number: number
          last_name: string
          metadata?: Json | null
          position: Database["public"]["Enums"]["player_position"]
          team_id: string
          updated_at?: string | null
        }
        Update: {
          birthdate?: string | null
          created_at?: string | null
          first_name?: string
          id?: string
          jersey_number?: number
          last_name?: string
          metadata?: Json | null
          position?: Database["public"]["Enums"]["player_position"]
          team_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams_with_age_display"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["team_role"]
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["team_role"]
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["team_role"]
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams_with_age_display"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          age_years: number
          created_at: string | null
          id: string
          level: Database["public"]["Enums"]["team_level"]
          name: string
          organization_id: string
          region: string | null
          season: string
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          age_years: number
          created_at?: string | null
          id?: string
          level: Database["public"]["Enums"]["team_level"]
          name: string
          organization_id: string
          region?: string | null
          season: string
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          age_years?: number
          created_at?: string | null
          id?: string
          level?: Database["public"]["Enums"]["team_level"]
          name?: string
          organization_id?: string
          region?: string | null
          season?: string
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      teams_with_age_display: {
        Row: {
          age_group_display: string | null
          age_years: number | null
          created_at: string | null
          id: string | null
          level: Database["public"]["Enums"]["team_level"] | null
          name: string | null
          organization_id: string | null
          region: string | null
          season: string | null
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          age_group_display?: never
          age_years?: number | null
          created_at?: string | null
          id?: string | null
          level?: Database["public"]["Enums"]["team_level"] | null
          name?: string | null
          organization_id?: string | null
          region?: string | null
          season?: string | null
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          age_group_display?: never
          age_years?: number | null
          created_at?: string | null
          id?: string | null
          level?: Database["public"]["Enums"]["team_level"] | null
          name?: string | null
          organization_id?: string | null
          region?: string | null
          season?: string | null
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      format_age_group: {
        Args: { age_years: number; region: string }
        Returns: string
      }
    }
    Enums: {
      event_type:
        | "shot"
        | "breakout"
        | "turnover"
        | "zone_entry"
        | "faceoff"
        | "penalty"
      game_situation:
        | "even_strength"
        | "power_play"
        | "penalty_kill"
        | "empty_net"
      game_status: "scheduled" | "in_progress" | "completed" | "cancelled"
      ice_zone: "defensive" | "neutral" | "offensive"
      org_role: "owner" | "admin" | "coach" | "manager" | "stat_tracker"
      player_position: "forward" | "defense" | "goalie"
      shot_result:
        | "goal"
        | "save"
        | "miss_high"
        | "miss_wide"
        | "blocked"
        | "post"
      shot_type:
        | "wrist"
        | "slap"
        | "snap"
        | "backhand"
        | "deflection"
        | "one_timer"
      team_level: "house" | "travel" | "aaa" | "aa" | "a"
      team_role: "head_coach" | "assistant_coach" | "manager" | "stat_tracker"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      event_type: [
        "shot",
        "breakout",
        "turnover",
        "zone_entry",
        "faceoff",
        "penalty",
      ],
      game_situation: [
        "even_strength",
        "power_play",
        "penalty_kill",
        "empty_net",
      ],
      game_status: ["scheduled", "in_progress", "completed", "cancelled"],
      ice_zone: ["defensive", "neutral", "offensive"],
      org_role: ["owner", "admin", "coach", "manager", "stat_tracker"],
      player_position: ["forward", "defense", "goalie"],
      shot_result: [
        "goal",
        "save",
        "miss_high",
        "miss_wide",
        "blocked",
        "post",
      ],
      shot_type: [
        "wrist",
        "slap",
        "snap",
        "backhand",
        "deflection",
        "one_timer",
      ],
      team_level: ["house", "travel", "aaa", "aa", "a"],
      team_role: ["head_coach", "assistant_coach", "manager", "stat_tracker"],
    },
  },
} as const

