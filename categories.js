// Asset Categorization and Metadata Registry for Bchange Lite v2

const ASSET_CATEGORIES = [
  { id: 'all', name: 'All Assets', icon: '⚡' },
  { id: 'layer1', name: 'Layer 1 & 2', icon: '🌐' },
  { id: 'defi', name: 'DeFi & Exchanges', icon: '🏦' },
  { id: 'metaverse', name: 'Metaverse & Gaming', icon: '🎮' },
  { id: 'infra', name: 'Infrastructure & AI', icon: '🛠️' },
  { id: 'stablecoins', name: 'Stablecoins', icon: '💵' },
  { id: 'meme', name: 'Meme & Community', icon: '🔥' }
];

const ASSET_METADATA = {
  // Layer 1 & Layer 2
  'BTC': { name: 'Bitcoin', category: 'layer1', icon: 'btc.svg', tag: 'Store of Value', description: 'The original decentralized digital currency and digital gold reserve.' },
  'ETH': { name: 'Ethereum', category: 'layer1', icon: 'eth.svg', tag: 'Smart Contracts', description: 'Leading smart contract platform powering decentralized applications and DeFi.' },
  'SOL': { name: 'Solana', category: 'layer1', icon: 'sol.svg', tag: 'High Performance L1', description: 'Ultra-fast, low-cost blockchain built for high frequency web3 applications.' },
  'AVAX': { name: 'Avalanche', category: 'layer1', icon: 'avax.svg', tag: 'Subnets L1', description: 'Highly scalable smart contract platform featuring custom subnets.' },
  'ADA': { name: 'Cardano', category: 'layer1', icon: 'ada.svg', tag: 'Proof of Stake', description: 'Peer-reviewed proof-of-stake blockchain platform designed for security and scalability.' },
  'DOT': { name: 'Polkadot', category: 'layer1', icon: 'dot.svg', tag: 'Interoperability', description: 'Sharded multichain network empowering seamless cross-chain interoperability.' },
  'MATIC': { name: 'Polygon', category: 'layer1', icon: 'matic.svg', tag: 'Ethereum Scaling', description: 'Layer-2 scaling solution providing fast, cheap Ethereum transactions.' },
  'ATOM': { name: 'Cosmos', category: 'layer1', icon: 'atom.svg', tag: 'Internet of Blockchains', description: 'Ecosystem of independent, scalable, and interoperable blockchains.' },
  'ALGO': { name: 'Algorand', category: 'layer1', icon: 'algo.svg', tag: 'Pure Proof of Stake', description: 'Carbon-negative, high-throughput pure proof-of-stake smart contract platform.' },
  'ICP': { name: 'Internet Computer', category: 'layer1', icon: 'icp.svg', tag: 'Web3 Compute', description: 'Decentralized cloud network designed to host software directly on the blockchain.' },
  'STX': { name: 'Stacks', category: 'layer1', icon: 'stx.svg', tag: 'Bitcoin L2', description: 'Bitcoin layer for smart contracts, decentralized apps, and digital assets.' },
  'XTZ': { name: 'Tezos', category: 'layer1', icon: 'xtz.svg', tag: 'Self-Amending L1', description: 'Self-amending blockchain network capable of seamless on-chain upgrades.' },
  'LTC': { name: 'Litecoin', category: 'layer1', icon: 'ltc.svg', tag: 'Digital Silver', description: 'Peer-to-peer cryptocurrency designed for fast and inexpensive payments.' },
  'BCH': { name: 'Bitcoin Cash', category: 'layer1', icon: 'bch.svg', tag: 'P2P Electronic Cash', description: 'Bitcoin fork focused on micro-transactions and low transactional fees.' },
  'ETC': { name: 'Ethereum Classic', category: 'layer1', icon: 'etc.svg', tag: 'Immutable Smart Contracts', description: 'Original Ethereum chain upholding strict immutability ("Code is Law").' },
  'ZEC': { name: 'Zcash', category: 'layer1', icon: 'zec.svg', tag: 'Privacy Coin', description: 'Privacy-focused cryptocurrency utilizing zero-knowledge zk-SNARK cryptography.' },
  'DASH': { name: 'Dash', category: 'layer1', icon: 'dash.svg', tag: 'Instant Payments', description: 'Digital currency optimized for instant transactions and privacy options.' },
  'XLM': { name: 'Stellar', category: 'layer1', icon: 'xlm.svg', tag: 'Cross-Border Payments', description: 'Open payment network connecting financial institutions for low-cost remittances.' },
  'EOS': { name: 'EOS', category: 'layer1', icon: 'eos.svg', tag: 'High Speed L1', description: 'DApp platform designed for enterprise scalability and zero transaction fees.' },

  // DeFi & Exchanges
  'UNI': { name: 'Uniswap', category: 'defi', icon: 'uni.svg', tag: 'DEX Automated Market Maker', description: 'Premier decentralized trading protocol powering liquid automated market making.' },
  'AAVE': { name: 'Aave', category: 'defi', icon: 'aave.svg', tag: 'Lending & Borrowing', description: 'Non-custodial liquidity protocol for earning interest and borrowing crypto assets.' },
  'MKR': { name: 'Maker', category: 'defi', icon: 'mkr.svg', tag: 'Decentralized Credit', description: 'Governance token of MakerDAO, issuer of the decentralized DAI stablecoin.' },
  'CRV': { name: 'Curve DAO', category: 'defi', icon: 'crv.svg', tag: 'Stablecoin DEX', description: 'Decentralized exchange optimized for efficient stablecoin liquidity and minimal slippage.' },
  'COMP': { name: 'Compound', category: 'defi', icon: 'comp.svg', tag: 'Interest Rate Protocol', description: 'Algorithmic money market protocol enabling interest yield on crypto deposits.' },
  'SNX': { name: 'Synthetix', category: 'defi', icon: 'snx.svg', tag: 'Synthetic Assets', description: 'Decentralized liquidity provisioning protocol for trading synthetic derivatives.' },
  '1INCH': { name: '1inch Network', category: 'defi', icon: '1inch.svg', tag: 'DEX Aggregator', description: 'DEX aggregator uniting liquidity across multiple exchanges for best trade routing.' },
  'SUSHI': { name: 'SushiSwap', category: 'defi', icon: 'sushi.svg', tag: 'Multichain DEX', description: 'Community-driven decentralized exchange offering swapping, farming, and staking.' },
  'YFI': { name: 'yearn.finance', category: 'defi', icon: 'yfi.svg', tag: 'Yield Aggregator', description: 'Yield optimization platform automating maximum returns on DeFi deposits.' },
  'BAL': { name: 'Balancer', category: 'defi', icon: 'bal.svg', tag: 'Flexible Liquidity Pools', description: 'Programmable liquidity protocol and automated portfolio manager.' },
  'LRC': { name: 'Loopring', category: 'defi', icon: 'lrc.svg', tag: 'zkRollup DEX', description: 'Layer-2 zkRollup protocol for high-throughput, low-cost decentralized trading.' },
  'KNC': { name: 'Kyber Network', category: 'defi', icon: 'knc.svg', tag: 'Liquidity Hub', description: 'Multi-chain DEX aggregator and liquidity protocol for optimal trading rates.' },
  'ZRX': { name: '0x', category: 'defi', icon: 'zrx.svg', tag: 'DEX Infrastructure', description: 'Open protocol facilitating peer-to-peer asset trading on Ethereum.' },
  'BNT': { name: 'Bancor', category: 'defi', icon: 'bnt.svg', tag: 'Single-Sided Liquidity', description: 'On-chain liquidity protocol enabling automated, decentralized token exchanges.' },

  // Metaverse & Gaming
  'SAND': { name: 'The Sandbox', category: 'metaverse', icon: 'sand.svg', tag: 'Metaverse World', description: 'Decentralized virtual gaming world where players build, own, and monetize land.' },
  'MANA': { name: 'Decentraland', category: 'metaverse', icon: 'mana.svg', tag: 'Virtual Reality', description: '3D virtual reality platform powered by Ethereum blockchain smart contracts.' },
  'APE': { name: 'ApeCoin', category: 'metaverse', icon: 'ape.svg', tag: 'Web3 Culture', description: 'Governance and utility token powering the APE Ecosystem and Otherside metaverse.' },
  'ENJ': { name: 'Enjin Coin', category: 'metaverse', icon: 'enj.svg', tag: 'Gaming NFTs', description: 'Ecosystem of integrated products designed for next-gen blockchain gaming.' },
  'CHZ': { name: 'Chiliz', category: 'metaverse', icon: 'chz.svg', tag: 'Sports Fan Tokens', description: 'Leading digital currency for sports fan engagement and blockchain entertainment.' },
  'GMT': { name: 'STEPN', category: 'metaverse', icon: 'gmt.svg', tag: 'Move to Earn', description: 'Web3 lifestyle app with Social-Fi and Game-Fi mechanics encouraging physical health.' },

  // Infrastructure & AI
  'LINK': { name: 'Chainlink', category: 'infra', icon: 'link.svg', tag: 'Decentralized Oracles', description: 'Industry-standard decentralized oracle network connecting smart contracts to off-chain data.' },
  'GRT': { name: 'The Graph', category: 'infra', icon: 'grt.svg', tag: 'Blockchain Indexing', description: 'Indexing protocol for querying blockchain networks using GraphQL APIs.' },
  'FIL': { name: 'Filecoin', category: 'infra', icon: 'fil.svg', tag: 'Decentralized Storage', description: 'Peer-to-peer storage network designed to store humanity’s most important information.' },
  'LPT': { name: 'Livepeer', category: 'infra', icon: 'lpt.svg', tag: 'Video Transcoding', description: 'Decentralized video streaming network infrastructure for live video transcoding.' },
  'BAND': { name: 'Band Protocol', category: 'infra', icon: 'band.svg', tag: 'Cross-Chain Oracles', description: 'Cross-chain data oracle platform aggregating real-world data to smart contracts.' },
  'SKL': { name: 'SKALE Network', category: 'infra', icon: 'skl.svg', tag: 'Zero Gas Networks', description: 'High-throughput, zero-gas fee blockchain network tailored for Web3 apps.' },
  'STORJ': { name: 'Storj', category: 'infra', icon: 'storj.svg', tag: 'Cloud Storage', description: 'Encrypted, decentralized cloud storage network offering security and low costs.' },
  'NMR': { name: 'Numeraire', category: 'infra', icon: 'nmr.svg', tag: 'AI Hedge Fund Data', description: 'AI-driven financial tournament token powering decentralized quantitative hedge funds.' },

  // Stablecoins & Wrapped
  'USDC': { name: 'USD Coin', category: 'stablecoins', icon: 'usdc.svg', tag: 'Fiat Stablecoin', description: 'Fully reserved USD-backed digital dollar regulated and audited monthly.' },
  'USDT': { name: 'Tether USD', category: 'stablecoins', icon: 'usdt.svg', tag: 'Fiat Stablecoin', description: 'Most widely used fiat-collateralized stablecoin anchored to the US Dollar.' },
  'DAI': { name: 'Dai', category: 'stablecoins', icon: 'dai.svg', tag: 'Crypto Collateralized', description: 'Decentralized, unbiased stablecoin soft-pegged to the US dollar by MakerDAO.' },
  'WBTC': { name: 'Wrapped Bitcoin', category: 'stablecoins', icon: 'wbtc.svg', tag: 'Bitcoin on Ethereum', description: '1:1 Bitcoin-backed ERC-20 token bringing BTC liquidity to Ethereum DeFi.' },

  // Meme & Community
  'DOGE': { name: 'Dogecoin', category: 'meme', icon: 'doge.svg', tag: 'Community Meme Coin', description: 'Open-source peer-to-peer cryptocurrency popularized by internet meme culture.' }
};

function getAssetMeta(symbol) {
  const sym = symbol.toUpperCase();
  if (ASSET_METADATA[sym]) {
    return ASSET_METADATA[sym];
  }
  return {
    name: sym,
    category: 'layer1',
    icon: `${sym.toLowerCase()}.svg`,
    tag: 'Digital Asset',
    description: `${sym} is a digital crypto asset tracked live on Bchange Lite.`
  };
}
