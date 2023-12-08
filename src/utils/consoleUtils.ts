class ConsoleUtils {
  print(message: string): void {
    console.log(message);
  }

  clear = () => console.clear();

  stop = () => 0;
}

export default new ConsoleUtils();