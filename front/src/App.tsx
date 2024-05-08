import { useEffect } from 'react'
import { Countries } from './countries';
import { Difficulty } from './types/Difficulty.type';
import { PositionSelector } from './components/PositionSelector';
import { BirthDateInput } from './components/BirthdateInput';
import { FootSelector } from './components/PreferedFoot';
import { NumberInput } from './components/NumberInput';
import { Foot } from './types/Foot.type';
import { useAppContext } from './AppProvider';
import { Position } from './types/Positions.type';
import { Button } from './components/Button';
import { api } from './api/api';
import { calculatePoints } from './utils/pointsCalculator';

export type PlayerCharacteristic = {
  name: string
  apiName: string
  type: 'string' | 'number'
  placeholder: string
  renderComponent: () => JSX.Element
}

function App() {
  const { state, dispatch } = useAppContext();
  console.log(state)
  const { difficultySelected, player, dailyPlayers, selectedPositions, points, selectedFoot, selectedWeight, selectedHeight, characteristicSelected, selectedNationality, selectedBirthDate } = state;

 const handleChange = (field, value) => {
  dispatch({
    type: 'UPDATE_PLAYER_DETAIL',
    payload: { field, value }
  });
  };
  const orderedCountries = Countries.sort((a, b) => a.name.localeCompare(b.name))

  useEffect(() => {
    api.getRandomsPlayers().then((data) => {
      dispatch({ type: 'SET_DAILY_PLAYERS', payload: data })
    })
  }
  , [])

  useEffect(() => {
    // Ejemplo de cómo podrías actualizar el jugador basado en la dificultad seleccionada
    if (player && difficultySelected) {
      dispatch({ type: 'SET_PLAYER', payload: player });
    }
  }, [dailyPlayers, difficultySelected]);

  const handleDifficulty = (difficulty: Difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty })
    switch (difficulty) {
      case Difficulty.EASY:
        dispatch({ type: 'SET_PLAYER', payload: dailyPlayers?.easyPlayer })
        break
      case Difficulty.MEDIUM:
        dispatch({ type: 'SET_PLAYER', payload: dailyPlayers?.mediumPlayer })
        break
      case Difficulty.HARD:
        dispatch({ type: 'SET_PLAYER', payload: dailyPlayers?.hardPlayer })
        break
      case Difficulty.VERY_HARD:
        dispatch({ type: 'SET_PLAYER', payload: dailyPlayers?.veryHardPlayer })
        break
    }
  }


   const characteristics: PlayerCharacteristic[] = [
    {
      name: 'Nationality',
      apiName: 'nationality',
      type: 'string',
      placeholder: 'Select the player nationality',
      renderComponent: () => (
         <div className='flex justify-center gap-2'>
          <select onChange={(e) => handleChange('selectedNationality', e.target.value)} value={selectedNationality}>
            {orderedCountries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
      </div>
      )
      
    },
    {
      name: 'Height',
      apiName: 'heightCm',
      type: 'number',
      placeholder: 'Enter the height of the player',
      renderComponent: () => (
        <NumberInput
          value={selectedHeight}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('selectedHeight', e.target.value)}
          min={150}
          max={220}
          step={1}
          placeholder='Enter the height of the player'
          title={'Enter the height (cm) of the player'}
        />
      )
      
    },
    {
      name: 'Weight',
      apiName: 'weightKgs',
      type: 'number',
      placeholder: 'Enter the weight of the player',
      renderComponent: () => (
        <NumberInput
          value={selectedWeight}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('selectedWeight', e.target.value)}
          min={30}
          max={150}
          step={1}
          placeholder='Enter the weight of the player'
          title={'Enter the weight (kg) of the player'}
        />
      )
      
    },
    {
      name: 'Preferred Foot',
      apiName: 'preferredFoot',
      type: 'string',
      placeholder: 'Enter the preferred foot of the player',
      renderComponent: () => (
        <FootSelector
          onPositionChange={(foot: Foot) => handleChange('selectedFoot', foot)}
          selectedPositions={selectedFoot}
        />
      )
    },
    {
      name: 'Positions',
      apiName: 'positions',
      type: 'string',
      placeholder: 'Enter the positions of the player',
      renderComponent: () => (
         <PositionSelector
            onPositionChange={(positions: Position[]) => handleChange('selectedPositions', positions)}
            selectedPositions={selectedPositions}
          />
      )
    },
    {
      name: 'Birth Date',
      apiName: 'birthDate',
      type: 'string',
      placeholder: 'Enter the birth date of the player',
      renderComponent: () => (
        <BirthDateInput selectedValue={selectedBirthDate} onChange={(e) => handleChange('selectedBirthDate', e.target.value)} />
      )
    }
  ]

  const angle = 360 / characteristics.length

  const renderSelectedCharacteristic = () => {
    if (!characteristicSelected) {
      return <h2 className="text-xl font-bold px-4 py-2 m-4 rounded-md">Select a characteristic to guess</h2>
    }
    return characteristicSelected.renderComponent();
  };

  return (
    <div className='bg-background min-h-screen mx-auto h-full'>
      {/* Header */}
  
      <section className={`container mx-auto p-8 text-center`}>
        <h1 className="text-4xl font-bold text-text ">Football Stats Guessr</h1>
        <p className="text-text/70 font-serif">Guess the football player's characteristics</p>
      </section>

      {/* Select the difficulty of the game */}
      <section className={`container mx-auto text-center bg-slate-200 p-8 rounded-sm`}>
        <div className="flex justify-center gap-2 gap-x-10">
          <button
            className={`  text-text shadow-sm shadow-primary font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.EASY ? 'bg-slate-500 text-white' : 'bg-slate-300 hover:bg-slate-400'}`}
            onClick={() => handleDifficulty(Difficulty.EASY)}
          >
            Easy
          </button>
          <button
            className={`  text-text shadow-sm shadow-primary  font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.MEDIUM ? 'bg-slate-500 text-white' : 'bg-slate-300 hover:bg-slate-400'}`}
            onClick={() => handleDifficulty(Difficulty.MEDIUM)}
          >
            Medium
          </button>
          <button
            className={`  text-text shadow-sm shadow-primary  font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.HARD ? 'bg-slate-500 text-white' : 'bg-slate-300 hover:bg-slate-400'}`}
            onClick={() => handleDifficulty(Difficulty.HARD)}
          >
            Hard
          </button>
          <button
            className={`  text-text shadow-sm shadow-primary  font-bold py-2 px-6 rounded ${difficultySelected === Difficulty.VERY_HARD ? 'bg-slate-500 text-white' : 'bg-slate-300 hover:bg-slate-400'}`}
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
          <div className="absolute inset-0 bg-slate-100/20 backdrop-blur-sm z-30"></div>
        )}
        {/* Game content */}
        <section className={`flex flex-col text-center gap-11 my-10 items-center`}>
          {player ? (
            <div className="inline-flex flex-col items-center bg-slate-500 text-white px-4 py-2  justify-center rounded-lg gap-2">
              <h2 className="text-2xl font-bold">{player?.name}</h2>
              <p className="text-sm font-mono">{player?.fullName}</p>
          </div>
          ) : (
            <div className="inline-flex flex-col items-center bg-slate-500 text-white px-4 py-2  justify-center rounded-lg gap-2">
              <h2 className="text-2xl font-bold ">Not Player Selected</h2>
              <p className="text-sm font-mono">Not Player Selected</p>
            </div>
          )}
          <div className="w-80 h-80 bg-slate-400 rounded-full mx-auto relative flex items-center justify-center shadow-lg">
            {
                  player  && player.photoUrl !== "" && (
                    <img
                      src={player.photoUrl}
                      alt={player.fullName}
                      className="w-64 h-w-64 rounded-full drop-shadow-xl backdrop-brightness-50 backdrop-contrast-75"/>
                  )
                }
            {characteristics.map((char: PlayerCharacteristic, index: number) => (
              <div
                key={index}
                className="absolute"
                style={{
                  transform: `rotate(${index * angle}deg) translate(170px) rotate(-${index * angle}deg)`
                }}
              >
                
              <Button
                onClick={() => dispatch({ type: 'SET_CHARACTERISTIC', payload: char })}
                disabled={!difficultySelected}
                key={char.name}
                className={`${characteristicSelected?.name === char.name ? 'bg-slate-500 text-white' : 'bg-slate-300 hover:bg-slate-400'}`}
              >
              {char.name}
              </Button>
              </div>
            ))}
          </div>
        </section>
        
        {/* Input of the user */}
        <section className={`text-center bg-slate-200 items-center p-2`}>
          <div className="flex justify-center gap-2">
            {renderSelectedCharacteristic()}
          </div>
        </section>
      </div>

      {/* Submit button */}
      <section className={`container mx-auto text-center bg-slate-200 p-8 rounded-sm`}>
        {
          player && (
             <Button
              onClick={() => dispatch({ type: 'CALCULATE_POINTS'})}
              disabled={!characteristicSelected}
              className={`${characteristicSelected ? 'bg-slate-500 text-white' : 'bg-slate-300 hover:bg-slate-400'}`}
            >
              Submit
            </Button>
          )
        }
        {
          points !== undefined && (
            <div className="text-center">
              <h2 className="text-2xl font-bold">Points</h2>
              <p className="text-4xl font-bold">{points}</p>
            </div>
          )
        }
      </section>
    </div>
  )
}

export default App
