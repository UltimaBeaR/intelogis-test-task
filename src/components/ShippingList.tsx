import { useEffect, useMemo, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import PassParentDimensions from 'components/utility/passParentDimensions/PassParentDimensions';
import { formatRuDate, formatRuMoney } from 'utils/format';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectShippingItem, changeLocation } from 'store/shippings/actionCreators';
import { getAllShippingItems, getAllLocations, ShippingItemWithLocation } from 'store/shippings/selectors';
import { Location } from 'store/domainTypes';
import LocationSelect from './LocationSelect';

export interface ShippingTableLocation {
  id: number,
  title: string
}

export interface ShippingTableItem {
  key: string,
  date: Date,
  loadingLocation: ShippingTableLocation,
  unloadingLocation: ShippingTableLocation,
  weight: number,
  size: number,
  bodyType: string,
  price: number,
}

function locationToTableLocation(location: Location): ShippingTableLocation {
  return {
    id: location.id,
    title: location.name + ' - ' + location.region
  };
}

function shippingItemToTable(shippingItem: ShippingItemWithLocation): ShippingTableItem {
  const { id: _1, loadingLocation, unloadingLocation, dateTimestamp, ...restOfItem } = shippingItem;

  return {
    key: String(shippingItem.id),
    loadingLocation: locationToTableLocation(loadingLocation),
    unloadingLocation: locationToTableLocation(unloadingLocation),
    date: new Date(dateTimestamp),

    ...restOfItem
  };
}

function ShippingList() {
  const [data, setData] = useState<ShippingTableItem[]>([]);

  const shippingItems = useAppSelector(getAllShippingItems);
  const locations = useAppSelector(getAllLocations);

  const [selectedRowKey, setSelectedRowKey] = useState('');

  const tableLocations = useMemo(() => {
    return locations.map(locationToTableLocation);
  }, [locations]);

  useEffect(() => {
    const shippingTableItems: ShippingTableItem[] = shippingItems
      .map(shippingItemToTable);

    setData(shippingTableItems);
  }, [shippingItems]);
  
  const dispatch = useAppDispatch();

  function handleSelectedRowKeysChange(selectedRowKeys: React.Key[], selectedRows: ShippingTableItem[]) {
    if (selectedRows.length === 0)
      return;

    const tableItem = selectedRows[0];

    dispatch(selectShippingItem(parseInt(tableItem.key)));

    setSelectedRowKey(tableItem.key);
  }

  function handleLocationChange(rowKey: string, location: ShippingTableLocation, isLoadingLocation: boolean) {
    dispatch(changeLocation(parseInt(rowKey), location.id, isLoadingLocation));
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
      render: (location: ShippingTableLocation, row: ShippingTableItem) => {
        if (selectedRowKey === row.key)
          return <LocationSelect selectedLocation={location} allLocations={tableLocations} onChange={(location) => handleLocationChange(row.key, location, true)} />;
        else
          return <>{location.title}</>;
      }
    },
    {
      key: 'unloadingLocation',
      title: 'Разгрузка',
      ellipsis: true,
      width: 120,
      dataIndex: 'unloadingLocation',
      render: (location: ShippingTableLocation, row: ShippingTableItem) => {
        if (selectedRowKey === row.key)
          return <LocationSelect selectedLocation={location} allLocations={tableLocations} onChange={(location) => handleLocationChange(row.key, location, false)} />;
        else
          return <>{location.title}</>;
      }
    },
    {
      key: 'weight',
      title: 'Вес, т',
      ellipsis: true,
      width: 120,
      dataIndex: 'weight',
      render: (weight: number) => {
        return <>{weight.toFixed(1)}</>
      }
    },
    {
      key: 'size',
      title: 'Объем, м3',
      ellipsis: true,
      width: 120,
      dataIndex: 'size',
      render: (size: number) => {
        return <>{size.toFixed(1)}</>
      }
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
                onChange: handleSelectedRowKeysChange,
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