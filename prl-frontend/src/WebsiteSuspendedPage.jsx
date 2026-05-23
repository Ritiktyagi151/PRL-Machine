export default function WebsiteSuspendedPage() {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center shadow-2xl">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
          ⚠️ FRAUD COMPANY ⚠️
        </h1>

        <div className="bg-red-900/30 border-2 border-red-500 rounded-2xl p-6 mb-6">
          <p className="text-white text-2xl font-bold mb-3">Parida Red Lion</p>
          <p className="text-red-400 text-lg font-semibold">
            FRAUDULENT COMPANY - SCAM OPERATION
          </p>
        </div>

        <div className="bg-red-950/40 border-2 border-red-600 rounded-2xl p-6 mb-6">
          <p className="text-red-300 text-2xl font-bold">⛔ DO NOT INVEST ⛔</p>
        </div>

        <p className="text-zinc-400 text-sm bg-zinc-800 rounded-lg p-4">
          🚨 Report to cybercrime authorities immediately
        </p>
      </div>
    </div>
  );
}
