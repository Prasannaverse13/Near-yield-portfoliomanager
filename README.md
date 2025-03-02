# NEAR AI Yield Agent

NEAR AI Yield Agent is an advanced DeFi portfolio optimization platform powered by AI. The platform analyzes various yield-generating opportunities across NEAR Protocol's DeFi ecosystem and provides optimal allocation strategies based on user-defined risk profiles.

## Features

- **AI Agent Optimization**: Intelligent portfolio allocation based on risk tolerance
- **Multi-Wallet Support**: Connect with NEAR Wallet or MetaMask
- **Protocol Analysis**: Detailed information about supported DeFi protocols
- **Portfolio Tracking**: Monitor your assets and their performance
- **Automated Rebalancing**: Execute AI agent recommendations with one click
- **Dark Mode**: Toggle between light and dark themes for better visibility

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Blockchain Integration**: NEAR API JS, Web3.js, Ethers.js
- **Data Visualization**: Recharts
- **State Management**: Zustand
- **UI Components**: Lucide React for icons

## NEAR Technology Integration

This project leverages NEAR Protocol technology in several key areas:

1. **NEAR API JS Integration** (`src/utils/near.ts`):
   - Connection to NEAR blockchain
   - Wallet authentication
   - Smart contract interactions
   - Transaction signing and execution

2. **NEAR Wallet Connection** (`src/components/WalletConnect.tsx`):
   - Seamless NEAR wallet authentication
   - Account management
   - Transaction authorization

3. **NEAR Contract Interactions**:
   - View methods via `callViewMethod` function
   - Change methods via `callChangeMethod` function
   - Gas and deposit management

4. **NEAR Explorer Integration** (`src/pages/History.tsx`):
   - Transaction verification links
   - Account exploration

5. **NEAR DeFi Protocol Support** (`src/utils/api.ts`):
   - Integration with Ref Finance, Burrow, Meta Pool, and other NEAR ecosystem protocols
   - Yield data aggregation
   - Protocol risk assessment

## AI Agent Implementation

The AI agent functionality is implemented in:

- `src/components/OptimizationForm.tsx` - Risk profile selection and AI agent configuration
- `src/components/OptimizationResult.tsx` - AI agent recommendations display
- `src/utils/api.ts` - AI optimization logic and protocol analysis

## Project Structure

### Key Files

- **NEAR Integration**:
  - `src/utils/near.ts` - Core NEAR blockchain interactions
  - `src/components/WalletConnect.tsx` - Wallet connection interface
  - `src/utils/api.ts` - NEAR DeFi protocol interactions

- **State Management**:
  - `src/store/index.ts` - Global state management with Zustand

- **Pages**:
  - `src/pages/Dashboard.tsx` - Main dashboard
  - `src/pages/Optimize.tsx` - AI agent optimization interface
  - `src/pages/Portfolio.tsx` - Portfolio analysis
  - `src/pages/Protocols.tsx` - Protocol information
  - `src/pages/History.tsx` - Transaction history
  - `src/pages/Settings.tsx` - User settings

- **Components**:
  - `src/components/AssetList.tsx` - User assets display
  - `src/components/PortfolioSummary.tsx` - Portfolio overview
  - `src/components/ProtocolList.tsx` - Supported protocols
  - `src/components/Sidebar.tsx` - Navigation sidebar
  - `src/components/Navbar.tsx` - Top navigation bar

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## How to Use the Project

1. **Connect Your Wallet**:
   - Click "Connect Wallet" in the top-right corner
   - Choose between NEAR Wallet or MetaMask
   - Authorize the connection

2. **View Your Dashboard**:
   - See your portfolio summary
   - Monitor your assets
   - Check supported protocols

3. **Use the AI Agent for Optimization**:
   - Navigate to the "AI Optimize" section
   - Select your risk profile (Conservative, Balanced, or Aggressive)
   - Fine-tune your risk level using the slider
   - Click "Run AI Optimization" to generate recommendations

4. **Execute AI Agent Recommendations**:
   - Review the AI agent's allocation strategy
   - Check expected APY and risk assessment
   - Click "Execute AI Recommendation" to rebalance your portfolio

5. **Monitor Performance**:
   - Track your portfolio performance in the Portfolio section
   - View protocol allocation and asset distribution
   - Monitor APY comparison across different protocols

6. **Customize Settings**:
   - Toggle dark mode for better visibility
   - Configure notification preferences
   - Set up auto-rebalancing thresholds
   - Adjust AI agent optimization frequency

## Dark Mode

The application supports dark mode for better visibility. You can toggle between light and dark themes using:
- The moon/sun icon in the navigation bar
- The toggle switch in the Settings page

## License

This project is licensed under the MIT License.