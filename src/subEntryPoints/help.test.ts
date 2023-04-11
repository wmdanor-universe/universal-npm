import { readFile } from "fs/promises";
import { resolve } from "path";
import run from "./help";

jest.mock("fs/promises", () => ({
  readFile: jest.fn(),
}));

const readFileMock = jest.mocked(readFile);

const originalConsoleLog = console.log;
console.log = jest.fn();

const consoleLogMock = jest.mocked(console.log);

describe("subEntryPoints/help", () => {
  afterEach(() => {
    readFileMock.mockReset();
    consoleLogMock.mockReset();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  it("should read help information and print it to console", async () => {
    const sampleHelpText = "Sample help information.";
    const helpFileLocation = resolve(__dirname, "..", "..", "generated", "help.txt");

    readFileMock.mockResolvedValueOnce(sampleHelpText);

    await run();

    expect(readFileMock).toHaveBeenCalledWith(helpFileLocation, "utf-8");
    expect(console.log).toHaveBeenCalledWith(sampleHelpText);
  });

  it("should throw an error if unable to read help information", async () => {
    readFileMock.mockRejectedValueOnce(new Error("File not found"));

    await expect(run()).rejects.toThrow("Unable to read help information");
  });
});
