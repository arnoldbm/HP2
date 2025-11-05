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
 */

export type Region = 'usa' | 'canada'

/**
 * Format age for display based on region
 * @param ageYears - Age stored in database (e.g., 9, 11, 13)
 * @param region - 'usa' or 'canada'
 * @returns Formatted string (e.g., "8U" or "U9")
 */
export function formatAgeGroup(ageYears: number, region: Region = 'usa'): string {
  if (region === 'usa') {
    // USA format: 8U (even numbers)
    // age_years=9 -> 8U, age_years=11 -> 10U
    return `${ageYears - 1}U`
  } else {
    // Canada format: U9, U10, U11, etc.
    return `U${ageYears}`
  }
}

/**
 * Parse age group string back to integer
 * @param ageGroup - Formatted string (e.g., "8U" or "U9")
 * @returns Age in years (e.g., 9)
 */
export function parseAgeGroup(ageGroup: string): number {
  // Handle both formats: "8U" and "U9"
  const match = ageGroup.match(/(\d+)U|U(\d+)/)
  if (!match) throw new Error(`Invalid age group format: ${ageGroup}`)

  const usaFormat = match[1] // "8U" -> "8"
  const canadaFormat = match[2] // "U9" -> "9"

  if (usaFormat) {
    // USA format: 8U means 9 years (8 and under)
    return parseInt(usaFormat) + 1
  } else {
    // Canada format: U9 means 9 years
    return parseInt(canadaFormat)
  }
}

/**
 * Get all available age groups for a region
 */
export function getAgeGroupOptions(region: Region = 'usa'): Array<{ value: number; label: string }> {
  const ages = region === 'usa'
    ? [8, 10, 12, 14, 16, 18] // USA: even numbers only
    : [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] // Canada: every year

  return ages.map(age => {
    const ageYears = region === 'usa' ? age + 1 : age
    return {
      value: ageYears,
      label: formatAgeGroup(ageYears, region)
    }
  })
}

// Examples:
// formatAgeGroup(9, 'usa') => "8U"
// formatAgeGroup(9, 'canada') => "U9"
// parseAgeGroup("8U") => 9
// parseAgeGroup("U9") => 9
// getAgeGroupOptions('usa') => [{value: 9, label: "8U"}, {value: 11, label: "10U"}, ...]
// getAgeGroupOptions('canada') => [{value: 9, label: "U9"}, {value: 10, label: "U10"}, ...]
