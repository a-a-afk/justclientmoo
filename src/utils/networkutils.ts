import { C2SPacketType, PacketSendEvent, S2CPacketType, PacketReceiveEvent } from "@mathrandom7910/moomooapi";
import { Module } from "../modules/module";

export function onSendPack(packetType: C2SPacketType, cb: (e: PacketSendEvent) => void, module: Module) {
    module.on("packetSend", (e) => {
        if(e.type == packetType) cb(e);
    });
}

export function onRecPack(packetType: S2CPacketType, cb: (e: PacketReceiveEvent) => void, module: Module) {
    module.on("packetReceive", (e) => {
        if(e.type == packetType) cb(e);
    });
}