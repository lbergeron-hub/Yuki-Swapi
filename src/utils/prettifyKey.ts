export function prettifyKey(key: string) {
  const words = key.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  return words.join(' ')
}
