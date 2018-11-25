import toPath from './toPath';

export function get(source: any, key: any) {
  const path = toPath(key);
  return getHelper(source, path, 0)
}

function getHelper(source: any, path: Array<string>, index: number): any {
  if (!source || path.length <= index) {
    return source;
  }
  return getHelper(source[path[index]], path, index + 1);
}

interface Source {
  [key: string]: any;
}

export const set = (source: Source | Array<any>, key: string, value: any) => setHelper(source, value, toPath(key), 0);

function setHelper(source: Source | Array<any>, value: any, pathArray: Array<string>, currentIndex: number) {
  if (currentIndex >= pathArray.length) {
    return value;
  }
  const currentPath = pathArray[currentIndex];
  // At this point we could be dealing with a FieldArray so be cautious not to use Stringed keys, if not it's an object.
  const currentValue = source && (Array.isArray(source) ? source[Number(currentPath)] : source[currentPath]);
  const continuedPath: any = setHelper(currentValue, value, pathArray, currentIndex + 1);

  if (!source) {
    if (typeof currentPath === 'number') {
      const array = [];
      array[Number(currentPath)] = continuedPath;
      return array;
    }
    return {
      [currentPath]: continuedPath
    }
  }

  // FieldArray copying.
  if (Array.isArray(source)) {
    const copiedArray = [...source];
    copiedArray[Number(currentPath)] = continuedPath;
    return copiedArray;
  }

  return {
    ...source,
    [currentPath]: continuedPath,
  }
}
