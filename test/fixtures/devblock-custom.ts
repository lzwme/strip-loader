export class AbcDevblockTest {
  constructor() {
    console.log('test for production');

    this.test();
    /* lzwme:debug:start */
    this.testForDev();
    /* lzwme:debug:end */
  }
  private test() {
    console.log('test for production');
  }
  /* lzwme:debug:start */
  // this code block will be removed in production mode.
  private testForDev() {
    console.log('test for development');
  }
  /* lzwme:debug:end */
}
