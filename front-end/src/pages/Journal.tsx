import  { useParams } from "react-router"
import { useEffect, useState } from "react";
import { useJournalHook } from "@/lib/context/journalContext";
import { Mic, MicOff, Save, Trash } from "lucide-react";
import { useJournalActions } from "@/hooks/useJournal";
import { useNavigate } from "react-router";

let mediaRecorderRef: MediaRecorder | null = null;
let socketRef: WebSocket | null = null;
let streamRef: MediaStream | null = null;

const JournalPage = () => {
    // const [currentJournal, setCurrentJournal] = useState(null)
  const [recording, setRecording] = useState(false);
     const [edit, setEdit] = useState({
      title: '',
      body: ''
    })
    const { id } = useParams()
      const { journals } =  useJournalHook()
      const { editJournal, deleteJournal } = useJournalActions()
      const navigate  = useNavigate()

  const key = import.meta.env.VITE_DEEPGRAM;



   const handleRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef = mediaRecorder;

      const socket = new WebSocket("wss://api.deepgram.com/v1/listen", [
        "token",
        key,
      ]);
      socketRef = socket;

      socket.onopen = () => {
        mediaRecorder.addEventListener("dataavailable", (event) => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(event.data);
          }
        });
        mediaRecorder.start(100);
      };

      const fullMessage: string[] = edit.body ? [edit.body] : [""];

      socket.onmessage = (message) => {
        const receivedMessage = JSON.parse(message.data);
        const transcript = receivedMessage.channel.alternatives[0].transcript;

        if (transcript && transcript.trim() !== "") {
          fullMessage.push(transcript);
          const filteredMessage = fullMessage.filter((t) => t !== "");
          setEdit((prev) => ({...prev, body: filteredMessage.join(" ").trim()}));
        }
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Error starting recording:", error);
      // Clean up if there's an error
      stopRecording();
    }
  };

  const stopRecording = () => {
    // 1. Stop MediaRecorder (if exists)
    if (mediaRecorderRef && mediaRecorderRef.state !== "inactive") {
      mediaRecorderRef.stop(); // Stops recording
      mediaRecorderRef = null;
    }

    // 2. Close WebSocket (if open)
    if (socketRef && socketRef.readyState === WebSocket.OPEN) {
      socketRef.close(); // Closes Deepgram connection
      socketRef = null;
    }

    // 3. Stop microphone tracks (if stream exists)
    if (streamRef) {
      streamRef.getTracks().forEach((track) => track.stop());
      streamRef = null;
    }

    setRecording(false); // Update UI state
  };


 
    
        useEffect(()=>{
            
            if( id && journals.length > 0){
                const foundJournal = journals.find((journal)=> journal._id === id ) 
                // setCurrentJournal(foundJournal)
                setEdit(foundJournal)
            }
        }, [id, journals])
        
        if(!edit){
            return <div className=' fixed top-0 left-0 right-0 p-5 min-h-screen bg-[#131019]  flex flex-col text-white text-center text-2xl'>Loading journal...</div>
        }
  return (
    <div className=' text-white fixed top-0 left-0 right-0 p-5 min-h-screen bg-[#131019]  flex flex-col'>
       

        <input
        className="text-purple-300 text-2xl border-b p-2 w-full"
         type="text"
        placeholder="title"
         value={edit.title || ''}
          onChange={(e) => {
            setEdit((prev)=> ({...prev, title: e.target.value}))
          }}   
          />
         


        <textarea
        className="text-white  p-2 min-h-100"
         placeholder="body"
          value={edit.body || ''} 
            onChange={(e) => {
            setEdit((prev)=> ({...prev, body: e.target.value}))
          }}     
          />

          <div className="flex  gap-4 flex-row justify-evenly  items-center  mt-2">
            <button className="border border-white cursor-pointer flex p-2  rounded-md bg-[#131019] " onClick={()=> {
              editJournal(id, edit.title, edit.body)
                navigate('/dashboard');
            }}>
              <Save />
            </button>
            
            <button className="border  border-white cursor-pointer flex p-2  rounded-md bg-[#131019] ">
            {!recording ? (
                    <Mic
                      className="h-8 w-8"
                      onClick={() => {
                        setRecording(true);
                        handleRecording();
                      }}
                    />
                  ) : (
                    <MicOff className="h-8 w-8" onClick={stopRecording} />
                  )}
            </button>
            
            <button className="border border-white cursor-pointer flex p-2  rounded-md bg-[#131019]" onClick={()=> {
              deleteJournal(id)
                navigate('/dashboard');

            }}> 
              <Trash />
            </button>
          </div>
    </div>
  )
}

export default JournalPage