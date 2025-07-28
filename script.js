// 页面切换逻辑
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const sectionId = btn.getAttribute('data-section');
        sections.forEach(sec => {
            if (sec.id === sectionId) {
                sec.classList.add('active');
            } else {
                sec.classList.remove('active');
            }
        });
    });
});

// Quotes data
const quotes = {
    honesty: 'My honesty setting is 90%.',
    humor: 'Humor setting is 75%. Want to hear a joke?',
    loyalty: 'My loyalty is 100%. I will always be with you.',
    random: [
        'Do you know what humor is? I can try.',
        'Don\'t let humor exceed honesty.',
        'I can customize parameters, but not destiny.',
        '"Courage is not the absence of fear, but overcoming it."',
        '"We must face reality."',
    ]
};

// Quote switching logic
const quoteBtns = document.querySelectorAll('.quote-btn');
const currentQuote = document.getElementById('current-quote');

quoteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-quote');
        if (type === 'random') {
            const arr = quotes.random;
            currentQuote.textContent = arr[Math.floor(Math.random() * arr.length)];
        } else {
            currentQuote.textContent = quotes[type];
        }
    });
});

// Chat interaction logic
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const quickActions = document.querySelectorAll('.action-btn');

function appendMessage(content, isTars = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ' + (isTars ? 'tars-message' : 'user-message');
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isTars ? 'VineDoge' : 'You';
    const msgContent = document.createElement('div');
    msgContent.className = 'message-content';
    msgContent.textContent = content;
    msgDiv.appendChild(avatar);
    msgDiv.appendChild(msgContent);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function tarsReply(text) {
    // Enhanced rule-based reply with VineDoge, Crypto, Web3, AI content
    let reply = 'Glad to be at your service.';
    
    // VineDoge specific
    if (/joke|humor/i.test(text)) reply = 'Why did VineDoge go to the moon? Because it heard there were no taxes in space! 🚀';
    else if (/mission|status/i.test(text)) reply = 'Mission: Using AI technology to revive Vine! Including AI-assisted automatic editing, script generation, voice-over, and special effects for creators! 🎬🤖';
    else if (/vinedoge|vine.*doge/i.test(text)) reply = 'VineDoge is the next generation meme coin combining the viral nature of Vine with the power of Doge! 🌱🐕';
    else if (/token|coin/i.test(text)) reply = 'VineDoge token is built on Solana blockchain for fast, low-cost transactions. Perfect for the meme economy! 💎';
    
    // Crypto & Bitcoin
    else if (/btc|bitcoin/i.test(text)) reply = 'Bitcoin is the OG crypto! But VineDoge is the future of meme coins on Solana. Both are part of the crypto revolution! ₿';
    else if (/crypto|blockchain/i.test(text)) reply = 'Crypto is revolutionizing finance! VineDoge is part of this movement, bringing fun and community to decentralized finance! 🔗';
    else if (/solana|sol/i.test(text)) reply = 'Solana is the perfect blockchain for VineDoge - fast, cheap, and scalable! No more high gas fees! ⚡';
    
    // Web3 & DeFi
    else if (/web3|defi/i.test(text)) reply = 'Web3 is the future of the internet! VineDoge is building a community-driven ecosystem in the decentralized world! 🌐';
    else if (/nft|non.*fungible/i.test(text)) reply = 'NFTs are changing digital ownership! Imagine VineDoge NFTs - the possibilities are endless! 🎨';
    else if (/dao|governance/i.test(text)) reply = 'DAOs are the future of community governance! VineDoge community will have a say in the project\'s direction! 🏛️';
    
    // AI & Technology
    else if (/ai|artificial.*intelligence/i.test(text)) reply = 'AI is transforming everything! I\'m an AI assistant for VineDoge, helping users navigate the crypto world! 🤖';
    else if (/technology|tech/i.test(text)) reply = 'Technology moves fast! VineDoge combines the latest in blockchain tech with viral meme culture! 💻';
    
    // Social Media & Viral Content
    else if (/vine|social.*media/i.test(text)) reply = 'Vine was revolutionary! Now VineDoge brings that viral energy to the crypto world! 📱';
    else if (/meme|viral/i.test(text)) reply = 'Memes are the language of the internet! VineDoge speaks that language fluently! 😄';
    
    // General settings
    else if (/settings?/i.test(text)) reply = 'You can customize my honesty and humor settings. I\'m here to help with all things VineDoge and crypto! ⚙️';
    else if (/hello|hi/i.test(text)) reply = 'Hello! I am VineDoge AI assistant. How can I help you with crypto, Web3, or VineDoge today? 🚀';
    else if (/loyalty/i.test(text)) reply = 'My loyalty is 100% to the VineDoge community! 💯';
    else if (/honesty/i.test(text)) reply = 'My honesty setting is 90%. Always transparent about crypto risks and opportunities! 📊';
    else if (/humor/i.test(text)) reply = 'My humor setting is 75%. Crypto can be serious, but we keep it fun! 😄';
    
    // Price and market related
    else if (/price|market|chart/i.test(text)) reply = 'Check the latest VineDoge price on DEXs! Remember: DYOR (Do Your Own Research) and never invest more than you can afford to lose! 📈';
    else if (/buy|purchase/i.test(text)) reply = 'You can buy VineDoge on Solana DEXs like Raydium or Jupiter! Always use official links and beware of scams! 🛒';
    else if (/sell|trade/i.test(text)) reply = 'Trading crypto requires strategy! Consider your goals and risk tolerance before making decisions! 📊';
    
    // Community and social
    else if (/community|social/i.test(text)) reply = 'The VineDoge community is growing fast! Join us on Twitter @Vinedoge_com and be part of the journey! 🌍';
    else if (/roadmap|future/i.test(text)) reply = 'VineDoge has big plans! Stay tuned for updates on new features, partnerships, and ecosystem expansion! 🗺️';
    
    setTimeout(() => appendMessage(reply, true), 600);
}

sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage(text, false);
    userInput.value = '';
    tarsReply(text);
});
userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendBtn.click();
});

