import { generateCommand, CommandMeta } from "./generateCommand";
import { PackageManager } from "../enums";

describe("utils/generateCommand", () => {
  const baseMeta: CommandMeta = {
    packageManager: PackageManager.NPM,
    positionals: [],
    options: [],
  };

  it("should generate command with package manager only", () => {
    const result = generateCommand(baseMeta);
    expect(result).toBe("npm");
  });

  it("should generate command with positionals", () => {
    const meta: CommandMeta = {
      ...baseMeta,
      positionals: [
        { order: 1, value: "install" },
        { order: 2, value: ["react", "react-dom"] },
        { order: 3, value: [] },
        { order: 4, value: undefined },
      ],
    };

    const result = generateCommand(meta);
    expect(result).toBe("npm install react react-dom");
  });

  it("should generate command with options", () => {
    const meta: CommandMeta = {
      ...baseMeta,
      options: [
        { name: "--global", value: true },
        { name: "--prefix", value: "/custom/path" },
      ],
    };

    const result = generateCommand(meta);
    expect(result).toBe("npm --global --prefix=/custom/path");
  });

  it("should generate command with positionals and options", () => {
    const meta: CommandMeta = {
      ...baseMeta,
      positionals: [{ order: 1, value: "install" }],
      options: [
        { name: "--global", value: true },
        { name: "--prefix", value: "/custom/path" },
      ],
    };

    const result = generateCommand(meta);
    expect(result).toBe("npm install --global --prefix=/custom/path");
  });

  it("should ignore positionals with false condition", () => {
    const meta: CommandMeta = {
      ...baseMeta,
      positionals: [
        { order: 1, value: "install" },
        { order: 2, value: "react", condition: false },
      ],
    };

    const result = generateCommand(meta);
    expect(result).toBe("npm install");
  });

  it("should ignore undefined options", () => {
    const meta: CommandMeta = {
      ...baseMeta,
      options: [
        { name: "--global", value: undefined },
        { name: "--prefix", value: "/custom/path" },
      ],
    };

    const result = generateCommand(meta);
    expect(result).toBe("npm --prefix=/custom/path");
  });

  it("should ignore null options", () => {
    const meta: CommandMeta = {
      ...baseMeta,
      options: [
        { name: "--global", value: null },
        { name: "--prefix", value: "/custom/path" },
      ],
    };

    const result = generateCommand(meta);
    expect(result).toBe("npm --prefix=/custom/path");
  });

  it("should handle different package managers", () => {
    const meta: CommandMeta = {
      ...baseMeta,
      packageManager: PackageManager.YARN,
      positionals: [{ order: 1, value: "add" }],
      options: [{ name: "--global", value: true }],
    };

    const result = generateCommand(meta);
    expect(result).toBe("yarn add --global");
  });
});
