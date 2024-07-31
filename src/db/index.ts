import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

declare global {
  // eslint-disable-next-line no-var -- only var works here
    var db: PostgresJsDatabase<typeof schema> | undefined;
}
let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
    db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
} else {
    if (!global.db) {
    global.db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
    }

    db = global.db;
}

export { db };






// import { drizzle } from 'drizzle-orm/postgres-js';
// import * as schema from './schema';
// //import { migrate } from 'drizzle-orm/postgres-js/migrator';
// import postgres from 'postgres';

// // for migrations
// //const migrationClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db", { max: 1 });
// //migrate(drizzle(migrationClient), ...)

// // for query purposes
// const queryClient = postgres(process.env.DATABASE_URL!);
// const db = drizzle(queryClient, {schema});

// export {db};


