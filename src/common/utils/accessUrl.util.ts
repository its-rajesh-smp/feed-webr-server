export const generateDefaultAccessUrl = (title: string) => {
  return 'feedWebr/' + title.toLowerCase().replace(/\s+/g, '-');
};
