export type CategorySlug =
  | 'sport'
  | 'travel'
  | 'health'
  | 'auto'
  | 'property'
  | 'business'

export type Category = {
  slug: CategorySlug
  name: string
  description: string
  image: string
  products: number
  featured?: boolean
}

export const categories: Category[] = [
  {
    slug: 'sport',
    name: 'Спорт',
    description:
      'Страхование спортсменов, соревнований и тренировок. Основное направление платформы.',
    image: '/images/sport-judo.png',
    products: 24,
    featured: true,
  },
  {
    slug: 'travel',
    name: 'Путешествия',
    description: 'Медицина за рубежом, отмена поездки, багаж и активный отдых.',
    image: '/images/category-travel.png',
    products: 12,
  },
  {
    slug: 'health',
    name: 'Здоровье',
    description: 'ДМС, телемедицина и защита от критических заболеваний.',
    image: '/images/category-health.png',
    products: 9,
  },
  {
    slug: 'auto',
    name: 'Авто',
    description: 'ОСАГО, КАСКО и помощь на дороге от проверенных страховых.',
    image: '/images/category-auto.png',
    products: 7,
  },
  {
    slug: 'property',
    name: 'Имущество',
    description: 'Защита квартиры, дома и ответственности перед соседями.',
    image: '/images/category-property.png',
    products: 6,
  },
  {
    slug: 'business',
    name: 'Бизнес',
    description: 'Страхование сотрудников, ответственности и активов компании.',
    image: '/images/category-business.png',
    products: 5,
  },
]

export type Sport = {
  slug: string
  name: string
  image: string
  athletes: string
}

export const sports: Sport[] = [
  { slug: 'judo', name: 'Дзюдо', image: '/images/sport-judo.png', athletes: '18 400' },
  { slug: 'football', name: 'Футбол', image: '/images/sport-football.png', athletes: '54 200' },
  { slug: 'hockey', name: 'Хоккей', image: '/images/sport-hockey.png', athletes: '31 900' },
  { slug: 'running', name: 'Бег', image: '/images/sport-running.png', athletes: '42 700' },
  { slug: 'gymnastics', name: 'Гимнастика', image: '/images/sport-gymnastics.png', athletes: '12 300' },
  { slug: 'cycling', name: 'Велоспорт', image: '/images/sport-cycling.png', athletes: '9 800' },
]

export type Insurer = {
  id: string
  name: string
  short: string
}

export const insurers: Insurer[] = [
  { id: 'alfa', name: 'АльфаСтрахование', short: 'АС' },
  { id: 'sogaz', name: 'СОГАЗ', short: 'СГ' },
  { id: 'ingos', name: 'Ингосстрах', short: 'ИН' },
  { id: 'reso', name: 'РЕСО-Гарантия', short: 'РГ' },
  { id: 'vsk', name: 'ВСК', short: 'ВСК' },
]

export type Product = {
  id: string
  name: string
  category: CategorySlug
  insurerId: string
  coverage: string
  price: string
  period: string
  benefits: string[]
  conditions: string
  status: 'Активен' | 'На модерации' | 'Архив'
  best?: boolean
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Спорт Актив',
    category: 'sport',
    insurerId: 'alfa',
    coverage: '1 000 000 ₽',
    price: '1 290 ₽',
    period: 'на 1 турнир',
    benefits: ['Несчастный случай', 'Травмы на соревновании', 'Реабилитация'],
    conditions: 'Действует на территории РФ, без франшизы.',
    status: 'Активен',
    best: true,
  },
  {
    id: 'p2',
    name: 'Соревнование Стандарт',
    category: 'sport',
    insurerId: 'sogaz',
    coverage: '500 000 ₽',
    price: '890 ₽',
    period: 'на 1 турнир',
    benefits: ['Несчастный случай', 'Скорая помощь'],
    conditions: 'Базовое покрытие для любительских соревнований.',
    status: 'Активен',
  },
  {
    id: 'p3',
    name: 'Про Атлет',
    category: 'sport',
    insurerId: 'ingos',
    coverage: '2 000 000 ₽',
    price: '2 450 ₽',
    period: 'на 30 дней',
    benefits: ['Несчастный случай', 'Инвалидность', 'Реабилитация', 'Зарубежные клиники'],
    conditions: 'Расширенное покрытие для профессионалов.',
    status: 'Активен',
  },
  {
    id: 'p4',
    name: 'Годовая защита',
    category: 'sport',
    insurerId: 'reso',
    coverage: '1 500 000 ₽',
    price: '9 900 ₽',
    period: 'на 1 год',
    benefits: ['Тренировки и соревнования', 'Несчастный случай', 'Реабилитация'],
    conditions: 'Круглогодичная защита для регулярных спортсменов.',
    status: 'Активен',
  },
  {
    id: 'p5',
    name: 'Путешествие Комфорт',
    category: 'travel',
    insurerId: 'alfa',
    coverage: '50 000 €',
    price: '1 100 ₽',
    period: 'на поездку',
    benefits: ['Медицина за рубежом', 'Отмена поездки', 'Багаж'],
    conditions: 'Действует по всему миру, кроме зон ограничений.',
    status: 'Активен',
  },
  {
    id: 'p6',
    name: 'ДМС Онлайн',
    category: 'health',
    insurerId: 'vsk',
    coverage: '1 000 000 ₽',
    price: '3 400 ₽',
    period: 'на 1 год',
    benefits: ['Телемедицина', 'Поликлиника', 'Анализы'],
    conditions: 'Доступ к сети клиник-партнёров.',
    status: 'Активен',
  },
  {
    id: 'p7',
    name: 'КАСКО Лайт',
    category: 'auto',
    insurerId: 'reso',
    coverage: '2 500 000 ₽',
    price: '28 900 ₽',
    period: 'на 1 год',
    benefits: ['Ущерб', 'Угон', 'Помощь на дороге'],
    conditions: 'С франшизой 15 000 ₽.',
    status: 'Активен',
  },
  {
    id: 'p8',
    name: 'Моя квартира',
    category: 'property',
    insurerId: 'sogaz',
    coverage: '3 000 000 ₽',
    price: '4 200 ₽',
    period: 'на 1 год',
    benefits: ['Отделка', 'Имущество', 'Ответственность'],
    conditions: 'Без осмотра для покрытия до 3 млн ₽.',
    status: 'На модерации',
  },
  {
    id: 'p9',
    name: 'Бизнес Защита',
    category: 'business',
    insurerId: 'ingos',
    coverage: '10 000 000 ₽',
    price: '46 000 ₽',
    period: 'на 1 год',
    benefits: ['Ответственность', 'Имущество компании', 'Сотрудники'],
    conditions: 'Индивидуальный расчёт для команды до 50 человек.',
    status: 'Активен',
  },
]

