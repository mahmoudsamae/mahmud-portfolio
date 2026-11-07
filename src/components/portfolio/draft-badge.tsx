// Marks a CMS section that is not approved yet. Such sections are only rendered in local
// builds (see showDrafts in src/lib/content.ts), never on the live site.
export function DraftBadge({ label }: { label: string }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ffb86b]/40 bg-[#ffb86b]/10 px-4 py-[7px] text-[12.5px] font-semibold text-[#ffcf99]">
      {label}
    </div>
  );
}
