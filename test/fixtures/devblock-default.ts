export class AbcDevblockTest {
  constructor() {
    console.log('test for production');

    this.test();
    /** devblock:start */
    this.testForDev();
    /** devblock:end */
  }
  private test() {
    console.log('test for production');
  }
  /* devblock:start */
  // this code block will be removed in production mode.
  private testForDev() {
    console.log('test for development');
  }
  /* devblock:end */
}
