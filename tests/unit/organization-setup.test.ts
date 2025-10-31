import { describe, it, expect } from 'vitest'
import {
  generateOrgSlug,
  generateOrgName,
  generateUniqueSlug,
} from '@/lib/utils/organization-setup'

describe('Organization Setup Utilities', () => {
  describe('generateOrgSlug', () => {
    it('should generate slug from user name', () => {
      expect(generateOrgSlug('John Smith')).toBe('john-smith')
    })

    it('should handle special characters', () => {
      expect(generateOrgSlug("O'Connor's Team")).toBe('oconnors-team')
    })

    it('should handle multiple spaces', () => {
      expect(generateOrgSlug('John   Michael   Smith')).toBe('john-michael-smith')
    })

    it('should handle leading/trailing spaces', () => {
      expect(generateOrgSlug('  John Smith  ')).toBe('john-smith')
    })

    it('should handle numbers', () => {
      expect(generateOrgSlug('Team 123')).toBe('team-123')
    })

    it('should handle mixed case', () => {
      expect(generateOrgSlug('THUNDER Hockey Club')).toBe('thunder-hockey-club')
    })

    it('should handle empty string', () => {
      expect(generateOrgSlug('')).toBe('')
    })

    it('should remove non-alphanumeric characters', () => {
      expect(generateOrgSlug('Team@#$%Name!')).toBe('teamname')
    })
  })

  describe('generateOrgName', () => {
    it('should generate org name from full name', () => {
      expect(generateOrgName('John Smith')).toBe("John Smith's Teams")
    })

    it('should handle single name', () => {
      expect(generateOrgName('John')).toBe("John's Teams")
    })

    it('should handle empty name', () => {
      expect(generateOrgName('')).toBe('My Teams')
    })

    it('should trim whitespace', () => {
      expect(generateOrgName('  John Smith  ')).toBe("John Smith's Teams")
    })
  })

  describe('generateUniqueSlug', () => {
    it('should return original slug if no conflicts', () => {
      expect(generateUniqueSlug('john-smith', [])).toBe('john-smith')
    })

    it('should append -2 for first conflict', () => {
      expect(generateUniqueSlug('john-smith', ['john-smith'])).toBe('john-smith-2')
    })

    it('should append -3 for second conflict', () => {
      expect(generateUniqueSlug('john-smith', ['john-smith', 'john-smith-2'])).toBe(
        'john-smith-3'
      )
    })

    it('should find next available number', () => {
      expect(
        generateUniqueSlug('john-smith', [
          'john-smith',
          'john-smith-2',
          'john-smith-3',
          'john-smith-5',
        ])
      ).toBe('john-smith-4')
    })

    it('should handle empty existing slugs', () => {
      expect(generateUniqueSlug('john-smith', [])).toBe('john-smith')
    })
  })
})
