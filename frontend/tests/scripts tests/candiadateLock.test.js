import {
  countEventParticipants,
  countWorkshopParticipants,
  isWorkshopParticipant,
  isEventParticipant
} from "../../src/scripts/candidateLock";

import { getCandidates, candidates } from "../mockRepository";
import { Decisions } from "../../src/global/decisionType";

describe("isEventParticipant", () => {
  test("should return true when decision is ACC_WOR", () => {
    // given
    const participant = {
      decision: Decisions.ACC_WOR
    };
    // when
    const result = isEventParticipant(participant);
    // then
    expect(result).toBe(true);
  });

  test("should return false when decision is REJ", () => {
    // given
    const participant = {
      decision: Decisions.REJ
    };
    // when
    const result = isEventParticipant(participant);
    // then
    expect(result).toBe(false);
  });

  test("should return true when decision is ACC_LEC", () => {
    // given
    const participant = {
      decision: Decisions.ACC_LEC
    };
    // when
    const result = isEventParticipant(participant);
    // then
    expect(result).toBe(true);
  });

  test("should return true when decision is MV_LEC", () => {
    // given
    const participant = {
      decision: Decisions.MV_LEC
    };
    // when
    const result = isEventParticipant(participant);
    // then
    expect(result).toBe(true);
  });

  test("should return false when decision is null", () => {
    // given
    const participant = {
      decision: null
    };
    // when
    const result = isEventParticipant(participant);
    // then
    expect(result).toBe(false);
  });
});

describe("isWorkshopParticipant", () => {
  test("should return true when decision is ACC_WOR", () => {
    // given
    const participant = {
      decision: Decisions.ACC_WOR
    };
    // when
    const result = isWorkshopParticipant(participant);
    // then
    expect(result).toBe(true);
  });

  test("should return false when decision is REJ", () => {
    // given
    const participant = {
      decision: Decisions.REJ
    };
    // when
    const result = isWorkshopParticipant(participant);
    // then
    expect(result).toBe(false);
  });

  test("should return false when decision is ACC_LEC", () => {
    // given
    const participant = {
      decision: Decisions.ACC_LEC
    };
    // when
    const result = isWorkshopParticipant(participant);
    // then
    expect(result).toBe(false);
  });

  test("should return false when decision is MV_LEC", () => {
    // given
    const participant = {
      decision: Decisions.MV_LEC
    };
    // when
    const result = isWorkshopParticipant(participant);
    // then
    expect(result).toBe(false);
  });

  test("should return false when decision is null", () => {
    // given
    const participant = {
      decision: null
    };
    // when
    const result = isWorkshopParticipant(participant);
    // then
    expect(result).toBe(false);
  });
});

describe("countWorkshopParticipants", () => {
  test("should return 2 when only 2 candidates have decision ACC_WOR  ", () => {
    // given
    const candiates = getCandidates();
    // when
    const result = countWorkshopParticipants(candidates);
    // then
    expect(result).toBe(2);
  });
});

describe("countEventParticipants", () => {
  test("should return 4 when 4 candidates have decision ACC_WOR or ACC_LEC or MV_LEC", () => {
    // given
    const candiates = getCandidates();
    // when
    const result = countEventParticipants(candidates);
    // then
    expect(result).toBe(4);
  });
});
