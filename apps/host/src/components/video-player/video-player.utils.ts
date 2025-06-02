/**
 * Ads a trailing zero in front of a number if the value is below than 10
 *
 * @param value Number to be formatted
 * @returns formatted number with trailing zero
 */
const formatWithTrailingZero = (value: number): string => (value >= 0 && value < 10 ? `0${value}` : value.toString())

/**
 * Used to format video timelapse, takes a video time defined in seconds and converts it to a
 * formatted timelapse version of a string
 *
 * @param time Video time in seconds
 * @returns formatted video time
 */
export const formatVideoTime = (time: string | null) => {
  if (!time) return '0:00'

  const timeInSeconds: number = Number(time)

  const hours = timeInSeconds / 3600
  const minutes = (timeInSeconds / 60) % 60
  const seconds = timeInSeconds % 60

  const formattedHours: string = Math.floor(hours) > 0 ? `${Math.floor(hours)}:` : ''
  const formattedMinutes: string = formatWithTrailingZero(Math.floor(minutes))
  const formattedSeconds: string = formatWithTrailingZero(Math.floor(seconds))

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`
}
