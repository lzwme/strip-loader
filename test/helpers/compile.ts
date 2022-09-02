import webpack from 'webpack';

export default (compiler: webpack.Compiler) =>
  new Promise<webpack.Stats>((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) {
        return reject(error);
      }

      return resolve(stats);
    });
  });
