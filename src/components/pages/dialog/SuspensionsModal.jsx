import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Check, X as Cross } from "lucide-react";

const SuspensionsModal = ({ players }) => {
  // 1️⃣ Yellow card suspensions (multiples of 5)
  const yellowSuspended = players
    .filter((p) => p.monthlyData[0].yellow_cards >= 5 && p.monthlyData[0].yellow_cards % 5 === 0)
    .map((p) => ({
      ...p,
      served: p.suspended?.isYellowSuspended ?? false,
    }));

  // 2️⃣ Red card suspensions
  const redSuspended = players
    .filter((p) => p.suspended?.isRedSuspended)
    .map((p) => ({
      ...p,
      served: p.suspended?.isRedSuspended ?? false,
    }));

  // 3️⃣ Players 1-2 yellows away (cards % 5 === 3 or 4)
  const yellowWarning = players
    .filter((p) => {
      const yc = p.monthlyData[0].yellow_cards;
      return yc % 5 === 3 || yc % 5 === 4;
    })
    .map((p) => ({
      ...p,
      away: 5 - (p.monthlyData[0].yellow_cards % 5), // 1 or 2 games away
    }));

    const TableRow = ({ player, type }) => (
        <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
          {/* Player column: image + name + nationality */}
          <td className="p-2 flex items-center gap-2">
            <img
              src={player.images?.[0]}
              alt={player.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <p className="text-[12px] font-bold truncate">{player.name}</p>
              <div className="flex items-center gap-1 mt-0.5 text-[10px] text-zinc-500">
                {player.nationality && (
                  <img
                    src={player.nationality}
                    alt="flag"
                    className="w-4 h-3 object-cover rounded-sm"
                  />
                )}
                <span>{player.position}</span>
              </div>
            </div>
          </td>
      
          {/* Yellow/Red cards or away */}
          {type === "yellow" && (
            <td className="p-2 text-[12px] font-bold">{player.monthlyData[0].yellow_cards}</td>
          )}
      
          {type === "red" && <td className="p-2 text-[12px] font-bold">{player.monthlyData[0].red_cards}</td>}
      
          {type === "warning" && (
            <td className="p-2 text-[12px] font-bold">{player.monthlyData[0].yellow_cards}</td>
          )}
      
          {/* Served / Away */}
          <td className="p-2 text-[12px]">
            {type === "yellow" || type === "red" ? (
              player.served ? <Check className="w-4 h-4 text-emerald-600" /> : <Cross className="w-4 h-4 text-rose-600" />
            ) : (
              <span className="text-[10px] text-zinc-500 font-bold">{player.away} away</span>
            )}
          </td>
        </tr>
      );
      

  const renderTable = (data, type, title) => (
    <div className="mb-6">
      <h3 className="text-[12px] font-black text-zinc-600 uppercase mb-2">{title}</h3>
      <div className="overflow-x-auto rounded-lg border border-zinc-100">
        <table className="w-full text-left text-[12px] border-collapse">
        <thead className="bg-zinc-100">
            <tr>
                <th className="p-2 text-left">Player</th> {/* image + name + nationality */}
                {(type === "yellow" || type === "warning") && <th className="p-2">Yellows</th>}
                {(type === "red") && <th className="p-2">Reds</th>}
                <th className="p-2">{type === "warning" ? "Away" : "Served"}</th>
            </tr>
        </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-2 text-zinc-400 text-center text-[12px]">
                  None
                </td>
              </tr>
            ) : (
              data.map((player) => <TableRow key={player.id + type} player={player} type={type} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-3 py-1 rounded-md text-[10px] font-bold transition-all shrink-0 bg-yellow-400 font-sans uppercase cursor-pointer">
          Suspensions
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] w-full">
        <DialogHeader>
          <DialogTitle>Suspensions Tracker</DialogTitle>
          <DialogDescription>
            Yellow card and red card suspensions, and warnings for players close to suspension.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-6">
          {renderTable(yellowSuspended, "yellow", "Yellow Card Suspensions")}
          {renderTable(redSuspended, "red", "Red Card Suspensions")}
          {renderTable(yellowWarning, "warning", "1-2 Yellows Away from Suspension")}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuspensionsModal;
