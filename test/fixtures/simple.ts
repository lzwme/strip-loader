export class AbcSimple {
  constructor() {
    this.test();
    this.testForDev();
  }
  private test() {
    console.log('test for production');
  }
  private testForDev() {
    console.log('test for development');
  }
}
