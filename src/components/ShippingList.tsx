import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import PassParentDimensions from 'components/utility/passParentDimensions/PassParentDimensions';
import { shippingItems, ShippingItem } from 'initialData/shippingItems';
import { locations } from 'initialData/locations';
import { formatRuDate, formatRuMoney } from 'utils/format';

interface ShippingTableLocation {
  title: string,
  latitude: number,
  longitude: number,
}

interface ShippingTableItem {
  key: string,
  date: Date,
  loadingLocation: ShippingTableLocation,
  unloadingLocation: ShippingTableLocation,
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
      return <>{formatRuDate(date)}</>
    }
  },
  {
    key: 'loadingLocation',
    title: 'Погрузка',
    ellipsis: true,
    width: 120,
    dataIndex: 'loadingLocation',
    render: (location: ShippingTableLocation) => {
      return <>{location.title}</>
    }
  },
  {
    key: 'unloadingLocation',
    title: 'Разгрузка',
    ellipsis: true,
    width: 120,
    dataIndex: 'unloadingLocation',
    render: (location: ShippingTableLocation) => {
      return <>{location.title}</>
    }
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
    dataIndex: 'price',
    render: (price: number) => {
      return <>{formatRuMoney(price)}</>
    }
  }
];

function locationIdToTableLocation(locationId: number): ShippingTableLocation | null {
  const location = locations.find(x => x.id === locationId);

  if (!location)
    return null;

  return {
    title: location.name + ' - ' + location.region,
    latitude: location.latitude,
    longitude: location.longitude
  };
}

function shippingItemToTable(shippingItem: ShippingItem): ShippingTableItem | null {
  const { id: _1, loadingLocationId, unloadingLocationId, ...restOfItem } = shippingItem;

  const loadingLocation = locationIdToTableLocation(loadingLocationId);
  const unloadingLocation = locationIdToTableLocation(unloadingLocationId);

  if (!loadingLocation || !unloadingLocation)
    return null;

  return {
    key: String(shippingItem.id),
    loadingLocation: loadingLocation,
    unloadingLocation: unloadingLocation,

    ...restOfItem
  };
}

function ShippingList() {
  const [data, setData] = useState<ShippingTableItem[]>([]);

  useEffect(() => {
    const shippingTableItems: ShippingTableItem[] = shippingItems
      .map(shippingItemToTable)
      .filter((x): x is ShippingTableItem => x !== null);

    setData(shippingTableItems);
  }, []);

  useEffect(() => {
    // TODO: селект 1ой строчки
  }, [data]);

  function onSelectedRowKeysChange(selectedRowKeys: React.Key[], selectedRows: ShippingTableItem[]) {
    if (selectedRows.length === 0)
      return;

    const tableItem = selectedRows[0];

    alert(`построить путь ${tableItem.loadingLocation.title} ${tableItem.loadingLocation.latitude}:${tableItem.loadingLocation.longitude} -> ${tableItem.unloadingLocation.title} ${tableItem.unloadingLocation.latitude}:${tableItem.unloadingLocation.longitude}`);
  }

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
                onChange: onSelectedRowKeysChange,
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