import asyncio
import websockets
from pybooklid import LidSensor

clients = set()

async def handler(websocket, path):
    clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        clients.remove(websocket)

async def broadcast_bellows():
    previous_angle = None
    try:
        with LidSensor() as sensor:
            print("🪗 Harmonium Bellows Server running on ws://localhost:8765")
            for current_angle in sensor.monitor(interval=0.05):
                if previous_angle is not None and clients:
                    movement_speed = abs(current_angle - previous_angle)
                    if movement_speed > 0.5:
                        pump_intensity = min(1.0, movement_speed / 5.0)
                        websockets.broadcast(clients, str(pump_intensity))
                previous_angle = current_angle
                await asyncio.sleep(0)
    except Exception as e:
        print(f"Sensor error: {e}")

async def main():
    async with websockets.serve(handler, "localhost", 8765):
        await broadcast_bellows()

if __name__ == "__main__":
    asyncio.run(main())