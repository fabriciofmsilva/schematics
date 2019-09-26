import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function custom(options: any): Rule {
  console.log('options', options);

  return (tree: Tree, context: SchematicContext) => {
    console.log('tree', tree);
    console.log('context', context);

    return tree;
  };
}
