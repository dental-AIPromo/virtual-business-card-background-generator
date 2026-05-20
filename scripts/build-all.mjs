import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const tscCliPath = resolve(projectRoot, "node_modules", "typescript", "bin", "tsc");

function runTscBuild() {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(process.execPath, [tscCliPath, "-b"], {
      cwd: projectRoot,
      stdio: "inherit"
    });

    child.on("error", rejectPromise);
    child.on("exit", (code) => {
      if (code === 0) {
        resolvePromise(undefined);
        return;
      }

      rejectPromise(new Error(`TypeScript build failed with exit code ${code ?? "unknown"}`));
    });
  });
}

try {
  await runTscBuild();
  await import("./build.mjs");
} catch (error) {
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exitCode = 1;
}
