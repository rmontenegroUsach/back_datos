const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/myview', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM myview');
    res.send(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de servidor');
  }
});

module.exports = router;