import Link from "next/link";
import { redirect } from "next/navigation";

export const runtime = "nodejs";

export default function VerifyPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8 text-white">
        <h1 className="text-2xl font-semibold">Verify certificate</h1>
        <p className="mt-4 text-sm text-zinc-400">
          Enter a certificate number to verify its authenticity and view the
          earned details.
        </p>
        <form
          action={async (formData) => {
            "use server";
            const id = formData.get("id");
            if (typeof id === "string" && id.trim()) {
              redirect(`/certificate?id=${encodeURIComponent(id.trim())}`);
            }
          }}
          className="mt-8 space-y-4"
        >
          <div>
            <label
              htmlFor="id"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-500"
            >
              Certificate Number
            </label>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="e.g. AIVSMEXXXXXX"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-white/20 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
          >
            Verify authenticity
          </button>
        </form>
        <div className="mt-6 text-sm">
          <Link
            href="/"
            className="text-zinc-300 underline decoration-zinc-500 underline-offset-4"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
