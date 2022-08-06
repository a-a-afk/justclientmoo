import { C2SPacketType, S2CPacketType } from "@mathrandom7910/moomooapi/src/data/network/packets";
import { PacketReceiveEvent, PacketSendEvent } from "@mathrandom7910/moomooapi/src/events";
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