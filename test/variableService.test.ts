import VariableService from "../src/service/variableService";

describe("VariableService", () => {
  test("getModesFromData - only mode names", () => {
    const firstRaw = ["", "mode1", "mode2", "mode3"];
    const modes = VariableService.getModeNamesFromFirstRow(firstRaw);

    expect(modes).toEqual(["mode1", "mode2", "mode3"]);
  });

  test("getModesFromData - mode names with first cell", () => {
    const firstRaw = ["first cell", "mode1", "mode2", "mode3"];
    const modes = VariableService.getModeNamesFromFirstRow(firstRaw);

    expect(modes).toEqual(["mode1", "mode2", "mode3"]);
  });

  test("getModesFromData - mode names with blank cell", () => {
    const firstRaw = ["first cell", "mode1", "mode2", "mode3", "", "", "mode4"];
    const modes = VariableService.getModeNamesFromFirstRow(firstRaw);

    expect(modes).toEqual(["mode1", "mode2", "mode3"]);
  });
});
