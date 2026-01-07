const MatchEvents = ({ match }) => {

    return (
        <>
            <div className="bg-white rounded-[28px] p-5 border border-zinc-100 relative overflow-hidden">
                <p className='text-xs text-black mb-2 font-bold uppercase tracking-wide'>
                    Events
                </p>

                <div className="mt-4 space-y-3">

                    {/* Match date */}
                    <div className="flex items-center gap-2">
                        <div className="h-1 w-1 bg-zinc-800 rounded-full"></div>
                        <p className="text-xs text-zinc-700 font-bold uppercase tracking-wide">
                            Match took place on {match?.date} at {match.time}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-1 w-1 bg-zinc-800 rounded-full"></div>
                        <p className="text-xs text-zinc-700 font-bold uppercase tracking-wide">
                            The weather conditions is {match?.condition}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-1 w-1 bg-zinc-800 rounded-full"></div>
                        <p className="text-xs text-zinc-700 font-bold uppercase tracking-wide">
                            The score was {match?.team1_score} - {match?.team2_score}
                        </p>
                    </div>

                    {match.events.length > 0 ? (
                        match.events.map((event, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="h-1 w-1 bg-zinc-700 rounded-full"></div>
                                <p className="text-xs text-zinc-700 font-bold uppercase tracking-wide">
                                    {event}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center gap-2">
                        <div className="h-1 w-1 bg-zinc-400 rounded-full"></div>
                        <p className="text-xs text-zinc-600 uppercase tracking-wide">
                            No events recorded
                        </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default MatchEvents
