import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-white text-black hover:bg-gray-200 transition-colors',
              card: 'bg-zinc-900 border border-white/10',
              headerTitle: 'text-white',
              headerSubtitle: 'text-gray-400',
              socialButtonsBlockButton: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
              socialButtonsBlockButtonText: 'text-white',
              dividerLine: 'bg-white/10',
              dividerText: 'text-gray-400',
              formFieldLabel: 'text-gray-400',
              formFieldInput: 'bg-white/5 border border-white/10 text-white focus:border-white/30 transition-colors',
              footerActionText: 'text-gray-400',
              footerActionLink: 'text-white hover:text-gray-300 transition-colors',
              identityPreviewText: 'text-white',
              identityPreviewEditButtonIcon: 'text-white',
            }
          }}
        />
      </div>
    </div>
  );
}
