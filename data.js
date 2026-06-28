// ===== NearOne — AI Users & Mock Data =====

const AI_USERS = [
    {
        id: 'ai_alex', name: 'Алекс Морозов', age: 22, city: 'Москва', country: 'Россия',
        avatar: 'assets/images/alex.png', gender: 'Мужской',
        bio: 'Фронтендер, футболист, геймер. Ищу друзей для зала и киберспорта 💪',
        interests: ['Футбол', 'Программирование', 'Зал', 'Киберспорт', 'Roblox'],
        status: 'online', level: 4, levelName: 'Популярный', xp: 2800, xpMax: 4000,
        titles: ['Геймер', 'Футболист', 'Мотиватор'],
        achievements: [{ icon: '⚽', name: 'Спортсмен', desc: '10 совместных матчей' }, { icon: '💬', name: 'Общительный', desc: '500 сообщений' }, { icon: '🤝', name: 'Настоящий друг', desc: '20 знакомств' }, { icon: '🏆', name: 'Легенда', desc: '1 месяц активности' }],
        reputation: { friendly: 24, punctual: 18, fun: 31, safe: 20 },
        repBadges: ['дружелюбный', 'весёлый', 'пунктуальный']
    },
    {
        id: 'ai_maria', name: 'Мария Козлова', age: 21, city: 'Санкт-Петербург', country: 'Россия',
        avatar: 'assets/images/maria.png', gender: 'Женский',
        bio: 'Обожаю аниме, настолки и кино. Ищу компанию для вечеров и прогулок по городу ✨',
        interests: ['Аниме', 'Кино', 'Настольные игры', 'Прогулки', 'Фотография'],
        status: 'online', level: 3, levelName: 'Социальный', xp: 1500, xpMax: 2500,
        titles: ['Киноман', 'Душа компании', 'Мастер настолок'],
        achievements: [{ icon: '🎬', name: 'Киноман', desc: '50 фильмов' }, { icon: '🎲', name: 'Настольщик', desc: '15 игровых вечеров' }, { icon: '📸', name: 'Фотограф', desc: '30 фото выложено' }, { icon: '⭐', name: 'Первый друг', desc: 'Первое знакомство' }],
        reputation: { friendly: 32, punctual: 22, fun: 28, safe: 25 },
        repBadges: ['дружелюбный', 'безопасный', 'весёлый']
    },
    {
        id: 'ai_daniel', name: 'Даниэль Рашидов', age: 24, city: 'Ташкент', country: 'Узбекистан',
        avatar: 'assets/images/daniel.png', gender: 'Мужской',
        bio: 'Спортсмен, чемпион по баскетболу. Люблю путешествия и стартапы 🚀',
        interests: ['Баскетбол', 'Зал', 'Путешествия', 'Стартапы', 'Бизнес'],
        status: 'offline', level: 5, levelName: 'Легенда', xp: 4500, xpMax: 6000,
        titles: ['Чемпион зала', 'Исследователь', 'Легенда сообщества'],
        achievements: [{ icon: '🏀', name: 'MVP', desc: '30 игр' }, { icon: '✈️', name: 'Путешественник', desc: '5 городов' }, { icon: '💡', name: 'Стартапер', desc: '3 проекта' }, { icon: '🔥', name: 'Активный', desc: '100 дней подряд' }],
        reputation: { friendly: 20, punctual: 28, fun: 15, safe: 22 },
        repBadges: ['пунктуальный', 'дружелюбный']
    },
    {
        id: 'ai_sofia', name: 'София Лебедева', age: 20, city: 'Казань', country: 'Россия',
        avatar: 'assets/images/sofia.png', gender: 'Женский',
        bio: 'Музыкант, волонтёр, вечно ищу приключения. Давайте дружить! 🎵',
        interests: ['Музыка', 'Волонтёрство', 'Прогулки', 'Психология', 'Языки'],
        status: 'online', level: 3, levelName: 'Социальный', xp: 2000, xpMax: 2500,
        titles: ['Ночной гуляка', 'Лучший собеседник', 'Настоящий друг'],
        achievements: [{ icon: '🎵', name: 'Музыкант', desc: 'Играет на гитаре' }, { icon: '❤️', name: 'Волонтёр', desc: '10 мероприятий' }, { icon: '🌍', name: 'Полиглот', desc: '3 языка' }, { icon: '💬', name: 'Собеседник', desc: '1000 сообщений' }],
        reputation: { friendly: 35, punctual: 20, fun: 30, safe: 28 },
        repBadges: ['дружелюбный', 'весёлый', 'безопасный']
    }
];

