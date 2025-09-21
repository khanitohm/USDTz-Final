// PancakeSwap V3 micro-liquidity via exactInputSingle to set 1:1 price (demo only)
// NOTE: You must approve the router to spend your tokens before running this.

const { ethers } = require("ethers");
require("dotenv").config();

// PancakeSwap V3 Router (BNB Chain Mainnet)
const ROUTER_V3 = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

// Minimal ABI for exactInputSingle
// exactInputSingle((address tokenIn,address tokenOut,uint24 fee,address recipient,uint256 deadline,uint256 amountIn,uint256 amountOutMinimum,uint160 sqrtPriceLimitX96))
const IRouterABI = [
    "function exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160)) external payable returns (uint256)"
];

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log("Using wallet:", wallet.address);

    // TODO: Replace with your deployed USDTz address
    const USDTz = process.env.USDTZ_ADDRESS || "0xYOUR_DEPLOYED_CONTRACT";
    const USDT = "0x55d398326f99059fF775485246999027B3197955"; // USDT BEP-20

    const router = new ethers.Contract(ROUTER_V3, IRouterABI, wallet);

    // Provide 1 USDTz -> swap to USDT (or reverse) to nudge price around 1:1
    // Adjust decimals if your token isn't 18 decimals
    const amountIn = ethers.parseUnits("1", 18);

    const params = {
        tokenIn: USDTz,
        tokenOut: USDT,
        fee: 100, // 0.01% = 100
        recipient: wallet.address,
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
        amountIn: amountIn,
        amountOutMinimum: 0n,
        sqrtPriceLimitX96: 0n
    };

    console.log("Sending exactInputSingle with params:", params);
    const tx = await router.exactInputSingle(params, { value: 0 });
    console.log("Liquidity TX sent:", tx.hash);
    const receipt = await tx.wait();
    console.log("✅ Liquidity added successfully in block", receipt.blockNumber);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
