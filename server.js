const express = require('express'); // Usaremos express para crear un servidor
const app = express();
const port = 3000; // Puerto para la aplicación local

app.get('/', (req, res) => {
  try {
    // Aquí iría la conexión a Google Sheets (usando una librería adecuada para Node.js)
    // Por ejemplo, usando `googleapis` o alguna librería similar

    // Simulamos los datos de la hoja "Clases"
    const data = [
      ["ID", "Fecha", "Tipo", "Monitor", "Nivel", "Surf Spot", "Punto de Encuentro", "Estado"],
      [1, "2024-11-21 10:00", "Iniciación", "Nacho", "Principiante", "Barceloneta", "Playa", "Confirmada"],
      [2, "2024-11-22 11:00", "Avanzado", "Laura", "Avanzado", "Ocata", "Bar", "Pendiente"]
    ];

    const responseData = data.slice(1).map(row => ({
      claseId: row[0],
      fechaHora: row[1],
      tipoClase: row[2],
      monitor: row[3],
      nivel: row[4],
      surfSpot: row[5],
      puntoEncuentro: row[6],
      estado: row[7]
    }));

    // Responder con los datos en formato JSON
    res.json(responseData);

  } catch (err) {
    // Manejo de errores
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
