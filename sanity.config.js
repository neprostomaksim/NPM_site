import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { schema } from "./sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "replace-with-your-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Максим Леонов — Панель управления блогом",

  projectId,
  dataset,
  basePath: "/admin",

  plugins: [structureTool(), codeInput()],

  schema: {
    types: schema.types,
  },
});