quickActions.forEach(btn => {
    btn.addEventListener('click', () => {
        let action = btn.getAttribute('data-action');
        if (action === 'joke') {
            appendMessage('Tell a Joke', false);
            tarsReply('Tell a Joke');
        } else if (action === 'mission') {
            appendMessage('Mission Status', false);
            tarsReply('Mission Status');
        } else if (action === 'tars') {
            appendMessage('$VineDoge', false);
            setTimeout(() => {
                appendMessage('VineDoge is the future of meme coins! 🚀', true);
            }, 600);
        }
    });
});

// Meme Generator
let memeGenerated = false;

// Initialize meme generator
function initMemeGenerator() {
    const topInput = document.getElementById('top-input');
    const bottomInput = document.getElementById('bottom-input');
    const generateBtn = document.querySelector('.generate-meme-btn');
    const downloadBtn = document.querySelector('.download-meme-btn');
    
    if (topInput && bottomInput && generateBtn && downloadBtn) {
        generateBtn.addEventListener('click', generateMeme);
        downloadBtn.addEventListener('click', downloadMeme);
        
        // Real-time preview
        topInput.addEventListener('input', updateMemeText);
        bottomInput.addEventListener('input', updateMemeText);
    }
}

function updateMemeText() {
    const topInput = document.getElementById('top-input');
    const bottomInput = document.getElementById('bottom-input');
    const topText = document.getElementById('top-text');
    const bottomText = document.getElementById('bottom-text');
    
    if (topInput && topText) {
        topText.textContent = topInput.value.toUpperCase() || 'VINE DOGE';
    }
    
    if (bottomInput && bottomText) {
        bottomText.textContent = bottomInput.value.toUpperCase() || 'TO THE MOON';
    }
}

function generateMeme() {
    const topInput = document.getElementById('top-input');
    const bottomInput = document.getElementById('bottom-input');
    
    if (topInput && bottomInput) {
        updateMemeText();
        memeGenerated = true;
        
        // Add some fun animation
        const memeImage = document.querySelector('.meme-image');
        if (memeImage) {
            memeImage.style.transform = 'scale(1.05)';
            setTimeout(() => {
                memeImage.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

function downloadMeme() {
    if (!memeGenerated) {
        alert('Please generate a meme first!');
        return;
    }
    
    // Create a canvas to capture the meme
    const memeImage = document.querySelector('.meme-image');
    if (memeImage) {
        html2canvas(memeImage).then(canvas => {
            const link = document.createElement('a');
            link.download = 'vinedoge-meme.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }
}



// Three.js3
let scene, camera, renderer, mixer, clock;
let modelLoaded = false;

function initThreeJS() {
    const modelViewer = document.querySelector('.model-viewer');
    
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, modelViewer.clientWidth / modelViewer.clientHeight, 0.1,1000);
    camera.position.set(0, 5, 10);
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(modelViewer.clientWidth, modelViewer.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // 清空容器并添加渲染器
    modelViewer.innerHTML = '';
    modelViewer.appendChild(renderer.domElement);
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00B484, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x00B484, 0.8);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
    
    // 初始化时钟
    clock = new THREE.Clock();
    
    // 开始渲染循环
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    if (mixer) {
        mixer.update(clock.getDelta());
    }
    
    renderer.render(scene, camera);
}

function createTARSMesh() {
    // 创建简单的VineDoge几何体（如果没有模型文件）
    const group = new THREE.Group();
    
    // 主体（立方体）
    const bodyGeometry = new THREE.BoxGeometry(2, 3, 1);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x222222,
        shininess: 100,
        specular: 0x000000
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    
    // 头部（球体）
    const headGeometry = new THREE.SphereGeometry(0.8, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
        color: 0x111111,
        shininess: 100,
        specular: 0x000000
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2.5;
    head.castShadow = true;
    group.add(head);
    
    // 眼睛
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.37, 0.6, 0);
    group.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.37, 0.6, 0);
    group.add(rightEye);
    
    // 腿部
    const legGeometry = new THREE.BoxGeometry(0.3, 2, 0.3);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0xa1a1a });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.5, -2.5, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.5, 2.5, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);
    
    // 添加旋转动画
    group.rotation.y = Math.PI / 4;
    return group;
}

function loadTARSModel() {
    if (modelLoaded) return;
    
    try {
        initThreeJS();
        
        // 尝试加载GLTF模型，如果失败则使用几何体
        const loader = new THREE.GLTFLoader();
        
        // 这里可以替换为实际的VineDoge模型文件路径
        // loader.load('models/vinedoge.glb', function(gltf) {
        //     const model = gltf.scene;
        //     model.scale.set(1, 1, 1);
        //     model.position.set(0, 0, 0);
        //     scene.add(model);
        //     
        //     if (gltf.animations && gltf.animations.length) {
        //         mixer = new THREE.AnimationMixer(model);
        //         const action = mixer.clipAction(gltf.animations[0]);
        //         action.play();
        //     }
        //     
        //     modelLoaded = true;
        // }, undefined, function(error) {
        //     console.log('模型加载失败，使用几何体:', error);
        //     loadFallbackModel();
        // });
        
        // 暂时使用几何体
        loadFallbackModel();
        
    } catch (error) {
        console.error('Three.js初始化失败:', error);
        loadFallbackModel();
    }
}

function loadFallbackModel() {
    const tarsMesh = createTARSMesh();
    scene.add(tarsMesh);
    modelLoaded = true;
    
    // 添加自动旋转
    function rotateModel() {
        if (tarsMesh) {
            tarsMesh.rotation.y += 0.01;
        }
        requestAnimationFrame(rotateModel);
    }
    rotateModel();
}

// 3D模型控制
const controlBtns = document.querySelectorAll('.control-btn');
controlBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        if (!scene) return;
        
        switch(action) {
            case 'rotate':                // 旋转模型
                scene.children.forEach(child => {
                    if (child.type === 'Group') {
                        child.rotation.y += Math.PI / 2;
                    }
                });
                break;
            case 'zoom':                // 缩放相机
                camera.position.z = camera.position.z > 3 ? 2 : 8;
                break;
            case 'reset':                // 重置视角
                camera.position.set(0, 0, 5);
                scene.children.forEach(child => {
                    if (child.type === 'Group') {
                        child.rotation.set(0, Math.PI / 4, 0);
                    }
                });
                break;
        }
    });
});

