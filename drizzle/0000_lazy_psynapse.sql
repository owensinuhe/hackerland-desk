CREATE TABLE "departments" (
	"code" char(2) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "municipalities" (
	"code" char(4) PRIMARY KEY NOT NULL,
	"department_code" char(2) NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "municipalities" ADD CONSTRAINT "municipalities_department_code_departments_code_fk" FOREIGN KEY ("department_code") REFERENCES "public"."departments"("code") ON DELETE no action ON UPDATE no action;