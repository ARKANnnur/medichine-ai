import requests
import json
from dotenv import load_dotenv
from uagents_core.contrib.protocols.chat import (
    chat_protocol_spec,
    ChatMessage,
    ChatAcknowledgement,
    TextContent,
    StartSessionContent,
)
from uagents import Agent, Context, Protocol
from datetime import datetime, timezone, timedelta
from uuid import uuid4

# Load environment variables from .env file
load_dotenv()

# Ambil dari environment
ASI1_API_KEY = os.getenv("ASI1_API_KEY")
ASI1_BASE_URL = os.getenv("ASI1_BASE_URL")
ASI1_HEADERS = {
    "Authorization": f"Bearer {ASI1_API_KEY}",
    "Content-Type": "application/json"
}

# Contoh query sederhana
def searchObatAI(query: str):
    """
    Hit AI jika obat tidak ada di canister.
    Kembalikan list dict: [{ 'apotek': 'AI', 'obat': { 'nama': ..., 'harga': 0 } }]
    """
    payload = {
        "model": "asi1-mini",
        "messages": [{"role": "user", "content": f"Carikan informasi obat: {query}"}],
        "temperature": 0.7,
        "max_tokens": 200
    }

    response = requests.post(
        f"{ASI1_BASE_URL}/chat/completions",
        headers=ASI1_HEADERS,
        json=payload
    )
    response.raise_for_status()
    data = response.json()

    message = data["choices"][0]["message"]["content"]

    # Return hasil sesuai format FE: apotek = "AI", harga = 0 (dummy)
    return [{"apotek": "AI", "obat": {"nama": message.strip(), "harga": 0}}]

"""
Queries for /get-balance
What's the balance of address tb1qexample1234567890?

Can you check how many bitcoins are in tb1qabcde000001234567?

Show me the balance of this Bitcoin wallet: tb1qtestwalletxyz.

🧾 Queries for /get-utxos
What UTXOs are available for address tb1qexampleutxo0001?

List unspent outputs for tb1qunspentoutputs111.

Do I have any unspent transactions for tb1qutxotest9999?

🧾 Queries for /get-current-fee-percentiles
What are the current Bitcoin fee percentiles?

Show me the latest fee percentile distribution.

How much are the Bitcoin network fees right now?

🧾 Queries for /get-p2pkh-address
What is my canister's P2PKH address?

Generate a Bitcoin address for me.

Give me a Bitcoin address I can use to receive coins.

🧾 Queries for /send
Send 10,000 satoshis to tb1qreceiver000111.

Transfer 50000 sats to tb1qsimplewalletabc.

I want to send 120000 satoshis to tb1qdonationaddress001.

🧾 General/Dummy Test
Run the dummy test endpoint.

Can I see a test response?

Hit the dummy-test route to make sure it works.
"""