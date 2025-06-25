import { useUserHook } from "@/lib/context/userContext"
import { useEffect } from "react";
import { useJournalHook } from "@/lib/context/journalContext";


export const useJournalActions = () => {
    //   const [journals, setJournals] = useState([]);
      const { dispatch, journals } = useJournalHook()
      const { user } = useUserHook()
      const api = import.meta.env.VITE_API_BASE_URL
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);

    const fetchJournals = async () => {
      
        try {
            const response = await fetch(`${api}/user/journals`, {
                method: "GET",
                headers: {
                    "content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const json = await response.json();
            // setJournals(json);
            dispatch({type:'SET_JOURNALS', payload: json})
        }
      catch(error){
        console.error(error)
      }
    };

    useEffect(() => {
        fetchJournals();
    }, []);
 
    const addJournal = async (title: string, text: string) => {
        try {
            const response = await fetch(`${api}/user/new-journal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ title, body: text }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const newJournal = await response.json();
            // console.log(newJournal)
            dispatch({type: 'ADD_JOURNAL', payload: newJournal})
        } catch (err) {
            console.error("Error adding journal:", err);
            throw err;
        }
    };

    const editJournal = async (id: string, title: string, text: string) => {
         try {
            const response = await fetch(`${api}/user/edit-journal/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ title, body: text }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const editedJournal = await response.json();

            dispatch({type: 'EDIT_JOURNAL', payload: editedJournal })

        } catch (err) {
            console.error("Error editing journal:", err);
            throw err;
        }
    }

    const deleteJournal = async (id: string) => {
         try {
            const response = await fetch(`${api}/user/delete-journal/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            

            dispatch({type: 'DELETE_JOURNAL', payload: id})
        } catch (err) {
            console.error("Error deleting journal:", err);
            throw err;
        }
    }

  return {
  
    journals,
     addJournal,
     editJournal,
     deleteJournal
  }
 
 


    

}