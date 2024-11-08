import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from '@rainbow-me/rainbowkit';
import {
  createConfig,
  WagmiConfig,
  http,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defineChain } from 'viem';
import '@rainbow-me/rainbowkit/styles.css';

// Create a client
const queryClient = new QueryClient();

// Define Sonic Testnet
const sonicTestnet = defineChain({
  id: 64165,
  name: 'Sonic Testnet',
  network: 'sonic-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'SONIC',
    symbol: 'SONIC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.soniclabs.com'],
    },
    public: {
      http: ['https://rpc.testnet.soniclabs.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'SonicScan',
      url: 'https://testnet.sonicexplorer.io',
    },
  },
  testnet: true,
});

const chains = [sonicTestnet];

const { connectors } = getDefaultWallets({
  appName: 'Coin Flip App',
  projectId: 'YOUR_PROJECT_ID', // Replace with your actual project ID from WalletConnect
  chains,
});

const config = createConfig({
  chains,
  connectors,
  transports: {
    [sonicTestnet.id]: http(),
  },
});

// Coin component with flip animation
const Coin = ({ isFlipping, onClick }) => {
  return (
    <motion.div
      className="coin"
      animate={{
        rotateX: isFlipping ? 360 * 5 : 0,
        transition: {
          duration: 1.5,
          ease: "easeOut",
        },
      }}
      onClick={onClick}
      style={{
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#fff',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        perspective: '1000px',
      }}
    >
      FLIP ME
    </motion.div>
  );
};

function App() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);

  const handleCoinFlip = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setResult(Math.random() < 0.5 ? 'HEADS' : 'TAILS');
        setIsFlipping(false);
      }, 1500);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <div style={{
            minHeight: '100vh',
            backgroundColor: '#EC5555',
            background: `radial-gradient(circle at 50% 50%, #EC5555 0%, #CC3333 100%)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
            }}>
              <ConnectButton />
            </div>
            
            <div style={{
              marginTop: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '30px',
            }}>
              <Coin isFlipping={isFlipping} onClick={handleCoinFlip} />
              
              {result && !isFlipping && (
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}>
                  {result}
                </div>
              )}
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default App;