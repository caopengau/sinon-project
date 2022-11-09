const assert = require("assert");
const api = require("../api.js");
const { greet } = require("../greeter.js");
const sinon = require("sinon");

describe("testing the greeter", function () {
  afterEach(function () {
    sinon.restore();
  });
  it("checks the greet function", async function () {
    const clock = sinon.useFakeTimers(new Date(2021, 0, 15));
    const res = await greet("Alice");
    assert.equal(res, "Hello, Alice! Today is Friday, January 15, 2021");
  });

  it("check the callApi function", async function () {
    const clock = sinon.useFakeTimers(new Date(2021, 0, 15));
    // mock the callApi function
    const stubCallApi = sinon
      .stub(api, "callApi")
      .callsFake(() => Promise.resolve("Bob"));
    const res = await greet();
    // expect stubCallApi to be called once
    assert(stubCallApi.calledOnce);
    // expect api to be called with no arguments
    assert(stubCallApi.calledWith());
    // expect stubCallApi to return 'Bob', because that's how we mocked it
    assert.deepEqual(stubCallApi.returnValues[0], Promise.resolve("Bob"));
    assert.equal(res, "Hello, Bob! Today is Friday, January 15, 2021");
  });

  it("check the callApi throw error assert.rejects", async function () {
    const clock = sinon.useFakeTimers(new Date(2021, 0, 15));
    // mock the callApi function
    const stubCallApi = sinon
      .stub(api, "callApi")
      .callsFake(() => Promise.reject(new Error("error")));
    await assert.rejects(async () => await greet(), new Error("error"));
    // expect stubCallApi to be called once
    assert(stubCallApi.calledOnce);
    // expect api to be called with no arguments
    assert(stubCallApi.calledWith());
  });
  // or with catch
  it("check the callApi throw error with catch", async function () {
    const clock = sinon.useFakeTimers(new Date(2021, 0, 15));
    // mock the callApi function
    const stubCallApi = sinon
      .stub(api, "callApi")
      .callsFake(() => Promise.reject(new Error("error")));
    greet().catch((err) => {
      assert.equal(err.message, "error");
      // assert deep equal
      assert.deepEqual(err, new Error("error"));
      // expect stubCallApi to be called once
      assert(stubCallApi.calledOnce);
      // expect api to be called with no arguments
      assert(stubCallApi.calledWith());
    });
  });

  it("spy that the callApi is invoked", async function () {
    const clock = sinon.useFakeTimers(new Date(2021, 0, 15));
    const spy = sinon.spy(api, "callApi");
    const res = await greet();
    assert.deepEqual(spy.getCall(0).args, []);
    assert.equal(res, "Hello, Alice! Today is Friday, January 15, 2021");
  });
});
