const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// URL del CSV publicado de tu Google Sheet
const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTKp_muxLpXUvj_wzwu1kVcrnz9gKhNITIIfFRZ_utyY4TMSatQSr2PSca8DzeY-Hm0zVzIwt7wsNSr/pub?output=csv&gid=339105142';

app.get('/', async (req, res) => {
  try {
    // Solicita el CSV desde el enlace público
    const response = await axios.get(sheetCsvUrl);
    const csvData = response.data;

    // Convierte el CSV a JSON
    const rows = csvData.split('\n').map(row => row.split(','));
    const responseData = rows.slice(1).map(row => ({
      claseId: row[0]?.trim() || null,
      fechaHora: row[1]?.trim() || null,
      tipoClase: row[2]?.trim() || null,
      monitor: row[3]?.trim() || null,
      nivel: row[4]?.trim() || null,
      surfSpot: row[5]?.trim() || null,
      puntoEncuentro: row[6]?.trim() || null,
      estado: row[7]?.trim() || null,
    }));

    // Envía los datos como respuesta en formato JSON
    res.json(responseData);
  } catch (error) {
    console.error('Error al obtener los datos:', error.message);
    res.status(500).json({ error: 'Error al obtener los datos de Google Sheets' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
