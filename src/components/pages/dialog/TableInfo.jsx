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
import { Info } from "lucide-react";

const TableInfo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
            <Info />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>League Table Information</DialogTitle>
          <DialogDescription>
            Learn how the table works and what each position means.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-[12px] text-zinc-700">
          {/* Positions */}
          <div>
            <h4 className="font-bold mb-2 text-zinc-900">Positions & Colors</h4>
            <ul className="space-y-1">
              <li><span className="inline-block w-3 h-3 bg-amber-400 mr-2 rounded-full" />Winner (Champion)</li>
              <li><span className="inline-block w-3 h-3 bg-zinc-300 mr-2 rounded-full" />Runner Up</li>
              <li><span className="inline-block w-3 h-3 bg-orange-400 mr-2 rounded-full" />Third</li>
              <li><span className="inline-block w-3 h-3 bg-blue-400 mr-2 rounded-full" />Top 10</li>
              <li><span className="inline-block w-3 h-3 bg-emerald-400 mr-2 rounded-full" />11-15</li>
              <li><span className="inline-block w-3 h-3 bg-red-400 mr-2 rounded-full" />Relegation</li>
            </ul>
          </div>

          {/* Ranking Logic */}
          <div>
            <h4 className="font-bold mb-2 text-zinc-900">How Rankings Are Determined</h4>
            <p>Players are ranked based on the following criteria (in order):</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li><strong>PTS:</strong> Total points earned</li>
              <li><strong>PTS per Game:</strong> Points divided by games played</li>
              <li><strong>MOTM:</strong> Number of "Man of the Match" awards in month</li>
              <li><strong>Discipline:</strong> Least amount of yellow cards</li>
            </ol>
          </div>

          {/* Extra Notes */}
          <div>
            <h4 className="font-bold mb-2 text-zinc-900">Additional Notes</h4>
            <p className="text-zinc-600">
              - If teams are tied after all criteria, the tie-breaker is determined by clean sheets.
              <br />
              - The final decider will be using the random generator.
              <br />
              - Minimum of 5 points is required.
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TableInfo;
