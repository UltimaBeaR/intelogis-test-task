import moment from 'moment';

const rubCurrencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  currencyDisplay: 'code'
});

export function formatRuMoney(value: number) {
  return rubCurrencyFormatter.format(value)
    .replace('RUB', '')
    .trim();
}

export function formatRuDate(date: Date) {
  return moment(date).format('DD.MM.YYYY');
}