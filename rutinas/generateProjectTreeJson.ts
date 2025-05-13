import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

const archivosIgnorados: string[] = [
  './package.json',
  './package-lock.json',
  './tsconfig.rutinas.json',
  './README.md',
  './LICENSE',
  './.gitignore',
  './tsconfig.json'
];


const carpetasIgnoradas = [
  'build',
  'node_modules',
  'src_bkp',
  'public/build',
  'public/dev',
  '.git',
  'estructura-proyectos',
  'vendor',
  'rutinas',
];

const comentariosExtra: { [nombre: string]: string } = {
  'node_modules': 'librerias no necesarias de documentar',
  'public/dev': 'pruebas ignorar',
  'src/ts/vistas/cubo_costeo/fake': 'clases TS fake para gulp',
  'public/includes/ajax/vistas/memoria.ajax.php': 'webservices ajax',
  'public/build': 'JS y CSS compilado desde src',
  'assets': 'Recursos estáticos',
  'tests': 'Pruebas automáticas'
};

const carpetaSalida = path.resolve(__dirname, '../estructura-proyectos');
const rutaBase = path.resolve(__dirname, '../');
const nombreProyecto = path.basename(rutaBase);

if (!fs.existsSync(carpetaSalida)) {
  fs.mkdirSync(carpetaSalida);
}

interface NodoArbol {
  nombre: string;
  comentario?: string;
  bloqueado?: boolean;
  directorio: string;
  firma?: string;
  LINEAS?: number;
  hijos?: NodoArbol[];
}

function calcularCRC32(buffer: Buffer): string {
  return zlib.crc32(buffer).toString(16);
}

function estaBloqueado(ruta: string): boolean {
  const rutaNormalizada = ruta.startsWith(nombreProyecto + '/') ? ruta.slice(nombreProyecto.length + 1) : ruta;

  // ✨ Si coincide con un archivo ignorado directamente
  const rutaRelativaConPunto = './' + rutaNormalizada;
  if (archivosIgnorados.includes(rutaRelativaConPunto)) {
    return true;
  }

  const bloqueado = carpetasIgnoradas.some(ignorada => {
    return rutaNormalizada === ignorada || rutaNormalizada.startsWith(ignorada + '/') || rutaNormalizada.startsWith(ignorada + path.posix.sep);
  });

  if (!bloqueado && rutaNormalizada.includes('node_modules')) {
    console.log('[DEBUG] No se bloqueó ruta esperada:', rutaNormalizada);
  }

  return bloqueado;
}


function generarArbolJson(dir: string, rutaRelativa = ''): NodoArbol | null {
  const nombre = path.basename(dir);
  const rutaRelativaNormalizada = path.posix.join(rutaRelativa, nombre);
  const rutaCompleta = path.join(dir);

  const stat = fs.statSync(rutaCompleta);
  const esDirectorio = stat.isDirectory();

  if (estaBloqueado(rutaRelativaNormalizada)) {
    // Si está bloqueado, devolver un nodo vacío con la propiedad bloqueado: true
    return {
      nombre,
      directorio: rutaRelativaNormalizada,
      bloqueado: true,
      hijos: []
    };
  }

  const comentario = comentariosExtra[rutaRelativaNormalizada];
  const nodo: NodoArbol = {
    nombre,
    directorio: rutaRelativaNormalizada,
    ...(comentario && { comentario })
  };

  if (!esDirectorio) {
    const ext = path.extname(nombre).toLowerCase();
    if ([".ts", ".tsx", ".scss", ".css", ".msj", ".json", ".php"].includes(ext)) {
      try {
        const contenido = fs.readFileSync(rutaCompleta);
        nodo.firma = calcularCRC32(contenido);
        nodo.LINEAS = contenido.toString().split('\n').length;
      } catch (error) {
        console.warn(`No se pudo calcular la firma de ${rutaCompleta}:`, error);
      }
    }
    return nodo;
  }

  let hijos: string[];
  try {
    hijos = fs.readdirSync(dir).filter(f => !f.startsWith('.')).sort();
  } catch {
    return nodo;
  }

  const carpetas = hijos.filter(h => fs.statSync(path.join(dir, h)).isDirectory());
  const archivos = hijos.filter(h => !fs.statSync(path.join(dir, h)).isDirectory());

  const nodosHijos = [...carpetas, ...archivos]
    .map(h => generarArbolJson(path.join(dir, h), rutaRelativaNormalizada))
    .filter((n): n is NodoArbol => n !== null);

  if (nodosHijos.length > 0) {
    nodo.hijos = nodosHijos;
  }

  return nodo;
}

const arbol = generarArbolJson(rutaBase);

if (arbol) {
  const ahora = new Date();
  const fechaStamp = ahora.toISOString().replace(/T/, '-').replace(/:/g, '-').replace(/\..+/, '');
  const nombreArchivo = `${nombreProyecto}_${fechaStamp}.json`;

  fs.writeFileSync(
    path.join(carpetaSalida, nombreArchivo),
    JSON.stringify(arbol, null, 2),
    'utf-8'
  );
}