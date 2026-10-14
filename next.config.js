/** @type {import('next').NextConfig} */

// Старі адреси послуг з UUID -> ЧПУ (раніше були в public/_redirects)
const SERVICE_UUIDS = [
  ["adb69206-ca61-499e-be74-9a5e20b0ece9", "likuvannya-kanaliv", "root-canal-treatment"],
  ["f1f8b7da-6771-4ac5-9af4-cb7158f83c24", "konsultaciya-stomatologa", "dental-consultation"],
  ["2ea61115-67b4-4b99-8b39-9e19e68c101e", "dytyacha-stomatologiya", "pediatric-dentistry"],
  ["7a0dc235-4755-4a33-9081-32f9dd0bd6f9", "terapevtychna-stomatologiya", "general-dentistry"],
  ["831d0d69-1b94-4791-88a5-121c345b60c8", "implantaciya-zubiv", "dental-implants"],
  ["bdf1e15a-49e8-4c0e-9605-2c18a21a46f4", "vypravlennya-prikusu", "bite-correction"],
  ["66dc34a7-232d-4a19-b30b-c2b412e7afd9", "konsultaciya-z-grudnogo-vygodovuvannya", "breastfeeding-consultation"],
  ["819cb2aa-956b-4e07-8019-dd373485dd15", "likuvannya-pid-narkozom", "treatment-under-anesthesia"],
  ["2e0f0583-17a1-4fe1-872d-b16f5aa76f57", "vydalennya-zubiv", "dental-surgery"],
  ["b69865ce-d3c2-4e0a-8191-0b96428b19b6", "protezuvannya-zubiv", "dental-prosthetics"],
  ["580fa779-d1c1-4111-be47-eab3dbb9031a", "estetychna-stomatolohiia", "aesthetic-dentistry"],
  ["959ed98e-0b59-4d89-81a5-4b1f43ba0677", "kt-zubiv", "dental-ct"],
];

// Старі слаги лікарів -> нові (ua -> /ua/likari, en -> /en/doctors)
const DOCTOR_SLUGS = [
  ["Gerasimenko Alina Konstantinovna", "herasymenko-alina"],
  ["Zhadko Kateryna Oleksandrivna", "zhadko-kateryna"],
  ["Kyrychok Alena Oleksandrivna", "kyrychok-alona"],
  ["Klymenko Vladyslav Oleksandrovych", "klymenko-vladyslav"],
  ["Leonchuk Maksym Dmytrovych", "leonchuk-maksym"],
  ["Poberezhnyk Olga Viktorovna", "poberezhnyk-olha"],
  ["Potikha Svetlana Serhiivna", "potikha-svitlana"],
  ["Malysheva Victoria Oleksandrivna", "sych-viktoriia"],
  ["Tertichna Alena Leonidovna", "tertychna-alona"],
  ["Umanets Alina Vadymivna", "umanets-alina"],
  ["Kharchenko-Maryna-Vasylivna", "kharchenko-maryna"],
];

const permanent = (source, destination) => ({ source, destination, statusCode: 301 });

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: false,
  eslint: { ignoreDuringBuilds: true },
  // Критичний CSS вбудовується в HTML, решта стилів вантажиться без блокування першого показу
  experimental: { optimizeCss: true },
  env: {
    NEXT_PUBLIC_HASURA_ENDPOINT:
      process.env.NEXT_PUBLIC_HASURA_ENDPOINT ||
      process.env.REACT_APP_HASURA_ENDPOINT ||
      "https://hasura.toothfairy.clinic/v1/graphql",
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || process.env.REACT_APP_GA_ID || "",
  },
  // Аліас @app/* береться з tsconfig.paths.json
  webpack(config, { isServer, webpack }) {
    // Полифіли для старих браузерів не потрібні сучасним (PageSpeed: "Устаревший код JavaScript")
    if (!isServer) {
      config.plugins.push(new webpack.NormalModuleReplacementPlugin(/[\\/]build[\\/]polyfills[\\/]polyfill-module/, require.resolve("./src/empty-polyfills.js")));
    }
    // SVG як React-компоненти: import { ReactComponent as Icon } from "./icon.svg"
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));
    if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i;
    config.module.rules.push({
      test: /\.svg$/i,
      use: [{ loader: "@svgr/webpack", options: { exportType: "named", namedExport: "ReactComponent", svgo: false } }],
    });
    return config;
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/sitemap.xml", destination: "https://api.toothfairy.clinic/.netlify/functions/sitemap" },
      ],
    };
  },
  async redirects() {
    const rules = [permanent("/", "/ua")];
    for (const [uuid, ua, en] of SERVICE_UUIDS) {
      rules.push(permanent(`/ua/services/${uuid}`, `/ua/services/${ua}`));
      rules.push(permanent(`/en/services/${uuid}`, `/en/services/${en}`));
    }
    rules.push(permanent("/ua/services/viniry", "/ua/services/estetychna-stomatolohiia"));
    rules.push(permanent("/en/services/veneers", "/en/services/aesthetic-dentistry"));
    for (const [old, slug] of DOCTOR_SLUGS) {
      const encoded = encodeURIComponent(old);
      rules.push(permanent(`/ua/doctors/${encoded}`, `/ua/likari/${slug}`));
      rules.push(permanent(`/en/doctors/${encoded}`, `/en/doctors/${slug}`));
    }
    rules.push(permanent("/ua/likari/malyshcheva-viktoriia", "/ua/likari/sych-viktoriia"));
    rules.push(permanent("/en/doctors/malyshcheva-viktoriia", "/en/doctors/sych-viktoriia"));
    rules.push(permanent("/ua/doctors", "/ua/likari"));
    rules.push(permanent("/ua/doctors/:slug*", "/ua/likari/:slug*"));
    rules.push(permanent("/en/likari", "/en/doctors"));
    rules.push(permanent("/en/likari/:slug*", "/en/doctors/:slug*"));
    rules.push(permanent("/uk-UA/:path*", "/ua/:path*"));
    rules.push(permanent("/uk/:path*", "/ua/:path*"));
    return rules;
  },
};

module.exports = nextConfig;
