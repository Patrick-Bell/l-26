import { Calendar } from 'lucide-react';
import { allMatches } from '../../api/Matches';
import { useNavigate } from 'react-router-dom';

const MatchAwards = () => {

    const navigate = useNavigate()

    const records = [
        {
            title: 'First Game Played',
            subtitle: 'All Time',
            icon: <Calendar className="w-4 h-4" />,
            match: {
              number: 1,
              date: '01-01-2026'
            }
          },
    ]


  if (!records.length) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3 px-4">
        <div className="p-2 bg-zinc-900 rounded-lg">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-base font-black uppercase tracking-tighter italic">
          Match Records
        </h2>
      </div>

      <div className="px-4">
        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-600">
                  Record
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-600">
                  Date
                </th>
                <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-600">
                  Match
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr
                  key={index}
                  className="border-b border-zinc-100 last:border-b-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="text-zinc-600">{record.icon}</div>
                      <div>
                        <div className="text-sm font-bold text-zinc-900">
                          {record.title}
                        </div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-semibold">
                          {record.subtitle}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm font-semibold">
                  {new Date(record.match.date).toLocaleDateString()}
                  </td>

                  <td onClick={() => navigate(`/matches/${record.match.number}`)} className="px-4 py-3 text-right text-sm font-bold cursor-pointer">
                    {record.match.number}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MatchAwards;
