import React from 'react';
import { CharacteristicTitle } from './CharacteristicTitle';

export const BirthDateInput = ({ selectedValue, onChange }) => {
  return (
  <div className='flex flex-col mx-auto justify-center items-center gap-4'>
    <CharacteristicTitle title='Select the birthdate of the player' />
    <input
      type='date'
      value={selectedValue}
      onChange={onChange}
      max={new Date().toISOString().split('T')[0]} // Establece la fecha máxima como hoy
      className="text-white form-input px-4 py-3 rounded-md bg-text border border-secondary focus:outline-none focus:border-secondary"
    />
  </div>
  );
};