export const urlRegex = (title: string) => {
    let puncRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    let dbSpaceRegex = /  +/g;
    return title
      .replace(puncRegex, '')
      .replace(dbSpaceRegex, ' ')
      .replace(/ /g, '-')
      .toLowerCase();
}