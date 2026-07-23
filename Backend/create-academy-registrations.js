const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

async function main() {
  console.log('Connecting to PostgreSQL database...');
  await client.connect();
  console.log('Connected successfully!');

  const sql = `
    CREATE TABLE IF NOT EXISTS academy_registrations (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      gender VARCHAR(50) NOT NULL,
      country VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      city VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      mobile_number VARCHAR(50) NOT NULL,
      applicant_type VARCHAR(50) NOT NULL,
      
      -- Student profile fields
      college VARCHAR(255),
      program_name VARCHAR(255),
      academic_year VARCHAR(100),
      department VARCHAR(255),
      
      -- Professional profile fields
      company_name VARCHAR(255),
      job_title VARCHAR(255),
      industry VARCHAR(255),
      years_of_experience VARCHAR(100),
      
      -- Shared / metadata fields
      highest_education VARCHAR(255) NOT NULL,
      referred_by VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log('Creating table academy_registrations if it does not exist...');
  await client.query(sql);
  console.log('Table academy_registrations is ready in PostgreSQL!');

  // List columns to confirm schema
  const resColumns = await client.query(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'academy_registrations'
    ORDER BY ordinal_position;
  `);
  console.log('\n=== Columns in academy_registrations ===');
  console.table(resColumns.rows);

  await client.end();
}

main().catch(err => {
  console.error('Failed to create table:', err);
  process.exit(1);
});