const POSTS = [
    {
        id: 'p1', userId: 'ai_alex', text: 'Кто хочет сегодня футбол в 18:00? Собираемся на Чистых Прудах, 5 на 5! 🏟️⚽ Берём мяч, форму — погнали!',
        image: 'assets/images/football.png', time: '2 часа назад', likes: 24, comments: [
            { userId: 'ai_sofia', text: 'Я бы пришла поболеть! 😄' },
            { userId: 'ai_daniel', text: 'Я в деле! Буду в 17:50' }
        ]
    },
    {
        id: 'p2', userId: 'ai_maria', text: 'Вчера посмотрели "Интерстеллар" с ребятами из NearOne. Лучший вечер за долгое время! Спасибо этому приложению 💜🎬',
        image: null, time: '5 часов назад', likes: 47, comments: [
            { userId: 'ai_alex', text: 'Отличный фильм! В следующий раз зовите 🙌' },
        ]
    },
    {
        id: 'p3', userId: 'ai_daniel', text: 'Ищу людей в компьютерный клуб на выходных! Играем CS2, Valorant, LoL — кто с нами? 🎮🖥️',
        image: null, time: '8 часов назад', likes: 31, comments: [
            { userId: 'ai_alex', text: 'О, я за! В какой клуб идём?' },
            { userId: 'ai_maria', text: 'Valorant — мой выбор! Записывай 😎' }
        ]
    },
    {
        id: 'p4', userId: 'ai_sofia', text: 'Кто хочет учить Python вместе? Давайте создадим группу и будем поддерживать друг друга! 💻✨ Уровень — любой, главное мотивация',
        image: null, time: '12 часов назад', likes: 58, comments: [
            { userId: 'ai_alex', text: 'Я фронтенд, но Python тоже хочу! Создавай группу' },
            { userId: 'ai_daniel', text: 'Поддерживаю! Нужен Python для стартапа' }
        ]
    },
    {
        id: 'p5', userId: 'ai_maria', text: 'Нужен друг для зала. Хочу начать тренироваться, но одной скучно. Девочки, кто со мной? 💪🏋️‍♀️',
        image: null, time: '1 день назад', likes: 35, comments: [
            { userId: 'ai_sofia', text: 'Я давно хоту! Давай вместе! 🥰' }
        ]
    }
];

const EVENTS = [
    {
        id: 'e1', title: 'Футбольный матч 5 на 5', image: 'assets/images/football.png',
        organizer: 'ai_alex', date: '18 мая, 18:00', location: 'Чистые Пруды, Москва',
        spots: 10, spotsLeft: 3, description: 'Дружеский матч, все уровни. Берите форму и хорошее настроение!',
        participants: ['ai_alex', 'ai_daniel']
    },
    {
        id: 'e2', title: 'Вечер настольных игр', image: null,
        organizer: 'ai_maria', date: '19 мая, 19:00', location: 'Антикафе "Уют", СПб',
        spots: 8, spotsLeft: 5, description: 'Мафия, Уно, Монополия и многое другое. Новички ‎welcome!',
        participants: ['ai_maria', 'ai_sofia']
    },
    {
        id: 'e3', title: 'Прогулка по вечернему городу', image: null,
        organizer: 'ai_sofia', date: '20 мая, 20:00', location: 'Набережная, Казань',
        spots: 15, spotsLeft: 11, description: 'Просто гуляем, общаемся, знакомимся. Присоединяйтесь!',
        participants: ['ai_sofia']
    }
];

const MESSAGES_DATA = {
    'ai_alex': [
        { from: 'ai_alex', text: 'Привет! Видел, ты тоже в футбол играешь?', time: '14:30' },
        { from: 'me', text: 'Привет! Да, люблю иногда поиграть', time: '14:32' },
        { from: 'ai_alex', text: 'Круто! Мы завтра собираемся, хочешь присоединиться?', time: '14:33' },
        { from: 'me', text: 'Конечно, с удовольствием! Во сколько и где?', time: '14:35' },
        { from: 'ai_alex', text: '18:00, Чистые Пруды. Я создал событие — посмотри! ⚽', time: '14:36' }
    ],
    'ai_maria': [
        { from: 'ai_maria', text: 'Привет! Я видела тебя в категории "Кино". Ты какие фильмы любишь? 🎬', time: '16:10' },
        { from: 'me', text: 'Ооо, я люблю всё — от Нолана до аниме!', time: '16:15' },
        { from: 'ai_maria', text: 'Отлично! У нас в пятницу киновечер, приходи!', time: '16:16' }
    ],
    'ai_daniel': [
        { from: 'ai_daniel', text: 'Салам! Ты занимаешься спортом?', time: '10:00' },
        { from: 'me', text: 'Привет! Хожу в зал 3 раза в неделю', time: '10:05' },
        { from: 'ai_daniel', text: 'Красавчик! Я тоже. Может вместе потренируемся?', time: '10:06' }
    ],
    'ai_sofia': [
        { from: 'ai_sofia', text: 'Привет! Я София 😊 Увидела, что ты тоже интересуешься музыкой!', time: '20:00' },
        { from: 'me', text: 'Привет София! Да, слушаю много всего', time: '20:10' },
        { from: 'ai_sofia', text: 'Мы на выходных идём на концерт в парке, хочешь с нами?', time: '20:11' },
        { from: 'me', text: 'Звучит круто! Скинь детали', time: '20:12' },
        { from: 'ai_sofia', text: 'Ура! Скину завтра время и место 🎵✨', time: '20:13' }
    ]
};

