import { Category, Module } from "../../module";

export class PacketLogger extends Module {
    consoleOnly = this.addBool("consoleonly", false, "logs packets to the console");
    sendingPackets = this.addBool("sending", true, "logs packets if sent out to server");
    receiveingPackets = this.addBool("receiving", true, "logs packets sent from server to client");

    constructor() {
        super("packetlogger", Category.MISC, "logs packets");

        this.on("packetSend", (e) => {
            this.info("sending packet " + JSON.stringify(e.packet));
            console.log(e.packet);
        });

        this.on("packetReceive", (e) => {
            this.info("receiving packet " + JSON.stringify(e.packet));
            console.log(e.packet);
        });
    }
}