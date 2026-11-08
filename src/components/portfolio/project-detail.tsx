import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { isFilled, projectsIndexHref, type PortfolioLang, type PortfolioStrings } from "@/lib/portfolio-content";
import { DraftBadge } from "./draft-badge";
import { Reveal } from "./reveal";
import { youtubeId } from "@/lib/youtube";
import { YouTubeEmbed } from "./youtube-embed";

const isSvg = (src: string) => src.toLowerCase().endsWith(".svg");

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="m-0 mb-5 flex items-center gap-3 font-space text-[clamp(26px,3.2vw,38px)] font-bold tracking-[-0.02em]">
      <span aria-hidden className="h-[0.8em] w-[5px] flex-none rounded-full bg-gradient-to-b from-[#b57cff] to-[#4fd6c6]" />
      {children}
    </h2>
  );
}

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="flex max-w-[760px] flex-col gap-4 text-[16px] leading-[1.65] text-[#b9b7c4]">
      {text.split("\n").filter(Boolean).map((p, i) => (
        <p key={i} className="m-0">
          {p}
        </p>
      ))}
    </div>
  );
}

function ActionLink({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        primary
          ? "pf-arrowbtn inline-flex items-center gap-2 rounded-full px-[22px] py-[13px] text-[15px] font-semibold text-white no-underline"
          : "pf-arrowbtn inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-[22px] py-[13px] text-[15px] font-semibold text-[#f2f0f7] no-underline"
      }
      style={primary ? { background: "linear-gradient(100deg,#b57cff,#7c5cff)" } : undefined}
    >
      {children}
      <span className="pf-ar inline-flex">
        <ArrowUpRight size={14} strokeWidth={2.4} />
      </span>
    </a>
  );
}

