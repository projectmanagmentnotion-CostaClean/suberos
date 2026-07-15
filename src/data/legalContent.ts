import { homeAnchors, legalPaths } from '../app/routes'
import { companyProfile } from './companyProfile'

export type LegalSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export type LegalDocumentContent = {
  title: string
  intro: string
  statusNote: string
  sections: LegalSection[]
  updatedAt: string
}

export const legalPageContent: Record<'aviso-legal' | 'privacidad' | 'cookies' | 'accesibilidad', LegalDocumentContent> = {
  'aviso-legal': {
    title: 'Aviso legal',
    intro:
      'Esta version publica resume la informacion corporativa y de uso disponible hoy para SUBEROS sin inventar datos juridicos que todavia no han sido verificados documentalmente.',
    statusNote: companyProfile.runtimeStatus.legal.missingDataSummary,
    updatedAt: '2026-07-14',
    sections: [
      {
        title: 'Titularidad y contacto publicado',
        paragraphs: [
          'SUBEROS opera publicamente bajo su nombre comercial actual y ofrece como canales publicados de contacto el correo info@suberos.com y el telefono 691 93 72 72.',
          'La web no publica todavia datos societarios o registrales adicionales porque esa documentacion no ha sido verificada dentro del alcance tecnico actual.',
        ],
      },
      {
        title: 'Objeto de la web',
        paragraphs: [
          'La web presenta de forma editorial los servicios confirmados de fotografia, diseno, produccion e interaccion web de SUBEROS.',
          'El sitio actua hoy como escaparate informativo y canal inicial de contacto, sin ecommerce, cuentas de usuario ni contratacion automatizada.',
        ],
      },
      {
        title: 'Propiedad intelectual y uso de contenidos',
        paragraphs: [
          'Los elementos de marca, textos, composiciones visuales y activos propios de SUBEROS no pueden reutilizarse sin autorizacion expresa.',
          'La presencia de una fuente o asset en el repositorio no equivale a una licencia comercial definitivamente cerrada; cualquier activo pendiente de evidencia documental sigue bloqueando la publicacion final.',
        ],
      },
      {
        title: 'Responsabilidad y enlaces',
        paragraphs: [
          'SUBEROS revisa el contenido publico para mantenerlo actualizado, pero puede introducir cambios tecnicos o editoriales cuando el proyecto evoluciona.',
          'Los enlaces externos solo se mantienen cuando son necesarios y no implican aprobacion sobre contenidos de terceros.',
        ],
      },
      {
        title: 'Legislacion y jurisdiccion',
        paragraphs: [
          'La redaccion definitiva sobre legislacion aplicable y jurisdiccion competente se incorporara cuando la identidad legal completa del titular quede verificada.',
        ],
        bullets: [
          `Volver al inicio: ${homeAnchors.inicio}`,
          `Contacto directo: ${homeAnchors.contacto}`,
          `Politica de privacidad: ${legalPaths.privacidad}`,
        ],
      },
    ],
  },
  privacidad: {
    title: 'Politica de privacidad',
    intro:
      'Esta politica describe el tratamiento real observable en la version tecnica actual de SUBEROS y evita declarar destinatarios, bases juridicas o plazos de conservacion que todavia no han sido confirmados por el titular.',
    statusNote:
      'La version final de privacidad requiere completar la identidad juridica del responsable, el receptor real del formulario y la politica definitiva de retencion.',
    updatedAt: '2026-07-14',
    sections: [
      {
        title: 'Datos y canales actualmente visibles',
        paragraphs: [
          'SUBEROS publica hoy un correo de contacto, un telefono y un formulario web de presentacion inicial.',
          `El formulario online de produccion no esta conectado a un endpoint real. Mientras no exista backend definitivo, el canal operativo real sigue siendo el contacto directo por email o telefono: ${companyProfile.contact.email} y ${companyProfile.contact.phoneDisplay}.`,
        ],
      },
      {
        title: 'Tratamiento actual en la web',
        paragraphs: [
          'La web no activa analitica, trackers publicitarios, newsletter, cuentas de usuario ni procesamiento comercial automatizado.',
          'En QA local existe un mock de desarrollo para validar interfaz y accesibilidad del formulario. Ese mock no forma parte del build publico ni entrega emails reales en produccion.',
        ],
      },
      {
        title: 'Destinatarios y proveedores',
        paragraphs: [
          'No existe hoy un proveedor activo de envio real para el formulario en produccion dentro de este repositorio.',
          'El hosting y las herramientas de desarrollo del proyecto se documentan por separado en el inventario tecnico de proveedores y no implican, por si mismos, que reciban datos del formulario de visitantes finales.',
        ],
      },
      {
        title: 'Cookies, almacenamiento y seguridad minima',
        paragraphs: [
          'La web no utiliza cookies no esenciales ni almacenamiento persistente para guardar el contenido del formulario.',
          'Solo se ha identificado un uso tecnico de sessionStorage para no repetir el preloader en la misma sesion del navegador.',
        ],
      },
      {
        title: 'Derechos y version final',
        paragraphs: [
          'La via definitiva para ejercer derechos, asi como la base juridica y los plazos de conservacion, se publicaran cuando el titular complete la validacion documental requerida.',
        ],
        bullets: [
          `Canales actuales de contacto: ${homeAnchors.contacto}`,
          `Politica de cookies y almacenamiento: ${legalPaths.cookies}`,
          `Informacion de accesibilidad: ${legalPaths.accesibilidad}`,
        ],
      },
    ],
  },
  cookies: {
    title: 'Politica de cookies y almacenamiento',
    intro:
      'Esta pagina resume el comportamiento tecnico real observado en la version actual de SUBEROS en lugar de reutilizar plantillas genericas de consentimiento.',
    statusNote:
      'El alcance actual no justifica un banner de cookies porque no se han detectado tecnologias no esenciales activas en runtime publico.',
    updatedAt: '2026-07-14',
    sections: [
      {
        title: 'Cookies y tecnologias similares',
        paragraphs: [
          'En la auditoria tecnica actual no se han detectado cookies no esenciales, pixels, SDKs de analitica, publicidad comportamental ni herramientas de seguimiento de terceros.',
          'La web tampoco registra service workers ni IndexedDB para visitantes en el alcance actual.',
        ],
      },
      {
        title: 'Almacenamiento tecnico identificado',
        paragraphs: [
          'Se utiliza sessionStorage para registrar si el preloader ya se ha mostrado en la sesion actual y evitar repeticiones innecesarias.',
          'Ese dato es tecnico, local al navegador y no contiene informacion personal del formulario.',
        ],
      },
      {
        title: 'Consentimiento',
        paragraphs: [
          'Con el runtime actual no se implementa banner porque no se ha detectado una categoria no esencial que requiera consentimiento previo.',
          'Si en una fase futura se activan analitica, embeds de terceros o herramientas de marketing, esta decision debera revisarse antes de publicarlas.',
        ],
      },
      {
        title: 'Como borrar el almacenamiento tecnico',
        paragraphs: [
          'La persona usuaria puede eliminar el almacenamiento tecnico desde las herramientas del navegador, borrando los datos del sitio o cerrando la sesion actual.',
        ],
        bullets: [
          'No se usan cookies no esenciales en el alcance actual.',
          'No se detectan trackers activos.',
          'El formulario no guarda su contenido en el navegador.',
        ],
      },
    ],
  },
  accesibilidad: {
    title: 'Informacion de accesibilidad',
    intro:
      'SUBEROS trabaja para alcanzar el nivel WCAG 2.2 AA y mantener una experiencia usable con y sin motion cinematica.',
    statusNote:
      'La auditoria final de conformidad sigue pendiente antes de una publicacion definitiva.',
    updatedAt: '2026-07-14',
    sections: [
      {
        title: 'Medidas actualmente aplicadas',
        paragraphs: [
          'La web incluye estructura semantica base, skip link, navegacion por teclado, foco visible, reduced motion y adaptacion responsive en los viewports de control definidos por el proyecto.',
          'Las escenas animadas y los laboratorios internos tienen estrategias de fallback o noindex para evitar que la narrativa visual bloquee la comprension o la indexacion.',
        ],
      },
      {
        title: 'Alcance y limitaciones conocidas',
        paragraphs: [
          'La conformidad final no se declara todavia porque falta una auditoria completa de cierre sobre contenido legal definitivo, rutas finales y comportamiento en produccion publica.',
          'La tipografia actual StretchPro sigue pendiente de evidencia documental de licencia y puede requerir un plan de sustitucion antes de la salida publica final.',
        ],
      },
      {
        title: 'Motion, teclado y contraste',
        paragraphs: [
          'SUBEROS mantiene una estrategia de reduced motion, un flujo de teclado verificable y una revision periodica de overflow y errores de consola en las vistas principales.',
          'El contenido esencial no depende exclusivamente de canvas, video ni secuencias animadas.',
        ],
      },
      {
        title: 'Contacto para incidencias de accesibilidad',
        paragraphs: [
          'Mientras se completa la auditoria final, las incidencias o sugerencias de accesibilidad pueden comunicarse por los canales de contacto publicados en la web.',
        ],
        bullets: [
          `Contacto: ${homeAnchors.contacto}`,
          `Aviso legal: ${legalPaths.avisoLegal}`,
          `Privacidad: ${legalPaths.privacidad}`,
        ],
      },
    ],
  },
}
