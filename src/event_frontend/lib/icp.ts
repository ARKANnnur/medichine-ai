import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as greet_idl } from "../../../.dfx/local/canisters/event_backend/service.did.js";
import canisterIds from "../../../.dfx/local/canister_ids.json";

const CANISTER_ID = canisterIds.event_backend.local; // otomatis ambil ID terbaru

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });
await agent.fetchRootKey(); // wajib untuk local dev

export const greetActor = Actor.createActor(greet_idl, {
    agent,
    canisterId: CANISTER_ID,
});

export async function greet(name: string): Promise<string> {
    return await greetActor.greet(name) as string;
}
