export type WorkShowcaseDiscipline = {
  id: string
  label: string
  title: string
  summary: string
  headline: string
  detail: string
  outcomes: readonly string[]
  mediaLabel: string
  mediaCaption: string
}

export const workShowcaseDisciplines: WorkShowcaseDiscipline[] = [
  {
    id: 'fotografia',
    label: '01',
    title: 'Fotografia',
    summary: 'Direccion de imagen pensada para carta, catalogo, soporte fisico y presencia digital.',
    headline: 'Fotografia editorial y de marca.',
    detail:
      'Construimos imagen propia, usable y consistente para producto, espacio, carta, catalogo o contenido digital sin separar la sesion fotografica de la estrategia visual.',
    outcomes: [
      'Direccion de arte y tono visual definidos antes de disparar.',
      'Imagen pensada para reutilizarse en soportes digitales y fisicos.',
      'Entrega enfocada en utilidad real, no en piezas sueltas.',
    ] as const,
    mediaLabel: 'Captura y direccion visual',
    mediaCaption: 'Imagen propia preparada para carta, catalogo, soporte fisico y presencia digital.',
  },
  {
    id: 'branding',
    label: '02',
    title: 'Branding',
    summary: 'Identidad, tono y piezas graficas coordinadas para que la marca se entienda con claridad.',
    headline: 'Branding con sistema y criterio.',
    detail:
      'Alineamos tono, tipografia, composicion y decisiones graficas para que la marca hable con claridad y pueda sostenerse en pantalla, impreso y contenido visual.',
    outcomes: [
      'Direccion tipografica y visual calibrada para cada soporte.',
      'Piezas base y reglas utiles, no solo una identidad estetica.',
      'Coherencia entre narrativa, forma y uso cotidiano.',
    ] as const,
    mediaLabel: 'Sistema grafico y tono',
    mediaCaption: 'Identidad, tono y composicion pensados como un sistema continuo.',
  },
  {
    id: 'produccion',
    label: '03',
    title: 'Produccion',
    summary: 'Artes finales, materiales y acabados preparados para uso real fuera de pantalla.',
    headline: 'Produccion y artes finales listos para salir.',
    detail:
      'Preparamos materiales, acabados y artes finales con foco en ejecucion real para que la idea sobreviva al soporte y llegue al espacio fisico con precision.',
    outcomes: [
      'Archivos listos para impresion o fabricacion.',
      'Soportes y acabados elegidos con intencion visual.',
      'Coordinacion entre imagen, pieza y resultado final.',
    ] as const,
    mediaLabel: 'Materiales y acabados',
    mediaCaption: 'Arte final, soporte y produccion coordinados desde la misma direccion visual.',
  },
  {
    id: 'web',
    label: '04',
    title: 'Web',
    summary: 'Experiencias digitales mobile-first que conectan narrativa, contacto y conversion.',
    headline: 'Web editorial, clara y preparada para convertir.',
    detail:
      'Disenamos y desarrollamos experiencias digitales que conectan mensaje, ritmo visual y accion, evitando interfaces administrativas o estructuras sin narrativa.',
    outcomes: [
      'Arquitectura responsive y accesible desde el primer bloque.',
      'Ritmo visual y jerarquia pensados para lectura y conversion.',
      'Contenido y motion trabajando como una sola experiencia.',
    ] as const,
    mediaLabel: 'Narrativa y experiencia digital',
    mediaCaption: 'Experiencia web, jerarquia y contacto dentro de una sola direccion editorial.',
  },
]

export const workShowcaseNotes = [
  'El portfolio publico permanece desactivado hasta contar con materiales y aprobaciones especificas de SUBEROS.',
  'La home muestra capacidades, proceso y contacto reales en lugar de proyectos o resultados no verificados.',
  'La arquitectura queda lista para activar casos publicados solo cuando exista contenido aprobado para hacerlo.',
] as const
