import { projectRoutes } from "@/components/portfolio/project-routes";

const routes = projectRoutes("en");

export const dynamicParams = false;
export const generateStaticParams = routes.detailStaticParams;
export const generateMetadata = routes.detailMetadata;
export default routes.DetailPage;
