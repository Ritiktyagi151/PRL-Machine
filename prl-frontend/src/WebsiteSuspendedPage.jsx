export default function WebsiteSuspendedPage() {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center shadow-2xl">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
          Website Under Maintenance
        </h1>

        <p className="text-zinc-300 text-lg leading-8 mb-8">
          We're currently performing scheduled maintenance to improve your
          experience. The website will be back online shortly.
        </p>

        <div className="bg-zinc-800/70 border border-zinc-700 rounded-2xl p-5 mb-8">
          <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">
            Please Check Back Soon
          </p>

          <p className="text-white text-base leading-7">
            Thank you for your patience while we make improvements.
          </p>
        </div>

        <p className="text-zinc-500 text-sm mt-10">
          We appreciate your understanding.
        </p>
      </div>
    </div>
  );
}
