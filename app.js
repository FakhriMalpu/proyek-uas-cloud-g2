const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const session = require('express-session');
const winston = require('winston');

const app = express();
const port = 3000;

// --- Konfigurasi Logging  ---
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// --- Konfigurasi Middleware ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'rahasia-banget-buat-uas',
    resave: false,
    saveUninitialized: true,
}));

// --- Konfigurasi Multer untuk Upload Gambar ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
    }
});
const upload = multer({ storage: storage });

// Middleware untuk cek apakah user sudah login
const requireLogin = (req, res, next) => {
    if (req.session.loggedin) {
        next();
    } else {
        res.redirect('/login');
    }
};

// --- Halaman & Rute (Routes) ---

// a. Landing Page (Read)
app.get('/', (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) {
            logger.error('Gagal membaca direktori uploads:', err);
            return res.status(500).send('Tidak bisa memuat gambar.');
        }
        logger.info('Landing page diakses');
        res.render('index', { images: files, loggedin: req.session.loggedin });
    });
});

// b. Halaman Login
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Login sederhana, di dunia nyata gunakan database!
    if (username === 'admin' && password === 'admin123') {
        req.session.loggedin = true;
        logger.info(`User '${username}' berhasil login.`);
        res.redirect('/');
    } else {
        logger.warn(`Percobaan login gagal untuk username: '${username}'`);
        res.render('login', { error: 'Username atau password salah!' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    logger.info('User logged out.');
    res.redirect('/');
});

// c. CRUD Gambar
// Create
app.post('/upload', requireLogin, upload.single('gambar'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Tidak ada file yang diupload.');
    }
    logger.info(`Gambar baru diupload: ${req.file.filename}`);
    res.redirect('/');
});

// Delete
app.post('/delete/:filename', requireLogin, (req, res) => {
    const filename = req.params.filename;
    fs.unlink(path.join(__dirname, 'uploads', filename), (err) => {
        if (err) {
            logger.error(`Gagal menghapus file ${filename}:`, err);
            return res.status(500).send('Gagal menghapus file.');
        }
        logger.info(`File ${filename} berhasil dihapus.`);
        res.redirect('/');
    });
});


// --- Menjalankan Server ---
app.listen(port, () => {
    logger.info(`Server berjalan di http://localhost:${port}`);
});