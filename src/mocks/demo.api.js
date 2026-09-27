import { mockHttp, setMockProvider } from '../shared/http';
import { USE_MOCKS } from '../shared/constants';
import { Permissions } from '../shared/permissions';
import { createMockTasks } from '../pages/Deals/deals.mock';

const position = { id: 1, name: 'Менеджер проектов' };

const makeEmployee = (id, name, lastName, middleName = 'Иванович') => ({
  id,
  name,
  middle_name: middleName,
  last_name: lastName,
  avatar: null,
  birthday: null,
  position,
  email: `${name.toLowerCase()}@example.com`,
  phone: '+7 (999) 100-20-30',
  gender: 'male',
  hourly_rate: 2500,
  permissions: [],
});

const employees = [
  makeEmployee(1, 'Анна', 'Вознесенская', 'Сергеевна'),
  makeEmployee(2, 'Михаил', 'Белов', 'Александрович'),
  makeEmployee(3, 'Елена', 'Крылова', 'Петровна'),
];

const meta = {
  current_page: 1,
  last_page: 1,
  per_page: 20,
  total: 3,
};

const companies = [
  {
    id: 1,
    name: 'ООО «Северный Ветер»',
    description:
      'Производственная компания. Демо-карточка для презентации UX без реальных клиентских данных.',
    status: 'working',
    address: 'Москва, ул. Примерная, 10',
    phone: '+7 (495) 111-22-33',
    email: 'hello@northwind.demo',
    site: 'https://northwind.demo',
    ymetrics_token: '',
    topvisor_token: '',
    manager: employees[0],
    legals: {
      inn: '7701234567',
      kpp: '770101001',
      ogrn: '1027700123456',
      checking_account: '40702810100000000001',
      correspondent_account: '30101810400000000555',
      legal_address: 'Москва, ул. Примерная, 10',
      real_address: 'Москва, ул. Примерная, 10',
      bank_bic: '044525225',
      bank_name: 'Демо Банк',
    },
    services: {
      total: 2,
      last: {
        id: 1,
        name: 'Сопровождение платформы',
        deadline: '2026-09-01',
        creator: employees[0],
        responsible: employees[1],
      },
    },
  },
  {
    id: 2,
    name: 'АО «Горизонт Тех»',
    description: 'IT-компания. Демо-данные для списка компаний.',
    status: 'working',
    address: 'Санкт-Петербург, Невский пр., 25',
    phone: '+7 (812) 222-33-44',
    email: 'info@horizon.demo',
    site: 'https://horizon.demo',
    ymetrics_token: '',
    topvisor_token: '',
    manager: employees[1],
    legals: {
      inn: '7801234567',
      kpp: '780101001',
      ogrn: '1027800123456',
      checking_account: '40702810100000000002',
      correspondent_account: '30101810400000000555',
      legal_address: 'СПб, Невский пр., 25',
      real_address: 'СПб, Невский пр., 25',
      bank_bic: '044525225',
      bank_name: 'Демо Банк',
    },
    services: {
      total: 1,
      last: {
        id: 2,
        name: 'Дизайн-система',
        deadline: '2026-08-15',
        creator: employees[1],
        responsible: employees[2],
      },
    },
  },
  {
    id: 3,
    name: 'ИП Смирнов А.В.',
    description: 'Частный предприниматель. Демо-карточка.',
    status: 'partner',
    address: 'Казань, ул. Баумана, 5',
    phone: '+7 (843) 333-44-55',
    email: 'smirnov@demo.ru',
    site: '',
    ymetrics_token: '',
    topvisor_token: '',
    manager: employees[2],
    legals: {
      inn: '160123456789',
      kpp: '',
      ogrn: '',
      checking_account: '40802810100000000003',
      correspondent_account: '30101810400000000555',
      legal_address: 'Казань, ул. Баумана, 5',
      real_address: 'Казань, ул. Баумана, 5',
      bank_bic: '044525225',
      bank_name: 'Демо Банк',
    },
    services: { total: 0, last: null },
  },
];

