import { useContext } from 'react';
import { GlobalStateContext } from '@/globalStateContent';

export const useGlobalStateContext = () => {
  const context = useContext(GlobalStateContext)
  if (!context) {
    throw new Error("useGlobalStateContext must be used in GlobalStateProvider!");
  }
  return context
}
