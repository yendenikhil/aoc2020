export const read = async (filename: string) => {
  const raw = (await Deno.readTextFile(filename))
    .replaceAll(/[^\x01-\x7f]/g, "").replaceAll("\r\n", "\n");
    return raw
};
