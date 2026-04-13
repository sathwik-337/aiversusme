import { db } from "@/lib/db";
import { academyCertificates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export const runtime = "nodejs";

function fmt(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function CertificatePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  if (!id) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8 text-white">
          <h1 className="text-2xl font-semibold">Certificate</h1>
          <p className="mt-3 text-sm text-zinc-300">Provide a certificate id in the URL.</p>
          <Link
            href="/verify"
            className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Go to verify
          </Link>
        </div>
      </section>
    );
  }

  const [row] = await db
    .select()
    .from(academyCertificates)
    .where(eq(academyCertificates.certificate_number, id))
    .limit(1);

  if (!row) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8 text-white">
          <h1 className="text-2xl font-semibold">Certificate not found</h1>
          <p className="mt-3 text-sm text-zinc-300">The certificate id is invalid.</p>
          <Link
            href="/verify"
            className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Verify another certificate
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8 text-white">
        <h1 className="text-2xl font-semibold">Certificate details</h1>
        <div className="mt-6 space-y-3 text-sm text-zinc-200">
          <p>
            <span className="text-zinc-400">Name</span>: <span className="text-white">{row.recipient_name}</span>
          </p>
          <p>
            <span className="text-zinc-400">Course</span>: <span className="text-white">{row.course_title}</span>
          </p>
          <p>
            <span className="text-zinc-400">Date</span>: <span className="text-white">{fmt(row.completed_at)}</span>
          </p>
          <p>
            <span className="text-zinc-400">Grade</span>:{" "}
            <span className="text-white">
              {row.grade} ({row.percentage}%)
            </span>
          </p>
          <p>
            <span className="text-zinc-400">Certificate ID</span>:{" "}
            <span className="text-white">{row.certificate_number}</span>
          </p>
        </div>
        <div className="mt-6">
          <a
            href={`/api/certificates/${row.certificate_number}?download=1`}
            download={`${row.certificate_number}.pdf`}
            className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}
