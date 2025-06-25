import AsideComp from "@/components/Aside";
import { MicOff, Mic, Save, Activity } from "lucide-react";
import { useUserHook } from "@/lib/context/userContext";
import {  useState } from "react";
import { formatDate } from "@/lib/utils/formatDate";
import { useJournalActions } from "@/hooks/useJournal";
import { useJournalHook } from "@/lib/context/journalContext";
import { Link } from "react-router";

let mediaRecorderRef: MediaRecorder | null = null;
let socketRef: WebSocket | null = null;
let streamRef: MediaStream | null = null;
const EntriesPage = () => {
  const { user } = useUserHook();
  const {  addJournal } = useJournalActions()
  const { journals } =  useJournalHook()
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
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

      const fullMessage: string[] = text ? [text] : [""];

      socket.onmessage = (message) => {
        const receivedMessage = JSON.parse(message.data);
        const transcript = receivedMessage.channel.alternatives[0].transcript;

        if (transcript && transcript.trim() !== "") {
          fullMessage.push(transcript);
          const filteredMessage = fullMessage.filter((t) => t !== "");
          setText(filteredMessage.join(" ").trim());
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

  const validateEntry = () => {
        if(!title){
          alert('Title cannot be empty')
          return;
        }

        if(!text){
          alert('Text cannot be empty')
          return;
        }
  }

  return (
    <div className="bg-[#1C1D1E] ">
      <AsideComp />
      <div className="text-black min-h-screen mx-auto w-[80%] md:w-[80%]  pt-5 p-2 max-[500px]:ms-20 max-[500px]:me-100">
        {/* Entry Container */}
        <div className=" p-2 flex flex-col gap-6 text-white">
          <div className="text-2xl sm:text-4xl  text-center font-bold ">
            Welcome back, {user.user.split(" ")[0]}! 🌟
          </div>
          
          <div className=" grid grid-cols-1 sm:grid-cols-2 p-2 gap-5">
            <div className="bg-[#131019]  flex flex-col items-center gap-4 rounded-sm p-1">
              <h1 className="text-3xl text-center font-bold">
                Your Journal Entry
              </h1>
              {/* Recording button */}
              <div className="flex flex-col items-center gap-2">
                <button
                  className="bg-[#BB85FB] rounded-full size-10 flex justify-center items-center cursor-pointer"
                  // onClick={startListening}
                >
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
                <span>
                  {`Click to ${!recording ? "start" : "stop"} voice recording`}
                </span>
              </div>
              {/* Text Input */}
              <div className=" w-[90%]">
                <label htmlFor="JournalTitle">Title</label>
                <input
                  type="text"
                  name="JournalTitle"
                  placeholder="Title your entry"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className=" w-full mb-3 bg-white border-purple-200 focus:border-purple-400 focus:ring-purple-400 text-purple-800 placeholder:text-purple-400 rounded p-1"
                  id=""
                />
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your thoughts, feelings, or experiences here..."
                  className="min-h-[200px] w-full bg-white border-purple-200 focus:border-purple-400 focus:ring-purple-400 text-purple-800 placeholder:text-purple-400 rounded-md p-2"
                />
              </div>
              {/* Buttons */}
              <div className="flex flex-col mb-2 gap-4">
                <button className="border border-white cursor-pointer flex p-3 gap-2 rounded-md bg-[#131019] hover:scale-105" onClick={()=> {
                  validateEntry()
                  addJournal(title, text)
                  setTitle('')
                  setText('')
                }}>
                  <Save /> Save Journal
                </button>
                <button className="border border-white cursor-pointer flex p-3 gap-2 rounded-md bg-[#131019] hover:scale-105">
                  <Activity /> Journal Analysis
                </button>
              </div>
            </div>
            {/* Meant to be for AI Analysis */}
            <div className=" bg-[#131019] rounded-sm p-1">
              <h1 className="text-3xl text-center font-bold">
                Journal Analysis
              </h1>
              <div className="p-5">Entry from ai</div>
              <h1 className="text-center">Coming soon....</h1>
            </div>
          </div>
          <div className=" text-black  flex flex-col  p-2 gap-2 w-[90%] mx-auto ">
            <h1 className="text-center text-white font-bold text-2xl">
              Recent Journal Entries
            </h1> 
           
             { 
             journals.length === 0 && (
              <div className="text-center p-4 text-gray-400">
                No journal entries found. Start writing your first entry!
              </div>
            )}
            
            { journals.length > 0 && (
              <div
                 className="flex flex-col space-y-4   **:cursor-pointer w-[100%] h-[100%]">
                {journals.map((journal) => (
                     <Link to={`/journal/${journal._id}`} key={journal._id} >
                        <div 
                          key={journal._id} 
                          className="border border-white rounded-lg p-4 bg-[#131019] hover:bg-[#1a1520] transition-colors text-wrap "
                        
                        >
                          <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-purple-300">
                              {journal.title}
                            </h3>
                            <span className="text-sm text-gray-400">
                              {formatDate(journal.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-200 leading-relaxed break-words overflow-wrap-anywhere hyphens-auto">
                              {journal.body}
                          </p>
                          {journal.updatedAt && journal.updatedAt !== journal.createdAt && (
                            <p className="text-xs text-gray-500 mt-2">
                              Updated: {formatDate(journal.updatedAt)}
                            </p>
                          )}
                        </div>
                      </Link>

                ))}
              </div>

            )}
          </div>
          
          </div>
        </div>
      </div>
  );
};
export default EntriesPage;

