export default () => {
  const today = new Date()
  const year = `${today.getFullYear()}`
  let month = `${today.getMonth() + 1}`
  let day = `${today.getDate()}`
  month = month.length < 2 ? `0${month}` : month
  day = day.length < 2 ? `0${day}` : day

  return `${year}-${month}-${day}`
}