// 3D模型加载按钮
const loadModelBtn = document.querySelector('.load-model-btn');
if (loadModelBtn) {
    loadModelBtn.addEventListener('click', () => {
        loadTARSModel();
        loadModelBtn.textContent = 'Model Loaded';
        loadModelBtn.disabled = true;
    });
} 

// Solana Wallet Connection
let connection, wallet, walletAddress;

const connectWalletBtn = document.getElementById('connect-wallet-btn');

async function connectWallet() {
    try {
        // Check if Phantom wallet is installed
        if (!window.solana || !window.solana.isPhantom) {
            alert('Please install Phantom wallet to connect!');
            return;
        }

        // Connect to wallet
        const response = await window.solana.connect();
        walletAddress = response.publicKey.toString();
        
        // Initialize connection to Solana network (mainnet-beta)
        connection = new solanaWeb3.Connection(
            solanaWeb3.clusterApiUrl('mainnet-beta'),
            'confirmed'
        );
        
        // Update button
        connectWalletBtn.textContent = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
        connectWalletBtn.classList.add('connected');
        
        // Add disconnect functionality
        connectWalletBtn.onclick = disconnectWallet;
        
        console.log('Solana wallet connected:', walletAddress);
        
        // Listen for account changes
        window.solana.on('accountChanged', handleAccountChanged);
        
    } catch (error) {
        console.error('Error connecting Solana wallet:', error);
        alert('Failed to connect wallet. Please try again.');
    }
}

function disconnectWallet() {
    walletAddress = null;
    connection = null;
    wallet = null;
    
    // Reset button
    connectWalletBtn.textContent = 'Connect Wallet';
    connectWalletBtn.classList.remove('connected');
    connectWalletBtn.onclick = connectWallet;
    
    console.log('Solana wallet disconnected');
}

function handleAccountChanged(publicKey) {
    if (publicKey) {
        // User switched accounts
        walletAddress = publicKey.toString();
        connectWalletBtn.textContent = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
        console.log('Solana account changed to:', walletAddress);
    } else {
        // User disconnected wallet
        disconnectWallet();
    }
}

// Initialize wallet connection
connectWalletBtn.addEventListener('click', connectWallet);

// Check if wallet is already connected on page load
window.addEventListener('load', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            // Check if already connected
            if (window.solana.isConnected) {
                const response = await window.solana.connect();
                walletAddress = response.publicKey.toString();
                
                connection = new solanaWeb3.Connection(
                    solanaWeb3.clusterApiUrl('mainnet-beta'),
                    'confirmed'
                );
                
                connectWalletBtn.textContent = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
                connectWalletBtn.classList.add('connected');
                connectWalletBtn.onclick = disconnectWallet;
                
                window.solana.on('accountChanged', handleAccountChanged);
            }
        } catch (error) {
            console.error('Error checking Solana wallet connection:', error);
        }
    }
    
    // Initialize new features
    initMemeGenerator();
}); 