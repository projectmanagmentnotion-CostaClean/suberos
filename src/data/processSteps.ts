export type ProcessStep = {
  id: string
  index: string
  title: string
  body: string
}

export const processSteps: ProcessStep[] = [
  {
    id: 'descubrir',
    index: '01',
    title: 'Descubrir',
    body: 'Aterrizamos objetivo, publico, soporte y contexto antes de producir nada.',
  },
  {
    id: 'definir',
    index: '02',
    title: 'Definir',
    body: 'Ordenamos mensaje, formato y direccion visual para que la idea tenga coherencia real.',
  },
  {
    id: 'disenar',
    index: '03',
    title: 'Disenar',
    body: 'Construimos identidad, piezas, interfaces y narrativa con jerarquia clara.',
  },
  {
    id: 'producir',
    index: '04',
    title: 'Producir',
    body: 'Fotografiamos, maquetamos, desarrollamos o preparamos arte final segun el proyecto lo exija.',
  },
  {
    id: 'lanzar',
    index: '05',
    title: 'Lanzar',
    body: 'Entregamos, publicamos y dejamos la pieza lista para activar marca, producto o contacto.',
  },
]
