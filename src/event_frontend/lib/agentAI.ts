import axios from "axios";

export type ObatAIResult = {
    apotek: string;
    alamat: string;
    lat: number;
    lon: number;
    obat: string;
    nama: string;
    harga: string;
};

const OPENROUTER_API_KEY = "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"; // ganti dengan API key openrouter
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function searchObatAI(query: string): Promise<ObatAIResult[]> {
    try {
        const payload = {
            model: "deepseek/deepseek-chat-v3-0324:free",
            messages: [
                {
                    role: "user",
                    content: `Berikan aku data harga **semua jenis/varian obat** yang mengandung nama "${query}" 
      (misalnya ukuran berbeda, dosis berbeda, varian lain) di apotek nyata sekitar Cicaheum, Bandung. 

      Balas **hanya dengan format JSON** seperti ini, tanpa teks tambahan:

      [ { "apotek": "Nama Apotek", "alamat": "Alamat lengkap", "lat": -6.xxxx, "lon": 107.xxxx, "obat": "${query}", "harga": "angka" } ]
      - Gunakan data **real** sebanyak yang tersedia.
      - Jangan tambahkan teks lain di luar JSON.`
                }
            ],
            temperature: 0.7,
            max_tokens: 700,
        };




        const response = await axios.post(OPENROUTER_BASE_URL, payload, {
            headers: {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000", // optional, bisa isi domain kamu
                "X-Title": "Obat Finder",                // optional
            },
        });

        const message = response.data.choices[0].message.content;

        let jsonString = message;

        // buang block markdown
        jsonString = jsonString.replace(/```json/g, "").replace(/```/g, "").trim();

        // kalau masih ada teks lain, ambil array JSON pertama
        const match = jsonString.match(/\[[\s\S]*\]/);
        if (match) {
            jsonString = match[0];
        }

        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.error("Gagal parse JSON dari model:", e, jsonString);
            return [];
        }


    } catch (err) {
        console.error("Error searchObatAI:", err);
        return [];
    }
}
