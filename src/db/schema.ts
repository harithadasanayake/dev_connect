import pg from "pg";
import { bigint, bigserial, integer, pgTableCreator, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";

const pool = new pg.Pool();
const db = drizzle(pool);

export const accountTypeEnum = ["email", "google", "github"] as const;

const pgTable = pgTableCreator((name) => `app_${name}`);

export const users = pgTable("user", {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    email: text("email").unique(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
});

export const accounts = pgTable("accounts", {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    userId: bigint("user_id", { mode: "number" })
        .references(() => users.id, { onDelete: "cascade" })
        .unique()
        .notNull(),
    accountType: text("account_type", { enum: accountTypeEnum }).notNull(),
    githubId: text("github_id").unique(),
    googleId: text("google_id").unique(),
    password: text("password"),
    salt: text("salt"),
});

export const magicLinks = pgTable("magic_links", {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    email: text("email").notNull().unique(),
    token: text("token"),
    tokenExpiresAt: timestamp("token_expires_at", { mode: "date" }).notNull(),
});

export const resetTokens = pgTable("reset_tokens", {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    userId: bigint("user_id", { mode: "number" })
        .references(() => users.id, { onDelete: "cascade" })
        .unique()
        .notNull(),
    token: text("token"),
    tokenExpiresAt: timestamp("token_expires_at", { mode: "date" }).notNull(),
});

export const verifyEmailTokens = pgTable("verify_email_tokens", {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    userId: bigint("user_id", { mode: "number" })
        .references(() => users.id, { onDelete: "cascade" })
        .unique()
        .notNull(),
    token: text("token"),
    tokenExpiresAt: timestamp("token_expires_at", { mode: "date" }).notNull(),
    });

export const profiles = pgTable("profile", {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    userId: bigint("user_id", { mode: "number" })
        .references(() => users.id, { onDelete: "cascade" })
        .unique()
        .notNull(),
    displayName: text("display_name"),
    imageId: text("image_id"),
    image: text("image"),
    bio: text("bio").notNull().default(""),
});
    
export const sessions = pgTable("session", {
    id: text("id").primaryKey(),
    userId: bigint("user_id", { mode: "number" })
        .references(() => users.id, {
        onDelete: "cascade",
        })
        .notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
});


export const room = pgTable("room", {
    id: uuid("id")
        .default(sql`gen_random_uuid()`)
        .notNull()
        .primaryKey(),
    userId: bigint("user_id", { mode: "number" })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    tags: text("tags").notNull(),
    githubRepo: text("githubRepo"),

});

export const reviews = pgTable('reviews', {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    roomId: uuid("room_id")
        .notNull()
        .references(() => room.id, { onDelete: "cascade" }),
    userId: bigint("user_id", { mode: "number" })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    rating: integer("rating"),
    review: text("review"),
    createdAt: timestamp("createdAt").defaultNow(),
});

    export type Room = typeof room.$inferSelect;
    export type User = typeof users.$inferSelect;
    export type Profile = typeof profiles.$inferSelect;
    export type Review = typeof reviews.$inferSelect;
