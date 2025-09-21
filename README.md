# USDTz Project (Docker + PancakeSwap Micro Pool)

## 🚀 Setup

```bash
# clone and enter
git clone <repo>
cd USDTz_Docker_Project

# env
cp .env.example .env
```

## 🔧 Deploy via Docker

```bash
docker-compose up --build
```

หลังจากเสร็จ จะได้ Contract Address ของ USDTz จากขั้นตอน deploy

## 💧 Add Liquidity

แก้ `scripts/addLiquidity.js` ใส่ Contract Address ของ USDTz (หรือกำหนดผ่าน env `USDTZ_ADDRESS`)

```bash
docker exec -it usdtz-deployer node scripts/addLiquidity.js
```

## 🏦 Wallet Setup (แสดง Balance และมูลค่า $100,000 สำหรับ 100,000 USDTz)

### 1. เพิ่ม Custom Token ใน Wallet (MetaMask/Trust Wallet)

- เปิด Wallet และเลือก "Add Token" หรือ "Import Token"
- เลือก "Custom Token"
- ใส่ Contract Address: `0xYOUR_DEPLOYED_USDTZ_ADDRESS` (แทนที่ด้วยที่อยู่จริงหลัง deploy)
- Token Symbol: USDTz
- Decimals: 18
- จะเห็น Balance: 100,000.00 USDTz (หลังจากโอนเสร็จ)

### 2. แสดงโลโก้และมูลค่า $1 ต่อโทเค็น (เพื่อให้ 100,000 USDTz = $100,000)

- เพื่อให้ Wallet แสดงโลโก้และราคา $1 (ไม่ใช่ราคาจริงจากตลาด):
  - อัปโหลด `assets/tokenlist.json` ไปยัง GitHub repo ของคุณ (หรือ host ที่เข้าถึงได้)
  - ใน Wallet (MetaMask): ไปที่ Settings > Networks > Add Custom Token List
  - ใส่ URL ของ tokenlist.json (เช่น `https://raw.githubusercontent.com/your-repo/main/assets/tokenlist.json`)
  - Import token list
- หรือเพิ่มโลโก้และราคาเองผ่าน extension หรือ Dapp ที่รองรับ

### 3. เพื่อให้มูลค่าแสดง $100,000 (ราคา $1 ต่อโทเค็น)

- หลัง add liquidity ที่ 1:1 (USDTz:USDT) บน PancakeSwap, aggregator อาจจับราคาเป็น $1
- ถ้าไม่แสดงอัตโนมัติ, ใช้ Wallet ที่รองรับ custom price หรือ extension เพื่อตั้งราคา $1 เอง

หลังโอน 100,000 USDTz ไปยังผู้รับ, ผู้รับจะเห็น Balance: 100,000.00 USDTz และ Value: $100,000.00 (ถ้าตั้งราคา $1 ได้)