export type PolicyStatus =
  | 'Подтверждена'
  | 'Нет страховки'
  | 'Истекает слишком рано'
  | 'Требует проверки'
  | 'Активна'
  | 'Истекает'
  | 'Ожидает оплаты'

export type Competition = {
  slug: string
  name: string
  sport: string
  dateLabel: string
  location: string
  organizer: string
  image: string
  description: string
  participants: number
  insured: number
  uninsured: number
  toCheck: number
  requirements: {
    required: boolean
    minCoverage: string
    period: string
    sport: string
    risk: string
  }
}

export const competitions: Competition[] = [
  {
    slug: 'russian-judo-cup-2026',
    name: 'Кубок России по дзюдо 2026',
    sport: 'Дзюдо',
    dateLabel: '15–17 сентября 2026',
    location: 'Москва, Дворец спорта «Динамо»',
    organizer: 'Федерация дзюдо России',
    image: '/images/sport-judo.png',
    description:
      'Ежегодные всероссийские соревнования по дзюдо среди мужчин и женщин. Участники из 62 регионов страны борются за путёвки в сборную. Соревнования проходят в олимпийских весовых категориях.',
    participants: 432,
    insured: 397,
    uninsured: 23,
    toCheck: 12,
    requirements: {
      required: true,
      minCoverage: '500 000 ₽',
      period: '14–18 сентября 2026',
      sport: 'Дзюдо',
      risk: 'Несчастный случай',
    },
  },
  {
    slug: 'moscow-marathon-2026',
    name: 'Московский марафон 2026',
    sport: 'Бег',
    dateLabel: '20 сентября 2026',
    location: 'Москва, Лужники',
    organizer: 'Лига бега',
    image: '/images/sport-running.png',
    description:
      'Крупнейший марафон страны: дистанции 42.2 км и 10 км по историческому центру Москвы.',
    participants: 12800,
    insured: 11200,
    uninsured: 1200,
    toCheck: 400,
    requirements: {
      required: true,
      minCoverage: '300 000 ₽',
      period: '19–21 сентября 2026',
      sport: 'Бег',
      risk: 'Несчастный случай',
    },
  },
  {
    slug: 'youth-hockey-league-2026',
    name: 'Молодёжная хоккейная лига 2026',
    sport: 'Хоккей',
    dateLabel: '3–12 октября 2026',
    location: 'Санкт-Петербург, СКА Арена',
    organizer: 'Федерация хоккея',
    image: '/images/sport-hockey.png',
    description:
      'Турнир среди молодёжных команд с участием ведущих спортивных школ страны.',
    participants: 640,
    insured: 590,
    uninsured: 34,
    toCheck: 16,
    requirements: {
      required: true,
      minCoverage: '750 000 ₽',
      period: '2–13 октября 2026',
      sport: 'Хоккей',
      risk: 'Несчастный случай',
    },
  },
]

