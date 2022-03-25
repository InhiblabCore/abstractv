export function useMegreComponentConfig(attr: any, filedName: string, value: string | number) {
  attr[filedName as keyof typeof attr] = value
}
