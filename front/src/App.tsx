import { useEffect, useState } from 'react'
import { DailyPlayers, Player } from './types/Player.type';
import axios from 'axios'
import { Countries } from './countries';
import { Position } from './types/Positions.type';
import { Difficulty } from './types/Difficulty.type';
import { positions } from './positions';

export type PlayerCharacteristic = {
  name: string
  apiName: string
  type: 'string' | 'number'
  placeholder: string
  component?: JSX.Element
}

const url = 'http://localhost:3000/'

export const api = {
  getTodayDailyPlayers: async () => {
    const response = await axios.get<DailyPlayers>(`${url}players/today-daily-players`)
    return response.data
  },
  getPlayers: async (name: string) => {
    const response = await axios.get<Player[]>(`${url}players?name=${name}`)
    return response.data
  }
}

function App() {
  const [difficultySelected, setDifficultySelected] = useState<Difficulty>()
  const [characteristicSelected, setCharacteristicSelected] = useState<PlayerCharacteristic>()
  const [player, setPlayer] = useState<Player>()
  const [dailyPlayers, setDailyPlayers] = useState<DailyPlayers>()
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([])


  const debug = false
  const border = 'border border-red-400'
  const orderedCountries = Countries.sort((a, b) => a.name.localeCompare(b.name))


  const handlePosition = (position: Position) => {
    setSelectedPositions((prevPositions) => {
    const index = prevPositions.indexOf(position);
    if (index !== -1) {
      // Si la posición ya está seleccionada, la eliminamos
      return prevPositions.filter((_, i) => i !== index);
    } else {
      // Si la posición no está, la añadimos al final del array
      return [...prevPositions, position];
    }

  });
  }

  useEffect(() => {
    api.getTodayDailyPlayers().then((data) => {
      setDailyPlayers(data)
    })
  }
  , [])

  useEffect(() => {
    
  }, [selectedPositions])

  const handleDifficulty = (difficulty: Difficulty) => {
    setDifficultySelected(difficulty)
    switch (difficulty) {
      case Difficulty.EASY:
        setPlayer(dailyPlayers?.easyPlayer)
        break
      case Difficulty.MEDIUM:
        setPlayer(dailyPlayers?.mediumPlayer)
        break
      case Difficulty.HARD:
        setPlayer(dailyPlayers?.hardPlayer)
        break
      case Difficulty.VERY_HARD:
        setPlayer(dailyPlayers?.veryHardPlayer)
        break
    }
  }



   const characteristics: PlayerCharacteristic[] = [
    {
      name: 'Nationality',
      apiName: 'nationality',
      type: 'string',
      placeholder: 'Select the player nationality',
      component: 
        <div className='flex justify-center gap-2'>
          <select >
            {orderedCountries.map((country, index) => (
              <option key={index}>
                {country.name}</option>
            ))}
          </select>
        </div>
      
    },
    {
      name: 'Height',
      apiName: 'heightCm',
      type: 'number',
      placeholder: 'Enter the height of the player',
      component:
        <div>
        <input step="1" type='number' placeholder='Enter the height of the player' max={250} min={110} defaultValue={160} key='height'/>
        </div>
      
    },
    {
      name: 'Weight',
      apiName: 'weightKgs',
      type: 'number',
      placeholder: 'Enter the weight of the player',
      component: 
        <div className='flex justify-center gap-2'>
        <input step="1" type='number' placeholder='Enter the weight of the player' max={200} min={40} defaultValue={70} key='weight'/>
        <button
              className={`bg-green-400 text-white p-2 font-bold rounded ${!characteristicSelected ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-green-500'}`}
              disabled={!characteristicSelected}
            >
              Submit
        </button>
        </div>
      
    },
    {
      name: 'Preferred Foot',
      apiName: 'preferredFoot',
      type: 'string',
      placeholder: 'Enter the preferred foot of the player',
      component: 
        <div className='flex justify-center gap-2'>
          <button className='rounded bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6' value='Left'>Left</button>
          <button className='rounded bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6' value='Right'>Right</button>
        </div>
      
    },
    {
      name: 'Positions',
      apiName: 'positions',
      type: 'string',
      placeholder: 'Enter the positions of the player',
      component:
        <div className='grid grid-cols-5 gap-2'>
          {positions.map((position: Position, index: number): JSX.Element =>
            <button
              key={index}
              className={`rounded bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6 ${selectedPositions.includes(position) ? 'bg-green-800' : ''}`}
              onClick={() => handlePosition(position)}
            >
              {position}
            </button>
          )}      
        </div>
      
    },
    {
      name: 'Birth Date',
      apiName: 'birthDate',
      type: 'string',
      placeholder: 'Enter the birth date of the player',
      component: 
        <div className='flex justify-center gap-2' key={characteristicSelected?.name}>
          <input  type='date' placeholder='Enter the birth date of the player' key='birthDate' max={new Date().toISOString().split('T')[0]} />
        </div>
      
    }
  ]

  const angle = 360 / characteristics.length

  return (
    
    <div className='bg-green-200/60 min-h-screen mx-auto h-full'>
      {/* Header */}
  
      <section className={`container mx-auto p-8 text-center`}>
        <h1 className="text-4xl font-bold ">Football Stats Guessr</h1>
        <p className="text-black/70 font-serif">Guess the football player's characteristics</p>
      </section>

      {/* Select the difficulty of the game */}
      <section className={`container mx-auto text-center bg-green-300/40 p-8 rounded-sm`}>
        <div className="flex justify-center gap-2 gap-x-10">
          <button
            className={` hover:bg-green-700 text-white font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.EASY ? 'bg-green-800' : 'bg-green-500'}`}
            onClick={() => handleDifficulty(Difficulty.EASY)}
          >
            Easy
          </button>
          <button
            className={` hover:bg-green-700 text-white font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.MEDIUM ? 'bg-green-800' : 'bg-green-500'}`}
            onClick={() => handleDifficulty(Difficulty.MEDIUM)}
          >
            Medium
          </button>
          <button
            className={` hover:bg-green-700 text-white font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.HARD ? 'bg-green-800' : 'bg-green-500'}`}
            onClick={() => handleDifficulty(Difficulty.HARD)}
          >
            Hard
          </button>
          <button
            className={` hover:bg-green-700 text-white font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.VERY_HARD ? 'bg-green-800' : 'bg-green-500'}`}
            onClick={() => handleDifficulty(Difficulty.VERY_HARD)}
          >
            Very Hard
          </button>
        </div>
      </section>

      {/* Game sections */}
      <div className="relative container mx-auto mt-12">
        {/* Blur overlay */}
        {!difficultySelected && (
          <div className="absolute bg-green-200/10 backdrop-blur-sm z-30 p-24 w-full h-full"></div>
        )}
        {/* Game content */}
        <section className={`text-center`}>
          {player ? (
            <h2 className="text-2xl font-bold mb-8">{player?.fullName}</h2>
          ) : (
            <h2 className="text-2xl font-bold mb-8">Player Not Selected</h2>
          )}
          <div className="w-80 h-80 bg-green-200/40 rounded-full mx-auto relative flex items-center justify-center border-green-700/40 border">
            {characteristics.map((char: PlayerCharacteristic, index: number) => (
              <div
                key={index}
                className="absolute"
                style={{
                  transform: `rotate(${index * angle}deg) translate(170px) rotate(-${index * angle}deg)`
                }}
              >
                <button 
                  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded ${characteristicSelected?.name === char.name ? 'bg-green-800' : ''}`}
                  onClick={() => setCharacteristicSelected(char)}
                  disabled={!difficultySelected}
                >
                  {char.name}
                </button>
                
              </div>
            ))}
          </div>
        </section>

        {/* Input of the user */}
        <section className={`text-center bg-green-300/40 mt-8 p-4`}>
          {!characteristicSelected ? (
            <h2 className="text-2xl font-bold">Select a characteristic</h2>
          ) : (
            <h2 className="text-2xl font-bold">{characteristicSelected.placeholder}</h2>
          )}
          <div className="flex justify-center gap-2 mt-4" key={characteristicSelected?.name}>
            {characteristicSelected && (characteristicSelected.component ? (
              characteristicSelected.component
            ): (
              <input
                type={characteristicSelected?.type}
                placeholder={characteristicSelected?.placeholder}
              />
            ))}
          </div>
        </section>
      </div>
    </div>

  )
}

export default App
