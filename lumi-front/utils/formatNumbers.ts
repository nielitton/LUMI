export const formatNumber = (value: string): number => {
  const dotValue = value.replace(',', '.')

  const cleanedValue = dotValue.replace(/\.(?=.*\.)/g, '')

  const formattedValue = parseFloat(cleanedValue).toFixed(2)

  return parseFloat(formattedValue)
}
