import React, { useState, useEffect } from 'react';
import { positions } from '../positions';
import { Position } from '../types/Positions.type';
import { CharacteristicTitle } from './CharacteristicTitle';

export const PositionSelector = ({ onPositionChange, selectedPositions }) => {
  const [localSelectedPositions, setLocalSelectedPositions] = useState<Position[]>([]);

  useEffect(() => {
    setLocalSelectedPositions(selectedPositions);
  }, [selectedPositions]);

  const handlePositionClick = (position: Position) => {
    if (localSelectedPositions.includes(position)) {
      const newSelectedPositions = localSelectedPositions.filter(pos => pos !== position);
      setLocalSelectedPositions(newSelectedPositions);
      onPositionChange(newSelectedPositions);
    } else {
      const newSelectedPositions = [...localSelectedPositions, position];
      setLocalSelectedPositions(newSelectedPositions);
      onPositionChange(newSelectedPositions);
    }
  };

  return (
    <div>
      <CharacteristicTitle title='Select the position of the player' />
      <div className='grid grid-cols-5 gap-2 justify-center items-center mx-auto'>
        {positions.map((position, index) => (
          <button
            key={index}
            className={`rounded text-white font-bold py-2 px-6 ${localSelectedPositions.includes(position) ? 'bg-secondary hover:bg-secondary/50' : 'bg-text hover:bg-text/50'}`}
            onClick={() => handlePositionClick(position)}
          >
            {position}
          </button>
        ))}
      </div>
    </div>
    
  );
};
