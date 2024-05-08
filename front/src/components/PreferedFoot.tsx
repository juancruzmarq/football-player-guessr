import React, { useState, useEffect } from 'react';
import { Foot } from '../types/Foot.type';
import { foots } from '../foots';
import { CharacteristicTitle } from './CharacteristicTitle';

export const FootSelector = ({ onPositionChange, selectedPositions }) => {
  const [localSelectedFoot, setLocalSelectedFoot] = useState<Foot>();

  useEffect(() => {
    setLocalSelectedFoot(selectedPositions);
  }, [selectedPositions]);

  const handlePositionClick = (foot: Foot) => {
    if (localSelectedFoot === foot) {
      setLocalSelectedFoot(undefined);
      onPositionChange(undefined);
    } else {
      setLocalSelectedFoot(foot);
      onPositionChange(foot);
    }
  };


  return (
    <div className='flex flex-col mx-auto justify-center items-center gap-2'>
      <CharacteristicTitle title='Select the prefered foot of the player' />
      <div className='flex justify-center gap-2'>
      {foots.map((foot, index) => (
        <button
          key={index}
          className={`rounded text-xl text-white font-bold py-2 px-6 ${localSelectedFoot?.includes(foot) ? 'bg-slate-500 hover:bg-slate-500/50' : 'bg-slate-300 hover:bg-slate-400'}`}
          onClick={() => handlePositionClick(foot)}
        >
          {foot}
        </button>
      ))}
      </div>
    </div>
  );
};
