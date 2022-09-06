import webpack from 'webpack';
export default (name: string, stats: webpack.Stats) => {
  const { modules = [] } = stats.toJson({ source: true });
  const module = modules.find(m => String(m.name).includes(name));

  if (!module) throw Error(`Not found for ${name}`);

  return module.source;
};
