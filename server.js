const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/User');
const Script = require('./models/script');
const Categoria = require('./models/Categoria');
const Reseña = require('./models/Reseña');
const Ticket = require('./models/Ticket');
const Descarga = require('./models/Descarga');
const cors = require('cors');


const app = express();  // Aquí se inicializa `app`


app.use(cors()); // Permitir peticiones de cualquier origen

module.exports = { Script, Categoria, Reseña, Ticket, Descarga };



// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/Underworld', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Conectado a MongoDB correctamente'))
.catch((err) => {
  console.error('Error detallado al conectar con MongoDB:', err);
  // Si hay error de conexión, detenemos el servidor
  process.exit(1); 
});
// Middleware para manejar datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// Middleware de sesiones
app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: false
}));

// Middleware de verificación de roles (definido ANTES de usarlo)
const checkRole = (roles) => {
    return async (req, res, next) => {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'No autenticado' });
        }
        try {
            const user = await User.findById(req.session.userId);
            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Acceso prohibido' });
            }
            req.user = user;
            next();
        } catch (err) {
            res.status(500).json({ message: 'Error del servidor' });
        }
    };
};

// Ruta para obtener todos los scripts
app.get('/api/scripts', async (req, res) => {
    try {
        // Buscar todos los scripts activos
        const scripts = await Script.find({ estado: 'activo' })
            .populate('categoria')
            .populate('autor', 'username');
        
        res.json(scripts);
    } catch (error) {
        console.error('Error al obtener scripts:', error);
        res.status(500).json({ error: 'Error al obtener los scripts' });
    }
});


// Ruta para obtener detalles del script (por ejemplo, /product-detail)
app.get('/product-detail', async (req, res) => {
    try {
        const productId = req.query.id;  // Obtener el ID de la URL
        const scriptId = mongoose.Types.ObjectId(productId);  // Convertirlo a ObjectId
        const scriptDetails = await Script.findById(scriptId);  // Buscar el script en la base de datos
        
        if (!scriptDetails) {
            return res.status(404).send("Producto no encontrado");
        }

        // Aquí puedes enviar la respuesta con los detalles del producto
        res.json(scriptDetails); // Enviar los detalles del script como respuesta
    } catch (error) {
        console.error('Error al obtener detalles del script:', error);
        res.status(500).send("Error al obtener los detalles del producto");
    }
});

// rutas corregidas
app.get('/admin-dashboard.html', checkRole(['administrador']), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});

app.get('/dashboard-support.html', checkRole(['soporte']), (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', 'dashboard-support.html'));
});

app.get('/client-dashboard.html', checkRole(['cliente']), (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', 'client-dashboard.html'));
});



// Servir archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas de registro
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

        req.session.userId = user._id;
        
        let redirectUrl;
        switch(user.role) {
            case 'administrador':
                redirectUrl = '/admin-dashboard.html';
                break;
            case 'soporte':
                redirectUrl = '/dashboard-support.html'; // Coincide con la ruta GET
                break;
            default:
                redirectUrl = '/client-dashboard.html'; // Coincide con la ruta GET
        }
        
        res.json({ 
            message: 'Login exitoso',
            redirectUrl, // Asegúrate de enviar esto
            user: { id: user._id, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// POST: Registro de usuario

app.post('/register', async (req, res) => {
  console.log('Petición de registro recibida:', req.body);
  const { username, email, password } = req.body;
  
  try {
      // Verificar si el usuario ya existe
      const userExists = await User.findOne({ $or: [{ username }, { email }] });
      if (userExists) {
          return res.status(400).json({ message: 'El nombre de usuario o el correo ya están en uso.' });
      }

      // Crear un nuevo usuario
      const user = new User({ username, email, password });

      // Cifrar la contraseña
      await user.hashPassword();

      // Guardar el usuario en la base de datos
      await user.save();

      // Responder con mensaje de éxito
      res.status(201).json({ message: 'Usuario registrado con éxito!' });
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Hubo un error al registrar al usuario.' });
  }
});


// Ruta de cierre de sesión
app.get('/logout', (req, res) => {
    console.log('Cerrando sesión...');
    
    // Destruir la sesión
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
            return res.status(500).json({ message: 'Error al cerrar sesión', success: false });
        }
        
        // Limpiar la cookie de sesión
        res.clearCookie('connect.sid'); // El nombre puede variar según la configuración de express-session
        
        console.log('Sesión cerrada exitosamente');
        return res.json({ message: 'Sesión cerrada correctamente', success: true });
    });
});

const stripe = require('stripe')('sk_test_tu_clave_secreta');

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, metadata } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a centavos
      currency: currency.toLowerCase(), // 'clp', 'usd', 'eur'
      payment_method_types: ['card'],
      metadata: { // Datos adicionales
        product_id: metadata.productId,
        user_email: metadata.email
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Ruta para obtener un script por ID
app.get('/api/detalle/:id', async (req, res) => {
    try {
        const script = await Script.findById(req.params.id).populate('categoria').populate('autor');
        if (!script) {
            return res.status(404).json({ error: "No encontrado" });
        }
        res.json(script);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en la consulta" });
    }
});


// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});