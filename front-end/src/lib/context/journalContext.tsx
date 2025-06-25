import { createContext, useReducer, useContext  } from "react";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const JournalContext = createContext<any>(undefined);  

const initialState = {
    journals: []
};

function journalReducer(state:typeof initialState, action:any) {
    switch (action.type) {
        case 'SET_JOURNALS':
            return {
                journals: action.payload
            };
        case 'ADD_JOURNAL':
            return {
                journals: [action.payload, ...state.journals]
            };
        case 'DELETE_JOURNAL':
        return {
                journals: state.journals.filter((journ) => journ._id !== action.payload)
        }
         case 'EDIT_JOURNAL':
      return {
        journals: state.journals.map(journal => 
          journal._id === action.payload._id ? action.payload : journal
        )
      };
        case 'CLEAR_JOURNAL':
            return {
                journals: []
            }
        default:
            return state;
    }
}

export const JournalContextProvider = ({ children }:Props) => {  
    const [state, dispatch] = useReducer(journalReducer, initialState);

    return (
        <JournalContext.Provider value={{ ...state, dispatch }}>   
            {children}
        </JournalContext.Provider>
    );
};

export const useJournalHook = () => {
    const context = useContext(JournalContext)

    if(!context){
        throw Error('useJournalHook must be used inside a journalProvider')
    }
    return context
}