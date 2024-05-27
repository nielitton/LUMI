import { getMonthNumber } from '../utils/monthNumber'
import { formatNumber } from '../utils/formatNumbers'
import '@testing-library/jest-dom'

describe('<Link>', () => {
  it('should format positive numbers with two decimal places correctly', () => {
    const result = formatNumber('1234.567')
    expect(result).toBe(1234.57)
  })

  it('should format negative numbers with two decimal places correctly', () => {
    const result = formatNumber('-1234.567')
    expect(result).toBe(-1234.57)
  })

  it('should format numbers with comma as decimal separator correctly', () => {
    const result = formatNumber('1234,567')
    expect(result).toBe(1234.57)
  })

  it('should format numbers with comma as thousand separator correctly', () => {
    const result = formatNumber('1,234.567')
    expect(result).toBe(1234.57)
  })

  it('should return NaN for invalid input', () => {
    const result = formatNumber('invalidInput')
    expect(result).toBe(NaN)
  })

  it('should return the correct month number for valid month names', () => {
    expect(getMonthNumber('jan')).toBe(1)
    expect(getMonthNumber('fev')).toBe(2)
    expect(getMonthNumber('mar')).toBe(3)
    expect(getMonthNumber('abr')).toBe(4)
    expect(getMonthNumber('mai')).toBe(5)
    expect(getMonthNumber('jun')).toBe(6)
    expect(getMonthNumber('jul')).toBe(7)
    expect(getMonthNumber('ago')).toBe(8)
    expect(getMonthNumber('set')).toBe(9)
    expect(getMonthNumber('out')).toBe(10)
    expect(getMonthNumber('nov')).toBe(11)
    expect(getMonthNumber('dez')).toBe(12)
  })

  it('should return 0 for invalid month names', () => {
    expect(getMonthNumber('invalid')).toBe(0)
  })

  it('should be case-insensitive', () => {
    expect(getMonthNumber('Jan')).toBe(1)
    expect(getMonthNumber('JaN')).toBe(1)
    expect(getMonthNumber('JAN')).toBe(1)
  })
})
