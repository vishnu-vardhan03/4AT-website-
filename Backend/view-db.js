const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

async function main() {
  console.log('Connecting to database...');
  await client.connect();
  console.log('Connected successfully!\n');

  // Query table list
  console.log('=== Tables in Database ===');
  const resTables = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `);
  resTables.rows.forEach(r => console.log(`- ${r.table_name}`));
  console.log('');

  // Query columns in academy_leads
  console.log('=== Schema of academy_leads ===');
  const resColumnsLeads = await client.query(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'academy_leads'
    ORDER BY ordinal_position;
  `);
  console.table(resColumnsLeads.rows);
  console.log('');

  // Query columns in academy_registrations
  console.log('=== Schema of academy_registrations ===');
  const resColumnsRegs = await client.query(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'academy_registrations'
    ORDER BY ordinal_position;
  `);
  console.table(resColumnsRegs.rows);
  console.log('');

  // Query rows in academy_leads
  console.log('=== Current Rows in academy_leads ===');
  const resRowsLeads = await client.query(`SELECT * FROM academy_leads ORDER BY id DESC LIMIT 5;`);
  if (resRowsLeads.rows.length === 0) {
    console.log('(No registrations in academy_leads yet)');
  } else {
    console.table(resRowsLeads.rows);
  }
  console.log('');

  // Query rows in academy_registrations
  console.log('=== Current Rows in academy_registrations ===');
  const resRowsRegs = await client.query(`SELECT * FROM academy_registrations ORDER BY id DESC LIMIT 5;`);
  if (resRowsRegs.rows.length === 0) {
    console.log('(No registrations in academy_registrations yet)');
  } else {
    console.table(resRowsRegs.rows);
  }

  await client.end();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
