import net from "net";
import crypto from "crypto";

const serialId = "demo-by-krish";

const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
  namedCurve: "secp256k1",
});

const hash = crypto.createHash("sha256").update(serialId).digest();//signing id

const sign = crypto.createSign("SHA256");
sign.update(hash);
sign.end();

const signature = sign.sign(privateKey);

const message = {
  serial_id: serialId,
  signature: signature.toString("hex"),
};

const client = new net.Socket();

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
