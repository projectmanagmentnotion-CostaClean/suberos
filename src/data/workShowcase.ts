export type WorkShowcaseDiscipline = {
  id: string
  label: string
  title: string
  summary: string
}

export const workShowcaseDisciplines: WorkShowcaseDiscipline[] = [
  {
    id: 'fotografia',
    label: '01',
    title: 'Fotografia',
    summary: 'Direccion de imagen pensada para carta, catalogo, soporte fisico y presencia digital.',
  },
  {
    id: 'branding',
    label: '02',
    title: 'Branding',
    summary: 'Identidad, tono y piezas graficas coordinadas para que la marca se entienda con claridad.',
  },
  {
    id: 'produccion',
    label: '03',
    title: 'Produccion',
    summary: 'Artes finales, materiales y acabados preparados para uso real fuera de pantalla.',
  },
  {
    id: 'web',
    label: '04',
    title: 'Web',
    summary: 'Experiencias digitales mobile-first que conectan narrativa, contacto y conversion.',
  },
]

export const workShowcaseNotes = [
  'El portfolio publico permanece desactivado hasta contar con materiales y aprobaciones especificas de SUBEROS.',
  'La home muestra capacidades, proceso y contacto reales en lugar de proyectos o resultados no verificados.',
  'La arquitectura queda lista para activar casos publicados solo cuando exista contenido aprobado para hacerlo.',
] as const
