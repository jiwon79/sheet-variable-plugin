import { getModesFromData } from "../src/plugin/plugin";

test('test', () => {
  const data = [["a", "b", "c"], ["a", "b", "c"]];
  const modes = getModesFromData(data);
  console.log(modes);
  expect(1 + 1).toBe(2)
})
