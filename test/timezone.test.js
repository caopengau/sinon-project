var assert = require("assert");
var timezone_mock = require("timezone-mock");

describe("timezone w/wo Z", function () {
  const inputTimeStringNoZ = "2022-11-08T14:00:00.000";
  const inputTimeStringZ = "2022-11-08T14:00:00.000Z";
  it("should return a different time for different timezone", function () {
    let res;

    timezone_mock.register("US/Eastern");
    res = new Date(inputTimeStringNoZ).toISOString();
    assert.equal(res, "2022-11-08T19:00:00.000Z");

    timezone_mock.register("UTC");
    res = new Date(inputTimeStringNoZ).toISOString();
    assert.equal(res, "2022-11-08T14:00:00.000Z");

    timezone_mock.register("US/Pacific");
    res = new Date(inputTimeStringNoZ).toISOString();
    assert.equal(res, "2022-11-08T22:00:00.000Z");
  });

  it("should return a same time as input with Z", function () {
    let res;

    timezone_mock.register("US/Eastern");
    res = new Date(inputTimeStringZ).toISOString();
    assert.equal(res, inputTimeStringZ);

    timezone_mock.register("UTC");
    res = new Date(inputTimeStringZ).toISOString();
    assert.equal(res, inputTimeStringZ);

    timezone_mock.register("US/Pacific");
    res = new Date(inputTimeStringZ).toISOString();
    assert.equal(res, inputTimeStringZ);
  });

  it("output", function () {
    let localTimeInUtc

    timezone_mock.register("US/Eastern");
    localTimeInUtc = new Date(inputTimeStringZ).toLocaleString();
    console.log(localTimeInUtc);

    timezone_mock.register("UTC");
    localTimeInUtc = new Date(inputTimeStringZ).toLocaleString();
    console.log(localTimeInUtc);

    timezone_mock.register("US/Pacific");
    localTimeInUtc = new Date(inputTimeStringZ).toLocaleString();
    console.log(localTimeInUtc);

    assert(1);
  });
});
