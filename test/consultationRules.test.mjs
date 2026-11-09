import assert from "node:assert/strict";
import test from "node:test";
import { ASTHMA, LIVER_DISEASE, evaluateRules } from "../src/data/consultationRules.ts";

const empty = { pregnancy: "unknown", conditions: [], allergies: [] };
const medicine = (name) => ({ name, type: "Princípio ativo" });
const food = (name) => ({ name, type: "Alimento" });
const drink = (name) => ({ name, type: "Bebida" });

test("classifies food and beverage interactions separately from water administration", () => {
  const notes = evaluateRules([
    drink("Água"),
    food("Espinafre"),
    medicine("Omeprazol"),
    medicine("Varfarina"),
    drink("Bebida alcoólica"),
    medicine("Paracetamol"),
  ], empty);

  assert.deepEqual(notes.map(({ id, kind }) => [id, kind]), [
    ["varfarina-espinafre", "Interação"],
    ["acetaminofeno-alcool", "Interação"],
    ["omeprazol-agua", "Orientação de administração"],
  ]);
  assert.ok(notes.every(({ source }) => source?.url.startsWith("https://")));
});

test("requires both sides of a pair with the correct item types", () => {
  assert.deepEqual(evaluateRules([medicine("Omeprazol"), food("Água")], empty), []);
  assert.deepEqual(evaluateRules([medicine("AAS"), food("Espinafre")], empty), []);
  assert.deepEqual(evaluateRules([medicine("Varfarina")], empty), []);
});

test("checks reported allergies once for both catalog names of paracetamol", () => {
  const notes = evaluateRules([medicine("Paracetamol")], {
    ...empty,
    allergies: ["Acetaminofeno", "Paracetamol", "AAS"],
  });
  assert.equal(notes.length, 1);
  assert.equal(notes[0].kind, "Alerta do perfil");
  assert.match(notes[0].title, /Acetaminofeno/);
});

test("applies pregnancy and condition rules only to the selected medicines", () => {
  const items = [medicine("AAS"), medicine("Varfarina"), medicine("Paracetamol")];
  const profile = { pregnancy: "yes", allergies: [], conditions: [ASTHMA, LIVER_DISEASE] };
  assert.deepEqual(evaluateRules(items, profile).map(({ id }) => id), [
    "varfarina-gravidez",
    "acetaminofeno-doenca-hepatica",
    "aas-asma",
  ]);
  assert.deepEqual(evaluateRules(items, { ...empty, pregnancy: "no" }), []);
  assert.deepEqual(evaluateRules([medicine("Omeprazol")], profile), []);
});
