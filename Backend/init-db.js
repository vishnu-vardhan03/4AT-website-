const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

async function main() {
  console.log('Connecting to PostgreSQL database...');
  await client.connect();
  console.log('Connected successfully!');

  const tables = [
    {
      name: 'academy_leads',
      sql: `
        CREATE TABLE IF NOT EXISTS academy_leads (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(255),
          company VARCHAR(255),
          email VARCHAR(255),
          phone VARCHAR(255),
          message TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `
    },
    {
      name: 'consulting_leads',
      sql: `
        CREATE TABLE IF NOT EXISTS consulting_leads (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(255),
          company VARCHAR(255),
          email VARCHAR(255),
          phone VARCHAR(255),
          message TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `
    },
    {
      name: 'ai_leads',
      sql: `
        CREATE TABLE IF NOT EXISTS ai_leads (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(255),
          company VARCHAR(255),
          email VARCHAR(255),
          phone VARCHAR(255),
          message TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `
    }
  ];

  for (const table of tables) {
    console.log(`Creating table ${table.name} if it doesn't exist...`);
    await client.query(table.sql);
    console.log(`Table ${table.name} is ready.`);
  }

  await client.end();
  console.log('Database initialization completed successfully!');
}

main().catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
