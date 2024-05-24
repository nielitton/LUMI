export const formatNumber = (value: string): number => {
  const cleanedValue = Number(value.replace('-', '').replace(',', '.')).toFixed(
    2,
  )
  return Number(cleanedValue)
}
