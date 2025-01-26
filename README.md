# Timebox - uOttaHack 2025 "Best Use of Midnight" Challenge  

Unfortunately, the Midnight testnet was down so we couldn't implement Midnight. The following README will be written as though we were able to implement it and it will describe how we would have used it.

Timebox is a **privacy-focused digital time capsule** platform powered by **Midnight's confidential smart contracts**. It allows users to **store encrypted messages on the blockchain**, ensuring they can only be accessed after a specified unlock time.  

With **zero-knowledge proofs (ZKPs)** and **decentralized storage**, Timebox guarantees that your messages remain **secure, private, and tamper-proof** until the moment they are meant to be revealed.  

---

## Features  

### **1. Blockchain-Powered Time Capsules**  
- Users can create **encrypted messages** stored on Midnight’s blockchain.  
- Messages remain **inaccessible until the unlock time arrives**.  

### **2. Privacy-Preserving Smart Contracts**  
- Uses **Midnight's confidential smart contracts** to ensure messages stay **private and secure**.  
- **Zero-knowledge proofs (ZKPs)** verify recipient identity without revealing sensitive data.  

### **3. Decentralized & Tamper-Proof**  
- **Immutable storage** prevents message alteration or deletion.  
- Only the intended recipient can **decrypt and access** the message.  

### **4. Secure Authentication & Access Control**  
- Users authenticate via **cryptographic wallets**.  
- Messages can be accessed only by users with the correct **private key** after the unlock date.  

---

## **Why Timebox Matters**  

Time capsules have long been a way to **preserve memories and messages** for the future. However, traditional time capsules are vulnerable to **loss, tampering, and unauthorized access**.  

With **Timebox**, we bring **time-locked messaging** into the digital age by leveraging **blockchain for security, Midnight for privacy, and ZKPs for authentication**.  

---

## **Getting Started**  

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/peter-bf/devback
   ```

2. Navigate to the frontend directory:

   ```bash
   cd devback
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```
   If any errors occur, do
   ```bash
   npm install --legacy-peer-deps
   ```

4. Start the server on local host port:3000

   ```bash
   npm run dev
   ```

5. Navigate into backend directory

   ```bash
   cd ../backend
   ```

6. Run backend on local machine

   ```bash
   uvicorn main:app --reload
   ```

7. Open your browser and visit:

   ```
   http://localhost:3000
   ```

---