function DemoState({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-[9px] rounded-full border border-white/10 bg-white/[0.03] px-[18px] py-[12px] text-[14.5px] text-[#c9c7d2]">
      <span className="h-2 w-2 rounded-full bg-[#b57cff]" />
      {children}
    </span>
  );
}

export function ProjectDetail({
  project,
  lang,
  t,
}: {
  project: Project;
  lang: PortfolioLang;
  t: PortfolioStrings;
}) {
  const title = project.title[lang];
  const categoryLabel = {
    automation: t.catAutomation,
    "im-einsatz": t.catInUse,
    web: t.catWeb,
  }[project.category];
  const results = project.results.filter((r) => isFilled(r.value));
  const screenshots = project.screenshots.filter((s) => s.image);
  const videoId = project.youtubeUrl ? youtubeId(project.youtubeUrl) : null;

  return (
    <article className="px-6 pb-[88px] pt-12 sm:px-[44px]">
      <div className="mx-auto max-w-[1080px]">
        <Link
          href={projectsIndexHref(lang)}
          className="mb-10 inline-flex items-center gap-2 text-sm text-[#9a98a6] no-underline hover:text-[#f2f0f7]"
        >
          <ArrowLeft size={15} />
          {t.projectBack}
        </Link>

        <header className="mb-16">
          {project.draft && (
            <div>
              <DraftBadge label={t.draftBadge} />
            </div>
          )}
          <span className="mb-5 inline-flex items-center gap-[9px] rounded-full border border-white/10 bg-white/[0.03] px-4 py-[7px] text-[12.5px] uppercase tracking-[0.08em] text-[#c9c7d2]">
            <span className="h-2 w-2 rounded-full bg-[#4fd6c6]" />
            {categoryLabel}
          </span>
          <h1 className="m-0 mb-5 font-space text-[clamp(38px,6vw,78px)] font-bold leading-[1.02] tracking-[-0.035em]">
            {title}
          </h1>
          {isFilled(project.summary[lang]) && (
            <p className="m-0 mb-8 max-w-[720px] text-[18px] leading-[1.55] text-[#9a98a6]">{project.summary[lang]}</p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            {project.demoStatus === "live" && project.liveUrl && (
              <ActionLink href={project.liveUrl} primary>
                {t.projectLive}
              </ActionLink>
            )}
            {project.demoStatus === "offline" && <DemoState>{t.projectOffline}</DemoState>}
            {project.demoStatus === "comingSoon" && <DemoState>{t.projectComingSoon}</DemoState>}
            {project.githubUrl && <ActionLink href={project.githubUrl}>{t.projectGithub}</ActionLink>}
            {project.docsUrl && <ActionLink href={project.docsUrl}>{t.projectDocs}</ActionLink>}
          </div>
        </header>

        <div className="flex flex-col gap-16">
          {isFilled(project.problem[lang]) && (
            <Reveal>
              <SectionTitle>{t.projectProblem}</SectionTitle>
              <Paragraphs text={project.problem[lang]} />
            </Reveal>
          )}

          {isFilled(project.solution[lang]) && (
            <Reveal>
              <SectionTitle>{t.projectSolution}</SectionTitle>
              <Paragraphs text={project.solution[lang]} />
            </Reveal>
          )}

          {project.architectureImage && (
            <Reveal>
              <SectionTitle>{t.projectArchitecture}</SectionTitle>
              {/* Wide diagrams stay legible on phones: scroll sideways instead of shrinking. */}
              <a
                href={project.architectureImage}
                target="_blank"
                rel="noreferrer"
                className="block overflow-x-auto rounded-2xl border border-white/10 bg-[#131318] p-4"
              >
                <Image
                  src={project.architectureImage}
                  alt={project.architectureAlt[lang]}
                  width={1600}
                  height={400}
                  unoptimized={isSvg(project.architectureImage)}
                  sizes="(max-width: 1080px) 860px, 1080px"
                  className="h-auto w-full min-w-[860px]"
                />
              </a>
            </Reveal>
          )}

          {results.length > 0 && (
            <Reveal>
              <SectionTitle>{t.projectResults}</SectionTitle>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {results.map((r, i) => (
                  <div key={i} className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-6">
                    <div
                      className="bg-clip-text font-space text-[44px] font-bold leading-none tracking-[-0.03em] text-transparent"
                      style={{ backgroundImage: "linear-gradient(100deg,#b57cff,#4fd6c6)" }}
                    >
                      {r.value}
                    </div>
                    <p className="m-0 mt-3 text-[15px] leading-[1.5] text-[#b9b7c4]">{r.label[lang]}</p>
                    {r.source && (
                      <a
                        href={r.source}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-[13px] text-[#9a98a6] underline"
                      >
                        {t.projectEvidence}
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {project.techStack.length > 0 && (
            <Reveal>
              <SectionTitle>{t.projectStack}</SectionTitle>
              <ul className="m-0 flex list-none flex-wrap gap-[10px] p-0">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/[0.12] bg-white/[0.03] px-[15px] py-2 text-[14px] text-[#c9c7d2]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {screenshots.length > 0 && (
            <Reveal>
              <SectionTitle>{t.projectScreenshots}</SectionTitle>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {screenshots.map((s, i) => (
                  <figure key={i} className="m-0">
                    <a href={s.image!} target="_blank" rel="noreferrer" className="block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12]">
                        <Image
                          src={s.image!}
                          alt={s.caption[lang]}
                          fill
                          sizes="(max-width: 768px) 100vw, 540px"
                          className="object-contain p-3"
                        />
                      </div>
                    </a>
                    {isFilled(s.caption[lang]) && (
                      <figcaption className="mt-3 text-[13.5px] leading-[1.5] text-[#9a98a6]">{s.caption[lang]}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </Reveal>
          )}

          {videoId && (
            <Reveal>
              <SectionTitle>{t.projectVideo}</SectionTitle>
              <YouTubeEmbed id={videoId} title={title} consentText={t.videoConsent} loadLabel={t.videoLoad} />
            </Reveal>
          )}

          {isFilled(project.note[lang]) && (
            <Reveal>
              <p className="m-0 max-w-[760px] rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-[14.5px] leading-[1.6] text-[#9a98a6]">
                {project.note[lang]}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </article>
  );
}
