export const isString = (v: any): v is string => typeof v === 'string'
export const isArray = (v: any): v is any[] => Array.isArray(v)
export const isFlag = (v: string) => v.slice(0, 2).includes('--')
export const isAlias = (v: string) => v.slice(0, 1).includes('-')
