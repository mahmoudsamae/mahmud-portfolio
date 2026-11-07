import Markdoc, { Tag, type Node } from "@markdoc/markdoc";
import React from "react";

// Lines inside a paragraph are kept as line breaks, so addresses can be written one
// line per row in the CMS.
const config = {
  nodes: {
    softbreak: { transform: () => new Tag("br") },
  },
};

export function LegalPage({ title, body }: { title: string; body: Node }) {
  const content = Markdoc.transform(body, config);

  return (
    <article className="px-6 pb-[88px] pt-12 sm:px-[44px]">
      <div className="mx-auto max-w-[760px]">
        <h1 className="m-0 mb-10 font-space text-[clamp(34px,5vw,56px)] font-bold tracking-[-0.03em]">{title}</h1>
        <div className="text-[15.5px] leading-[1.7] text-[#b9b7c4] [&_a]:text-[#d6d4de] [&_a]:underline [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-space [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:text-[#f2f0f7] [&_li]:mb-1 [&_p]:my-3 [&_ul]:pl-5">
          {Markdoc.renderers.react(content, React)}
        </div>
      </div>
    </article>
  );
}
