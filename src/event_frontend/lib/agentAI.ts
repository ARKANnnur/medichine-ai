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

const ASI1_API_KEY = "sk_4391d7076f734dc782b268f92833c7bb442dc9d304da4f35863e67cf0632aee6"; // masukkan API key kamu
const ASI1_BASE_URL = "https://api.asi1.ai/v1";

export async function searchObatAI(query: string): Promise<ObatAIResult[]> {
    try {
        const payload = {
            model: "asi1-mini",
            messages: [{ role: "user", content: `berikakn aku data harga obat ${query} di apotek daerah Cicaheum bandung, formatnya gini, json gini [{ apotek: "Apotek AI", alamat:" ", lat: 0, lon: 0, obat: "", nama: "Paracetamol", harga: "5000', }, ...]` }],
            temperature: 0.7,
            max_tokens: 200,
        };

        const response = await axios.post(`${ASI1_BASE_URL}/chat/completions`, payload, {
            headers: {
                Authorization: `Bearer ${ASI1_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        const message = response.data.choices[0].message.content;

        // Return selalu dengan format lengkap
        return message;
    } catch (err) {
        console.error("Error searchObatAI:", err);
        return [];
    }
}
