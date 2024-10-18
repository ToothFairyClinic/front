import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Підтвердити": "Submit",
          "Коментар": "Comment",
          "Введіть ваш відгук": "Enter your review",
          "Телефон": "Phone",
          "Введіть ваше телефон": "Enter your phone number",
          "Ім'я": "Name",
          "Введіть ваше ім'я": "Enter your name",
          "Упс, спалася помилка": "Oops, an error occurred",
          "Спробуйте трохи пізніше": "Try again later",
          "Нажаль тут пусто": "Unfortunately, it's empty here",
          "Відгук": "Review",
          "Відгуки": "Reviews",
          "Наші попередні відгуки доступні": "Our previous reviews are available",
          "Тут": "here",
          "Прайс лист": "Price list",
          "Роботи": "Portfolio ",
          "Контакти": "Contacts ",
          "Головна": "Home",
          "Послуги": "Services",
          "Персонал": "Personnel",
          "ПН-СБ": "Mon-Sat",
          "Зубна Фея": "Tooth Fairy",
          "Cтоматологія, в якій безпечно та в комфортних умовах лікують зубки діти та їх батьки!": "Stomatology, where children and their parents treat their teeth safely and in comfortable conditions!",
          "Наші переваги": "Our advantages",
          "Комплексний підхід до лікування проблем із зубами у будь-якому віці.": "A comprehensive approach to the treatment of dental problems at any age.",
          "Ендодонтичне лікування у пацієнтів будь-якого віку": "Endodontic treatment in patients of any age",
          "Можливість оформлення розстрочки на лікування безпосередньо в клініці": "It is possible to arrange treatment in installments directly in the clinic",
          "Протезування  тимчасових зубів естетичними та металевими коронками різної складності": "Prosthetics of temporary teeth with aesthetic and metal crowns of various complexity",
          "Лікування зубів у стані анестезіологічного забезпечення (наркозу)": "Dental treatment under anesthesia",
          "Протезування постійних зубів естетичними цирконієвими і керамічними коронками": "Prosthetics of permanent teeth with aesthetic zirconium and ceramic crowns",
          "Ортодонтичне лікування з використанням брекет систем, елайнерів, пластинок.": "Orthodontic treatment using bracket systems, aligners, plates.",
          "Хірургія будь якої складності, встановлення імплантів, видалення зубів мудрості.": "Surgery of any complexity, installation of implants, removal of wisdom teeth.",
          "Наші послуги": "Our services",
          "Ендодонтія": "Endodontics",
          "Ортодонтія": "Orthodontics",
          "Спеціаліст з грудного вигодовування": "Breastfeeding specialist",
          "Наркоз": "Narcosis",
          "Терапія": "Therapy",
          "Імплантація": "Implantation",
          "Хірургія": "Surgery",
          "Ортопедія": "Orthopedics",
          "Естетична стоматологія": "Aesthetic dentistry",
          "Кабінет комп'ютерної томографії, ТРГ, ОПТГ": "Office of computer tomography, TRG, OPTG",
          "Консультація": "Consultation",
          "Харченко Марина Василівна": "Maryna Vasylivna Kharchenko",
          "Малишева Вікторія Олександрівна": "Malysheva Victoria Oleksandrivna",
          "Герасименко Аліна Костянтинівна ": "Alina Kostyantynivna Gerasimenko ",
          "Драган Олена Юріївна": "Olena Yurievna Dragan",
          "Клименко Владислав Олександрович": "Klymenko Vladyslav Oleksandrovych",
          "Леончук Максим Дмитрович": "Maksym Dmytrovych Leonchuk",
          "Тертична Альона Леонідівна": "Tertychna Alyona Leonidivna",
          "Серостанова Анна Валентинівна": "Serostanova Anna Valentinivna",
          "Семененко Анастасія Анатоліївна": "Semenenko Anastasia Anatolyivna",
          "Огай Олена Анатоліївна ": "Ogai Olena Anatolyivna ",
          "Уманець Аліна  Вадимівна ": "Umanets Alina Vadimovna ",
          "Киричок Альона Олександрівна": "Alyona Oleksandrivna Kyrychok",
          "Побережник Ольга Вікторівна": "Poberezhnyk Olga Viktorivna",
          " головний лікар": "chief physician",
          "дитячий стоматолог": "children's dentist",
          "дитячий лікар стоматолог": "pediatric dentist dentist",
          "підлітковий": "teenage",
          "дорослий лікар стоматолог": "dentist doctor for adults",
          "ендодонтист": "endodontist",
          "хірург": "surgeon",
          "ортопед": "orthopaedist",
          "лікар ортодонт": "orthodontist",
          "акушер": "obstetrician",
          "консультант з грудного вигодовування": "breastfeeding consultant",
          "лікар анестезіолог-реаніматолог": "doctor anesthesiologist-reanimatologist",
          "Дитячий стоматолог": "Children's dentist",
          "Імплантологія": "Implantology",
          "Інші": "Others",
          "Наші роботи": "Our works",
          "Приклад роботи": "Example of work",
          "Результат ортодонтичного лікування": "The result of orthodontic treatment",
          "Естетично-керамічна коронка": "Aesthetic ceramic crown",
          "Лікування дитини в умовах наркозу": "Treatment of a child under anesthesia",
          "Київська область, Біла Церква, Вокзальна 22": "Kyiv region, Bila Tserkva, Vokzalna 22",
          "Ціна": "Price",
          "Назва": "Name",
          "Наша команда": "Our team",
          "<p>Вас почав турбувати зубний біль? Однією з причин зубного болю може бути пульпіт. Пульпіт – це запалення пульпи (судинно-нервового пучка) через проникнення в неї бактерій.</p><p>ㅤ</p><p>В клініці «Зубна фея» використовуються сучасні методи ендодонтичного лікування, де кожна процедура проводиться під збільшенням, а саме за допомогою певної оптики та мікроскопу. Це забезпечує неймовірну точність у виконанні усіх робіт.</p><p>ㅤ</p><p>Чому мікроскоп? Усе легко! За допомогою мікроскопу лікар чудово бачить структуру кореневих каналів, а це величезний крок до видалення запалених нервів без ускладнень. Такий підхід дозволяє досягти високих стандартів якості та надійності у лікування кореневих каналів.</p><p>ㅤ</p><p>Сучасні та якісні мікроскопи нашої клініки дозволяють нашім лікарям:</p><p>▫️ лікувати канали будь-якого розміру</p><p>▫️ лікувати складні пульпіти та періодонтити</p><p>▫️ лікувати канали після попереднього невдалого лікування (без мікроскопа)</p><p>ㅤ</p><p>Також за потреби лікар може не лише зазирнути в канал, але й зробити фото або відео, що є дуже важливим в складних випадках, коли потрібна консультація декількох спеціалістів.</p><p>ㅤ</p><p>Лінзи наших мікроскопів виготовлені зі скла високої якості SCHOTT (Німеччина) з багатошаровим покриттям, допомагають візуалізувати тканини зуба чітко та без викривлення кольорів.</p><p>ㅤ</p><p>Обираючи клініку «Зубна фея» - ви обираєте найкраще для своєї посмішки!</p><p>Для вашої зручності, вас проконсультують наші адміністратори. Телефонуйте за номерами:</p><p>📲 +38 (093) 459 99 11 📲 +38 (068) 168 99 11</p>":"<p>Are you experiencing toothache? One of the causes of toothache could be pulpitis. Pulpitis is inflammation of the pulp (vascular-nerve bundle) due to bacterial penetration.</p><p>ㅤ</p><p>At the 'Tooth Fairy' clinic, we use modern endodontic treatment methods, where each procedure is performed under magnification, using specific optics and a microscope. This ensures incredible precision in performing all the work.</p><p>ㅤ</p><p>Why a microscope? It's easy! With the help of the microscope, the doctor can clearly see the structure of the root canals, which is a huge step toward removing inflamed nerves without complications. This approach allows us to achieve high standards of quality and reliability in root canal treatment.</p><p>ㅤ</p><p>Our clinic's modern and high-quality microscopes allow our doctors to:</p><p>▫️ treat canals of any size</p><p>▫️ treat complex pulpitis and periodontitis</p><p>▫️ treat canals after previous unsuccessful treatments (without a microscope)</p><p>ㅤ</p><p>If necessary, the doctor can not only examine the canal but also take photos or videos, which is crucial in complex cases when multiple specialists' consultations are needed.</p><p>ㅤ</p><p>The lenses of our microscopes are made of high-quality SCHOTT glass (Germany) with multi-layer coating, helping to visualize tooth tissues clearly and without color distortion.</p><p>ㅤ</p><p>By choosing the 'Tooth Fairy' clinic, you're choosing the best for your smile!</p><p>For your convenience, our administrators will consult you. Call the numbers:</p><p>📲 +38 (093) 459 99 11 📲 +38 (068) 168 99 11</p>"
        },
      },
      uk: {
        translation: {
          "Підтвердити": "Підтвердити",
          "Коментар": "Коментар",
          "Введіть ваш відгук": "Введіть ваш відгук",
          "Телефон": "Телефон",
          "Введіть ваше телефон": "Введіть ваше телефон",
          "Ім'я": "Ім'я",
          "Введіть ваше ім'я": "Введіть ваше ім'я",
          "Упс, спалася помилка": "Упс, спалася помилка",
          "Спробуйте трохи пізніше": "Спробуйте трохи пізніше",
          "Нажаль тут пусто": "Нажаль тут пусто",
          "Відгук": "Відгук",
          "Відгуки": "Відгуки",
          "Наші попередні відгуки доступні": "Наші попередні відгуки доступні",
          "Тут": "Тут",
          "Прайс лист": "Прайс лист",
          "Роботи": "Роботи",
          "Контакти": "Контакти ",
          "Головна": "Головна",
          "Послуги": "Послуги",
          "Персонал": "Персонал",
          "ПН-СБ": "ПН-СБ",
          "Зубна Фея": "Зубна Фея",
          "Cтоматологія, в якій безпечно та в комфортних умовах лікують зубки діти та їх батьки!": "Cтоматологія, в якій безпечно та в комфортних умовах лікують зубки діти та їх батьки!",
          "Наші переваги": "Наші переваги",
          "Комплексний підхід до лікування проблем із зубами у будь-якому віці.": "Комплексний підхід до лікування проблем із зубами у будь-якому віці.",
          "Ендодонтичне лікування у пацієнтів будь-якого віку": "Ендодонтичне лікування у пацієнтів будь-якого віку",
          "Можливість оформлення розстрочки на лікування безпосередньо в клініці": "Можливість оформлення розстрочки на лікування безпосередньо в клініці",
          "Протезування  тимчасових зубів естетичними та металевими коронками різної складності": "Протезування  тимчасових зубів естетичними та металевими коронками різної складності",
          "Лікування зубів у стані анестезіологічного забезпечення (наркозу)": "Лікування зубів у стані анестезіологічного забезпечення (наркозу)",
          "Протезування постійних зубів естетичними цирконієвими і керамічними коронками": "Протезування постійних зубів естетичними цирконієвими і керамічними коронками",
          "Ортодонтичне лікування з використанням брекет систем, елайнерів, пластинок.": "Ортодонтичне лікування з використанням брекет систем, елайнерів, пластинок.",
          "Хірургія будь якої складності, встановлення імплантів, видалення зубів мудрості.": "Хірургія будь якої складності, встановлення імплантів, видалення зубів мудрості.",
          "Наші послуги": "Наші послуги",
          "Ендодонтія": "Ендодонтія",
          "Ортодонтія": "Ортодонтія",
          "Спеціаліст з грудного вигодовування": "Спеціаліст з грудного вигодовування",
          "Наркоз": "Наркоз",
          "Терапія": "Терапія",
          "Хірургія": "Хірургія",
          "Імплантація": "Імплантація",
          "Ортопедія": "Ортопедія",
          "Естетична стоматологія": "Естетична стоматологія",
          "Кабінет комп'ютерної томографії, ТРГ, ОПТГ": "Кабінет комп'ютерної томографії, ТРГ, ОПТГ",
          "Консультація": "Консультація",
          "Харченко Марина Василівна": "Харченко Марина Василівна",
          "Малишева Вікторія Олександрівна": "Малишева Вікторія Олександрівна",
          "Герасименко Аліна Костянтинівна ": "Герасименко Аліна Костянтинівна ",
          "Драган Олена Юріївна": "Драган Олена Юріївна",
          "Клименко Владислав Олександрович": "Клименко Владислав Олександровича",
          "Леончук Максим Дмитрович": "Леончук Максим Дмитрович",
          "Тертична Альона Леонідівна": "Тертична Альона Леонідівна",
          "Серостанова Анна Валентинівна": "Серостанова Анна Валентинівна",
          "Семененко Анастасія Анатоліївна": "Семененко Анастасія Анатоліївна",
          "Огай Олена Анатоліївна ": "Огай Олена Анатоліївна ",
          "Уманець Аліна  Вадимівна ": "Уманець Аліна  Вадимівна ",
          "Киричок Альона Олександрівна ": "Киричок Альона Олександрівна",
          "Побережник Ольга Вікторівна": "Побережник Ольга Вікторівна",
          " головний лікар": " головний лікар",
          "дитячий стоматолог": "дитячий стоматолог",
          "дитячий лікар стоматолог": "дитячий лікар стоматолог",
          "підлітковий": "підлітковий",
          "дорослий лікар стоматолог": "дорослий лікар стоматолог",
          "ендодонтист": "ендодонтист",
          "хірург": "хірург",
          "ортопед": "ортопед",
          "лікар ортодонт": "лікар ортодонт",
          "акушер": "акушер",
          "консультант з грудного вигодовування": "консультант з грудного вигодовування",
          "лікар анестезіолог-реаніматолог": "лікар анестезіолог-реаніматолог",
          "Дитячий стоматолог": "Дитячий стоматолог",
          "Імплантологія": "Імплантологія",
          "Інші": "Інші",
          "Наші роботи": "Наші роботи",
          "Приклад роботи": "Приклад роботи",
          "Результат ортодонтичного лікування": "Результат ортодонтичного лікування",
          "Естетично-керамічна коронка": "Естетично-керамічна коронка",
          "Лікування дитини в умовах наркозу": "Лікування дитини в умовах наркозу",
          "Київська область, Біла Церква, Вокзальна 22": "Київська область, Біла Церква, Вокзальна 22",
          "Ціна": "Ціна",
          "Назва": "Назва",
          "Наша команда": "Наша команда",
          "<p>Вас почав турбувати зубний біль? Однією з причин зубного болю може бути пульпіт. Пульпіт – це запалення пульпи (судинно-нервового пучка) через проникнення в неї бактерій.</p><p>ㅤ</p><p>В клініці «Зубна фея» використовуються сучасні методи ендодонтичного лікування, де кожна процедура проводиться під збільшенням, а саме за допомогою певної оптики та мікроскопу. Це забезпечує неймовірну точність у виконанні усіх робіт.</p><p>ㅤ</p><p>Чому мікроскоп? Усе легко! За допомогою мікроскопу лікар чудово бачить структуру кореневих каналів, а це величезний крок до видалення запалених нервів без ускладнень. Такий підхід дозволяє досягти високих стандартів якості та надійності у лікування кореневих каналів.</p><p>ㅤ</p><p>Сучасні та якісні мікроскопи нашої клініки дозволяють нашім лікарям:</p><p>▫️ лікувати канали будь-якого розміру</p><p>▫️ лікувати складні пульпіти та періодонтити</p><p>▫️ лікувати канали після попереднього невдалого лікування (без мікроскопа)</p><p>ㅤ</p><p>Також за потреби лікар може не лише зазирнути в канал, але й зробити фото або відео, що є дуже важливим в складних випадках, коли потрібна консультація декількох спеціалістів.</p><p>ㅤ</p><p>Лінзи наших мікроскопів виготовлені зі скла високої якості SCHOTT (Німеччина) з багатошаровим покриттям, допомагають візуалізувати тканини зуба чітко та без викривлення кольорів.</p><p>ㅤ</p><p>Обираючи клініку «Зубна фея» - ви обираєте найкраще для своєї посмішки!</p><p>Для вашої зручності, вас проконсультують наші адміністратори. Телефонуйте за номерами:</p><p>📲 +38 (093) 459 99 11 📲 +38 (068) 168 99 11</p>":"<p>Вас почав турбувати зубний біль? Однією з причин зубного болю може бути пульпіт. Пульпіт – це запалення пульпи (судинно-нервового пучка) через проникнення в неї бактерій.</p><p>ㅤ</p><p>В клініці «Зубна фея» використовуються сучасні методи ендодонтичного лікування, де кожна процедура проводиться під збільшенням, а саме за допомогою певної оптики та мікроскопу. Це забезпечує неймовірну точність у виконанні усіх робіт.</p><p>ㅤ</p><p>Чому мікроскоп? Усе легко! За допомогою мікроскопу лікар чудово бачить структуру кореневих каналів, а це величезний крок до видалення запалених нервів без ускладнень. Такий підхід дозволяє досягти високих стандартів якості та надійності у лікування кореневих каналів.</p><p>ㅤ</p><p>Сучасні та якісні мікроскопи нашої клініки дозволяють нашім лікарям:</p><p>▫️ лікувати канали будь-якого розміру</p><p>▫️ лікувати складні пульпіти та періодонтити</p><p>▫️ лікувати канали після попереднього невдалого лікування (без мікроскопа)</p><p>ㅤ</p><p>Також за потреби лікар може не лише зазирнути в канал, але й зробити фото або відео, що є дуже важливим в складних випадках, коли потрібна консультація декількох спеціалістів.</p><p>ㅤ</p><p>Лінзи наших мікроскопів виготовлені зі скла високої якості SCHOTT (Німеччина) з багатошаровим покриттям, допомагають візуалізувати тканини зуба чітко та без викривлення кольорів.</p><p>ㅤ</p><p>Обираючи клініку «Зубна фея» - ви обираєте найкраще для своєї посмішки!</p><p>Для вашої зручності, вас проконсультують наші адміністратори. Телефонуйте за номерами:</p><p>📲 +38 (093) 459 99 11 📲 +38 (068) 168 99 11</p>"
        },
      },
    },
    lng: localStorage.getItem('language') || 'uk', // Використовуйте мову з localStorage
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React вже екранує, тому це не потрібно
    },
  });

export default i18n;