const deals = [
  {
    id: 1,
    created_at: '2026-06-01T10:00:00Z',
    name: 'Редизайн личного кабинета',
    description: 'Обновление UX личного кабинета для корпоративных клиентов.',
    note: 'Приоритет — Q3',
    source: 'incoming_call',
    service_type: 'design',
    price: 450000,
    status: 'new_lead',
    creator: employees[0],
    responsible: employees[1],
    auditor: [employees[2]],
    manager: employees[1],
    company: { id: 1, name: 'ООО «Северный Ветер»' },
  },
  {
    id: 2,
    created_at: '2026-06-05T12:00:00Z',
    name: 'Внедрение аналитики',
    description: 'Настройка дашбордов и воронок.',
    note: '',
    source: 'partners',
    service_type: 'seo',
    price: 280000,
    status: 'lead_processed',
    creator: employees[1],
    responsible: employees[0],
    auditor: employees[2],
    manager: employees[0],
    company: { id: 2, name: 'АО «Горизонт Тех»' },
  },
  {
    id: 3,
    created_at: '2026-06-10T09:00:00Z',
    name: 'Поддержка платформы',
    description: 'Годовой контракт на сопровождение.',
    note: 'Продление',
    source: 'other_client',
    service_type: 'support',
    price: 960000,
    status: 'offer_sent',
    creator: employees[0],
    responsible: employees[2],
    auditor: [employees[1]],
    manager: employees[2],
    company: { id: 1, name: 'ООО «Северный Ветер»' },
  },
  {
    id: 4,
    created_at: '2026-06-12T14:00:00Z',
    name: 'Контекстная кампания',
    description: 'Запуск рекламных кампаний.',
    note: '',
    source: 'events',
    service_type: 'context',
    price: 150000,
    status: 'brief_filled',
    creator: employees[2],
    responsible: employees[1],
    auditor: [],
    manager: employees[1],
    company: { id: 3, name: 'ИП Смирнов А.В.' },
  },
  {
    id: 5,
    created_at: '2026-05-20T11:00:00Z',
    name: 'Маркетплейс-интеграция',
    description: 'Интеграция каталога с маркетплейсами.',
    note: 'На паузе',
    source: 'seo',
    service_type: 'marketplace',
    price: 520000,
    status: 'paused',
    creator: employees[1],
    responsible: employees[0],
    auditor: [employees[2]],
    manager: employees[0],
    company: { id: 2, name: 'АО «Горизонт Тех»' },
  },
  {
    id: 6,
    created_at: '2026-04-01T08:00:00Z',
    name: 'Редизайн бренда',
    description: 'Закрытый демо-проект.',
    note: '',
    source: 'word_of_mouth',
    service_type: 'design',
    price: 320000,
    status: 'bill_paid',
    creator: employees[0],
    responsible: employees[0],
    auditor: [],
    manager: employees[0],
    company: { id: 1, name: 'ООО «Северный Ветер»' },
  },
];

const services = [
  {
    id: 1,
    name: 'Сопровождение платформы',
    deadline: '2026-09-01',
    contract_number: 'Д-2026-01',
    company: { id: 1, name: 'ООО «Северный Ветер»' },
    type: 'support',
    active: true,
    creator: employees[0],
    responsible: employees[1],
    participants: [employees[1], employees[2]],
    stages: [
      {
        id: 1,
        name: 'Этап 1 — Аудит',
        planned_time: 40,
        actual_time: 28,
        cost: 100000,
        deadline: '2026-07-01',
        description: 'Аудит текущей платформы',
        act: {},
        bills: [],
      },
      {
        id: 2,
        name: 'Этап 2 — Доработки',
        planned_time: 80,
        actual_time: 12,
        cost: 200000,
        deadline: '2026-09-01',
        description: 'Реализация улучшений',
        act: {},
        bills: [],
      },
    ],
  },
  {
    id: 2,
    name: 'Дизайн-система',
    deadline: '2026-08-15',
    contract_number: 'Д-2026-02',
    company: { id: 2, name: 'АО «Горизонт Тех»' },
    type: 'design',
    active: true,
    creator: employees[1],
    responsible: employees[2],
    participants: [employees[2]],
    stages: [
      {
        id: 3,
        name: 'UI Kit',
        planned_time: 60,
        actual_time: 45,
        cost: 180000,
        deadline: '2026-08-15',
        description: 'Компоненты и гайдлайны',
        act: {},
        bills: [],
      },
    ],
  },
];

