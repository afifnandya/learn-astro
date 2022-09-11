export const isClient = !import.meta.env.SSR;
export const isServer = import.meta.env.SSR;
