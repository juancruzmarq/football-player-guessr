import React, { useReducer, createContext, useContext, useEffect } from 'react';
import { DailyPlayers, Player } from './types/Player.type';
import { Position } from './types/Positions.type';
import { Foot } from './types/Foot.type';
import { PlayerCharacteristic } from './App';

// Crear el contexto

type State = {
    difficultySelected: string | undefined;
    characteristicSelected: PlayerCharacteristic | undefined;
    player: Player | undefined;
    dailyPlayers: DailyPlayers | undefined;
    selectedPositions: Position[] | undefined | [];
    selectedFoot: Foot | undefined;
    selectedWeight: number | undefined;
    selectedHeight: number | undefined;
    selectedNationality: string | undefined;
    selectedBirthDate: string | undefined;
    selectedValue: string;
};
const AppContext = createContext({} as { state: State; dispatch: React.Dispatch<any> });


// Estado inicial
const initialState: State = {
  difficultySelected: undefined,
  characteristicSelected: undefined,
  player: undefined,
  dailyPlayers: undefined,
  selectedPositions: [],
  selectedFoot: undefined,
  selectedWeight: undefined,
  selectedHeight: undefined,
  selectedNationality: undefined,
  selectedBirthDate: undefined,
  selectedValue: ''
};

// Reductor
function reducer(state: State, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficultySelected: action.payload,
        characteristicSelected: undefined,
        selectedPositions: [],
        selectedFoot: undefined,
        selectedWeight: undefined,
        selectedHeight: undefined,
        selectedNationality: undefined,
        selectedBirthDate: undefined,
        selectedValue: ''
    };
    case 'SET_CHARACTERISTIC':
      return { ...state, characteristicSelected: action.payload };
    case 'SET_PLAYER':
      return { ...state, player: action.payload };
    case 'SET_DAILY_PLAYERS':
      return { ...state, dailyPlayers: action.payload };
    case 'SET_SELECTED_POSITIONS':
      return { ...state, selectedPositions: action.payload };
    case 'SET_SELECTED_FOOT':
      return { ...state, selectedFoot: action.payload };
    case 'SET_SELECTED_VALUE':
      return { ...state, selectedValue: action.payload };
    case 'UPDATE_PLAYER_DETAIL':
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state;
  }
}

// Provider Component
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar el estado y el despachador en los componentes
const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
