const { isDecisionPossible } = require("../src/decisionValidation");

describe("isDecisionPossible", () => {
  test("should return true when decision is rej, is_lecture is true and workshop is 2 ", () => {
    // given
    const decision = "REJ";
    const is_lecture = true;
    const workshop = 2;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(true);
  });

  test("should return true when decision is rej, is_lecture is false and workshop is 1 ", () => {
    // given
    const decision = "REJ";
    const is_lecture = false;
    const workshop = 1;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(true);
  });

  test("should return true when decision is rej, is_lecture is true and workshop is 0 ", () => {
    // given
    const decision = "REJ";
    const is_lecture = true;
    const workshop = 0;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(true);
  });

  test("should return true when decision is rej, is_lecture is false and workshop is 0 ", () => {
    // given
    const decision = "REJ";
    const is_lecture = false;
    const workshop = 0;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(true);
  });

  test("should return false when decision is MV_LEC, is_lecture is true and workshop is null ", () => {
    // given
    const decision = "MV_LEC";
    const is_lecture = true;
    const workshop = null;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(false);
  });

  test("should return false when decision is MV_LEC, is_lecture is false and workshop is 2 ", () => {
    // given
    const decision = "MV_LEC";
    const is_lecture = "false";
    const workshop = 2;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(false);
  });

  test("should return true when decision is MV_LEC, is_lecture is true and workshop is 2 ", () => {
    // given
    const decision = "MV_LEC";
    const is_lecture = true;
    const workshop = 2;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(true);
  });

  test("should return false when decision is MV_LEC, is_lecture is false and workshop is null ", () => {
    // given
    const decision = "MV_LEC";
    const is_lecture = "false";
    const workshop = null;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(false);
  });

  test("should return true when decision is ACC_LEC, is_lecture is true and workshop is null ", () => {
    // given
    const decision = "ACC_LEC";
    const is_lecture = true;
    const workshop = null;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(true);
  });

  test("should return false when decision is ACC_LEC, is_lecture is false and workshop is 2 ", () => {
    // given
    const decision = "ACC_LEC";
    const is_lecture = "false";
    const workshop = 2;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(false);
  });

  test("should return false when decision is ACC_LEC, is_lecture is true and workshop is 2 ", () => {
    // given
    const decision = "ACC_LEC";
    const is_lecture = true;
    const workshop = 2;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(false);
  });

  test("should return false when decision is ACC_LEC, is_lecture is false and workshop is null ", () => {
    // given
    const decision = "ACC_LEC";
    const is_lecture = false;
    const workshop = null;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(false);
  });

  test("should return false when decision is ACC_WOR, is_lecture is true and workshop is null ", () => {
    // given
    const decision = "ACC_WOR";
    const is_lecture = true;
    const workshop = null;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(false);
  });

  test("should return true when decision is ACC_WOR, is_lecture is false and workshop is 2 ", () => {
    // given
    const decision = "ACC_WOR";
    const is_lecture = false;
    const workshop = 2;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(true);
  });

  test("should return true when decision is ACC_WOR, is_lecture is true and workshop is 2 ", () => {
    // given
    const decision = "ACC_WOR";
    const is_lecture = true;
    const workshop = 2;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(true);
  });

  test("should return false when decision is ACC_WOR, is_lecture is false and workshop is null ", () => {
    // given
    const decision = "ACC_WOR";
    const is_lecture = false;
    const workshop = null;
    // when
    const result = isDecisionPossible(workshop, is_lecture, decision);
    // then
    expect(result).toBe(false);
  });
});
