from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import asyncio
from agent import Agent, GetApotekRequest, GetApotekResponse, ErrorMessage

app = FastAPI()

class GetApotekRequestFE(BaseModel):
    location_filter: Optional[str] = None
    limit: Optional[int] = None

@app.post("/get-apotek")
async def get_apotek(request: GetApotekRequestFE):
    try:
        # Convert FE request to agent request model
        agent_request = GetApotekRequest(
            location_filter=request.location_filter,
            limit=request.limit
        )
        
        # Query the agent
        response = await agent.query(
            sender="frontend",
            message=agent_request,
            timeout=30.0
        )
        
        if isinstance(response, GetApotekResponse):
            return response.dict()
        elif isinstance(response, ErrorMessage):
            raise HTTPException(status_code=400, detail=response.dict())
        else:
            raise HTTPException(status_code=500, detail="Unexpected response format")
            
    except asyncio.TimeoutError:
        raise HTTPException(status_code=504, detail="Agent response timeout")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.on_event("startup")
async def startup():
    # Start agent in background if not already running
    if not agent.is_running():
        asyncio.create_task(agent.run())