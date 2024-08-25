import { formatFiles, generateFiles, logger, Tree } from '@nx/devkit';
import * as path from 'path';
import { AstroWrapperGeneratorSchema } from './schema';

export async function astroWrapperGenerator(
  tree: Tree,
  options: AstroWrapperGeneratorSchema,
) {
  options.name.split(',').forEach((name) => {
    if (name !== '') {
      logger.info(`Generating Astro Wrapper for compoenent: ${name.trim()}`);

      generateFiles(tree, path.join(__dirname, 'files'), './', {
        name: name.trim(),
      });
    }
  });
  await formatFiles(tree);
}

export default astroWrapperGenerator;
