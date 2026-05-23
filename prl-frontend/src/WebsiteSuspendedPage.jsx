export default function WebsiteSuspendedPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
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
          Website Temporarily Suspended
        </h1>

        <p className="text-zinc-300 text-lg leading-8 mb-8">
          Your payment for the provided services has not been received yet.
          Therefore, this website has been temporarily taken down until the
          pending payment is cleared.
        </p>

        <div className="bg-zinc-800/70 border border-zinc-700 rounded-2xl p-5 mb-8">
          <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">
            Important Notice
          </p>

          <p className="text-white text-base leading-7">
            Please contact the service provider to complete the payment and
            restore access to the website.
          </p>
        </div>

        <p className="text-zinc-500 text-sm mt-10">
          Thank you for your understanding.
        </p>
      </div>
    </div>
  );
}
