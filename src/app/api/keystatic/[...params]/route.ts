import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { keystaticEnabled } from "@/lib/keystatic-enabled";

const disabled = () => new Response("Not found", { status: 404 });

// Only build the handler when enabled: in GitHub mode it throws if credentials are missing.
const handler = keystaticEnabled ? makeRouteHandler({ config }) : { GET: disabled, POST: disabled };

export const GET = handler.GET;
export const POST = handler.POST;
