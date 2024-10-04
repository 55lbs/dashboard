import fs from 'fs';

const json = JSON.parse(
  fs.readFileSync('./src/content/__exercise-groups.json', 'utf8'),
);

function urlify(string) {
  return string
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both sides
    .replace(/[\s]+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, ''); // Remove all non-word chars except hyphens
}

for (const ex of json) {
  console.log(ex);
  const newSlug = parseInt(ex.id);
  fs.writeFileSync(
    `./src/content/exercise-groups/${ex.slug}.json`,
    JSON.stringify({ ...ex, id: newSlug }),
    'utf8',
  );
}