export type Policy = {
  id: string
  insurerId: string
  type: string
  coverage: string
  dates: string
  number: string
  status: PolicyStatus
}

export const policies: Policy[] = [
  {
    id: 'POL-2026-0912',
    insurerId: 'alfa',
    type: 'Спорт Актив — Дзюдо',
    coverage: '1 000 000 ₽',
    dates: '14.09.2026 – 18.09.2026',
    number: 'СА-2026-0912',
    status: 'Активна',
  },
  {
    id: 'POL-2026-0455',
    insurerId: 'ingos',
    type: 'Годовая защита — Спорт',
    coverage: '1 500 000 ₽',
    dates: '01.01.2026 – 31.12.2026',
    number: 'ГЗ-2026-0455',
    status: 'Активна',
  },
  {
    id: 'POL-2025-8890',
    insurerId: 'sogaz',
    type: 'Путешествие Комфорт',
    coverage: '50 000 €',
    dates: '10.10.2026 – 24.10.2026',
    number: 'ПК-2026-8890',
    status: 'Истекает',
  },
]

export type Application = {
  id: string
  client: string
  product: string
  insurerId: string
  amount: string
  status: PolicyStatus
  manager: string
  date: string
}

export const applications: Application[] = [
  { id: 'A-4821', client: 'Алексей Иванов', product: 'Спорт Актив', insurerId: 'alfa', amount: '1 290 ₽', status: 'Подтверждена', manager: 'Ольга К.', date: '31.08.2026' },
  { id: 'A-4820', client: 'Мария Соколова', product: 'Про Атлет', insurerId: 'ingos', amount: '2 450 ₽', status: 'Ожидает оплаты', manager: 'Дмитрий П.', date: '31.08.2026' },
  { id: 'A-4819', client: 'Иван Петров', product: 'Соревнование Стандарт', insurerId: 'sogaz', amount: '890 ₽', status: 'Требует проверки', manager: 'Ольга К.', date: '30.08.2026' },
  { id: 'A-4818', client: 'Екатерина Новикова', product: 'Годовая защита', insurerId: 'reso', amount: '9 900 ₽', status: 'Подтверждена', manager: 'Сергей В.', date: '30.08.2026' },
  { id: 'A-4817', client: 'Павел Морозов', product: 'Путешествие Комфорт', insurerId: 'alfa', amount: '1 100 ₽', status: 'Подтверждена', manager: 'Дмитрий П.', date: '29.08.2026' },
  { id: 'A-4816', client: 'Анна Волкова', product: 'ДМС Онлайн', insurerId: 'vsk', amount: '3 400 ₽', status: 'Ожидает оплаты', manager: 'Сергей В.', date: '29.08.2026' },
]

export type Participant = {
  id: string
  name: string
  birth: string
  club: string
  policy: string
  coverage: string
  validity: string
  status: PolicyStatus
}

export const participants: Participant[] = [
  { id: 'u1', name: 'Алексей Иванов', birth: '12.04.2002', club: 'СК «Самбо-70»', policy: 'Спорт Актив', coverage: '1 000 000 ₽', validity: '14–18.09.2026', status: 'Подтверждена' },
  { id: 'u2', name: 'Мария Соколова', birth: '03.11.2004', club: 'ЦСКА', policy: 'Про Атлет', coverage: '2 000 000 ₽', validity: '01–30.09.2026', status: 'Подтверждена' },
  { id: 'u3', name: 'Иван Петров', birth: '28.07.2001', club: 'Динамо', policy: '—', coverage: '—', validity: '—', status: 'Нет страховки' },
  { id: 'u4', name: 'Екатерина Новикова', birth: '15.02.2003', club: 'Локомотив', policy: 'Соревнование Стандарт', coverage: '500 000 ₽', validity: '16–17.09.2026', status: 'Истекает слишком рано' },
  { id: 'u5', name: 'Павел Морозов', birth: '09.09.2000', club: 'СК «Самбо-70»', policy: 'Спорт Актив', coverage: '1 000 000 ₽', validity: '14–18.09.2026', status: 'Требует проверки' },
  { id: 'u6', name: 'Анна Волкова', birth: '21.06.2005', club: 'Спартак', policy: 'Годовая защита', coverage: '1 500 000 ₽', validity: 'весь 2026', status: 'Подтверждена' },
  { id: 'u7', name: 'Дмитрий Козлов', birth: '30.03.2002', club: 'ЦСКА', policy: '—', coverage: '—', validity: '—', status: 'Нет страховки' },
  { id: 'u8', name: 'Ольга Смирнова', birth: '17.12.2003', club: 'Динамо', policy: 'Про Атлет', coverage: '2 000 000 ₽', validity: '01–30.09.2026', status: 'Подтверждена' },
]

export function insurerById(id: string) {
  return insurers.find((i) => i.id === id)
}

export function categoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}
