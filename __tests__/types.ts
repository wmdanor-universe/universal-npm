import { PackageManager } from "../src/enums";

export interface TestCaseOutcome__Success {
  expectedGeneratedCommand: string | RegExp | ((value: string) => boolean);
}

export interface TestCaseOutcome__Fail {
  expectedErrorOutput: string | RegExp | ((value: string) => boolean);
}

export type TestCaseOutcome = TestCaseOutcome__Success | TestCaseOutcome__Fail;

export interface TestCase {
  input: string | string[];
  expected: Record<PackageManager, TestCaseOutcome>;
}

export interface CommandTestSuite {
  commandName: string;
  testCases: TestCase[];
}
