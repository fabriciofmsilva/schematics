import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');

export function getFileContent(tree: Tree, filePath: string): string {
  const contentBuffer = tree.read(filePath);

  if (!contentBuffer) {
    throw new Error(`Cannot read "${filePath}" because it does not exist.`);
  }

  return contentBuffer.toString();
}

describe('custom', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);

    let workspaceTree = await runner.runExternalSchematicAsync('@schematics/angular', 'workspace', {
      name: 'workspace',
      version: '8.0.0',
      newProjectRoot: 'projects',
    }).toPromise();
    workspaceTree = await runner.runExternalSchematicAsync('@schematics/angular', 'application', {name: 'batatinha'}, workspaceTree).toPromise();
    console.log('workspaceTree', workspaceTree.files);
    console.log('/angular.json', getFileContent(workspaceTree, '/angular.json'));

    const tree = await runner.runSchematicAsync('custom', { name: 'bla', project: 'bla' }, Tree.empty()).toPromise();

    console.log('tree', tree.files);

    expect(tree.files).toEqual([]);
  });
});
