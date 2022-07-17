const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ?
    str.slice(0, -1) :
    str;
};

const publicUrl = stripTrailingSlash(process.env.PUBLIC_URL ?? '');

export const appConfig = {
  graphhopperApiKey: process.env.REACT_APP_GRAPHHOPPER_API_KEY!,
  publicUrl: publicUrl
};