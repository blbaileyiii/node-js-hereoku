process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgres://qmylazbfcihiry:94a9154677e13ff9ec7923fffe8f6f4c72ec4ebc554da99b532f71e7d3a12ac4@ec2-34-196-34-158.compute-1.amazonaws.com:5432/d1ukbh7e46mhln?ssl=true',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;