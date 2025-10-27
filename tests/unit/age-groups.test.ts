import { describe, it, expect } from 'vitest'
import { formatAgeGroup, parseAgeGroup, getAgeGroupOptions } from '@/lib/utils/age-groups'

describe('Age Group Utilities', () => {
  describe('formatAgeGroup', () => {
    it('should format USA age groups correctly', () => {
      expect(formatAgeGroup(9, 'usa')).toBe('8U')
      expect(formatAgeGroup(11, 'usa')).toBe('10U')
      expect(formatAgeGroup(13, 'usa')).toBe('12U')
      expect(formatAgeGroup(19, 'usa')).toBe('18U')
    })

    it('should format Canadian age groups correctly', () => {
      expect(formatAgeGroup(9, 'canada')).toBe('U9')
      expect(formatAgeGroup(10, 'canada')).toBe('U10')
      expect(formatAgeGroup(11, 'canada')).toBe('U11')
      expect(formatAgeGroup(18, 'canada')).toBe('U18')
    })

    it('should default to USA format', () => {
      expect(formatAgeGroup(9)).toBe('8U')
    })
  })

  describe('parseAgeGroup', () => {
    it('should parse USA format', () => {
      expect(parseAgeGroup('8U')).toBe(9)
      expect(parseAgeGroup('10U')).toBe(11)
      expect(parseAgeGroup('12U')).toBe(13)
    })

    it('should parse Canadian format', () => {
      expect(parseAgeGroup('U9')).toBe(9)
      expect(parseAgeGroup('U10')).toBe(10)
      expect(parseAgeGroup('U11')).toBe(11)
    })

    it('should throw on invalid format', () => {
      expect(() => parseAgeGroup('invalid')).toThrow('Invalid age group format')
    })
  })

  describe('getAgeGroupOptions', () => {
    it('should return USA age groups (2-year bands)', () => {
      const options = getAgeGroupOptions('usa')
      expect(options).toHaveLength(6)
      expect(options[0]).toEqual({ value: 9, label: '8U' })
      expect(options[1]).toEqual({ value: 11, label: '10U' })
      expect(options[5]).toEqual({ value: 19, label: '18U' })
    })

    it('should return Canadian age groups (every year)', () => {
      const options = getAgeGroupOptions('canada')
      expect(options.length).toBeGreaterThan(10)
      expect(options.find(o => o.label === 'U9')).toBeDefined()
      expect(options.find(o => o.label === 'U10')).toBeDefined()
      expect(options.find(o => o.label === 'U11')).toBeDefined()
    })
  })

  describe('USA and Canada equivalence', () => {
    it('should have equivalent age values', () => {
      // U9 (Canada) = 8U (USA) = age 9
      expect(parseAgeGroup('U9')).toBe(parseAgeGroup('8U'))
      expect(parseAgeGroup('U11')).toBe(parseAgeGroup('10U'))
      expect(parseAgeGroup('U13')).toBe(parseAgeGroup('12U'))
    })
  })
})
