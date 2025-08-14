# Executive Portfolio — v2 (Brand + Bio + i18n + Availability)

## Шинэ Feature-үүд
- **Брэнд палитр + Лого**: `assets/styles.css`-ийн `:root{ --brand-* }` утгуудыг өөрчлөөд брэнддээ тааруул.
- **Executive Bio**: Нүүр дээр `Захирлын товч намтар` блок (зураг, нэр, албан тушаал, bullet).
- **i18n (MN/EN)**: `assets/app.js` доторх `I18N` объект — `data-i18n`/`data-i18n-ph` атрибутуудтай элементүүд автоматаар орчуулагдана. LocalStorage-д хадгална.
- **Availability check**: Цаг товлох үед `Calendar` sheet-ийн slot + `Appointments`-ийн эзэлэлтийг шалгана. Дүүрсэн/хаалттай бол message буцааж, submit-ийг хаана.

## Google Sheets бүтэц
- **News**: Title, Summary, Category, Date, ImageURL, LinkURL, Published
- **Projects**: Title, Category, Status, Location, CoverURL, StartDate, Budget, LinkURL, Featured, Published
- **Calendar**: Date, Time, Capacity, Status, Note
  - Жишээ: `2025-08-15 | 10:00 | 2 | Open | Morning slots`
- **Appointments**: Timestamp, Name, Phone, Email, Date, Time, Service, Message, Page, Status
- **Feedback**: Timestamp, Name, Phone, Email, Rating, Message, Page

> Хэрэв `Calendar`-т мөр байхгүй бол тухайн цаг **Capacity=1, Open** гэж үзээд, `Appointments`-ийн давхардлыг шалгана.

## Apps Script
1. `apps_script/Code.gs`-ийг хуулж тавиад `SPREADSHEET_ID`-г өөрийн Sheet ID-р солино.
2. Deploy → Web app → Execute as: Me; Who has access: Anyone → Deploy.
3. Гарсан Web App URL-ийг `assets/app.js` → `API_BASE`-д оруул.

### POST actions
- `checkAvailability` — { date, time, service? } → { ok, message, capacity, taken }
- `bookAppointment` — form submit (дотроо дахин шалгана)

## Brand солих
- `assets/styles.css` дахь `--brand-600` зэргийг өөрчил.
- `assets/logo.svg`-ийг өөрийн логоор солиод л болно (нэрийг ижил үлдээгээрэй).

## i18n нэмэх
- `I18N` объектод шинэ түлхүүрүүдийг (mn/en) ижил нэршлээр нэмэхэд л хангалттай.
- HTML дээр текст оруулахад `data-i18n="key"`, placeholder-д `data-i18n-ph="key"` ашиглана.

Азтай!