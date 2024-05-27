const monthNames = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
]

export const getMonthNumber = (monthName: string) => {
  const index = monthNames.findIndex(
    (month) => month === monthName.toLowerCase(),
  )
  return index !== -1 ? index + 1 : 0
}
