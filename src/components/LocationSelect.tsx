import { Select } from 'antd';
import type { ShippingTableLocation } from './ShippingList';

interface LocationSelectProps {
  selectedLocation: ShippingTableLocation;
  allLocations: ShippingTableLocation[];
  onChange?: (selectedLocation: ShippingTableLocation) => void;
}

function LocationSelect(props: LocationSelectProps) {
  function handleChange(value: string) {
    const location = props.allLocations.find(x => x.id === parseInt(value))!;

    if (props.onChange !== undefined) {
      props.onChange(location);
    }
  }

  const options = props.allLocations.map(x => {
    return {
      label: x.title,
      value: x.id.toString()
    };
  });

  return (
    <Select
      style={{
        width: '100%',
      }}
      defaultValue={props.selectedLocation.id.toString()}
      onChange={handleChange}
      options={options}
    />
  );
}

export default LocationSelect;