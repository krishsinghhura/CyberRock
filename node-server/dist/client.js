"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const crypto_1 = __importDefault(require("crypto"));
const serialId = "demo-by-krish";
const { privateKey, publicKey } = crypto_1.default.generateKeyPairSync("ec", {
    namedCurve: "secp256k1",
});
const hash = crypto_1.default.createHash("sha256").update(serialId).digest(); //signing id
const sign = crypto_1.default.createSign("SHA256");
sign.update(hash);
sign.end();
const signature = sign.sign(privateKey);
const message = {
    serial_id: serialId,
    signature: signature.toString("hex"),
};
const client = new net_1.default.Socket();
client.connect(5555, "127.0.0.1", () => {
    console.log("Connected to the tcp server");
    client.write(JSON.stringify(message));
});
client.on("data", (data) => {
    console.log("Server response:", data.toString());
    client.destroy();
});
client.on("close", () => {
    console.log("Connection closed");
});
