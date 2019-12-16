export const loadJson = (url: string) => fetch(url).then(res => res.json());