const SUPPORT_POSTS = [
    { userId: 'ai_sofia', text: 'Иногда чувствую себя одиноко в новом городе. Переехала сюда месяц назад и пока не нашла близких людей. Но NearOne даёт надежду 💜', replies: 12, hugs: 28 },
    { userId: 'ai_daniel', text: 'Когда чувствуешь, что все друзья заняты — помни, что всегда есть люди, которые тоже ищут компанию. Не бойся быть первым!', replies: 8, hugs: 45 },
    { userId: 'ai_maria', text: 'Совет: если тебе грустно — просто выйди погулять и напиши сюда. Мы всегда рядом и поддержим 🤗', replies: 15, hugs: 52 }
];

const FIND_COMPANY = [
    { userId: 'ai_alex', text: 'Хочу поиграть футбол сегодня', details: 'Москва, вечер, 5 на 5. Любой уровень!', category: 'Футбол' },
    { userId: 'ai_maria', text: 'Ищу компанию в кино', details: 'СПб, пятница вечер. "Интерстеллар" на большом экране!', category: 'Кино' },
    { userId: 'ai_sofia', text: 'Кто хочет учить Python?', details: 'Онлайн, группа из 3-5 человек. Начинающий уровень', category: 'Программирование' },
    { userId: 'ai_daniel', text: 'Нужен партнёр для зала', details: 'Ташкент, утро 7:00. Силовые + кардио', category: 'Зал' }
];

const CATEGORIES = [
    { name: 'Футбол', icon: '⚽' }, { name: 'Баскетбол', icon: '🏀' }, { name: 'Зал', icon: '💪' },
    { name: 'Комп. клубы', icon: '🖥️' }, { name: 'Roblox', icon: '🎮' }, { name: 'Minecraft', icon: '⛏️' },
    { name: 'Настолки', icon: '🎲' }, { name: 'Кино', icon: '🎬' }, { name: 'Аниме', icon: '🌸' },
    { name: 'Код', icon: '💻' }, { name: 'Музыка', icon: '🎵' }, { name: 'Прогулки', icon: '🚶' },
    { name: 'Языки', icon: '🌍' }, { name: 'Бизнес', icon: '💼' }, { name: 'Стартапы', icon: '🚀' },
    { name: 'Фото', icon: '📸' }, { name: 'Авто', icon: '🚗' }, { name: 'Мото', icon: '🏍️' },
    { name: 'Психология', icon: '🧠' }, { name: 'Поддержка', icon: '❤️' }, { name: 'Путешествия', icon: '✈️' },
    { name: 'Киберспорт', icon: '🏆' }, { name: 'Учёба', icon: '📚' }, { name: 'Волонтёрство', icon: '🤝' }
];

const LEVELS = ['Новичок', 'Активный', 'Социальный', 'Популярный', 'Легенда', 'Икона сообщества'];

// Current user state
const CURRENT_USER = {
    id: 'me', name: 'Маруф', age: 20, city: 'Ташкент', country: 'Узбекистан',
    avatar: 'assets/images/daniel.png', gender: 'Мужской',
    bio: 'Создатель NearOne. Верю в настоящие связи между людьми.',
    interests: ['Программирование', 'Футбол', 'Стартапы', 'Кино', 'Музыка'],
    status: 'online', level: 5, levelName: 'Легенда', xp: 5000, xpMax: 6000,
    titles: ['Создатель', 'Легенда сообщества', 'Мотиватор'],
    achievements: [{ icon: '👑', name: 'Создатель', desc: 'Основал NearOne' }, { icon: '🔥', name: 'Максимальный уровень', desc: 'Достиг уровня Легенда' }, { icon: '💬', name: 'Общительный', desc: '1000+ сообщений' }, { icon: '🤝', name: 'Дружелюбный', desc: '50 знакомств' }],
    reputation: { friendly: 40, punctual: 35, fun: 38, safe: 42 },
    repBadges: ['дружелюбный', 'пунктуальный', 'весёлый', 'безопасный']
};

function getUserById(id) {
    if (id === 'me') return CURRENT_USER;
    return AI_USERS.find(u => u.id === id);
}
