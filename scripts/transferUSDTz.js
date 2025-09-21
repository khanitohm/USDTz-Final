// Transfer USDTz tokens from sender to recipient
// Usage: ensure .env has RPC_URL, PRIVATE_KEY, and set USDTZ_ADDRESS or edit below.

const { ethers } = require("ethers");
require("dotenv").config();

// Minimal ERC20 ABI
const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const sender = wallet.address;
  const recipient = process.env.RECIPIENT || "0x2300Eec88F5dEE8f4f9390F6dA7515158d6A4bAd";

  // Set your deployed USDTz address here or via env
  const tokenAddress = process.env.USDTZ_ADDRESS || "0xYOUR_DEPLOYED_CONTRACT";

  if (!ethers.isAddress(recipient)) {
    throw new Error(`Invalid recipient address: ${recipient}`);
  }
  if (!ethers.isAddress(tokenAddress)) {
    throw new Error(`Invalid USDTz token address: ${tokenAddress}`);
  }

  console.log("Sender:", sender);
  console.log("Recipient:", recipient);
  console.log("USDTz:", tokenAddress);

  const token = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);
  const decimals = await token.decimals();

  // Target: 100,000 tokens
  const amount = ethers.parseUnits("100000", decimals);

  const bal = await token.balanceOf(sender);
  console.log("Sender balance:", ethers.formatUnits(bal, decimals));
  if (bal < amount) {
    throw new Error("Insufficient token balance to send 100,000 USDTz");
  }

  console.log(`Transferring ${ethers.formatUnits(amount, decimals)} tokens ...`);
  const tx = await token.transfer(recipient, amount);
  console.log("TX sent:", tx.hash);
  const rc = await tx.wait();
  console.log("✅ Transfer confirmed in block", rc.blockNumber);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
