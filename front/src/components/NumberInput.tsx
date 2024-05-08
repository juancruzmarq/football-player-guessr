import { Foot } from '../types/Foot.type';
import { foots } from '../foots';
import { CharacteristicTitle } from './CharacteristicTitle';


export const NumberInput = ({ value,  onChange, min, max, step, placeholder, title }) => {
  return (
    <div className='flex flex-col mx-auto justify-center items-center gap-4' key={title}>
    <CharacteristicTitle title={title} />
    <input
     value={value}
      type="number"
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      className="form-input px-6 py-2 rounded-md border border-secondary bg-text text-white font-bold focus:outline-none focus:border-secondary"
    />
    </div>
  );
};
