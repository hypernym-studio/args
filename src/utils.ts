export const isString = (v: any): v is string => typeof v === 'string'
export const isArray = (v: any): v is any[] => Array.isArray(v)
export const isFlag = (v: string) =>
  v[0] === '-' && v[1] === '-' && v.length > 2
export const isAlias = (v: string) =>
  v[0] === '-' && v[1] !== '-' && v.length > 1
