export const route = {
    method: 'GET',
    path: '/'
};

export default async function handler(request: Request, env: Env, ctx: ExecutionContext, params: Record<string, string> = {}): Promise<Response> {
    return new Response('todo: this.');
}