import { useEffect, useState } from 'react'
import { DailyPlayers, Player } from './types/Player.type';
import axios from 'axios'

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  VERY_HARD = 'very_hard',
}

// positions 
//   CM  
// CB     
// ST     
// CDM    
// LM     
// RM     
// CAM    
// GK     
// RB     
// LB     
// LW      
// RW      
// CF      
// RWB     
// LWB     

export enum Position {
  CM = 'CM',
  CB = 'CB',
  ST = 'ST',
  CDM = 'CDM',
  LM = 'LM',
  RM = 'RM',
  CAM = 'CAM',
  GK = 'GK',
  RB = 'RB',
  LB = 'LB',
  LW = 'LW',
  RW = 'RW',
  CF = 'CF',
  RWB = 'RWB',
  LWB = 'LWB',
}

export type PlayerCharacteristic = {
  name: string
  apiName: string
  type: 'string' | 'number'
  placeholder: string
  component?: (props: any) => JSX.Element
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
  const debug = false
  const border = 'border border-red-400'

  const positions: Position[] = [
    Position.CM,
    Position.CB,
    Position.ST,
    Position.CDM,
    Position.LM,
    Position.RM,
    Position.CAM,
    Position.GK,
    Position.RB,
    Position.LB,
    Position.LW,
    Position.RW,
    Position.CF,
    Position.RWB,
    Position.LWB,
  ]
  
  const characteristics: PlayerCharacteristic[] = [
    {
      name: 'Nationality',
      apiName: 'nationality',
      type: 'string',
      placeholder: 'Select the player nationality',
      component: (props: any) => (
        <div className='flex justify-center gap-2'>
          <select >
          <option value="Argentina">Argentina</option>
          <option value="Brazil">Brazil</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="Italy">Italy</option>
          <option value="Portugal">Portugal</option>
          <option value="Spain">Spain</option>
          <option value="United States">United States</option>
          </select>
         
        </div>
      )
    },
    {
      name: 'Height',
      apiName: 'heightCm',
      type: 'number',
      placeholder: 'Enter the height of the player',
      component: (props: any) => (
        <div>
        <input {...props} step="1" type='number' placeholder='Enter the height of the player' max={250} min={110} defaultValue={160} key='height'/>
      
        </div>
        
      )
    },
    {
      name: 'Weight',
      apiName: 'weightKgs',
      type: 'number',
      placeholder: 'Enter the weight of the player',
      component: (props: any) => (
        <div>
        <input {...props} step="1" type='number' placeholder='Enter the weight of the player' max={200} min={40} defaultValue={70} key='weight'/>
        <button
              className={`bg-green-400 text-white p-2 font-bold rounded ${!characteristicSelected ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-green-500'}`}
              disabled={!characteristicSelected}
            >
              Submit
        </button>
        </div>
      )
    },
    {
      name: 'Preferred Foot',
      apiName: 'preferredFoot',
      type: 'string',
      placeholder: 'Enter the preferred foot of the player',
      component: (props: any) => (
        <div className='flex justify-center gap-2'>
          <button className='rounded bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6' value='Left'>Left</button>
          <button className='rounded bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6' value='Right'>Right</button>
        </div>
      )
    },
    {
      name: 'Positions',
      apiName: 'positions',
      type: 'string',
      placeholder: 'Enter the positions of the player',
      component: (props: any) => (
        <div className='grid grid-cols-5 gap-2'>
          {positions.map((position: Position, index: number) => (
            <button
              key={index}
              className={`rounded bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6`}
              value={position}
            >
              {position}
            </button>
          ))}
        </div>
      )
    },
    {
      name: 'Birth Date',
      apiName: 'birthDate',
      type: 'string',
      placeholder: 'Enter the birth date of the player'
    }
  ]

  useEffect(() => {
    api.getTodayDailyPlayers().then((data) => {
      setDailyPlayers(data)
      console.log(data)
    })
  }
  , [])

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


  const angle = 360 / characteristics.length

  return (
    <>
      <section className={`container mx-auto p-4 mt-2 bg-green-200/40 text-center`}>
        <h1 className="text-4xl font-bold ">Football Guessr</h1>
        <p className="">Guess the football player's characteristics</p>
      </section>

      {/* Select the difficulty of the game */}
      <section className={`container mx-auto text-center bg-green-300/40 p-4`}>
        <h2 className="text-2xl font-bold">Select the difficulty</h2>
        <div className="flex justify-center gap-2 mt-8 gap-x-10">
          <button
            className={`bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.EASY ? 'bg-green-600' : ''}`}
            onClick={() => handleDifficulty(Difficulty.EASY)}
          >
            Easy
          </button>
          <button
            className={`bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.MEDIUM ? 'bg-green-600' : ''}`}
            onClick={() => handleDifficulty(Difficulty.MEDIUM)}
          >
            Medium
          </button>
          <button
            className={`bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.HARD ? 'bg-green-600' : ''}`}
            onClick={() => handleDifficulty(Difficulty.HARD)}
          >
            Hard
          </button>
          <button
            className={`bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.VERY_HARD ? 'bg-green-600' : ''}`}
            onClick={() => handleDifficulty(Difficulty.VERY_HARD)}
          >
            Very Hard
          </button>
        </div>
      </section>

      {/* Game sections */}
      <div className="relative container mx-auto">
        {/* Blur overlay */}
        {!difficultySelected && (
          <div className="absolute bg-white/20 backdrop-blur-md z-30 p-24 w-full h-full"></div>
        )}
        {/* Game content */}
        <section className={`text-center mt-8 p-4`}>
          {player ? (
            <h2 className="text-2xl font-bold mb-4">{player?.fullName}</h2>
          ) : (
            <h2 className="text-2xl font-bold mb-4">Player Not Selected</h2>
          )}
          <div className="w-80 h-80 bg-green-200/40 rounded-full mx-auto relative flex items-center justify-center border-green-700/40 border">
            {characteristics.map((char: PlayerCharacteristic, index: number) => (
              <div
                key={index}
                className="absolute"
                style={{
                  transform: `rotate(${index * angle}deg) translate(150px) rotate(-${index * angle}deg)`
                }}
              >
                <button 
                  className={`bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-6 rounded ${characteristicSelected?.name === char.name ? 'bg-green-600' : ''}`}
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
        <section className={`text-center  p-4`}>
          {!characteristicSelected ? (
            <h2 className="text-2xl font-bold p-5">Select a characteristic</h2>
          ) : (
            <h2 className="text-2xl font-bold p-5">{characteristicSelected.placeholder}</h2>
          )}
          <div className="flex justify-center gap-2">
            {characteristicSelected && (characteristicSelected.component ? (
              characteristicSelected.component({
                className: `bg-green-200/40 p-2 rounded ${border}`
              })
            ) : (
              <input
                type={characteristicSelected?.type}
                placeholder={characteristicSelected?.placeholder}
                className={`${border}`}
              />
            ))}
            
          </div>
        </section>
      </div>
    </>
  )
}

export default App
