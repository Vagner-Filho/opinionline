export default function transformRawArticle(raw) {
  const data = raw;
  const keys = Object.keys(raw);
  let refined = Object.values(data);
  for (const k in keys) {
    Object.defineProperty(refined[k], 'id', {
      value: keys[k],
      writable: false,
    })
  }
  return refined
}