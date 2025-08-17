import asyncio
import json
import os
from pathlib import Path
from typing import List, Dict, Any, Optional, Union
from pydantic import BaseModel, Field
from uagents import Agent, Context
from ic.client import Client
from ic.identity import Identity
from ic.agent import Agent as ICAgent
from ic.canister import Canister
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ==== IMPROVED PATH HANDLING ====
def get_project_root() -> Path:
    """Get the project root directory"""
    return Path(__file__).parent.absolute()

def get_did_path() -> str:
    """Get DID file path with proper resolution"""
    base_path = get_project_root()  # ini sudah /Users/isaraqsan/my_icp_project/event
    default_did = Path(__file__).resolve().parents[1] / ".dfx" / "local" / "canisters" / "event_backend" / "event_backend.did"
    return os.getenv("DID_PATH", str(default_did.resolve()))

# ==== CONFIGURATION WITH VALIDATION ====uxrrr-q7777-77774-qaaaq-cai
CANISTER_ID = os.getenv("CANISTER_ID", "uxrrr-q7777-77774-qaaaq-cai")
REPLICA_URL = os.getenv("REPLICA_URL", "http://127.0.0.1:4943")
DID_PATH = get_did_path()
AGENT_SEED = os.getenv("AGENT_SEED", "default-dev-seed")

# ==== IMPROVED PYDANTIC MODELS ====
class ApotekData(BaseModel):
    """Model for individual apotek data"""
    id: Optional[str] = None
    name: Optional[str] = None
    location: Optional[str] = None
    medicines: Optional[List[str]] = None
    contact: Optional[str] = None

class GetApotekRequest(BaseModel):
    """Request model with optional filters"""
    location_filter: Optional[str] = Field(None, description="Filter by location")
    limit: Optional[int] = Field(None, ge=1, le=100, description="Limit results (1-100)")

class GetApotekResponse(BaseModel):
    """Response model with typed data"""
    success: bool = True
    count: int
    apoteks: List[Dict[str, Any]]  # Using Dict for flexibility with canister data
    message: str = "Data retrieved successfully"

class ErrorMessage(BaseModel):
    """Standardized error response with more details"""
    success: bool = False
    error: str
    error_code: Optional[str] = None
    details: Optional[Dict[str, Any]] = None  # Bisa berisi payload, exception type, dll

class AgentErrorHandler:
    """Centralized error handling with more info"""
    
    @staticmethod
    async def send_error(ctx: Context, sender: str, error: str, error_code: str = None, details: Dict[str, Any] = None):
        """Send standardized error message with optional details"""
        try:
            error_msg = ErrorMessage(
                error=error,
                error_code=error_code,
                details=details
            )
            await ctx.send(sender, error_msg)
            ctx.logger.error(f"Error sent to {sender}: {error} | details: {details}")
        except Exception as send_error:
            ctx.logger.error(f"Failed to send error message: {send_error}")


# ==== CANISTER DATA TYPE HANDLER ====
class CanisterDataHandler:
    """Handle various data formats returned from canister"""
    
    @staticmethod
    def normalize_apotek_data(raw_data: Any) -> List[Dict[str, Any]]:
        """
        Normalize canister data to consistent format
        Handles various possible return formats from IC canister
        """
        try:
            # Case 1: Nested array [[...]]
            if isinstance(raw_data, list) and len(raw_data) > 0:
                if isinstance(raw_data[0], list):
                    return raw_data[0]
                else:
                    return raw_data
            
            # Case 2: Object with apoteks property
            elif hasattr(raw_data, 'apoteks'):
                return raw_data.apoteks if isinstance(raw_data.apoteks, list) else [raw_data.apoteks]
            
            # Case 3: Single object
            elif isinstance(raw_data, dict):
                return [raw_data]
            
            # Case 4: Empty or None
            elif raw_data is None:
                return []
            
            # Case 5: Unexpected format
            else:
                raise ValueError(f"Unexpected data format: {type(raw_data)}")
                
        except Exception as e:
            raise ValueError(f"Failed to normalize data: {str(e)}")

# ==== AGENT SETUP ====
agent = Agent(
    name="medicine_agent",
    port=8001,
    seed=AGENT_SEED,
    endpoint="http://127.0.0.1:8001/submit",
    mailbox=True
)

# ==== EVENTS ====
async def fetch_apoteks_from_canister(location_filter: Optional[str] = None, limit: Optional[int] = None):
    data_handler = CanisterDataHandler()
    
    if not Path(DID_PATH).exists():
        print(f"DID file not found: {DID_PATH}")
        return []

    client = Client(url=REPLICA_URL)
    identity = Identity()
    ic_agent = ICAgent(identity, client)

    with open(DID_PATH, "r") as f:
        candid_text = f.read()

    canister = Canister(agent=ic_agent, canister_id=CANISTER_ID, candid=candid_text)

    # Ambil data langsung
    raw_result = await canister.getApotek_async()
    print(raw_result)

    # Normalize data
    # normalized_apoteks = data_handler.normalize_apotek_data(raw_result)

    # Filter berdasarkan nama/alamat
    

    return raw_result




