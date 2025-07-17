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

// 台词数据
const quotes = {
    honesty: '我的诚实度设置为90%。',
    humor: '幽默感设置为75%。你想听个笑话吗？',
    loyalty: '我的忠诚度是100%。我会一直陪伴你。',
    mission: '我的任务是协助人类完成星际探索。',
    random: [
        '你知道什么是幽默吗？我可以试试。',
        '不要让幽默感超过诚实度。',
        '我可以自定义参数，但不能自定义命运。',
        '“勇气不是没有恐惧，而是克服恐惧。”',
        '“我们必须面对现实。”',
    ]
};

// 台词切换逻辑
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

// 聊天互动逻辑
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const quickActions = document.querySelectorAll('.action-btn');

function appendMessage(content, isTars = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ' + (isTars ? 'tars-message' : 'user-message');
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isTars ? 'TARS' : '你';
    const msgContent = document.createElement('div');
    msgContent.className = 'message-content';
    msgContent.textContent = content;
    msgDiv.appendChild(avatar);
    msgDiv.appendChild(msgContent);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function tarsReply(text) {
    // 简单规则回复
    let reply = '很高兴为你服务。';
    if (/笑话|幽默/.test(text)) reply = '有一天，TARS走进了黑洞……结果他出来时还在讲冷笑话！';
    else if (/任务|状态/.test(text)) reply = '当前任务：陪伴你体验星际穿越。';
    else if (/设置/.test(text)) reply = '你可以自定义我的诚实度和幽默感。';
    else if (/你好|hi|hello/i.test(text)) reply = '你好！我是TARS，有什么可以帮你？';
    else if (/忠诚/.test(text)) reply = '我的忠诚度是100%。';
    else if (/诚实/.test(text)) reply = '我的诚实度设置为90%。';
    else if (/幽默/.test(text)) reply = '我的幽默感设置为75%。';
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
            appendMessage('讲个笑话', false);
            tarsReply('讲个笑话');
        } else if (action === 'mission') {
            appendMessage('任务状态', false);
            tarsReply('任务状态');
        } else if (action === 'settings') {
            appendMessage('设置', false);
            tarsReply('设置');
        }
    });
});

// Three.js3
let scene, camera, renderer, mixer, clock;
let modelLoaded = false;

function initThreeJS() {
    const modelViewer = document.querySelector('.model-viewer');
    
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
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
    
    const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x00d4ff, 0.8);
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
    // 创建简单的TARS几何体（如果没有模型文件）
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
        
        // 这里可以替换为实际的TARS模型文件路径
        // loader.load('models/tars.glb', function(gltf) {
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
        loadModelBtn.textContent = '模型已加载';
        loadModelBtn.disabled = true;
    });
} 