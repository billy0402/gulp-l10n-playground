const { src, dest, series } = require('gulp');
const l10n = require('gulp-l10n');

const localeOptions = {
  native: 'en',
};

const extractOptions = {
  native: 'en',
  elements: [
    'title',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'small',
    'a',
    'button',
    'span',
    'li',
  ],
  attributes: ['alt', 'title'],
};

async function loadLocales() {
  // Prior to localization, pipe your locales to the setLocales method
  src('locales/*.json').pipe(l10n.setLocales(localeOptions));
}

async function localize() {
  // Files piped to the plugin are localized and cloned to a separate subdirectory
  // for each locale. e.g.: 'index.html' > 'de/index.html'
  src('src/**/*.html').pipe(l10n.extract(extractOptions)).pipe(dest('dist'));
}

const defaultTask = series(loadLocales, localize);

exports.default = defaultTask;
