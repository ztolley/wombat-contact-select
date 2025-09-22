import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const outDir = fileURLToPath(new URL("../dist/types", import.meta.url));
const outFile = join(outDir, "index.d.ts");

const content = "import './web-components';\nexport * from './panels';\n";

await mkdir(outDir, { recursive: true });
await writeFile(outFile, content, "utf8");
