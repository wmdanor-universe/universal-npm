import { readFile } from "fs/promises";
import { resolve } from "path";
import run from "./version";

jest.mock("fs/promises", () => ({
  readFile: jest.fn(),
}));

const readFileMock = jest.mocked(readFile);

const originalConsoleLog = console.log;
console.log = jest.fn();

const consoleLogMock = jest.mocked(console.log);

describe("subEntryPoints/version", () => {
  afterEach(() => {
    readFileMock.mockReset();
    consoleLogMock.mockReset();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  it("should read version information and print it to console", async () => {
    const sampleVersionText = "1.0.0";
    const versionFileLocation = resolve(__dirname, "..", "..", "generated", "version.txt");

    readFileMock.mockResolvedValueOnce(sampleVersionText);

    await run();

    expect(readFileMock).toHaveBeenCalledWith(versionFileLocation, "utf-8");
    expect(console.log).toHaveBeenCalledWith(sampleVersionText);
  });

  it("should throw an error if unable to read version information", async () => {
    readFileMock.mockRejectedValueOnce(new Error("File not found"));

    await expect(run()).rejects.toThrow("Unable to read version information");
  });
});
