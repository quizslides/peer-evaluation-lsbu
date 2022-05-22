const getStringAsCamelCase = (stringValue: string) => {
  return stringValue
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export { getStringAsCamelCase };
