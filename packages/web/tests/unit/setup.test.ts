import { describe, it, expect } from 'vitest'

describe('Project Setup', () => {
  it('should have testing infrastructure working', () => {
    expect(true).toBe(true)
  })

  it('should have TypeScript configured', () => {
    const testValue: string = 'TypeScript is working'
    expect(testValue).toBeTypeOf('string')
  })
})
