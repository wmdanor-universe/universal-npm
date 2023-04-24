import { readFile } from "fs/promises";
import { resolve } from "path";
import run from "./version";
import { printText } from "../io/printText";

jest.mock("fs/promises", () => ({
  readFile: jest.fn(),
}));

jest.mock('../io/printText');

const readFileMock = jest.mocked(readFile);
const printTextMock = jest.mocked(printText);

describe("subEntryPoints/version", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should read version information and print it to console", async () => {
    const sampleVersionText = "1.0.0";
    const versionFileLocation = resolve(__dirname, "..", "..", "generated", "version.txt");

    readFileMock.mockResolvedValueOnce(sampleVersionText);

    await run();

    expect(readFileMock).toHaveBeenCalledWith(versionFileLocation, "utf-8");
    expect(printTextMock).toHaveBeenCalledWith(sampleVersionText);
  });

  it("should throw an error if unable to read version information", async () => {
    readFileMock.mockRejectedValueOnce(new Error("File not found"));

    await expect(run()).rejects.toThrow("Unable to read version information");
  });
});
