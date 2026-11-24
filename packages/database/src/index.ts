import path from "node:path";
import fs from "node:fs";
import { PrismaClient } from "@prisma/client";

function getResolvedDatabaseUrl(): string {
  // If explicitly provided in environment, verify or return
  if (process.env.DATABASE_URL) {
    if (!process.env.DATABASE_URL.startsWith("file:")) {
      return process.env.DATABASE_URL;
    }
    const rawPath = process.env.DATABASE_URL.replace("file:", "");
    if (path.isAbsolute(rawPath) && fs.existsSync(rawPath)) {
      return process.env.DATABASE_URL;
    }
  }

  // Look for dev.db in known monorepo locations
  const candidates = [
    path.resolve(process.cwd(), "packages/database/prisma/dev.db"),
    path.resolve(process.cwd(), "../packages/database/prisma/dev.db"),
    path.resolve(process.cwd(), "../../packages/database/prisma/dev.db"),
    path.resolve(process.cwd(), "prisma/dev.db"),
    "/Users/apple/Desktop/f_s_2/packages/database/prisma/dev.db",
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return `file:${candidate}`;
    }
  }

  return process.env.DATABASE_URL || "file:./packages/database/prisma/dev.db";
}

declare global {
  var prisma: PrismaClient | undefined;
}

const resolvedUrl = getResolvedDatabaseUrl();
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = resolvedUrl;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export * from "@prisma/client";