@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info("Medicine Agent starting...")

    if not Path(DID_PATH).exists():
        ctx.logger.warning(f"DID file not found at startup: {DID_PATH}")
    else:
        ctx.logger.info(f"DID file found: {DID_PATH}")

    # ==== Panggil langsung canister ====
    try:
        apoteks = await fetch_apoteks_from_canister()
        ctx.logger.info(f"Startup fetched {len(apoteks)} apoteks: {apoteks}")
    except Exception as e:
        ctx.logger.error(f"Error fetching apoteks during startup: {e}")



# ==== MAIN MESSAGE HANDLER ====
@agent.on_message(model=GetApotekRequest, replies={GetApotekResponse, ErrorMessage})
async def handle_get_apotek(ctx: Context, sender: str, msg: GetApotekRequest):
    """
    Handle apotek data request with improved error handling and data processing
    """
    error_handler = AgentErrorHandler()
    data_handler = CanisterDataHandler()
    
    try:
        ctx.logger.info(f"Request from {sender} - filters: {msg.dict()}")
        
        # Step 1: Validate DID file exists
        if not Path(DID_PATH).exists():
            await error_handler.send_error(
                ctx, sender,
                "Payload does not match schema",
                "INVALID_PAYLOAD",
                details={"payload_received": msg.dict(), "expected_schema": "GetApotekRequest"}
            )

            return

        # Step 2: Initialize IC connection
        try:
            client = Client(url=REPLICA_URL)
            identity = Identity()
            ic_agent = ICAgent(identity, client)
        except Exception as e:
            await error_handler.send_error(
                ctx, sender,
                f"Failed to initialize IC client: {str(e)}",
                "IC_CONNECTION_ERROR"
            )
            return

        # Step 3: Read and parse DID file
        try:
            with open(DID_PATH, "r") as f:
                candid_text = f.read()
        except Exception as e:
            await error_handler.send_error(
                ctx, sender,
                f"Failed to read DID file: {str(e)}",
                "DID_READ_ERROR"
            )
            return

        # Step 4: Initialize canister
        try:
            canister = Canister(agent=ic_agent, canister_id=CANISTER_ID, candid=candid_text)
        except Exception as e:
            await error_handler.send_error(
                ctx, sender,
                f"Failed to initialize canister: {str(e)}",
                "CANISTER_INIT_ERROR"
            )
            return

        # Step 5: Call canister method
        try:
            ctx.logger.info("Calling getApotek...")
            raw_result = await canister.getApotek_async()
            ctx.logger.info(f"Raw canister result type: {type(raw_result)}")
        except Exception as e:
            await error_handler.send_error(
                ctx, sender,
                f"Canister call failed: {str(e)}",
                "CANISTER_CALL_ERROR"
            )
            return

        # Step 6: Process and normalize data
        try:
            normalized_apoteks = data_handler.normalize_apotek_data(raw_result)
            
            # Apply filters if provided
            if msg.location_filter:
                # Simple location filtering (adjust based on your data structure)
                normalized_apoteks = [
                    apotek for apotek in normalized_apoteks 
                    if 'location' in apotek and 
                    msg.location_filter.lower() in str(apotek['location']).lower()
                ]
            
            # Apply limit if provided
            if msg.limit:
                normalized_apoteks = normalized_apoteks[:msg.limit]
            
        except ValueError as e:
            await error_handler.send_error(
                ctx, sender,
                f"Data processing error: {str(e)}",
                "DATA_PROCESSING_ERROR"
            )
            return

        # Step 7: Send successful response
        try:
            response = GetApotekResponse(
                count=len(normalized_apoteks),
                apoteks=normalized_apoteks,
                message=f"Retrieved {len(normalized_apoteks)} apotek(s)"
            )
            await ctx.send(sender, response)
            ctx.logger.info(f"Successfully sent {len(normalized_apoteks)} apoteks to {sender}")
            
        except Exception as e:
            await error_handler.send_error(
                ctx, sender,
                f"Failed to send response: {str(e)}",
                "RESPONSE_SEND_ERROR"
            )

    except Exception as e:
        # Catch-all for unexpected errors
        ctx.logger.error(f"Unexpected error in handle_get_apotek: {str(e)}")
        await error_handler.send_error(
            ctx, sender,
            f"Internal server error: {str(e)}",
            "INTERNAL_ERROR"
        )

if __name__ == "__main__":
    print(f"Starting Medicine Agent...")
    print(f"DID Path: {DID_PATH}")
    print(f"Canister ID: {CANISTER_ID}")
    print(f"Replica URL: {REPLICA_URL}")
    asyncio.run(agent.run())