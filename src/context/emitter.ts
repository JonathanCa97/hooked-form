type Force = () => void;

interface EmitMap {
  [fieldId: string]: Array<Force>;
}

const mapping: EmitMap = {};
export function on(fieldId: string | Array<string>, cb: Force) {
  if (!Array.isArray(fieldId)) fieldId = [fieldId];

  const disposers = fieldId.map((f) => {
    (mapping[f] || (mapping[f] = [])).push(cb);
    return () => {
      if (mapping[f].indexOf(cb) > -1) {
        mapping[f].splice(mapping[f].indexOf(cb), 1);
      }
    };
  });

  // @ts-ignore
  return () => { disposers.map((c) => { c(); }); };
}

export function emit(fieldId: string | Array<string>) {
  const visited: Array<string> = [];
  if (!Array.isArray(fieldId)) fieldId = [fieldId];

  // @ts-ignore
  fieldId.map((f) => {
    if (visited.indexOf(f) === -1) {
      // @ts-ignore
      (mapping[f] || []).map((cb) => { cb(); });
      visited.push(f);
    }
  });
  // @ts-ignore
  (mapping['*'] || []).map((cb) => { cb(); });
}
