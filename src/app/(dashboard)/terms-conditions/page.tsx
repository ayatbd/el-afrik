"client";
export default function TermsAndConditions({ content }: { content: string }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] md:py-10 md:px-40 sm:p-6">
      <div
        className="text-[#555555] space-y-5 leading-relaxed mt-12"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
