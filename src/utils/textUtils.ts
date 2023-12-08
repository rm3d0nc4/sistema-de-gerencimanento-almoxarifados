class TextUtils {
  isValidText(textStr: string): boolean {
    const regex: RegExp = new RegExp(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
    );
    return regex.test(textStr);
  }
}

export default new TextUtils();