const makeTask = (id, name, status, dealId, dealName) => ({
  id,
  name,
  description: `Описание задачи «${name}»`,
  linked_task: `/tasks/${id}`,
  type: 'design',
  status,
  deadline: '2026-08-01',
  responsible: employees[0],
  creator: employees[1],
  planned_time: 8,
  actual_time: 3,
  performer: employees[2],
  auditors: [employees[1]],
  show_at_client_cabinet: 0,
  related_entity: {
    type: 'App\\Models\\Deal',
    id: dealId,
    name: dealName,
    link: `/deals/${dealId}`,
  },
  time_trackings: [],
  comments: [],
  template: { id: 1, title: 'Базовый шаблон' },
  cost: 15000,
});

const tasks = [
  makeTask(1, 'Собрать требования', 'created', 1, 'Редизайн личного кабинета'),
  makeTask(2, 'Прототип экранов', 'in_work', 1, 'Редизайн личного кабинета'),
  makeTask(3, 'Настроить отчёты', 'waiting_for_approval', 2, 'Внедрение аналитики'),
  makeTask(4, 'Релиз патча', 'finished', 3, 'Поддержка платформы'),
];

const now = new Date();
const startIso = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0).toISOString();
const endIso = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 30).toISOString();

const businesses = [
  {
    id: 1,
    name: 'Созвон с клиентом',
    description: 'Обсуждение roadmap',
    type: 'call',
    finished: 0,
    start: startIso,
    end: endIso,
    creator: employees[0],
    performer: employees[1],
    related_entity: {
      id: 1,
      name: 'Редизайн личного кабинета',
      type: 'App\\Models\\Deal',
      link: '/deals/1',
    },
    actual_time: 1.5,
    created_at: startIso,
    updated_at: startIso,
    cost: 0,
  },
  {
    id: 2,
    name: 'Внутренний статус',
    description: 'Синк команды',
    type: 'meeting',
    finished: 0,
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 0).toISOString(),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 15, 0).toISOString(),
    creator: employees[1],
    performer: employees[0],
    related_entity: {
      id: 1,
      name: 'ООО «Северный Ветер»',
      type: 'App\\Models\\Company',
      link: '/clients/1',
    },
    actual_time: 1,
    created_at: startIso,
    updated_at: startIso,
    cost: 0,
  },
];

const contactPersons = [
  {
    id: 1,
    name: 'Игорь',
    middle_name: 'Викторович',
    last_name: 'Петров',
    role: 'Директор',
    phone: '+7 (999) 555-11-22',
    phone_comment: '',
    email: 'petrov@northwind.demo',
    site: '',
    telegram: 'petrov',
    whatsapp: '',
  },
  {
    id: 2,
    name: 'Ольга',
    middle_name: 'Сергеевна',
    last_name: 'Иванова',
    role: 'Маркетолог',
    phone: '+7 (999) 555-33-44',
    phone_comment: '',
    email: 'ivanova@northwind.demo',
    site: '',
    telegram: '',
    whatsapp: '',
  },
];

const comments = [
  {
    id: 1,
    text: 'Демо-комментарий к карточке.',
    created_at: '2026-06-15T10:00:00Z',
    commentator: employees[0],
    files: [],
  },
];

const passwords = [
  {
    id: 1,
    service_name: 'Админка',
    login: 'demo_admin',
    password: '••••••••',
  },
];

const timetrackings = [
  {
    id: 1,
    minutes: 125,
    cost: 5200,
    created_at: '2026-06-14T12:00:00Z',
    employee: employees[0],
  },
  {
    id: 2,
    minutes: 90,
    cost: 3750,
    created_at: '2026-06-15T16:30:00Z',
    employee: employees[1],
  },
  {
    id: 3,
    minutes: 60,
    cost: 2500,
    created_at: '2026-06-16T09:15:00Z',
    employee: employees[2],
  },
];

const wrap = (data, extra = {}) => ({ data, meta, ...extra });

const findById = (list, url, segmentIndex = 3) => {
  const parts = url.split('/').filter(Boolean);
  const id = parseInt(parts[segmentIndex], 10);
  return list.find((item) => item.id === id) || list[0];
};

