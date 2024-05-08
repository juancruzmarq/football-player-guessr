import React, { useState, useEffect } from 'react';
import { positions } from '../positions';
import { Position } from '../types/Positions.type';
import { CharacteristicTitle } from './CharacteristicTitle';
import { Button } from './Button';

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
        {positions.map((position) => (
          <Button
            key={position}
            className={`${localSelectedPositions.includes(position) ? 'bg-slate-500 text-white hover:bg-slate-500/50' : 'bg-slate-300 hover:bg-slate-400'}`}
            onClick={() => handlePositionClick(position)}
          >
            {position}
          </Button>
        ))}
      </div>
    </div>
    
  );
};
