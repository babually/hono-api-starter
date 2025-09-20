import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const tasks = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  done: boolean().notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const selectTasksSchema = z.object({
  id: z.number(),
  name: z.string(),
  done: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertTasksSchema = z.object({
  name: z.string(),
  done: z.boolean().optional(),
});

export const patchTasksSchema = insertTasksSchema.partial();

// export const patchTasksSchema = z.object({
//   name: z.string().optional(),
//   done: z.boolean().optional(),
// }).strict();