export const setupDemoMocks = () => {
  if (!USE_MOCKS) return;

  setMockProvider();

  mockHttp.onGet('/api/me').reply(200, {
    data: {
      id: 1,
      name: 'Анна',
      middle_name: 'Сергеевна',
      last_name: 'Вознесенская',
      avatar: null,
      position,
      email: 'anna@example.com',
      phone: '+7 (999) 123-45-67',
    },
  });

  const allPermissions = Object.values(Permissions).reduce((acc, key) => {
    const snake = key.replace(/[A-Z]/g, (l) => `_${l.toLowerCase()}`);
    acc[snake] = true;
    return acc;
  }, {});
  allPermissions.super_admin = true;

  mockHttp.onGet('/api/my_permissions').reply(200, allPermissions);

  mockHttp.onGet('/api/companies').reply(200, wrap(companies));
  mockHttp.onGet(/\/api\/companies\/\d+$/).reply((config) => {
    return [200, { data: findById(companies, config.url, 2) }];
  });
  mockHttp.onGet(/\/api\/companies\/\d+\/passwords/).reply(200, wrap(passwords));
  mockHttp.onGet(/\/api\/companies\/\d+\/clients/).reply(200, wrap(contactPersons));
  mockHttp.onGet(/\/api\/companies\/\d+\/comments/).reply(200, wrap(comments));
  mockHttp.onGet(/\/api\/companies\/\d+\/services/).reply((config) => {
    const companyId = parseInt(config.url.split('/')[3], 10);
    return [
      200,
      wrap(services.filter((s) => s.company.id === companyId)),
    ];
  });
  mockHttp.onGet(/\/api\/companies\/\d+\/deals/).reply((config) => {
    const companyId = parseInt(config.url.split('/')[3], 10);
    return [200, wrap(deals.filter((d) => d.company.id === companyId))];
  });
  mockHttp.onGet(/\/api\/companies\/\d+\/businesses/).reply(200, wrap(businesses));
  mockHttp.onPatch(/\/api\/companies\/\d+/).reply((config) => {
    return [200, { data: findById(companies, config.url, 2) }];
  });
  mockHttp.onPost('/api/companies').reply(200, { data: companies[0] });

  mockHttp.onGet('/api/deals').reply(200, wrap(deals));
  mockHttp.onGet(/\/api\/deals\/\d+$/).reply((config) => {
    return [200, { data: findById(deals, config.url, 2) }];
  });
  mockHttp.onGet(/\/api\/deals\/\d+\/tasks/).reply((config) => {
    const dealId = parseInt(config.url.split('/')[3], 10);
    const dealTasks = tasks.filter((t) => t.related_entity.id === dealId);
    return [200, wrap(dealTasks.length ? dealTasks : createMockTasks(dealId))];
  });
  mockHttp.onGet(/\/api\/deals\/\d+\/comments/).reply(200, wrap(comments));
  mockHttp.onGet(/\/api\/deals\/\d+\/businesses/).reply(200, wrap(businesses));
  mockHttp.onPatch(/\/api\/deals\/\d+/).reply((config) => {
    return [200, { data: findById(deals, config.url, 2) }];
  });
  mockHttp.onPost('/api/deals').reply(200, { data: deals[0] });
  mockHttp.onDelete(/\/api\/deals\/\d+/).reply(200, { data: true });

  mockHttp.onGet('/api/services').reply(200, wrap(services));
  mockHttp.onGet(/\/api\/services\/\d+$/).reply((config) => {
    return [200, { data: findById(services, config.url, 2) }];
  });
  mockHttp.onGet(/\/api\/services\/\d+\/stages/).reply((config) => {
    const service = findById(services, config.url, 2);
    return [200, wrap(service?.stages || [])];
  });
  mockHttp.onGet('/api/services/types').reply(200, {
    data: [
      { id: 1, name: 'SEO', value: 'seo' },
      { id: 2, name: 'Дизайн', value: 'design' },
      { id: 3, name: 'Поддержка', value: 'support' },
    ],
  });

  mockHttp.onGet('/api/tasks').reply(200, wrap(tasks));
  mockHttp.onGet(/\/api\/tasks\/\d+$/).reply((config) => {
    return [200, { data: findById(tasks, config.url, 2) }];
  });
  mockHttp.onGet(/\/api\/tasks\/\d+\/comments/).reply(200, wrap(comments));
  mockHttp.onPost('/api/tasks').reply(200, { data: tasks[0] });
  mockHttp.onPatch(/\/api\/tasks\/\d+/).reply((config) => {
    return [200, { data: findById(tasks, config.url, 2) }];
  });

  mockHttp.onGet('/api/businesses').reply(200, wrap(businesses));
  mockHttp.onGet(/\/api\/businesses\/\d+$/).reply((config) => {
    return [200, { data: findById(businesses, config.url, 2) }];
  });
  mockHttp.onGet(/\/api\/businesses\/\d+\/comments/).reply(200, wrap(comments));
  mockHttp.onPost('/api/businesses').reply(200, { data: businesses[0] });
  mockHttp.onPatch(/\/api\/businesses\/\d+/).reply((config) => {
    return [200, { data: findById(businesses, config.url, 2) }];
  });

  mockHttp.onGet('/api/timetrackings').reply(200, {
    data: timetrackings,
    meta,
    stats: { total_minutes: 275, total_cost: 11450 },
  });
  mockHttp.onPost('/api/timetrackings').reply(200, { data: timetrackings[0] });
  mockHttp.onPatch(/\/api\/timetrackings\/\d+/).reply((config) => {
    return [200, { data: findById(timetrackings, config.url, 2) }];
  });
  mockHttp.onDelete(/\/api\/timetrackings\/\d+/).reply(200, { data: true });

  mockHttp.onGet('/api/employees').reply(200, wrap(employees));
  mockHttp.onGet(/\/api\/employees\/\d+/).reply((config) => {
    return [200, { data: findById(employees, config.url, 2) }];
  });

  mockHttp.onGet('/api/selector/employees').reply(200, wrap(employees));
  mockHttp.onGet('/api/selector/companies').reply(
    200,
    wrap(companies.map((c) => ({ id: c.id, name: c.name }))),
  );
  mockHttp.onGet('/api/selector/clients').reply(200, wrap(contactPersons));
  mockHttp.onGet('/api/selector/employee_position').reply(
    200,
    wrap([{ id: 1, name: 'Менеджер проектов' }, { id: 2, name: 'Дизайнер' }]),
  );
  mockHttp.onGet('/api/selector/tasks').reply(
    200,
    wrap(tasks.map((t) => ({ id: t.id, name: t.name }))),
  );
  mockHttp.onGet('/api/selector/services').reply(
    200,
    wrap(services.map((s) => ({ id: s.id, name: s.name }))),
  );
  mockHttp.onGet('/api/selector/legal_entities').reply(
    200,
    wrap([{ id: 1, name: 'ООО «Демо Юрлицо»' }]),
  );

  mockHttp.onGet('/api/search').reply(200, {
    companies: companies.map((c) => ({ id: c.id, name: c.name })),
    deals: deals.map((d) => ({ id: d.id, name: d.name })),
    tasks: tasks.map((t) => ({ id: t.id, name: t.name })),
    services: services.map((s) => ({ id: s.id, name: s.name })),
  });

  mockHttp.onGet('/api/legal_entities').reply(
    200,
    wrap([
      {
        id: 1,
        company_name: 'ООО «Демо Юрлицо»',
        email: 'legal@demo.ru',
        inn: '7701234567',
        kpp: '770101001',
        ogrn: '1027700123456',
        checking_account: '40702810100000000001',
        correspondent_account: '30101810400000000555',
        bank_bic: '044525225',
        bank_name: 'Демо Банк',
        legal_address: 'Москва',
        real_address: 'Москва',
        post_address: 'Москва',
        director_name: 'Иванов И.И.',
        is_main_legal_entity: 1,
      },
    ]),
  );

  mockHttp.onGet('/notifications').reply(200, []);
  mockHttp.onGet('/api/notifications').reply(200, { data: [] });

  mockHttp.onAny().reply((config) => {
    console.warn('[demo mocks] unhandled', config.method, config.url);
    if ((config.method || 'get').toLowerCase() === 'get') {
      return [200, wrap([])];
    }
    return [200, { data: {} }];
  });
};

if (USE_MOCKS) {
  setupDemoMocks();
}

export default setupDemoMocks;
