class Test {
  constructor() {
    this.message = 'hello';
  }

  greeting() {
    setInterval(() => {
      console.log(this.message);
    }, 1000);
  }
}
