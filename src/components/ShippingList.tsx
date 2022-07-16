import moment from 'moment';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import PassParentDimensions from 'components/utility/passParentDimensions/PassParentDimensions';

interface ShippingTableItem {
  key: string,
  date: Date,
  loadingLocation: string,
  unloadingLocation: string,
  weight: number,
  size: number,
  bodyType: string,
  price: number,
}

const columns: ColumnsType<ShippingTableItem> = [
  {
    key: 'date',
    title: 'Дата погрузки',
    ellipsis: true,
    width: 120,
    dataIndex: 'date',
    render: (date: Date) => {
      return <div>{moment(date).format('DD.MM.YYYY')}</div>
    }
  },
  {
    key: 'loadingLocation',
    title: 'Погрузка',
    ellipsis: true,
    width: 120,
    dataIndex: 'loadingLocation'
  },
  {
    key: 'unloadingLocation',
    title: 'Разгрузка',
    ellipsis: true,
    width: 120,
    dataIndex: 'unloadingLocation'
  },
  {
    key: 'weight',
    title: 'Вес, т',
    ellipsis: true,
    width: 120,
    dataIndex: 'weight'
  },
  {
    key: 'size',
    title: 'Объем, м3',
    ellipsis: true,
    width: 120,
    dataIndex: 'size'
  },
  {
    key: 'bodyType',
    title: 'Тип кузова',
    ellipsis: true,
    width: 120,
    dataIndex: 'bodyType'
  },
  {
    key: 'price',
    title: 'Цена, руб.',
    ellipsis: true,
    width: 120,
    dataIndex: 'price'
  }
];

const data: ShippingTableItem[] = [
  {
    key: '1',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '2',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '3',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '4',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '5',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '6',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '7',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '8',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '9',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '10',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '11',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '12',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '13',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '14',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '15',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '16',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    key: '17',
    date: new Date(Date.parse('2022-07-19')),
    loadingLocation: 'Тверь',
    unloadingLocation: 'Кимры',
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
];

function ShippingList() {
  return (
    <PassParentDimensions>
      {
        (_, parentHeight) => {
          // Размер заголовка таблицы. Будет работать только если не происходит динамического изменения размера
          const TABLE_HEADER_HEIGHT = 55;

          return (
            <Table
              columns={columns}
              dataSource={data}
              scroll={{
                x: true,
                y: parentHeight - TABLE_HEADER_HEIGHT,
              }}
              rowSelection={{
                type: "radio"
              }}
              pagination={false}
            />
          );
        }
      }
    </PassParentDimensions>
  );
}

export default ShippingList;