import { randomUUID } from "crypto";
import type {
  Incoterm,
  ShipmentEventPayload,
  ShipmentEventType,
  TransportMode,
} from "@/lib/types/logistics-ledger";

export type CreateShipmentCommand = {
  type: "CreateShipment";
  reference: string;
  origin: string;
  destination: string;
  mode: TransportMode;
  incoterm: Incoterm;
  etaDate?: string;
};

export type RaiseDemurrageRiskCommand = {
  type: "RaiseDemurrageRisk";
  shipmentId: string;
  reference: string;
  reason: string;
};

export type ShipmentCommand = CreateShipmentCommand | RaiseDemurrageRiskCommand;

export type AppendEventRequest = {
  aggregateId: string;
  eventType: ShipmentEventType;
  payload: ShipmentEventPayload;
};

export function commandToEvents(cmd: ShipmentCommand): AppendEventRequest[] {
  switch (cmd.type) {
    case "CreateShipment": {
      const aggregateId = randomUUID();
      return [
        {
          aggregateId,
          eventType: "ShipmentCreated",
          payload: {
            reference: cmd.reference,
            origin: cmd.origin,
            destination: cmd.destination,
            mode: cmd.mode,
            incoterm: cmd.incoterm,
            etaDate: cmd.etaDate,
            status: "Created",
          },
        },
      ];
    }
    case "RaiseDemurrageRisk": {
      return [
        {
          aggregateId: cmd.shipmentId,
          eventType: "DemurrageRiskRaised",
          payload: {
            reference: cmd.reference,
            demurrageRisk: true,
            status: "Demurrage Risk",
            details: { reason: cmd.reason },
          },
        },
      ];
    }
  }
}

