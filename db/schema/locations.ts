import { pgTable, char, varchar } from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
  code: char("code", { length: 2 }).primaryKey(),        // "05"
  name: varchar("name", { length: 100 }).notNull(),      // "Cortés"
});

export const municipalities = pgTable("municipalities", {
  code: char("code", { length: 4 }).primaryKey(),        // "0501"
  departmentCode: char("department_code", { length: 2 })
    .notNull()
    .references(() => departments.code),                 // FK → departments
  name: varchar("name", { length: 100 }).notNull(),      // "San Pedro Sula"
});