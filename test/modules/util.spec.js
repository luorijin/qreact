import {
  oneObject,
  extend,
  isFn,
  toLowerCase,
  inherit,
  camelize,
  firstLetterLower,
  typeNumber,
  toArray
} from "src/util";

import { isEventName } from "src/event";

import { getUnmaskedContext } from "src/ComponentFiber";

describe("util", function() {
  it("oneObject", function() {
    expect(oneObject("aa,bb,cc")).toEqual({
      aa: 1,
      bb: 1,
      cc: 1
    });
    expect(oneObject("")).toEqual({});
    expect(oneObject([1, 2, 3], false)).toEqual({
      1: false,
      2: false,
      3: false
    });
  });
  it("extend", function() {
    expect(
      extend(
        {},
        {
          a: 1,
          b: 2
        }
      )
    ).toEqual({
      a: 1,
      b: 2
    });
    expect(
      extend(
        {
          a: 1
        },
        null
      )
    ).toEqual({
      a: 1
    });
  });

  it("isFn", function() {
    expect(isFn("sss")).toBe(false);
    expect(isFn(function a() {})).toBe(true);
  });

  it("isEventName", () => {
    expect(isEventName("onaaa")).toBe(false);
    expect(isEventName("onAaa")).toBe(true);
    expect(isEventName("xxx")).toBe(false);
  });

  it("toLowerCase", () => {
    expect(toLowerCase("onaaa")).toBe("onaaa");
    expect(toLowerCase("onA")).toBe("ona");
    expect(toLowerCase("onA")).toBe("ona");
  });
  it("inherit", () => {
    var x = "x";
    function A1() {}
    A1.prototype = {
      test: () => (x = "a")
    };

    function B1() {}
    B1.prototype = {
      test: () => (x = "b")
    };
    inherit(B1, A1);
    var b = new B1();
    b.test();
    expect(x).toBe("b");
  });
  it("inherit2", () => {
    function A() {}

    function B() {}
    inherit(A, B);
    var a = new A();

    expect(a instanceof A).toBe(true);
    expect(a instanceof B).toBe(true);
  });
  it("camelize", function() {
    expect(typeof camelize).toBe("function");
    expect(camelize("aaa-bbb-ccc")).toBe("aaaBbbCcc");
    expect(camelize("aaa_bbb_ccc")).toBe("aaaBbbCcc");
    expect(camelize("-aaa-bbb-ccc")).toBe("aaaBbbCcc");
    expect(camelize("_aaa_bbb_ccc")).toBe("aaaBbbCcc");
    expect(camelize("")).toBe("");
  });

  it("firstLetterLower", function() {
    expect(typeof firstLetterLower).toBe("function");
    expect(firstLetterLower("WebkitBorderStart")).toBe("webkitBorderStart");
    expect(firstLetterLower("")).toBe("");
  });

  it("toArray", () => {
    var dom = {
      childNodes: [{}, {}, {}]
    };
    expect(toArray(dom.childNodes).length).toBe(3);
  });
  it("getUnmaskedContext", () => {
    var instance = {
      getChildContext: function() {
        return {
          a: 1
        };
      }
    };
    var b = getUnmaskedContext(instance, {
      b: 4
    });
    expect(b).toEqual({
      a: 1,
      b: 4
    });
  });

  it("typeNumber", () => {
    var A = function() {};
    var a = new A();

    expect(typeNumber(void 2)).toBe(0);
    expect(typeNumber(null)).toBe(1);
    expect(typeNumber(false)).toBe(2);
    expect(typeNumber(true)).toBe(2);
    expect(typeNumber(1)).toBe(3);
    expect(typeNumber("333")).toBe(4);
    expect(typeNumber(A)).toBe(5);
    expect(typeNumber([])).toBe(7);
    expect(typeNumber(a)).toBe(8);
  });
});
