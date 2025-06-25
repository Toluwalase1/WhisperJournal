import AsideComp from "@/components/Aside";
import { Mic } from "lucide-react";
import { Link } from "react-router";
import moment from "moment";
import { useUserHook } from "@/lib/context/userContext";
import { formatDate } from "@/lib/utils/formatDate";
import { useJournalActions } from "@/hooks/useJournal";

const DashboardPage = () => {
  const { user } = useUserHook();
  const { journals } = useJournalActions();

  return (
    <div className="bg-[#1C1D1E]">
      <AsideComp />
      <div className="text-white min-h-screen mx-auto w-[70%] md:w-[80%] max-[500px]:ms-20  pt-5 p-2">
        <div className="header  flex  justify-between items-center px-5">
          <div className="flex flex-col">
            <span>Hello, {user.user.split(" ")[0]}.</span>
            <span> {moment().format("MMMM Do, YYYY.")} </span>
          </div>
          <div className="bg-[#BB85FB] rounded-full size-10 flex justify-center items-center cursor-pointer ">
            <Link to={"/entries"}>
              <Mic />
            </Link>
          </div>
        </div>
        <div className="border text-black border-green-500 flex flex-col  p-2 gap-2 w-[90%] mx-auto mt-10">
          <h1 className="text-center text-white font-bold text-2xl mb-5">
            Your Journal Entries
          </h1>
          {journals.length === 0 && (
            <div className="text-center p-4 text-gray-400">
              No journal entries found. Start writing your first entry!
            </div>
          )}

          {journals.length > 0 && (
            <div className="flex flex-col space-y-4  **:cursor-pointer">
              {journals.map((journal) => (
                <Link to={`/journal/${journal._id}`} key={journal._id}>
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
                    {journal.updatedAt &&
                      journal.updatedAt !== journal.createdAt && (
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
  );
};

export default DashboardPage;
