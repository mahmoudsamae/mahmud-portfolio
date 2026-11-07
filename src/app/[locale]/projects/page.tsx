import { projectRoutes } from "@/components/portfolio/project-routes";

const routes = projectRoutes("en");

export const generateMetadata = routes.listMetadata;
export default routes.ListPage;
