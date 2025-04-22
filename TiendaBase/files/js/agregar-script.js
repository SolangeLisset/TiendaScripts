// Ruta para insertar un nuevo script automáticamente
app.post('/api/agregar-script', async (req, res) => {
    try {
        const nuevoScript = new Script({
            titulo: "Nuevo Script Automático",
            descripcion: "Descripción automática",
            precio: 50,
            categoria: "Categoría de ejemplo",
            autor: "Autor de prueba",
            imagenUrl: "url_de_imagen",
            archivoUrl: "url_del_archivo",
            stock: 100,
            estado: "disponible",
            fechaPublicacion: new Date()
        });

        await nuevoScript.save();
        res.status(201).json({ message: "Script agregado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al agregar el script" });
    }
});
