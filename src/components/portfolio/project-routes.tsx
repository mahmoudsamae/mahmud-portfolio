import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioContent, getProject, getProjects } from "@/lib/content";
import { projectHref, projectsIndexHref, type PortfolioLang } from "@/lib/portfolio-content";
import { ProjectDetail } from "./project-detail";
import { SiteShell } from "./portfolio-site";
import { SelectedWork } from "./selected-work";

// /de/projekte/... and /en/projects/... share this code; each path prefix only exists
// in its own language (the other combination renders notFound()).
type LocaleParams = { params: Promise<{ locale: string }> };
type SlugParams = { params: Promise<{ locale: string; slug: string }> };

const bothLangs = (href: (lang: PortfolioLang) => string) => ({ de: href("de"), en: href("en") });

export function projectRoutes(routeLang: PortfolioLang) {
  const checkLang = (locale: string) => {
    if (locale !== routeLang) notFound();
  };

  return {
    // Returns every slug for both locales: if this returns [] for one parent locale, Next 16
    // prerenders nothing for the whole route. The wrong-language pages render notFound().
    detailStaticParams: async () => (await getProjects()).map((p) => ({ slug: p.slug })),

    listMetadata: async (): Promise<Metadata> => {
      const t = (await getPortfolioContent()).str[routeLang];
      return { title: `${t.projectsPageTitle} | Mahmud Al Hussen` };
    },

    detailMetadata: async ({ params }: SlugParams): Promise<Metadata> => {
      const project = await getProject((await params).slug);
      if (!project) return {};
      return {
        title: `${project.title[routeLang]} | Mahmud Al Hussen`,
        description: project.summary[routeLang],
      };
    },

    ListPage: async function ProjectsListPage({ params }: LocaleParams) {
      checkLang((await params).locale);
      return (
        <SiteShell lang={routeLang} langHrefs={bothLangs(projectsIndexHref)} content={await getPortfolioContent()}>
          <SelectedWork mode="all" />
        </SiteShell>
      );
    },

    DetailPage: async function ProjectDetailPage({ params }: SlugParams) {
      const { locale, slug } = await params;
      checkLang(locale);
      const [content, project] = await Promise.all([getPortfolioContent(), getProject(slug)]);
      if (!project) notFound();
      return (
        <SiteShell
          lang={routeLang}
          langHrefs={bothLangs((lang) => projectHref(lang, slug))}
          content={content}
        >
          <ProjectDetail project={project} lang={routeLang} t={content.str[routeLang]} />
        </SiteShell>
      );
    },
  };
}
