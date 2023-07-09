class VariableService {
  private readonly rawData: string[][];
  private readonly modeNames: string[];

  constructor(rawData: string[][]) {
    this.rawData = rawData;
    this.modeNames = VariableService.getModeNamesFromFirstRow(rawData[0]);
  }

  public static isValidData(rawData: string[][] | null | undefined) {
    if (rawData === null || rawData === undefined) return false;
    if (rawData.length === 0) return false;
    return rawData[0].length !== 0;
}

  public getRawData(): string[][] {
    return this.rawData;
  }

  public getModeNames(): string[] {
    return this.modeNames;
  }

  // first row is mode names
  // Except for the first box, the name of the mode is until the blank comes out
  public static getModeNamesFromFirstRow(firstRow: string[]): string[] {
    const modeNames = firstRow.slice(1);
    const blankIndex = modeNames.findIndex((value) => value === "");

    if (blankIndex === -1) return modeNames;
    return modeNames.slice(0, blankIndex);
  }
}

export default VariableService;
