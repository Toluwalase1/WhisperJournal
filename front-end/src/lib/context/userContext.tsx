import { createContext, useContext,  useEffect,  useReducer,  type ReactNode } from "react";


export const UserContext = createContext<any>(undefined);

const initialState = {
    user: null
};

function userReducer(state: typeof initialState, action:any){
    switch (action.type) {
         case 'LOGIN':
            return{
              user: action.payload
            }
         case 'LOGOUT':
            return{
              user: null
            }
    
        default:
            return state
            
    }
    
}

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    useEffect(()=>{
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        dispatch({type:'LOGIN', payload: user})
        console.log('current auth context', user)
    }, [])



    return (
       <UserContext.Provider value={{...state, dispatch}}>
        {children}
       </UserContext.Provider>
    );
};

// creating custom hook to use UseContext
export const useUserHook = () => {
    const context = useContext(UserContext)
    if(!context){
        throw Error('useUserHook must be used inside a UserProvider')
    }
    return context
}