import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as event_idl } from "../../../.dfx/local/canisters/event_backend/service.did.js";
import canisterIds from "../../../.dfx/local/canister_ids.json";

const CANISTER_ID = canisterIds.event_backend.local; // otomatis ambil ID terbaru

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });
await agent.fetchRootKey(); // wajib untuk local dev

export const eventActor = Actor.createActor(event_idl, {
    agent,
    canisterId: CANISTER_ID,
});

// Ambil semua apotek
export async function getApotek() {
    return await eventActor.getApotek(); // async [Apotek]
}

// Tambah apotek baru
export async function tambahApotek(
    nama: string,
    alamat: string,
    lat: number,
    lon: number
) {
    return await eventActor.tambahApotek(nama, alamat, lat, lon);
}

// Tambah obat ke apotek tertentu
export async function tambahObat(
    namaApotek: string,
    namaObat: string,
    harga: bigint // Motoko Nat diterjemahkan ke bigint di JS
) {
    return await eventActor.tambahObat(namaApotek, namaObat, harga);
}

// Ambil daftar obat di apotek tertentu
export async function getObatByApotek(namaApotek: string) {
    return await eventActor.getObatByApotek(namaApotek);
}

// Ambil semua obat beserta nama apoteknya
export async function getObat() {
    // Asumsikan bentuk return sesuai Motoko: [{ apotek: Text, obat: { nama: Text, harga: Nat }}]
    const result = (await eventActor.getObat()) as {
        apotek: string;
        obat: { nama: string; harga: bigint };
    }[];

    // Optional: convert harga bigint → number
    return result.map(item => ({
        apotek: item.apotek,
        obat: {
            nama: item.obat.nama,
            harga: Number(item.obat.harga) // hati-hati overflow jika besar
        }
    }));
}
// Cari obat berdasarkan nama (case-insensitive di Motoko)
export async function searchObat(namaObat: string) {
    const result = (await eventActor.searchObat(namaObat)) as {
        apotek: string;
        obat: { nama: string; harga: bigint };
    }[];

    // Convert harga bigint → number
    return result.map(item => ({
        apotek: item.apotek,
        obat: {
            nama: item.obat.nama,
            harga: Number(item.obat.harga) // hati-hati overflow jika harga besar
        }
    }));
}



