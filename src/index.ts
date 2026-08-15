import * as health from "./routes/health";
import * as flightRaw from "./routes/flight/raw";
import * as flightBase from "./routes/flight/base"
import * as flightHistory from "./routes/flight/history/list"
import * as flightLocation from "./routes/flight/location";
import * as airportRaw from "./routes/airport/base";

type RouteModule = {
	route: {
		method: string;
		path: string;
	};
	default: (request: Request, env: Env, ctx: ExecutionContext, params?: Record<string, string>) => Promise<Response>;
};

const routes: RouteModule[] = [health, flightRaw, flightBase, flightHistory, flightLocation, airportRaw];

function matchRoute(path: string, regpat: string) {
	const regex = new RegExp(`^${regpat.replace(/:[a-zA-Z0-9_]+/g, '([^/]+)')}$`);

	const match = path.match(regex);
	if (!match) return null;

	const keys = [...regpat.matchAll(/:([a-zA-Z0-9_]+)/g)].map((m) => m[1]);
	const params: Record<string, string> = {};
	keys.forEach((key, index) => {
		params[key] = match[index + 1];
	});

	return params;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		for (const route of routes) {

			if(route.route.method.toUpperCase() !== request.method.toUpperCase()) continue;

			const params = matchRoute(url.pathname, route.route.path);

			if (params) {
				console.log(`Request: ${request.method} ${url.pathname} matched route: ${route.route.method} ${route.route.path} with params:`, params);
				return route.default(request, env, ctx, params);
			}
		}

		return new Response('This route doesn\'t seem to exist...', { status: 404 }); //todo: probably make this err json or smth
	},
} satisfies ExportedHandler<Env>;
