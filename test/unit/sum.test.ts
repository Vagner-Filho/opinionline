const sum = (a: number, b: number) => {
  return a + b
}

test('my sum', () => {
  expect(sum(2, 3)).toEqual(5)
})